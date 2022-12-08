<script setup>
import { reactive, computed } from "vue";
import { useTemplateStore } from "@/stores/template";
import { useAuthStore } from "@/stores/auth";

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// Main store and Router
const store = useTemplateStore();
const authStore = useAuthStore();

// Input state variables
const state = reactive({
  username: null,
  password: null,
  isLoading: false,
});

// Validation rules
const rules = computed(() => {
  return {
    username: { required },
    password: { required },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  state.isLoading = true;
  try {
    await authStore.login(state);
  } catch (error) {
    console.log(error);
  }
  state.isLoading = false;
}
</script>

<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Log In Block -->
          <BaseBlock title="Log In" class="mb-0">
            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">NRA</h1>
              <p class="fw-medium text-muted">Welcome, please login.</p>

              <!-- Log In Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      id="login-username"
                      name="login-username"
                      placeholder="Username"
                      :class="{
                        'is-invalid': v$.username.$errors.length,
                      }"
                      v-model="state.username"
                      @blur="v$.username.$touch"
                    />
                    <div
                      v-if="v$.username.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your username
                    </div>
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-alt form-control-lg"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      :class="{
                        'is-invalid': v$.password.$errors.length,
                      }"
                      v-model="state.password"
                      @blur="v$.password.$touch"
                    />
                    <div
                      v-if="v$.password.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your password
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-5">
                    <button type="submit" class="btn w-100 btn-alt-primary" :disabled="state.isLoading">
                      <template v-if="state.isLoading">Loading...</template>
                      <template v-else>
                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                        Log In
                      </template>
                    </button>
                  </div>
                </div>
              </form>
              <!-- END Log In Form -->
            </div>
          </BaseBlock>
          <!-- END Log In Block -->
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        <strong>{{ store.app.name + " " + store.app.version }}</strong> &copy;
        {{ store.app.copyright }}
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
