import React, { Component } from 'react'
import { Tree } from 'antd'

const { TreeNode } = Tree

class MenuTree extends Component {
  constructor(props) {
    super(props)
    const { checkedKeys, keys } = props.value
    this.state = {
      selectedKeys: [],
      checkedKeys: checkedKeys || [], // 当前状态为 勾选 的节点 keys
      keys: keys || [], // 需要传给后端的 keys，包含半勾选的 父节点
      menus: [],
      expandedKeys: [],
      autoExpandParent: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value || props.menus !== state.menus) {
      const { checkedKeys, keys } = props.value
      const expandedKeys = props.menus.map(item => item.name)
      return { checkedKeys, keys, expandedKeys }
    }
    return null
  }

  onCheck = (checkedKeys, { halfCheckedKeys }) => {
    // console.log('onCheck', checkedKeys)
    // console.log('info ', halfCheckedKeys)
    const keys = [...checkedKeys, ...halfCheckedKeys]
    this.setState({
      checkedKeys,
      keys
    })
    this.props.onChange({ checkedKeys, keys })
  }

  onSelect = (selectedKeys) => {
    this.setState({ selectedKeys })
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.name} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={item.name} title={item.title} />
  })

  render() {
    const { menus }  = this.props
    // // expandedKeys：默认全部展开
    // const expandedKeys = menus.map(item => item.name)
    
    return (
      <Tree
        autoExpandParent={this.state.autoExpandParent}
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(menus)}
      </Tree>
    )
  }
}

export default MenuTree