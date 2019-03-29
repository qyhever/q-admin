import React from 'react'
import { Modal, Form, Input } from 'antd'
import { modalFormItemLayout } from '@/utils/utils'
import MenuTree from './MenuTree'

const FormItem = Form.Item

const RoleModal = ({ dispatch, form, detail, visible, loading, menus }) => {
  const { validateFields, getFieldDecorator, resetFields } = form
  const confirmLoading = detail._id ? loading.effects.role.update : loading.effects.role.create
  const title = detail._id ? '更新' : '添加'
  function handleOk(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      const { menus } = values
      const params = {
        ...values,
        menus: menus.keys
      }
      if (detail._id) {
        params._id = detail._id
        dispatch.role.update(params)
      } else {
        dispatch.role.create(params)
      }
    })
  }
  function handleCancel() {
    dispatch.role.updateState({
      visible: false,
      detail: {}
    })
    resetFields()
  }
  return (
    <Modal
      title={title}
      width={860}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      confirmLoading={confirmLoading}
    >
      <Form>

        <FormItem label="角色名" {...modalFormItemLayout}>
          {getFieldDecorator('roleName', {
            rules: [{ required: true, message: '请输入角色名!' }],
            initialValue: detail.roleName || ''
          })(
            <Input placeholder="请输入角色名" />
          )}
        </FormItem>

        <FormItem label="描述" {...modalFormItemLayout}>
          {getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入描述!' }],
            initialValue: detail.desc || ''
          })(
            <Input placeholder="请输入描述" />
          )}
        </FormItem>

        <FormItem label="菜单" {...modalFormItemLayout}>
          {getFieldDecorator('menus', {
            rules: [{ required: true, message: '请输入描述!' }],
            initialValue: {checkedKeys: detail.menus || [], keys: detail.menus || []}
          })(
            <MenuTree menus={menus} />
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(RoleModal)