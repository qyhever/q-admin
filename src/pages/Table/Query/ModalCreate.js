import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Input, InputNumber, Radio, Cascader } from 'antd'
import data from '@/assets/generateData'
import Upload from '@/components/Upload'
import { regPhone } from '@/utils/utils'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

@Form.create()
@connect(({ tableQuery }) => ({ tableQuery }))
class ModalCreate extends Component {
  state = {
    visible: false
  }
  handleShow = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    const { resetFields } = this.props.form
    this.setState({
      visible: false
    })
    resetFields()
    this.props.dispatch.tableQuery.updateState({
      detail: {}
    })
  }
  handleOk = (e) => {
    const { validateFields } = this.props.form
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      this.props.handleOk(values).then(() => {
        this.handleCancel()
      }).catch(() => {})
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { detail } = this.props.tableQuery
    return (
      <span>
        <span onClick={this.handleShow}>{this.props.children}</span>
        <Modal
          title="添加"
          width={640}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <Form>
            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator('avatar', {
                rules: [{ required: true, message: '请上传头像!' }],
                initialValue: detail.avatar || ''
              })(
                <Upload />
              )}
            </FormItem>

            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名!' }],
                initialValue: detail.name || ''
              })(
                <Input placeholder="请输入姓名" />
              )}
            </FormItem>

            <FormItem label="昵称" {...formItemLayout}>
              {getFieldDecorator('nickName', {
                rules: [{ required: true, message: '请输入昵称!' }],
                initialValue: detail.nickName || ''
              })(
                <Input placeholder="请输入昵称" />
              )}
            </FormItem>

            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: detail.age || 18,
                rules: [
                  { required: true, message: '请输入年龄!' },
                  { pattern: /^\d*$/, message: '年龄为数字!' }
                ]
              })(
                <InputNumber min={0} max={100} />
              )}
            </FormItem>

            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('gender', {
                initialValue: detail.gender || '0'
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="0">女</Radio.Button>
                  <Radio.Button value="1">男</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入手机号!' },
                  { pattern: regPhone, message: '手机号格式不正确!' }
                ],
                initialValue: detail.phone || ''
              })(
                <Input placeholder="请输入手机号" />
              )}
            </FormItem>

            <FormItem label="email" {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '邮箱格式不正确!' }
                ],
                initialValue: detail.email || ''
              })(
                <Input placeholder="请输入邮箱" />
              )}
            </FormItem>

            <FormItem label="地址" {...formItemLayout}>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请选择地址!' }],
                initialValue: detail.address || []
              })(
                <Cascader options={data} placeholder="请选择地址" getPopupContainer={triggerNode => triggerNode.parentNode} />
              )}
            </FormItem>

          </Form>
        </Modal>
      </span>
    )
  }
}

export default ModalCreate