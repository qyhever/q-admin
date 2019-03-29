import { init } from '@rematch/core'
import { createHashHistory } from 'history'
import createLoadingPlugin from '@rematch/loading'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import models from '@/models'

const history = createHashHistory()
const middleware = routerMiddleware(history)
const loading = createLoadingPlugin()

export default init({
  redux: {
    reducers: {
      router: connectRouter(history)
    },
    middlewares: [middleware]
  },
  models,
  plugins: [loading]
})