import axios from 'axios';
// import { Message } from 'element-ui';
import { getJwtToken, setJwtToken } from '@/utils/auth';
import { useAuthStore } from "@/stores/auth";
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request intercepter
service.interceptors.request.use(
  (config) => {
    const store = useAuthStore();
    const source = axios.CancelToken.source();
    const jwtToken = getJwtToken();
    if (jwtToken) {
      config.headers['Authorization'] = 'Bearer ' + jwtToken;
    }

    config.cancelToken = source.token;
    store.addCancelToken(source);
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
    const store = useAuthStore();
    if (error.response && error.response.status === 401) {
      store.logout();
    }
    return Promise.reject(error);
  }
);

export default service;
