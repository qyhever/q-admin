import React, { Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select, DatePicker, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/utils/utils'

const { Item: FormItem } = Form
const { Option } = Select
const { RangePicker } = DatePicker

const QueryForm = ({ dispatch, form, rowKeys }) => {
  const { getFieldDecorator, validateFields, resetFields } = form

  function handleSearch(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      const { name, phone, email, gender, createTime } = values
      const params = {}
      name && (params.name = name.trim())
      phone && (params.phone = phone.trim())
      email && (params.email = email.trim())
      gender && (params.gender = gender)
      if (createTime.length) {
        params.timeStart = +new Date(createTime[0])
        params.timeEnd = +new Date(createTime[1])
      }
      dispatch.tableQuery.updateState({
        page: 1,
        size: 10,
        values: params
      })
      dispatch.tableQuery.query()
    })
  }

  function handleReset() {
    resetFields()
    dispatch.tableQuery.updateState({
      page: 1,
      size: 10,
      values: {}
    })
    dispatch.tableQuery.query()
  }

  function handleShowModal() {
    dispatch.tableQuery.updateState({
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
        dispatch.tableQuery.delete(rowKeys)
      }
    })
  }

  return (
    <Fragment>
      <Form onSubmit={handleSearch}>
        <Row gutter={24}>

          <Col {...queryFormColLayout}>
            <FormItem label="姓名" {...queryFormItemLayout}>
              {getFieldDecorator('name', {
                initialValue: ''
              })(
                <Input placeholder="请输入姓名" />
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem label="手机号" {...queryFormItemLayout}>
              {getFieldDecorator('phone', {
                initialValue: ''
              })(
                <Input placeholder="请输入手机号" />
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem label="e-mail" {...queryFormItemLayout}>
              {getFieldDecorator('email', {
                initialValue: ''
              })(
                <Input placeholder="请输入e-mail" />
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem label="性别" {...queryFormItemLayout}>
              {getFieldDecorator('gender', {
                initialValue: ''
              })(
                <Select placeholder="请选择性别" getPopupContainer={triggerNode => triggerNode.parentNode}>
                  <Option value="">全部</Option>
                  <Option value="0">女</Option>
                  <Option value="1">男</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col {...queryFormColLayout}>
            <FormItem label="创建时间" {...queryFormItemLayout}>
              {getFieldDecorator('createTime', {
                initialValue: []
              })(
                <RangePicker getCalendarContainer={triggerNode => triggerNode.parentNode} />
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

export default Form.create()(QueryForm)
