import React, { PureComponent } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default class ReactQuill extends PureComponent {
  constructor(props) {
    super(props)
    this.editor = null
    this.state = {
      content: props.value || 'Quill Rich Text Editor'
    }
  }
  componentDidMount() {
    this.initEditor()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.editor.clipboard.dangerouslyPasteHTML(nextProps.value)
      const index = this.editor.getSelection().index
      this.editor.setSelection(index + 1)
      this.setState({
        content: nextProps.value || ''
      })
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.value !== state.value) {
  //     return { content: props.value || '' }
  //   }
  //   return null
  // }
  componentWillUnmount() {
    this.editor = null
  }

  initEditor() {
    this.editor = new Quill('.editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          ['link', 'image'],
          [{ 'align': [] }],
          ['clean']
        ]
      },
      placeholder: 'quill richtext...',
      theme: 'snow'
    })
    const editor = this.editor
    editor.clipboard.dangerouslyPasteHTML(0, this.state.content)
    const index = editor.getSelection().index
    editor.setSelection(index + 1)
    
    const toolbar = editor.getModule('toolbar')
    toolbar.addHandler('image', () => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = event => {
        const file = event.target.files[0]
        const url = window.URL.createObjectURL(file)
        console.log(url)
        const range = editor.getSelection()
        if (range) {
          editor.insertEmbed(range.index, 'image', 'https://qiniu.qyhever.com/1540877344375')
          editor.setSelection(range.index + 1)
        }
      }
      input.click()
    })
    editor.on('text-change', () => {
      const value = editor.container.firstChild.innerHTML
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    })
  }

  render() {
    return (
      <div className="editor" style={{ width: '100%', height: 500 }}></div>
    )
  }
}
