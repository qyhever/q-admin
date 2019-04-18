import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, BackTop } from 'antd'
import NProgress from 'nprogress'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { scrollTo } from '@/utils/utils'
import styles from './Layout.less'
import Sidebar from './Sidebar'
import Headerbar from './Header'
import BreadCrumb from './Bread'
import 'nprogress/nprogress.css'
import { flattendMenus } from '@/config/menus'
NProgress.configure({ showSpinner: true })
function setTitle(path, flattendMenus) {
  const currentRoute = flattendMenus.find(item => item.path === path) || {}
  document.title = currentRoute.title
}

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
    this.props.dispatch.app.queryGeolocation()
    setTitle(this.props.location.pathname, flattendMenus)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('layout nextProps', nextProps)
    // console.log('layout currentProps', this.props)
    if (nextProps.location.pathname !== this.props.location.pathname) {
      setTitle(nextProps.location.pathname, flattendMenus)
      NProgress.start()
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const el = document.getElementById('main')
      scrollTo(el, el.scrollTop, 0, 0)
    }
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
    const { dispatch, loading, location } = this.props
    const { user } = this.props.app
    const headerProps = { dispatch, loading, collapsed, handleToggle, user }
    return (
      <Layout className={styles.layout}>
        <Sidebar collapsed={collapsed} {...this.props} />
        <Layout className={styles.main} id="main">
          <Headerbar {...headerProps} />
          <BreadCrumb />
          <div className={styles.content}>
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}>
                {this.props.children}
              </CSSTransition>
            </TransitionGroup>
          </div>
          <BackTop target={() => document.getElementById('main')} />
        </Layout>
      </Layout>
    )
  }
}

export default Container
