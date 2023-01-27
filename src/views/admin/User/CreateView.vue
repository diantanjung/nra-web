<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { FormLabel } from "@/components/Form";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import { getJwtToken } from "@/utils/auth";
import { useToast } from 'vue-toastification'
import { useRouter } from "vue-router";
import { RoleList } from "@/api/auth";
import { ClientList } from "@/api/client";
import { UserCreate } from "@/api/user";
import VueSelect from "vue-select";
import Dropzone from "dropzone";

import useVuelidate from "@vuelidate/core";

const toast = useToast();
const router = useRouter();

const BlockRef = ref(null);

const state = reactive({
  roles: [],
  clients: [],
});

const form = reactive({
  name: null,
  username: null,
  email: null,
  phone_number: null,
  password: null,
  confirmPassword: null,
  role_id: null,
  client_id: null,
  photo: null,
});

const rules = computed(() => {
  return {
    name: { required },
    username: { required },
    email: { required, email },
    client_id: { required },
    phone_number: { required },
    password: {
      required,
      minLength: minLength(5),
    },
    confirmPassword: {
      required,
      sameAs: sameAs(form.password),
    },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, form);

// On form submission
async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  const params = {
    ...form,
    client_id: form.client_id.id,
    role_id: form.role_id.id,
  }
  BlockRef.value.statusLoading();
  await UserCreate(params);
  BlockRef.value.statusNormal();
  toast.success("Berhasil Menambah User!");
  router.push('/admin/master/user/create')

}

// Dropzone variables
const dropzone = ref(null);

// Init Dropzone when content is loaded
onMounted(async () => {
  BlockRef.value.statusLoading();
  const jwtToken = getJwtToken();
  dropzone.value = new Dropzone("#dropzoneForm", {
    url: `${import.meta.env.VITE_API_URL}/upload`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + jwtToken,
    },
  });
  dropzone.value.on("success", (file, response) => {
    const { data } = response;
    form.photo = data.cdn_url;
  });

  // * GET CLIENTS & ROLES
  const { data: dataRoles } = await RoleList();
  const { data: dataClients } = await ClientList();
  state.roles = dataRoles;
  state.clients = dataClients.map(({ id, name }) => ({ id, name }));
  BlockRef.value.statusNormal();
});

// Detroy dropzone instance before leaving the page
onBeforeUnmount(() => {
  dropzone.value.destroy();
});
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "@/assets/scss/vendor/vue-select";

@import "dropzone/dist/dropzone.css";
@import "@/assets/scss/vendor/dropzone";
</style>


<template>
  <!-- Hero -->
  <BasePageHeading title="Tambah User" with-back />
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <form @submit.prevent="handleSubmit">
      <BaseBlock content-full ref="BlockRef">
        <h2 class="content-heading border-bottom mb-4 pb-2">Data User</h2>
        <div class="mb-4">
          <FormLabel required>Nama</FormLabel>
          <input
            type="text"
            id="val-name"
            class="form-control"
            :class="{ 'is-invalid': v$.name.$errors.length }"
            v-model="form.name"
            @blur="v$.name.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Username</FormLabel>
          <input
            type="text"
            id="val-username"
            class="form-control"
            :class="{ 'is-invalid': v$.username.$errors.length }"
            v-model="form.username"
            @blur="v$.username.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Hak Akses</FormLabel>
          <VueSelect
            v-model="form.role_id"
            :options="state.roles"
            label="name"
            placeholder="Choose a value.."
          ></VueSelect>
        </div>
        <div class="mb-4">
          <FormLabel required>Client</FormLabel>
          <VueSelect
            v-model="form.client_id"
            :options="state.clients"
            label="name"
            placeholder="Choose a value.."
          ></VueSelect>
        </div>
        <div class="mb-4">
          <FormLabel required>No. HP</FormLabel>

          <input
            type="text"
            id="val-phone_number"
            class="form-control"
            :class="{ 'is-invalid': v$.phone_number.$errors.length }"
            v-model="form.phone_number"
            @blur="v$.phone_number.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Email</FormLabel>

          <input
            type="text"
            id="val-email"
            class="form-control"
            :class="{ 'is-invalid': v$.email.$errors.length }"
            v-model="form.email"
            @blur="v$.email.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Password</FormLabel>

          <input
            type="password"
            id="val-password"
            class="form-control"
            :class="{ 'is-invalid': v$.password.$errors.length }"
            v-model="form.password"
            @blur="v$.password.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Konfirmasi Password</FormLabel>
          <input
            type="password"
            id="val-confirm-password"
            class="form-control"
            :class="{ 'is-invalid': v$.confirmPassword.$errors.length }"
            v-model="form.confirmPassword"
            @blur="v$.confirmPassword.$touch"
          />
        </div>
        <div class="mb-4">
          <FormLabel required>Foto</FormLabel>
          <form id="dropzoneForm" class="dropzone"></form>
        </div>
        <button type="submit" class="btn btn-lg btn-success text-white">
          Submit
        </button>
      </BaseBlock>
    </form>
  </div>
  <!-- END Page Content -->
</template>
