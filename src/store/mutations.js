import * as types from './mutation-types'
const mutations = {
  [types.SET_ISLOGGED] (state, isLogged) {
    state.isLogged = isLogged
  },
  [types.SET_LOGININFO] (state, loginInfo) {
    state.loginInfo = loginInfo
  }
}

export default mutations
