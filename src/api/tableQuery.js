import axios from '@/utils/axios'

export function getList(params) {
  return axios.get('/person', { params })
}

export function create(params) {
  return axios.post('/person', params)
}

export function update(params) {
  return axios.put('/person', params)
}

export function remove(_ids) {
  return axios.post('/person/delete', {_ids})
}

export function queryOne(id) {
  const url = `/person/${id}`
  return axios.get(url)
}