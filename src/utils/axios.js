import axios from 'axios'
import { message } from 'antd'
import { push } from 'connected-react-router'
import store from '@/store'
import { clearLocal, getToken } from '@/utils/storage'

const isProduction = process.env.NODE_ENV === 'production'
const baseURL = isProduction ? 'https://api.qyhever.com' : 'http://localhost:3000'

const instance = axios.create({
  // baseURL: process.env.BASE_URL
  // baseURL: 'https://api.qyhever.com'
  baseURL
})

instance.interceptors.request.use((config) => {
  const token = getToken()
  // const { token } = window.g_app._store.getState().user
  if (token) {
    config.headers.Authorization = token
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  if (response.data.code === 1) { // 成功
    response.data.success = true
  } else {
    message.destroy()
    message.error(response.data.msg)
  }
  return response.data
}, (error) => {
  const status = error.response.status
  // const msg = error.response.data.msg

  if (status === 401 || status === 403) {
    message.destroy()
    message.error('登录超时，请重新登录')
    clearLocal()
    store.dispatch(push('/login'))
    return
  }

  if (status === 404) {
    message.destroy()
    message.error('404 Not Found')
    return
  }

  if (status === 500) {
    message.destroy()
    message.error('服务器异常')
    return
  }
  return Promise.reject(error)
})

export default instance
