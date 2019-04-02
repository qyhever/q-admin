import React, { Component } from 'react'
import { Button } from 'antd'
import { downloadIamge } from '@/utils/utils'
const url = 'https://qiniu.qyhever.com/1539015548684'

export default class Download extends Component {
  handleDownload = () => {
    downloadIamge(url)
  }
  render() {
    return (
      <div className="con-container">
        <img src={url} alt="加载失败" width="200" />
        <Button className="ml20" type="primary" onClick={this.handleDownload}>下载</Button>
      </div>
    )
  }
}
