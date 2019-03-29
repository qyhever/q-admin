import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import store from './store'
import RouterConfig from './router'
import { LocaleProvider } from 'antd'
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const history = createHashHistory()
export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <RouterConfig />
          </ConnectedRouter>
        </Provider>
      </LocaleProvider>
    )
  }
}
