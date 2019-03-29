import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Button, Input } from 'antd'
import { Redirect } from 'react-router-dom'
import styles from './index.less'
import logoImg from '@/assets/images/logo.png'
import { getToken } from '@/utils/storage'
const FormItem = Form.Item

function Login({ form, dispatch, loading }) {

  const { validateFields, getFieldDecorator } = form
  const token = getToken()
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        // dispatch({
        //   type: 'login/login',
        //   payload: values
        // })
        dispatch.login.login(values)
      }
    })
  }
  // 有 token，跳转到首页
  if (token) {
    return <Redirect to={{ pathname: '/dashboard' }} />
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.form}>

        <div className={styles.logo}>
          <img className={styles.logo1} src={logoImg} alt="加载失败"/>
          <span>后台管理</span>
        </div>

        <Form onSubmit={handleSubmit}>

          <FormItem>
            {getFieldDecorator('userName', {
              validateTrigger: 'onSubmit',
              rules: [{required: true, message: '请输入用户名!'}]
            })(
              <Input prefix={<Icon type="user" />} placeholder="账号" autoComplete="off" allowClear />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              validateTrigger: 'onSubmit',
              rules: [{required: true, message: '请输入密码!'}]
            })(
              <div className={styles.password}>
                <Input type="password" prefix={<Icon type="unlock" />} placeholder="密码" allowClear />
              </div>
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.submitBtn}
              onSubmit={handleSubmit}
            >
              登录
            </Button>
          </FormItem>
        </Form>

      </div>
    </div>
  )
}

export default connect(({ loading }) => {
  return {
    loading: loading.effects.login.login
  }
})(Form.create()(Login))
