import axios from '@/utils/axios'

export async function getList(params) {
  return axios.get('/role', { params })
}

export async function queryOne(_id) {
  const url = `/role/${_id}`
  return axios.get(url)
}

export async function create(params) {
  return axios.post('/role', params)
}

export async function update(params) {
  return axios.put('/role', params)
}

export async function remove(_ids) {
  return axios.post('/role/delete', { _ids })
}