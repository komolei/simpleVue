import Vue from 'vue'
import Vuex from 'vuex'
import status from './modules/status'

// import state from './state'
Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  modules: {
    status
  }
})
