import React, { Component } from 'react'
import ReactQuill from '@/components/ReactQuill'

export default class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
       content: '<b>quill</b>',
       preview: '<b>quill</b>'
    }
  }

  handeChange = (preview) => {
    this.setState({ preview })
  }
  
  render() {
    return (
      <div className="con-container">
        <ReactQuill value={this.state.content} onChange={this.handeChange}></ReactQuill>
        <div>{this.state.preview}</div>
      </div>
    )
  }
}
