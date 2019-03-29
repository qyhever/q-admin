import axios from '@/utils/axios'

export function getListReq(params) {
  const url = 'https://api.qyhever.com/disc'
  return axios.get(url, params)
}

export function getQiniuToken() {
  return axios.get('/upload/qiniuToken')
}

export function queryCurrentUser() {
  return axios.get('/queryCurrentUser')
}

export function queryTotalRoles() {
  return axios.get('/totalRoles')
}