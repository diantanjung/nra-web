<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { FormLabel } from "@/components/Form";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { getJwtToken } from "@/utils/auth";
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from "vue-router";
import { RoleList } from "@/api/auth";
import { ClientList } from "@/api/client";
import { UserUpdate, UserDetail } from "@/api/user";
import VueSelect from "vue-select";
import Dropzone from "dropzone";

import useVuelidate from "@vuelidate/core";

const toast = useToast();
const router = useRouter();
const route = useRoute();

const BlockRef = ref(null);

const state = reactive({
  roles: [],
  clients: [],
  user: null
});

const form = reactive({
  name: null,
  username: null,
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
    client_id: { required },
    phone_number: { required },
    password: {
      minLength: minLength(5),
    },
    confirmPassword: {
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
  const params = { ...form }
  BlockRef.value.statusLoading();
  await UserUpdate(state.user.id, params);
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

  // * GET CLIENTS & ROLES
  const { data: dataRoles } = await RoleList();
  const { data: dataClients } = await ClientList();
  const { data: dataUser } = await UserDetail(route.params.id);
  state.roles = dataRoles;
  state.clients = dataClients.map(({ id, name }) => ({ id, name }));
  state.user = dataUser;
  const { username, name, profile, client_id, photo, role_id } = state.user;
  form.username = username;
  form.name = name;
  form.client_id = client_id
  form.role_id = role_id
  form.photo = photo;
  form.phone_number = profile.phone_number

  dropzone.value = new Dropzone("#dropzoneForm", {
    url: `${import.meta.env.VITE_API_URL}/upload`,
    maxFiles: 1,
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

  const mockPhoto = { name: photo.split('/')[photo.split('/').length -1], size: 12345 };
  dropzone.value.options.addedfile.call(dropzone.value, mockPhoto);
  dropzone.value.options.thumbnail.call(dropzone.value, mockPhoto, photo);
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

.dropzone .dz-preview .dz-image img {
  width: 120px;
  height: 120px;
}
</style>


<template>
  <!-- Hero -->
  <BasePageHeading title="Ubah User" with-back />
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
            :reduce="prefix => prefix.id"
            :options="state.roles"
            label="name"
            placeholder="Choose a value.."
          ></VueSelect>
        </div>
        <div class="mb-4">
          <FormLabel required>Client</FormLabel>
          <VueSelect
            v-model="form.client_id"
            :reduce="prefix => prefix.id"
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
          <FormLabel>Password</FormLabel>

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
          <FormLabel>Konfirmasi Password</FormLabel>
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
