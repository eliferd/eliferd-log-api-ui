import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logs from '../views/Logs.vue';
import state from '../store/index';

Vue.use(VueRouter);

const baseTitle = 'Eliferd\'s Log API - ';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => !state.getters.isAuthenticated ? next('/login') : next(),
    meta: {
      title: baseTitle + 'Accueil'
    }
  },
  {
    path: '/app/:appId',
    name: 'Logs',
    component: Logs,
    beforeEnter: (to, from, next) => !state.getters.isAuthenticated ? next('/login') : next(),
    meta: {
      title: baseTitle + 'Consulter les logs'
    }
  },
  {
    path: '/login',
    name: 'Connexion',
    component: Login,
    beforeEnter: (to, from, next) => state.getters.isAuthenticated ? next('/') : next(),
    meta: {
      title: baseTitle + 'Connexion'
    }
  }
];

const router = new VueRouter({ routes });

export default router;
