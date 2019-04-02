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

export async function update(params) {
  return axios.put('/user', params)
}

export async function remove(_ids) {
  return axios.post('/user/delete', {_ids})
}

export async function switchEnabled(params) {
  return axios.patch('/user', params)
}