import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import wxAuth from '@/service/wx-auth'
import apiUrls from '@/service/api-urls'
import { localStore } from '@/utils'
import { Loading, Toast } from '@/components'
let loadingInstance
let timerId = {}
const TIMEOUT = 5000 // 接口5秒超时

axios.defaults.timeout = TIMEOUT
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.transformRequest = [
  data => {
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }
]

// 添加请求拦截
axios.interceptors.request.use(
  function(config) {
    // 请求之前处理
    // 添加Loading
    if (!config.hideLoading) {
      if (loadingInstance) {
        loadingInstance.close()
      }
      loadingInstance = Loading({
        message: '拼命加载中...'
      })
    }
    // 设置接口超时的错误提示。
    timerId[config.url] = setTimeout(() => {
      if (loadingInstance) {
        loadingInstance.close()
      }
      Toast('链接超时！')
      clearTimeout(timerId[config.url])
    }, TIMEOUT)

    return config
  },
  function(error) {
    // 请求发生错误处理
    return Promise.reject(error)
  }
)
// 添加响应拦截
axios.interceptors.response.use(
  response => {
    // 请求正确响应时处理
    clearTimeout(timerId[response.config.url])
    if (loadingInstance) {
      loadingInstance.close()
    }

    if (response.status === 200) {
      // modify response
      const code = response.data.code
      const msg = response.data.msg || '请求异常，请稍后再试！'
      if (code !== '200') {
        Toast(msg)
      }
    } else {
      let msg = response.statusText || '请求异常，请稍后再试！'
      Toast(msg)
    }
    return response
  },
  function(error) {
    // 响应发生错误处理
    if (timerId && error && error.config) {
      clearTimeout(timerId[error.config.url])
    }
    if (loadingInstance) {
      loadingInstance.close()
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = error.response.data.msg
          break
      }
    } else {
      error.message = '请求错误'
    }

    Toast(error.message)
    return Promise.reject(error)
  }
)

let createAxios = url => {
  return {
    /*
     * axios get 请求
     * @param {Object} data - 需要的传参，选传，默认值为空对象
     * @param {Object} config - 其他配置项，选传，默认值为空对象
     * */
    get(data = {}, config = {}) {
      let authParams = localStore.get('authParams') || {}
      data.token = authParams.token
      return axios.get(url, data, Object.assign({}, config))
    },
    /*
     * axios post 请求
     * @param {Object} data - 需要的传参，选传，默认值为空对象
     * @param {Object} config - 其他配置项，选传，默认值为空对象
     * */
    post(data = {}, config = {}) {
      let authParams = localStore.get('authParams') || {}
      data.token = authParams.token
      return axios.post(url, data, Object.assign({}, config))
    }
  }
}

const api = key => {
  return createAxios(apiUrls[key])
}

export default api

Vue.prototype.$api = api
