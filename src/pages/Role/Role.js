import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoleForm from './RoleForm'
import RoleTable from './RoleTable'
import RoleModal from './RoleModal'

@connect(({ app, role, loading }) => ({ app, role, loading }))
class Role extends Component {
  componentDidMount() {
    this.props.dispatch.role.query()
  }
  render() {
    const { dispatch, loading, role, app } = this.props
    const { menus } = app
    const { list, page, size, total, rowKeys, values, detail, visible } = role
    const formProps = { dispatch, values, rowKeys }
    const tableProps = { dispatch, loading, list, page, size, total, rowKeys }
    const modalProps = { dispatch, loading, detail, visible, menus }
    return (
      <div className="con-container">
        <RoleForm {...formProps} />
        <RoleTable {...tableProps} />
        <RoleModal {...modalProps} />
      </div>
    )
  }
}

export default Role
