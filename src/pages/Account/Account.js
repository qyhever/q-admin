import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountForm from './AccountForm'
import AccountTable from './AccountTable'
import AccountModal from './AccountModal'

@connect(({ app, account, loading }) => ({ app, account, loading }))
class Account extends Component {
  componentDidMount() {
    this.props.dispatch.account.query()
  }
  render() {
    const { dispatch, loading, app, account } = this.props
    const { totalRoles } = app
    const { list, page, size, total, rowKeys, values, detail, visible } = account
    const formProps = { dispatch, values, rowKeys }
    const tableProps = { dispatch, loading, list, page, size, total, rowKeys }
    const modalProps = { dispatch, loading, detail, visible, totalRoles }
    return (
      <div className="con-container">
        <AccountForm {...formProps} />
        <AccountTable {...tableProps} />
        <AccountModal {...modalProps} />
      </div>
    )
  }
}

export default Account
