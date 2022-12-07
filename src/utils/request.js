import axios from 'axios';

import '@/bootstrap';
import store from '@/store';
import { Message } from 'element-ui';
// import { Message } from 'element-ui';
import { getJwtToken, setJwtToken } from '@/utils/auth';

// Create axios instance
const service = window.axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 60000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  (config) => {
    const source = axios.CancelToken.source();
    const jwtToken = getJwtToken();
    if (jwtToken) {
      config.headers['Authorization'] = 'Bearer ' + jwtToken;
    }

    config.cancelToken = source.token;

    store.commit('app/ADD_CANCEL_TOKEN', source);

    return config;
  },

  (error) => Promise.reject(error)
);

// response pre-processing
service.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      setJwtToken(response.headers.authorization);
      response.data.token = response.headers.authorization;
    }
    return response.data;
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      store
        .dispatch('user/logout')
        .finally(() => {
          Message.error({
            message: 'セッション終了、再度ログインしてください',
          });
          window.location.href = '/#/login';
        });
    }
    return Promise.reject(error);
  }
);

export default service;
