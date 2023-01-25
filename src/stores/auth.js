import { defineStore } from "pinia";
import { setLogged, removeToken, setJwtToken, removeJwtToken } from '@/utils/auth';
import { useToast } from 'vue-toastification'
import { logout, login, info } from "@/api/auth";
// Main Pinia Store


const toast = useToast()
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    auth: null,
    cancelTokens: [],
  }),
  actions: {
    // Sets the layout, useful for setting different layouts (under layouts/variations/)
    addCancelToken(token) {
      this.cancelTokens.push(token)
    },
    clearCancelTokens() {
      this.cancelTokens = [];
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            resolve()
          })
          .catch(error => {
            console.log(error);
            reject();
          })
          .finally(() => {
            this.auth = null;
            removeJwtToken();
            removeToken();
          })
      });
      
    },
    login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            // interupt catch on fail user
            if (response.status === false) {
              removeJwtToken();
              return;
            }
            setLogged('1'); // set cookies
            const jwtToken = response.data.access_token;
            this.auth = response.data;
            setJwtToken(jwtToken);
            toast.success("Berhasil login!");
            window.location.href = '/#/admin/dashboard';
            resolve();
          })
          .catch(error => {
            let message = error.message;
            if (error.response.data && error.response.data.errors) {
              message = error.response.data.errors;
              toast.error(message)
            } else {
              message = error.response.data.error;
              toast.error(message)
            }
            removeJwtToken();
            reject();
          });
      });
    },
    info() {
      return new Promise((resolve, reject) => {
        info()
          .then(response => {
            const { data } = response;
            if (!data) {
              this.auth = null;
              removeJwtToken();
              removeToken();
              reject('Verification failed, please Login again.');
            } else {
              this.auth = data;
              resolve(response);
            }
          })
          .catch(error => {
            this.auth = null;
            removeJwtToken();
            removeToken();
            reject(error);
          });
      });
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        this.auth = null;
        commit('SET_TOKEN', '');
        commit('SET_JWT_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        removeJwtToken();
        resolve();
      });
    },
  },
});
