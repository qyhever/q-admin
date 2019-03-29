import React from 'react'
import { Modal, Form, Input, InputNumber, Radio, Cascader } from 'antd'
import data from '@/assets/generateData'
import Upload from '@/components/Upload'
import { regPhone, modalFormItemLayout } from '@/utils/utils'

const FormItem = Form.Item

const ModalUpdate = ({ dispatch, form, detail, visible, loading }) => {
  const { validateFields, getFieldDecorator, resetFields } = form
  const confirmLoading = detail._id ? loading.effects.tableQuery.update : loading.effects.tableQuery.create
  const title = detail._id ? '更新' : '添加'
  function handleOk(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      if (detail._id) {
        const params = {
          ...values,
          _id: detail._id
        }
        dispatch.tableQuery.update(params)
      } else {
        dispatch.tableQuery.create(values)
      }
    })
  }
  function handleCancel() {
    dispatch.tableQuery.updateState({
      visible: false,
      detail: {}
    })
    resetFields()
  }
  return (
    <Modal
      title={title}
      width={640}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      confirmLoading={confirmLoading}
    >
      <Form>
        <FormItem label="头像" {...modalFormItemLayout}>
          {getFieldDecorator('avatar', {
            rules: [{ required: true, message: '请上传头像!' }],
            initialValue: detail.avatar
          })(
            <Upload />
          )}
        </FormItem>

        <FormItem label="姓名" {...modalFormItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入姓名!' }],
            initialValue: detail.name || ''
          })(
            <Input placeholder="请输入姓名" />
          )}
        </FormItem>

        <FormItem label="昵称" {...modalFormItemLayout}>
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入昵称!' }],
            initialValue: detail.nickName || ''
          })(
            <Input placeholder="请输入昵称" />
          )}
        </FormItem>

        <FormItem label="年龄" {...modalFormItemLayout}>
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

        <FormItem label="性别" {...modalFormItemLayout}>
          {getFieldDecorator('gender', {
            initialValue: detail.gender || '0'
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="0">女</Radio.Button>
              <Radio.Button value="1">男</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>

        <FormItem label="手机号" {...modalFormItemLayout}>
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

        <FormItem label="email" {...modalFormItemLayout}>
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

        <FormItem label="地址" {...modalFormItemLayout}>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: '请选择地址!' }],
            initialValue: detail.address || []
          })(
            <Cascader options={data} placeholder="请选择地址" getPopupContainer={triggerNode => triggerNode.parentNode} />
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(ModalUpdate)