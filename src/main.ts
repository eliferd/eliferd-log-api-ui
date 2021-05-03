import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosError } from 'axios';

// eslint-disable-next-line
let userToken = localStorage.getItem('user-token');
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

if (userToken) {
  // eslint-disable-next-line
  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
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
