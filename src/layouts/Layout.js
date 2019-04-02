import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, BackTop } from 'antd'
import NProgress from 'nprogress'
import styles from './Layout.less'
import Sidebar from './Sidebar'
import Headerbar from './Header'
import BreadCrumb from './Bread'
import '@/assets/less/nprogress.less'
// import { queryGeolocation } from '@/utils/utils'
NProgress.configure({ showSpinner: false })

@connect(({ app, loading }) => ({ app, loading }))
class Container extends Component {
  state = {
    collapsed: false
  }

  componentDidMount() {
    if (!this.props.app.menus.length) {
      this.props.dispatch.app.queryCurrentUser()
    }
    this.props.dispatch.app.queryTotalRoles()
    // ;(async () => {
    //   const geo = await queryGeolocation()
    //   console.log(geo)
    // })()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('layout nextProps.location', nextProps.location)
    console.log('layout currentProps.location', this.props.location)
    if (nextProps.location.pathname !== this.props.location.pathname) {
      NProgress.start()
    }
  }

  componentDidUpdate() {
    NProgress.done()
  }

  componentWillUnmount() {
    NProgress.done()
  }

  handleToggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { handleToggle } = this
    const { collapsed } = this.state
    const { dispatch, loading } = this.props
    const { user } = this.props.app
    const headerProps = { dispatch, loading, collapsed, handleToggle, user }
    return (
      <Layout className={styles.layout}>
        <Sidebar collapsed={collapsed} {...this.props} />
        <Layout className={styles.main} id="main">
          <Headerbar {...headerProps} />
          <BreadCrumb />
          <div className={styles.content}>
            {this.props.children}
          </div>
          <BackTop target={() => document.getElementById('main')} />
        </Layout>
      </Layout>
    )
  }
}

export default Container
