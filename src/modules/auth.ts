/* eslint-disable */
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Commit } from 'vuex'

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
    print_date: Date;
}

const state: {user: User | null; providers: LogProvider[] | null; logLevels: LogLevels[] | null; logs: LogEntity[] | null} = {
  user: null,
  providers: null,
  logLevels: null,
  logs: null
};
const getters = {
  isAuthenticated: (state: any) => !!state.user,
  StateUser: (state: any) => state.user,
  StateProviders: (state: any) => state.providers,
  StateLogLevels: (state: any) => state.logLevels,
  StateLogs: (state: any) => state.logs
};
const actions = {
  async login({ commit }: { commit: Commit }, loginForm: { username: string; password: string }) {
    const reqParams = { str_username: loginForm.username, str_password: loginForm.password };
    const loginResponse = await axios.post('api/login', reqParams);

    await commit('setUser', loginResponse.status === 200 ? loginResponse.data : null);
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
  setUser(state: any, token: string) {
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
  },
  logout(state: any) {
    Object.keys(state).forEach(prop => state[prop] = null);
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
