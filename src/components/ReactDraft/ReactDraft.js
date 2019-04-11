import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './ReactDraft.less'

export default class ReactDraft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  handleEditorStateChange = (editorState) => {
    console.log(editorState)
    this.setState({
      editorState
    })
  }
  
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        wrapperClassName={styles.wrapper}
        toolbarClassName="toolbarClassName"
        editorClassName={styles.editor}
        onEditorStateChange={this.handleEditorStateChange}
      />
    )
  }
}
