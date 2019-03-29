import React from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import styles from './Layout.less'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import totalMenus from '@/config/menus'
/**
 * examples
 */
// const routes = [
//   { path: '/', breadcrumb: '首页' },
//   { path: '/dashboard', breadcrumb: '控制台' },
//   { path: '/form', breadcrumb: '表单' },
//   { path: '/form/basic', breadcrumb: '表单' }
// ]

// 需要放入有 item.children 的菜单
const flattenMenus = menus => {
  let result = []
  menus.forEach(item => {
    result.push(item)
    if (Array.isArray(item.children)) {
      result  = result.concat(flattenMenus(item.children))
    }
  })
  return result
}

const routes = [...flattenMenus(totalMenus), { path: '/', breadcrumb: '首页' }]

const Bread = (({ breadcrumbs }) => {
  return (
    <Breadcrumb className={styles.bread}>
      {breadcrumbs.map(breadcrumb => (
        <Breadcrumb.Item key={breadcrumb.key}>
          {breadcrumb.match.url === '/' ?
            <NavLink to={breadcrumb.match.url}>
              {breadcrumb.breadcrumb.props.children}
            </NavLink> :
            <span>{breadcrumb.breadcrumb.props.children}</span>
          }
          
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
})

export default withBreadcrumbs(routes)(Bread)
