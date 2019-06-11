const TOKEN = 'react-admin-token'

export function getToken() {
  return window.localStorage.getItem(TOKEN)
}

export function setToken(value) {
  window.localStorage.setItem(TOKEN, value)
}

export function clearLocal() {
  window.localStorage.removeItem(TOKEN)
}