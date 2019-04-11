import axios from '@/utils/axios'

export function getListReq(params) {
  return axios.get('/disc', params)
}

export function getQiniuToken() {
  const url = process.env.NODE_ENV === 'development' ? '/upload/qiniuTokenTest' : '/upload/qiniuToken'
  return axios.get(url)
}

export function queryCurrentUser() {
  return axios.get('/queryCurrentUser')
}

export function queryTotalRoles() {
  return axios.get('/totalRoles')
}