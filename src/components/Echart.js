import React from 'react'
const withChart = params => Component => (
  class extends React.Component {
    state = {
      innerWidth: window.innerWidth
    }
    chart = null
    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }
    handleResize = () => {
      this.setState({
        innerWidth: window.innerWidth
      })
    }
    render() {
      console.log(params)
      console.log(this.chart)
      return <Component ref={node => this.chart = node} {...this.props} {...this.state} />
    }
  }
)

export default withChart