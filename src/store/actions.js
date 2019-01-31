import * as types from './mutation-types'
import axios from 'axios'
import { baseURL } from 'common/js/config'

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true
})

export const loginByPassword = async ({ commit, state }, admin) => {
  let r = await instance.post('/api/common/admin/loginByPassword', {
    email: admin.username,
    password: admin.password
  })
  if (r.status === 200) {
    commit(types.SET_ISLOGGED, true)
    commit(types.SET_LOGININFO, r.data.data)
  } else {
    throw new Error('login fail')
  }
}

export const logout = async ({ commit }, admin) => {
  commit(types.SET_ISLOGGED, false)
  commit(types.SET_LOGININFO, {})
}

export const getNums = async ({ commit, state }) => {
  let r = await instance.get('/api/admin/getNums')
  if (r.status === 200) {
    commit(types.SET_STATISTIC, r.data.data)
  } else {
    throw new Error('network error')
  }
}
