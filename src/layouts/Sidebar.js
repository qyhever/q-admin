import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import styles from './Sidebar.less'
import logoUrl from '@/assets/images/logo.png'
import IconFont from '@/components/IconFont'
const { Sider } = Layout
const { Item, SubMenu } = Menu

const generateMenus = (menus) => {
  return menus.map(item => {
    if (Array.isArray(item.children)) {
      const title = (
        <span>
         {item.icon.indexOf('icon-') === 0 ? <IconFont type={item.icon} /> : <Icon type={item.icon} />}
          <span>{item.title}</span>
        </span>
      )
      return !item.hideChildrenInMenu && (
        <SubMenu key={item.path} title={title}>
          {generateMenus(item.children)}
        </SubMenu>
      )
    }
    return !item.hideInMenu && (
      <Item key={item.path}>
        <Link to={item.path}>
          {item.icon && (item.icon.indexOf('icon-') === 0 ? <IconFont type={item.icon} /> : <Icon type={item.icon} />)}
          <span>{item.title}</span>
        </Link>
      </Item>
    )
  })
}

export default class Sidebar extends Component {
  render() {
    const { collapsed } = this.props
    const { menus } = this.props.app
    let pathname = this.props.location.pathname
    pathname = pathname === '/' ? '/dashboard' : pathname
    const openKey = pathname.slice(0, pathname.slice(1).indexOf('/') + 1 )
    return (
      <Sider className={styles.sidebar} collapsed={collapsed} theme="light">
        <div className={styles.logo}>
          <img alt="logo" src={logoUrl} className={styles.logoImg} />
          {!collapsed && <span>管理后台</span>}
        </div>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
        {generateMenus(menus)}
        </Menu>
      </Sider>
    )
  }
}