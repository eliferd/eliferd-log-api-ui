/* eslint-disable */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Commit } from 'vuex';
import router from '../router/index'

export type User = {
    userId: number;
    username: string;
    roleId: number;
}
export type LogLevels = {
    id_log_level: number;
    str_name: string;
}
export type LogProvider = {
    id_log_provider: number;
    str_provider_name: string;
}
export type LogEntity = {
    id_log: number;
    id_log_provider: number;
    id_log_level: number;
    str_message: string;
    str_level: string;
    print_date: Date;
}

const state: {user: User | null, isLoading: boolean, errorMessage: string | null, providers: LogProvider[] | null, logLevels: LogLevels[] | null, logs: LogEntity[] | null} = {
  user: null,
  isLoading: false,
  errorMessage: null,
  providers: null,
  logLevels: null,
  logs: null
};
const getters = {
  isAuthenticated: (state: any) => !!state.user,
  isLoading: (state: any) => state.isLoading,
  StateUser: (state: any) => state.user,
  StateProviders: (state: any) => state.providers,
  StateLogLevels: (state: any) => state.logLevels,
  StateLogs: (state: any) => state.logs,
  StateErrorMsg: (state: any) => state.errorMessage
};
const actions = {
  async login({ commit }: { commit: Commit }, loginForm: { username: string, password: string }) {
    const loginResponse = await axios.post('api/login', { str_username: loginForm.username, str_password: loginForm.password });
    const requestErrored = loginResponse.status.toString().startsWith('4') || loginResponse.status.toString().startsWith('5') || loginResponse.data?.message;

    await commit(requestErrored ? 'setError' : 'setUser', requestErrored ? loginResponse.data.message : loginResponse.data.token);
  },
  async logout({ commit }: { commit: Commit }) {
    await commit('logout', null);
  },
  async getLevels({ commit }: { commit: Commit }) {
    const response = await axios.get('api/levels');
    await commit('setLogLevelsList', response.data);
  },
  async getProviders({ commit }: { commit: Commit }) {
    const response = await axios.get('api/providers');
    await commit('setProvidersList', response.data);
  },
  async getAppLogs({ commit }: { commit: Commit }, providerName: string) {
    const response = await axios.get('api/logs', { params: { provider: providerName } });
    await commit('setAppLogsList', response.data);
  }
};
const mutations = {
  loading(state: any, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  setUser(state: any, token: string) { 
    localStorage.setItem('userToken', token);
    const {
      id_user,
      str_username,
      id_user_role
    }: any = jwt_decode(token) || null;

    state.user = {
      userId: id_user,
      username: str_username,
      roleId: id_user_role
    };
    router.push('/');
  },
  setError(state: any, errorMessage: string) {
    state.errorMessage = errorMessage;
  },
  logout(state: any) {
    Object.keys(state).forEach(prop => state[prop] = null);
    localStorage.removeItem('userToken');
  },
  setLogLevelsList(state: any, logLevels: LogLevels[]) {
    state.logLevels = logLevels;
  },
  setProvidersList(state: any, providers: LogProvider[]) {
    state.providers = providers;
  },
  setAppLogsList(state: any, logs: LogEntity[]) {
    state.logs = logs;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
