import axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import router from '@/router'
import store from '@/store'
import {APPNAME} from '@/lib/consts'
import Cookies from 'js-cookie'

axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.paramsSerializer = function (params) {
  return Qs.stringify(params, {
    arrayFormat: 'repeat'
  })
}

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (!response.data) {
      return []
    }
    return response.data
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 504) {
        iView.Modal.error({
          title: '错误',
          content: '当前网络不可用，请检查后重试'
        })
      } else if (error.response.status === 401) {
        iView.Modal.error({
          title: '错误',
          content: `${error.response.data.errno}: ${error.response.data.errmsg}`
        })
        Cookies.remove(APPNAME)
        Cookies.remove('locking')
        store.dispatch('reset')
        localStorage.removeItem(APPNAME)
        router.push('/login')
      } else {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export function transformParams(params) {
  let _params = {}
  for (let [key, value] of Object.entries(params)) {
    if (value || value === 0 || value === false) {
      _params[key] = value
    }
  }
  return _params
}

export function postTransformData(params) {
  let _params = {}
  for (let [key, value] of Object.entries(params)) {
    if (value || value === 0 || value === false) {
      _params[key] = value
    }
  }
  return _params
}

export default axios
