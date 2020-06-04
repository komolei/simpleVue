import * as Types from './types'
const state = {
  isLogIn: false
}

const actions = {
  changeIsLogInStatus: ({ commit }: any, status: any) => {
    commit(Types.CHANGELOGINSTATUES, status)
  }
}

const getters = {
  getLogInStatus: (state: { isLogIn: any }) => state.isLogIn
}

const mutations = {
  [Types.CHANGELOGINSTATUES] (state: { isLogIn: any; }, status: any) {
    state.isLogIn = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
