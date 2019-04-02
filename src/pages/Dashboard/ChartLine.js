import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xAxisData: [],
      seriesData: {
        froms: [],
        orders: []
      }
    }
  }
  componentDidMount() {
    this.initData()
  }

  initData() {
    const froms = []
    const orders = []
    const xAxisData = []
    for (let i = 0; i < 7; i++) {
      const d = moment().subtract(7 - i ,'days').format('YYYY-MM-DD')
      const from = Math.floor(Math.random() * 100000)
      const order = Math.floor(Math.random() * 100000)
      froms.push(from)
      orders.push(order)
      xAxisData.push(d)
    }
    this.setState({
      xAxisData,
      seriesData: {
        froms,
        orders
      }
    })
  }

  getOption() {
    return {
      legend: {
        data: ['访问用户', '下单用户']
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '2%'
      },
      xAxis: {
        type: 'category',
        data: this.state.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '访问用户',
          type: 'line',
          data: this.state.seriesData.froms,
          smooth: true
        },
        {
          name: '下单用户',
          type: 'line',
          data: this.state.seriesData.orders,
          smooth: true
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
