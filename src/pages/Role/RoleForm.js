import React, { Fragment } from 'react'
import { Form, Row, Col, Input, Button, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/utils/utils'

const { Item: FormItem } = Form

const RoleForm = ({ dispatch, form, rowKeys }) => {
  const { getFieldDecorator, validateFields, resetFields } = form

  function handleSearch(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      const { roleName } = values
      const params = {}
      roleName && (params.roleName = roleName.trim())
      dispatch.role.updateState({
        page: 1,
        size: 10,
        values: params
      })
      dispatch.role.query()
    })
  }

  function handleReset() {
    resetFields()
    dispatch.role.updateState({
      page: 1,
      size: 10,
      values: {}
    })
    dispatch.role.query()
  }

  function handleShowModal() {
    dispatch.role.updateState({
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
        dispatch.role.delete(rowKeys)
      }
    })
  }

  return (
    <Fragment>
      <Form onSubmit={handleSearch}>
        <Row gutter={24}>

          <Col {...queryFormColLayout}>
            <FormItem label="角色名" {...queryFormItemLayout}>
              {getFieldDecorator('roleName', {
                initialValue: ''
              })(
                <Input placeholder="请输入角色名" />
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

export default Form.create()(RoleForm)
