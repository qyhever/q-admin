import React, { Component } from 'react'
import ReactDraft from '@/components/ReactDraft'

export default class DraftWysiwyg extends Component {
  render() {
    return (
      <div className="con-container">
        <ReactDraft></ReactDraft>
      </div>
    )
  }
}
