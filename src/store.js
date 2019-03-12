import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
//import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    applicants: Array(),
    links: Array(),
    valueRes: {
      stage: 0,
      answers: [],
    },
    valueRules: Object(),
    values: Object(),
  },
  mutations: {
    set_user: (state, user) => state.user = user,
    set_applicants: (state, applicants) => state.applicants = applicants,
    set_links: (state, links) => state.links = links,
    set_valueRes: (state, results) => state.valueRes = results,
    set_values: (state, res) => state.values = res,
    set_valueRules: (state, rules) => state.valueRules = rules,
  },
  actions: {

  },/*
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { 
        expires: 3, 
        //secure: true 
      }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  */
})
