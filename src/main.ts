import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

moment.locale('fr');

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  store.commit('loading', true);
  if (config.method?.toLowerCase() === 'get') {
    // eslint-disable-next-line
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('userToken')
  }
  return config;
}, (err) => {
  store.commit('loading', false);
  return Promise.reject(err);
})

axios.interceptors.response.use((response: AxiosResponse) => {
  store.commit('loading', false);
  return response;
}, (err: AxiosError) => {
  store.commit('loading', false);
  return Promise.reject(err);
})
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

Vue.filter('parseDate', (value: number | Date | null) => {
  if (!value) return '';
  return moment(value).format('DD/MM/YYYY - HH[h]mm[:]ss');
});

Vue.filter('capitalize', function (value: string | null) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
