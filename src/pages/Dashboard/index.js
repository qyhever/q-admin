import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {

  render() {
    return (
      <div className="con-container">
        <h2>Dashboard</h2>
      </div>
    )
  }
}

export default connect(({ loading }) => {
  return {
    loading
  }
})(Dashboard)
