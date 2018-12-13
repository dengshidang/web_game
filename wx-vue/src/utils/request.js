import axios from 'axios'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: store.getters.apiBaseUrl, // api 的 base_url
  timeout: 5000, // 请求超时时间
  method: 'post',
  data: ''
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.getToken
    if (token) {
      config.headers['wx_access_token'] = token.key.wx_access_token
    }

    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if (error.response.code === 'E00101') {
        // TODO: 这里写清除token的代码
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }
    }
    return Promise.reject(error.response.data)
  })
export default service
