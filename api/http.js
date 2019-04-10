import axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import { APPNAME } from '@/libs/consts'
import Cookies from 'js-cookie'
import { dateFormat } from '@/libs/util'

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
    console.log(`未能发起请求，错误原因：${error}`)
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
      if (error.response.status >= 500) {
        iView.Modal.error({
          title: '错误',
          content: '服务不可用，请与管理员联系'
        })
      } else if (error.response.status === 401) {
        Cookies.remove(APPNAME)
        Cookies.remove('locking')
        localStorage.removeItem(APPNAME)
        iView.Modal.error({
          title: error.response.data.errno,
          content: error.response.data.errmsg
        })
      } else {
        if (error.response.data.errno) {
          iView.Modal.error({
            title: error.response.data.errno,
            content: error.response.data.errmsg
          })
        } else {
          console.log(error.response.data)
        }
      }
      return Promise.reject(error.response)
    } else if (error.request) {
      console.log(error.request)
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export function transformParams(params) {
  let _params = Object.create(null)
  for (let [key, value] of Object.entries(params)) {
    if (value === '' || value === undefined || value === null || key.startsWith('_')) {
      continue
    }
    if (value instanceof Date) {
      _params[key] = dateFormat(value, 'yyyy-MM-dd HH:mm')
    } else {
      _params[key] = value
    }
  }
  return _params
}

export default axios
