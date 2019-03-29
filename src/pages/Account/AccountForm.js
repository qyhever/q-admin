import React, { Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/utils/utils'

const { Item: FormItem } = Form
const { Option } = Select

const AccountForm = ({ dispatch, form, rowKeys }) => {
  const { getFieldDecorator, validateFields, resetFields } = form

  function handleSearch(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      const { userName, enabled } = values
      const params = {}
      userName && (params.userName = userName.trim())
      enabled && (params.enabled = enabled)
      dispatch.account.updateState({
        page: 1,
        size: 10,
        values: params
      })
      dispatch.account.query()
    })
  }

  function handleReset() {
    resetFields()
    dispatch.account.updateState({
      page: 1,
      size: 10,
      values: {}
    })
    dispatch.account.query()
  }

  function handleShowModal() {
    dispatch.account.updateState({
      visible: true
    })
  }

  function handleDelete() {
    Modal.confirm({
      title: '确定要删除选中的吗？',
      okText: '确定',
      cancelText: '取消',
      style: { top: '34%' },
      onOk () {
        dispatch.account.delete(rowKeys)
      }
    })
  }

  return (
    <Fragment>
      <Form onSubmit={handleSearch}>
        <Row gutter={24}>

          <Col {...queryFormColLayout}>
            <FormItem label="用户名" {...queryFormItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: ''
              })(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem label="启用状态" {...queryFormItemLayout}>
              {getFieldDecorator('enabled', {
                initialValue: ''
              })(
                <Select placeholder="请选择状态" allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>
                  <Option value="">全部</Option>
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem wrapperCol={{offset: 2}}>
              <Button type="primary" className="mr15" htmlType="submit" onSubmit={handleSearch}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </FormItem>
          </Col>
        </Row>

      </Form>

      <div className="mb20">
        <Button className="mr15" type="primary" icon="plus" onClick={handleShowModal}>添加</Button>
        <Button type="primary" icon="delete" onClick={handleDelete} disabled={!rowKeys.length}>批量删除</Button>
      </div>

    </Fragment>
  )
}

export default Form.create()(AccountForm)
