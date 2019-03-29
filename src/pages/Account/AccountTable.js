import React from 'react'
import { Table } from 'antd'
import { columns } from './columns'

export default ({ dispatch, loading, list, page, size, total, rowKeys }) => {
  function handleTableChange(pagination, _, sorter) {
    const { current: page, pageSize: size } = pagination
    const params = {
      page,
      size
    }
    if (sorter.field) {
      params.sortProp = sorter.field
      params.sortOrder = sorter.order === 'ascend' ? 1 : -1
    } else {
      params.sortProp = null
      params.sortOrder = null
    }
    dispatch.account.query(params)
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      dispatch.account.updateState({
        rowKeys: selectedRowKeys
      })
    },
    selectedRowKeys: rowKeys
  }

  const pagination = {
    total,
    current: page,
    pageSize: size,
    showTotal: (total) => `共${total}条`,
    showQuickJumper: true,
    showSizeChanger: true
  }

  return (
    <Table
      scroll={{ x: 1376 }}
      loading={loading.effects.account.query}
      dataSource={list}
      columns={columns(dispatch)}
      rowKey="_id"
      rowSelection={rowSelection}
      pagination={pagination}
      onChange={handleTableChange}
    />
  )
}
