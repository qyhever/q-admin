import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export default class ChartGauge extends Component {
  constructor(props) {
    super(props)
    this.state = {
       value: 50
    }
  }
  
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        value: (Math.random() * 100).toFixed(2) - 0
      })
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getOption() {
    return {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: this.state.value, name: '完成率' }]
        }
      ]
    }
  }
  render() {
    return (
      <ReactEcharts
        className={this.props.className}
        style={{ height: '100%' }}
        option={this.getOption()}
        theme="macarons"
      />
    )
  }
}
