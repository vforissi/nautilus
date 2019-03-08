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
  },
  mutations: {
    set_user: (state, user) => state.user = user,
    add_applicant: (state, applicant) => state.applicants.push(applicant),
    add_link: (state, id) => state.links.push(id)
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
