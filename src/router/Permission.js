import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// 不需要放入有 item.children 的菜单，没有对应的路由
function flattenMenus(menus) {
  let ret = []
  menus.forEach(item => {
    if (Array.isArray(item.children)) {
      ret = ret.concat(flattenMenus(item.children))
    } else {
      ret.push(item)
    }
  })
  return ret
}
const whiteList = ['/exception403', '/exception404']

@connect(({ app }) => ({ app }))
class Permission extends React.Component {
  render() {
    const { location, component: Component, ...rest } = this.props
    const { menus, permissions } = this.props.app
    const path = location.pathname
    const routers = flattenMenus(menus)
    const currentRoute = routers.find(item => item.path === path) || {}
    const currentRouteName = currentRoute.name
    let hasPermission = true
    if (menus.length) {
      hasPermission = permissions.indexOf(currentRouteName) >= 0
    }
    if (whiteList.indexOf(path) >= 0) {
      hasPermission = true
    }
    return (
      <Route {...rest} render={props =>
        hasPermission ? (
          <Component {...props} />
        ): (
          <Redirect to="/exception403" />
        )}
      />
    )
  }
}

export default Permission
