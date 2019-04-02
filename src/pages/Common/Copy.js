import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import withInnerWidth from '@/components/Hocs/withInnerWidth'
import { CopyToClipboard } from 'react-copy-to-clipboard'

@withInnerWidth
class Copy extends Component {
  state = {
    text: '点击右边按钮复制'
  }
  element = null
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }
  handleCopy = () => {
    message.destroy()
    message.success('复制成功')
  }
  render() {
    return (
      <div className="con-container">
        <Input style={{width: 260}} value={this.state.text} onChange={this.handleChange} />
        <CopyToClipboard text={this.state.text} onCopy={this.handleCopy}>
          <Button type="primary">点击复制</Button>
        </CopyToClipboard>
      </div>
    )
  }
}

export default Copy
