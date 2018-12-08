import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import songs from './modules/songs'
import mutations from './mutations'
import actions from './actions'

const state = {}
const getters = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    songs
  }
  plugins: process.env.NODE_ENV !== 'production' ?
  [createLogger()]
  : []
})