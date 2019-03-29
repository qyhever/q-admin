const TOKEN = 'react-admin-token'

export function getToken() {
  return sessionStorage.getItem(TOKEN)
}

export function setToken(value) {
  sessionStorage.setItem(TOKEN, value)
}

export function clearLocal() {
  sessionStorage.removeItem(TOKEN)
}