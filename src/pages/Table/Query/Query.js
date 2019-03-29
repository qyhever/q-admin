import React, { Component } from 'react'
import { connect } from 'react-redux'
import QueryForm from './QueryForm'
import QueryTable from './QueryTable'
import QueryModal from './QueryModal'

@connect(({ tableQuery, loading }) => ({ tableQuery, loading }))
class TableQuery extends Component {
  componentDidMount() {
    this.props.dispatch.tableQuery.query()
  }
  render() {
    const { dispatch, loading, tableQuery } = this.props
    const { list, page, size, total, rowKeys, values, detail, visible } = tableQuery
    const formProps = { dispatch, values, rowKeys }
    const tableProps = { dispatch, loading, list, page, size, total, rowKeys }
    const modalProps = { dispatch, loading, detail, visible }
    return (
      <div className="con-container">
        <QueryForm {...formProps} />
        <QueryTable {...tableProps} />
        <QueryModal {...modalProps} />
      </div>
    )
  }
}

export default TableQuery
