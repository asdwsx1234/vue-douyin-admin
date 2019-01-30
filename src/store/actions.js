import * as types from './mutation-types'
// import axios from 'axios'
// import { baseURL } from 'common/js/config'

// const instance = axios.create({
//   baseURL: baseURL,
//   withCredentials: true
// })

export const loginByPassword = async ({ dispatch, commit, state }, admin) => {
  // let res = await instance.post('/api/admin/loginByPassword', admin)
  // if (res.data.code === 200) {
  //   let userId = res.data.data.userId
  //   commit(types.SET_ISLOGGED, true)
  //   let res1 = await instance.get(`/api/user/${userId}/getUserInfo/undefined`)
  //   if (res1.data.code === 200) {
  //     let loginInfo = res1.data.data
  //     commit(types.SET_LOGININFO, loginInfo)
  //   }
  // }
  if (admin.username === '814930498@qq.com' && admin.password === 'asdwsx1234') {
    commit(types.SET_ISLOGGED, true)
    commit(types.SET_LOGININFO, {
      'jurisdiction': 'all'
    })
  } else {
    throw new Error('login fail')
  }
}

export const logout = async ({ commit }, admin) => {
  commit(types.SET_ISLOGGED, false)
  commit(types.SET_LOGININFO, {})
}
