import React from 'react'
import { Modal, Form, Input, Radio, Select } from 'antd'
import Upload from '@/components/Upload'
import { modalFormItemLayout } from '@/utils/utils'

const FormItem = Form.Item
const Option = Select.Option

const AccountModal = ({ dispatch, loading, form, detail, visible, totalRoles }) => {
  const { validateFields, getFieldDecorator, resetFields } = form
  const confirmLoading = detail._id ? loading.effects.account.update : loading.effects.account.create
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
        dispatch.account.update(params)
      } else {
        dispatch.account.create(values)
      }
    })
  }
  function handleCancel() {
    dispatch.account.updateState({
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

        <FormItem label="用户名" {...modalFormItemLayout}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入姓名!' }],
            initialValue: detail.userName || ''
          })(
            <Input placeholder="请输入用户名" />
          )}
        </FormItem>

        <FormItem label="账户状态" {...modalFormItemLayout}>
          {getFieldDecorator('enabled', {
            initialValue: detail.enabled || '1'
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="0">禁用</Radio.Button>
              <Radio.Button value="1">启用</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>

        <FormItem label="角色" {...modalFormItemLayout}>
          {getFieldDecorator('roles', {
            initialValue: detail.roles || ['guest']
          })(
            <Select mode="multiple" getPopupContainer={triggerNode => triggerNode.parentNode}>
              {totalRoles.map(role =>
                <Option key={role._id} value={role._id}>{role.roleName}</Option>
              )}
            </Select>
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(AccountModal)