<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { useToast } from 'vue-toastification'
import { UserDetail } from "@/api/user";
import { ChangePassword } from "@/api/auth";

import useVuelidate from "@vuelidate/core";
const toast = useToast();

const BlockRef = ref(null);
const authStore = useAuthStore();

const state = reactive({
  user: {
    name: null,
    username: null,
    email: null,
    phone_number: null,
    password: null,
    confirmPassword: null,
    role_id: null,
    client_id: null,
    photo: null,
  }
});

const changePasswordForm = reactive({
  confirm_password: null,
  old_password: null,
  password: null
})
const changePasswordRules = computed(() => {
  return {
    old_password: {
      required,
      minLength: minLength(5),
    },
    password: {
      required,
      minLength: minLength(5),
    },
    confirm_password: {
      required,
      sameAs: sameAs(changePasswordForm.password),
    },
  };
});
// Use vuelidate
const v$ = useVuelidate(changePasswordRules, changePasswordForm);

async function handleChangePasswordSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  BlockRef.value.statusLoading();
  const resp = await ChangePassword(changePasswordForm);
  if(resp.length == 0) {
    toast.error("Password Lama Salah!");
  } else {
    toast.success("Berhasil Mengubah Password!");
  }
  console.log(resp);
  BlockRef.value.statusNormal();
}

onMounted(async () => {
  BlockRef.value.statusLoading();
  const { data: dataUser } = await UserDetail(authStore.auth.id);
  state.user = dataUser;
  BlockRef.value.statusNormal();
});

</script>

<template>
  <BasePageHeading title="Profile">
    <div class="d-flex align-items-center justify-content-start">
      <img class="img-avatar img-avatar-thumb" :src="authStore.auth.photo" alt="Avatar" />
      <div class="d-flex ps-3 flex-column align-items-start justify-content-center">
        <h3 class="mb-0">{{ authStore.auth.name }}</h3>
        <p class="mb-0">{{ authStore.auth.role_name }}</p>
      </div>
    </div>
  </BasePageHeading>
  <div class="content">
    <BaseBlock ref="BlockRef" class="row g-0">
      <template #content>
        <ul class="nav nav-tabs nav-tabs-block" role="tablist">
          <li class="nav-item">
            <button class="nav-link active" id="btabs-static-home-tab" data-bs-toggle="tab"
              data-bs-target="#btabs-static-home" role="tab" aria-controls="btabs-static-home" aria-selected="true">
              Data Diri
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="btabs-static-profile-tab" data-bs-toggle="tab"
              data-bs-target="#btabs-static-profile" role="tab" aria-controls="btabs-static-profile"
              aria-selected="false">
              Ubah password
            </button>
          </li>
        </ul>
        <div class="block-content tab-content">
          <div class="tab-pane active" id="btabs-static-home" role="tabpanel" aria-labelledby="btabs-static-home-tab"
            tabindex="0">
            <div class="mb-4">
              <FormLabel required>Nama</FormLabel>
              <input readonly type="text" id="val-name" class="form-control" v-model="state.user.name" />
            </div>
            <div class="mb-4">
              <FormLabel required>Username</FormLabel>
              <input readonly type="text" id="val-username" class="form-control" v-model="state.user.username" />
            </div>
            <div class="mb-4">
              <FormLabel required>Hak Akses</FormLabel>
              <input readonly type="text" id="val-username" class="form-control" v-model="state.user.role_name" />
            </div>
            <div class="mb-4">
              <FormLabel required>Client</FormLabel>
              <input readonly type="text" id="val-username" class="form-control" v-model="state.user.client_name" />
            </div>
            <div class="mb-4">
              <FormLabel required>No. HP</FormLabel>
              <input readonly type="text" id="val-phone_number" class="form-control"
                v-model="state.user.phone_number" />
            </div>
            <div class="mb-4">
              <FormLabel required>Email</FormLabel>
              <input readonly type="text" id="val-email" class="form-control" v-model="state.user.email" />
            </div>
          </div>
          <div class="tab-pane" id="btabs-static-profile" role="tabpanel" aria-labelledby="btabs-static-profile-tab"
            tabindex="0">
            <form @submit.prevent="handleChangePasswordSubmit">
              <div class="mb-4">
                <FormLabel required>Password Lama</FormLabel>
                <input type="password" id="val-password-old" class="form-control"
                  :class="{ 'is-invalid': v$.old_password.$errors.length }" v-model="changePasswordForm.old_password"
                  @blur="v$.old_password.$touch" />
              </div>
              <div class="mb-4">
                <FormLabel required>Password</FormLabel>
                <input type="password" id="val-password-new" class="form-control"
                  :class="{ 'is-invalid': v$.password.$errors.length }" v-model="changePasswordForm.password"
                  @blur="v$.password.$touch" />
              </div>
              <div class="mb-4">
                <FormLabel required>Konfirmasi Password</FormLabel>
                <input type="password" id="val-confirm-password" class="form-control"
                  :class="{ 'is-invalid': v$.confirm_password.$errors.length }"
                  v-model="changePasswordForm.confirm_password" @blur="v$.confirm_password.$touch" />
              </div>
              <button type="submit" class="btn btn-lg btn-success text-white mb-3">
                Ubah Password
              </button>
            </form>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
