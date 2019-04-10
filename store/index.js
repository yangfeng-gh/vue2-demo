import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import logistics from './modules/logistics'
import createPersistedState from '@/libs/vuex-persist'
import { APPNAME } from '@/libs/consts'

Vue.use(Vuex)

const state = {
  cities: [],
  activeUser: {},
  avatarPath: require('../assets/avatar.jpg'),
  noDataText: '请选择查询条件后点击搜索'
}

const getters = {}

const mutations = {
  reset(state) {
    state.cities = []
    state.activeUser = {}
    state.avatarPath = require('../assets/avatar.jpg')
  },
  setCities(state, payload) {
    state.cities = payload
  },
  setActiveUser(state, payload) {
    state.activeUser = payload
  },
  setAvatar(state, payload) {
    state.avatarPath = payload
  },
  setNoDataText(state, payload) {
    state.noDataText = payload > 0 ? '请选择查询条件后点击搜索' : '查无数据'
  }
}

const actions = {
  reset({ commit }) {
    commit('app/resetApp')
    commit('reset')
  }
}

const paths = ['app', 'cities', 'activeUser', 'avatarPath']

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    app,
    logistics
  },
  plugins: [createPersistedState({key: APPNAME, paths})]
})
