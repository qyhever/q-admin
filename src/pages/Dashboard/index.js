import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import styles from './Dashboard.less'
import classNames from 'classnames'
import CardList from './CardList'
import ChartLine from './ChartLine'
import ChartPie from './ChartPie'
import ChartGauge from './ChartGauge'

@connect(({ app, dashboard }) => ({ app, dashboard }))
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.dispatch.dashboard.fetchData()
  }

  render() {
    const { geoLocation } = this.props.app
    const { quote, weather } = this.props.dashboard
    return (
      <div className="con-container" style={{backgroundColor: '#f0f2f5'}}>
        <CardList />
        <Row gutter={24} type="flex" className={styles.main}>
          <Col span={18}>
            <ChartLine className={styles.chart} />
          </Col>
          <Col span={6} className={styles['main-info']}>
            <div className={styles['info-top']}>
              <p className="ti2">{quote.hitokoto}</p>
              <p className="tar ptb10">{quote.from + ' - ' + quote.creator}</p>
            </div>
            <div className={styles['info-bottom']}>
              <div className={styles.left}>
                <img src={weather.icon_url} alt="加载失败"/>
                <p className="pl15">{weather.cond_txt}</p>
                <p className="pl15 mt5">{weather.wind_dir} {weather.wind_sc + '级'}</p>
              </div>
              <div className={classNames(styles.right, 'tar')}>
                <p className="f20">{weather.fl} ℃</p>
                <p className="mt30">{geoLocation.city}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={24} type="flex" className={classNames(styles.main, 'mt20')}>
          <Col span={12} className="p20">
            <ChartPie className={styles.chart}></ChartPie>
          </Col>
          <Col span={12} className="p20">
          <ChartGauge className={styles.chart}></ChartGauge>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
