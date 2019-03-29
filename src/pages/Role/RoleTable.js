import React from 'react'
import { Table } from 'antd'
import { columns } from './columns'

export default ({ dispatch, loading, list, page, size, total, rowKeys }) => {
  function handleTableChange(pagination) {
    const { current: page, pageSize: size } = pagination
    const params = {
      page,
      size
    }
    dispatch.role.query(params)
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      dispatch.role.updateState({
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
      loading={loading.effects.role.query}
      dataSource={list}
      columns={columns(dispatch)}
      rowKey="_id"
      rowSelection={rowSelection}
      pagination={pagination}
      onChange={handleTableChange}
    />
  )
}
