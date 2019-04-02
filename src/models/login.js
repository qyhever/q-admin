import { login } from '@/api/login'
import md5 from 'md5'
import { setToken, clearLocal } from '@/utils/storage'
import { push, replace } from 'connected-react-router'
import { stringify } from 'qs'
import { getPageQuery } from '@/utils/utils'

export default {
  state: {

  },

  reducers: {
   updateState(state, payload) {
    return {...state, ...payload}
   }
  },

  effects: (dispatch) => ({
    async login(payload) {
      const { password } = payload
      // md5 encypt
      payload.password = md5(password)
      const res = await login(payload)
      if (res.success) {
        const { token } = res.data
        setToken(token)
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        let { redirect } = params
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr((urlParams.origin + urlParams.pathname).length)
            if (redirect.startsWith('#')) {
              redirect = redirect.substr(1)
            }
          } else {
            window.location.href = redirect
            return
          }
        }
        await dispatch.app.queryCurrentUser()
        dispatch(replace(redirect || '/'))
      }
    },
    async logout() {
      clearLocal()
      dispatch(push({
        pathname: '/login',
        search: stringify({
          redirect: window.location.href
        })
      }))
    }
  })
}
