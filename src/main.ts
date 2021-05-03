import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  store.commit('loading', true);
  return config;
}, (err) => {
  store.commit('loading', false);
  return Promise.reject(err);
})

axios.interceptors.response.use((response: AxiosResponse) => {
  store.commit('loading', false);
  return response;
}, (err) => {
  store.commit('loading', false);
  return Promise.reject(err);
})

if (store.getters.StateUser) {
  // eslint-disable-next-line
  axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.StateUser.token}`
}
axios.defaults.baseURL = 'http://localhost:4000/';

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error) {
    if (error.response?.status === 401) {
      store.dispatch('logout')
      return router.push('/login')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
