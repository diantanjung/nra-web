<script setup>
import { useAuthStore } from "@/stores/auth";
import { useTemplateStore } from "@/stores/template";
import { computed, reactive } from "vue";
import { useToast } from 'vue-toastification'

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// Main store and Router
const store = useTemplateStore();
const authStore = useAuthStore();
const toast = useToast();


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
    toast.error("Password atau Username salah!");
  }
  state.isLoading = false;
}
</script>

<template>
  <!-- Page Content -->
  <BaseBackground image="/assets/media/photos/photo13@2x.jpg">
    <div class="row g-0 bg-primary-dark-op">
      <!-- Meta Info Section -->
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <img
              src="/assets/media/logo/nra-logo-white.png"
              alt=""
              height="60"
              class="mb-3"
            />
            <p class="text-white-75 me-xl-4 mt-2">
              "Established in 2007 specialized/engaged in the outsourcing
              service agency, 14 years company spread over 10 controlling areas"
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        >
          <p class="fw-medium text-white-50 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
        </div>
      </div>
      <!-- END Meta Info Section -->

      <!-- Main Section -->
      <div
        class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"
      >
        <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <!-- Header -->
            <div class="text-center mb-3">
              <img
                src="/assets/media/logo/nra-logo-color.png"
                alt=""
                height="50"
                class="mb-3"
              />
              <h2 class="fw-bold">Log In</h2>
            </div>
            <!-- END Header -->

            <!-- Sign In Form -->
            <div class="row g-0 justify-content-center">
              <div class="col-sm-8 col-xl-4">
                <form @submit.prevent="onSubmit">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-lg form-control-alt py-3"
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
                      class="form-control form-control-lg form-control-alt py-3"
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
                  <div
                    class="d-flex justify-content-center align-items-center mb-4"
                  >
                    <div class="w-100">
                      <button
                        type="submit"
                        class="btn btn-lg btn-success text-white w-100"
                      >
                        <template v-if="state.isLoading">Loading...</template>
                        <template v-else>
                          <i
                            class="fa fa-fw fa-sign-in-alt me-1 opacity-50"
                          ></i>
                          Log In
                        </template>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- END Sign In Form -->
          </div>
        </div>
        <div
          class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"
        >
          <p class="fw-medium text-black-50 py-2 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
        </div>
      </div>
      <!-- END Main Section -->
    </div>
  </BaseBackground>
  <!-- END Page Content -->
</template>
