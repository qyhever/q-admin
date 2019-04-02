import React, { Component } from 'react'
import { Input, Button } from 'antd'
import QRCode from 'qrcode.react'
// default options
const options = {
  renderAs: 'canvas',
  size: 128,
  bgColor: '#fff',
  fgColor: '#000',
  level: 'L'
}

export default class Qrcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'qrcode.react'
    }
    this.input = null
  }
  handleGenerateCode = () => {
    this.setState({
      text: this.input.input.value
    })
  }
  render() {
    return (
      <div className="con-container">
        <div>
          <Input defaultValue="qrcode.react" style={{width: 260}} ref={el => this.input = el} />
          <Button type="primary" onClick={this.handleGenerateCode}>点击生成二维码</Button>
        </div>
        <QRCode className="mt20" value={this.state.text} {...options}></QRCode>
      </div>
    )
  }
}
