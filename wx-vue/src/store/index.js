import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
Vue.use(Vuex)

const state = {
  baseUrl: 'localhost',
  apiBaseUrl: 'http://47.107.224.189',
  token: ls.getItem('token'),
  appid: null,
  nemuView: true,
  isBackActive: false,
  backNumber: 0,
  isNextActive: false,
  nextNumber: 0,
  isWxInitOk: false
}

const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    ls.setItem('token', token)
    console.log(token)
  },
  UPDATE_APPID(state, appid) {
    state.appid = appid
  },
  UPDATE_NEMU_VIEW(state, nemuView) {
    state.nemuView = nemuView
  },
  UPDATE_IS_BACK_ACTIVE(state, isBackActive) {
    state.isBackActive = isBackActive
  },
  UPDATE_BACK_NUMBER(state, number) {
    state.backNumber += number
  },
  UPDATE_IS_NEXT_ACTIVE(state, isNextActive) {
    state.isNextActive = isNextActive
  },
  UPDATE_NEXT_NUMBER(state, number) {
    state.nextNumber += number
  },
  UPDATE_IS_INIT_OK(state, status) {
    state.isWxInitOk = status
  }
}

const actions = {
  updateBackNumber: ({ commit, state }, { number }) => {
    commit('UPDATE_BACK_NUMBER', number)
    if (state.backNumber > 1) {
      commit('UPDATE_IS_BACK_ACTIVE', true)
    } else {
      commit('UPDATE_IS_BACK_ACTIVE', false)
    }
  },
  updateNextNumber({ commit, state }, { number }) {
    commit('UPDATE_NEXT_NUMBER', number)
    if (state.nextNumber > 0) {
      commit('UPDATE_IS_NEXT_ACTIVE', true)
    } else {
      commit('UPDATE_IS_NEXT_ACTIVE', false)
    }
  }
}
const getters = {
  getLiveUrl: (state) => {
    return `${state.baseUrl}/index.html`
  },
  getToken: state => state.token,
  apiBaseUrl: state => state.apiBaseUrl
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store

