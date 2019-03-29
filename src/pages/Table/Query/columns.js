import React from 'react'
import { Divider, Modal } from 'antd'
import { formatTime, toAddress } from '@/utils/utils'

export const columns = dispatch => {

  function handleDelete(id) {
    Modal.confirm({
      title: '确定要删除吗？',
      okText: '确定',
      cancelText: '取消',
      style: { top: '34%' },
      onOk () {
        dispatch.tableQuery.delete([id])
      }
    })
  }

  function handleBeforeUpdate(id) {
    dispatch.tableQuery.queryOne(id)
    dispatch.tableQuery.updateState({
      visible: true
    })
  }

  return [{
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text) => <img src={text} className="admin-avatar" alt="加载失败" />
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName'
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: (text) => {
      switch (text) {
        case '0': return <span>女</span>
        case '1': return <span>男</span>
        default: return '--'
      }
    }
  }, {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  }, {
    title: 'e-mail',
    dataIndex: 'email',
    key: 'email'
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <span>{toAddress(text)}</span>
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: true,
    // sortOrder: sortOrder,
    render: (text) => <span>{text ? formatTime(text) : '--'}</span>
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true,
    // sortOrder: sortOrder,
    render: (text) => <span>{text ? formatTime(text) : '--'}</span>
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (_, record) => (
      <span>
        <a onClick={handleBeforeUpdate.bind(null, record._id)}>修改</a>
        <Divider type="vertical" />
        <a to={{pathname: '/table/query/detail', query: { _id: record._id }}}>详情</a>
        <Divider type="vertical" />
        <a onClick={handleDelete.bind(null, record._id)}>删除</a>
      </span>
    )
  }]
}
