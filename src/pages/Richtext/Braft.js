import React, { Component } from 'react'
import ReactBraft from '@/components/ReactBraft'
import { Form, Button } from 'antd'
const { Item: FormItem } = Form

@Form.create()
export default class Braft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '<b>braft editor</b>',
      preview: '<b>braft editor</b>'
    }
  }
  handleChange = (value) => {
    this.setState({
      preview: value
    })
  }
  handleSubmit = (e) => {
    debugger
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="con-container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
              {getFieldDecorator('name', {
                initialValue: ''
              })(
                <ReactBraft onChange={this.handleChange} />
              )}
            </FormItem>
            <div className="tac">
              <Button type="primary" htmlType="submit" onSubmit={this.handleSubmit}>确定</Button>
            </div>
        </Form>
        <div>{this.state.preview}</div>
      </div>
    )
  }
}
