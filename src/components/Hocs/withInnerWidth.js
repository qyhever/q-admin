import React from 'react'
const withInnerWidth = Component => (
  class extends React.Component {
    state = {
      innerWidth: window.innerWidth
    }
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
      return <Component {...this.props} {...this.state} />
    }
  }
)

export default withInnerWidth
