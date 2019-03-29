import React from 'react'
import { Icon, Dropdown, Menu, Spin } from 'antd'
import styles from './Header.less'
import avatarUrl from '@/assets/images/user.png'

function HeaderBar({ dispatch, loading, collapsed, handleToggle, user }) {

  function handleMenuClick({ key }) {
    if (key === 'logout') {
      dispatch.login.logout({})
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">
        <a>退出登录</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.header}>
      <div className={styles.toggleMenu} onClick={handleToggle}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
      <div className={styles.headerRight}>

        <Dropdown overlay={menu} placement="bottomRight">
          <Spin spinning={loading.effects.app.queryCurrentUser} size="small">
            <div className={styles.user}>
              <span className="mr12">{user.userName || '用户名'}</span>
              <img className={styles.avatar} src={user.avatar || avatarUrl} alt="avatar"/>
            </div>
          </Spin>
        </Dropdown>
      </div>
    </div>
  )
}

export default HeaderBar