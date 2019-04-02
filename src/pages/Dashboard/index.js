import React, { Component } from 'react'
import { Row, Col } from 'antd'
import CardList from './CardList'
import ChartLine from './ChartLine'
import styles from './Dashboard.less'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="con-container" style={{backgroundColor: '#f0f2f5'}}>
        <CardList />
        <Row gutter={24} type="flex" className={styles.main}>
          <Col span={18}>
            <ChartLine className={styles['main-line']} />
          </Col>
          <Col span={6} className={styles['main-info']}>
            <div className={styles['info-top']}></div>
            <div className={styles['info-bottom']}></div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
