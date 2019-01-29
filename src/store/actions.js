import * as types from './mutation-types'
import axios from 'axios'
import { baseURL } from 'common/js/config'

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true
})

instance.get('', types)
