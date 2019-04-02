import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import classNames from 'classnames'
import styles from './Dashboard.less'

export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }
  render() {
    return (
      <Row gutter={24}>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="user" style={{fontSize: '50px', color: '#3fc8c5'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <span>1,900</span>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="message" style={{fontSize: '50px', color: '#38a3f5'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <span>1,900</span>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="money-collect" style={{fontSize: '50px', color: '#f3516b'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <span>1,900</span>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col}>
          <div className={classNames(styles.card, 'clearfix')}>
            <Icon className={styles.icon} type="shopping-cart" style={{fontSize: '50px', color: '#32bea3'}} />
            <div className={styles.desc}>
              <p>Online Review</p>
              <span>1,900</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
