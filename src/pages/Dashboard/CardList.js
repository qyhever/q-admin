import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import CountUp from 'react-countup'
import classNames from 'classnames'
import styles from './Dashboard.less'

export default class CardList extends Component {
  render() {
    return (
      <Row gutter={24}>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="user" style={{fontSize: '50px', color: '#3fc8c5'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <CountUp end={1900} duration={3} />
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="message" style={{fontSize: '50px', color: '#38a3f5'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <CountUp end={1900} duration={3} />
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="money-collect" style={{fontSize: '50px', color: '#f3516b'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <CountUp end={1900} duration={3} />
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="shopping-cart" style={{fontSize: '50px', color: '#32bea3'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <CountUp end={1900} duration={3} />
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
