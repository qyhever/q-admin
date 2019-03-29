import axios from '@/utils/axios'

export async function getList(params) {
  return axios.get('/user', { params })
}

export async function queryOne(_id) {
  const url = `/user/${_id}`
  return axios.get(url)
}

export async function create(params) {
  return axios.post('/user', params)
}

export async function remove(params) {
  return axios.post('/user/delete', params)
}

export async function switchEnabled(params) {
  return axios.patch('/user', params)
}