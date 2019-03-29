import React from 'react'
import { Divider, Modal } from 'antd'

export const columns = dispatch => {

  function handleDelete(id) {
    Modal.confirm({
      title: '确定要删除吗？',
      okText: '确定',
      cancelText: '取消',
      style: { top: '34%' },
      onOk () {
        dispatch.role.delete([id])
      }
    })
  }

  function handleBeforeUpdate(id) {
    dispatch.role.queryOne(id)
    dispatch.role.updateState({
      visible: true
    })
  }

  return [{
    title: '角色名',
    dataIndex: 'roleName',
    key: 'roleName'
  }, {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc'
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (_, record) => (
      <span>
        <a onClick={handleBeforeUpdate.bind(null, record._id)}>修改</a>
        <Divider type="vertical" />
        <a onClick={handleDelete.bind(null, record._id)}>删除</a>
      </span>
    )
  }]
}
