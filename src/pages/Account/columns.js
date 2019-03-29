import React, { Fragment } from 'react'
import { Modal, Switch } from 'antd'
import { formatTime } from '@/utils/utils'

export const columns = dispatch => {

  function handleDelete(id) {
    Modal.confirm({
      title: '确定要删除吗？',
      okText: '确定',
      cancelText: '取消',
      style: { top: '34%' },
      onOk () {
        dispatch.account.delete([id])
      }
    })
  }

  function handleSwitchChange(_id, value) {
    const enabled = value ? '1' : '0'
    dispatch.account.saveSwitchList({ _id, enabled })
    dispatch.account.switchEnabled({ _id, enabled })
  }

  // function handleBeforeUpdate(id) {
  //   dispatch.account.queryOne(id)
  //   dispatch.account.updateState({
  //     visible: true
  //   })
  // }

  return [{
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (text) => <img src={text} className="admin-avatar" alt="加载失败" />
  }, {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: '启用状态',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (text, record) => {
      const disabled = record.userName === 'admin'
      return <Switch checked={!!+text} disabled={disabled} onChange={(value) => handleSwitchChange(record._id, value)} />
    }
  }, {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
    render: text => text.join(',')
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
        {/* <a onClick={handleBeforeUpdate.bind(null, record._id)}>修改</a> */}
        {record.userName !== 'admin' && (
          <Fragment>
            {/* <Divider type="vertical" /> */}
            <a onClick={handleDelete.bind(null, record._id)}>删除</a>
          </Fragment>
        )}
      </span>
    )
  }]
}
