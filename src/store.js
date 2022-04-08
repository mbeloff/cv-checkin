import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  // plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    token: '',
    tokenExp: '',
    resref: '',
    bookinginfo: {},
    countries: [],
  },
  mutations: {
    resref(state, payload) {
      state.resref = payload
    },
    token(state, payload) {
      state.token = payload
    },
    tokenExp(state, payload) {
      state.tokenExp = payload
    },
    bookinginfo(state, payload) {
      state.bookinginfo = payload
    },
    countries(state, payload) {
      state.countries = payload
    },
  },
  actions: {
    resref(context, payload) {
      context.commit('resref', payload)
    },
    token(context, payload) {
      context.commit('token', payload)
    },
    tokenExp(context, payload) {
      context.commit('tokenExp', payload)
    },
    bookinginfo(context, payload) {
      context.commit('bookinginfo', payload)
    },
    countries(context, payload) {
      context.commit('countries', payload)
    },
  },
})
