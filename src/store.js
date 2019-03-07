import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
  },
  mutations: {
    set_user: (state, user) => state.user = user,
  },
  actions: {

  },
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
})
