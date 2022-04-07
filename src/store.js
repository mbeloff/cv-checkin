import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  // plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    token: '',
    tokenExp: '',
    resref: '',
  },
  mutations: {
    resref(state, payload) {
      state.pbresref = payload
    },
    token(state, payload) {
      state.token = payload
    },
    tokenExp(state, payload) {
      state.tokenExp = payload
    },
  },
  actions: {
    resref(context, payload) {
      context.commit('pbresref', payload)
    },
    token(context, payload) {
      context.commit('token', payload)
    },
    tokenExp(context, payload) {
      context.commit('tokenExp', payload)
    },
  },
})
