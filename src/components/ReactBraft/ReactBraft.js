import React, { Component } from 'react'
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import { debounce } from 'lodash'
import axios from 'axios'
import { getQiniuToken } from '@/api/common'
import { QINIU_UPLOAD_URL, QINIU_PREFIX } from '@/config'

export default class ReactBraft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.value || ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      if (props.value) {
        return { content: props.value }
      }
    }
    return null
  }

  handleEditorChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value.toHTML())
    }
  }

  handleUpload = async param => {
    try {
      const res = await getQiniuToken()
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('token', res.data.token)
      formData.append('key', new Date().getTime() + param.file.name)
      const response = await axios.post(QINIU_UPLOAD_URL, formData, {
        onUploadProgress(event) {
          // 上传进度发生变化时调用 param.progress
          param.progress(event.loaded / event.total * 100)
        }
      })
      const url = QINIU_PREFIX + encodeURI(response.data.key)
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用 param.success 并传入上传后的文件地址
      param.success({
        url,
        meta: {
          id: param.id,
          title: param.id,
          alt: '加载失败',
          // loop: true, // 指定音视频是否循环播放
          // autoPlay: true, // 指定音视频是否自动播放
          // controls: true, // 指定音视频是否显示控制栏
          // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    } catch (error) {
      // 上传发生错误时调用param.error
      param.error({ msg: '上传失败' })
    }
  }

  render() {
    const { content } = this.state
    return (
      <BraftEditor
        {...this.props}
        style={{ border: '1px solid #ccc' }}
        defaultValue={EditorState.createFrom(content)}
        // value={editorState}
        onChange={debounce(this.handleEditorChange, 500)}
        media={{ uploadFn: this.handleUpload }}
      />
    )
  }
}

