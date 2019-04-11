import React, { memo, useState, useEffect } from 'react'
import { Icon, message, Tooltip } from 'antd'
import screenfull from 'screenfull'

export default memo(() => {
  const [state, setState] = useState({ fulled: false })

  useEffect(() => {
    init()
    return (() => {
      screenfull.off('change', handleChange)
    })
  }, [])

  function init() {
    if (screenfull.enabled) {
      screenfull.on('change', handleChange)
    }
  }

  function handleChange() {
    setState({
      fulled: screenfull.isFullscreen
    })
  }

  function handleToggleFulled() {
    if (!screenfull.enabled) {
      message.warning('当前浏览器不支持该功能')
      return false
    }
    screenfull.toggle()
  }
  return (
    <Tooltip placement="bottom" title="全屏">
      <Icon
        type={state.fulled ? 'fullscreen-exit' : 'fullscreen'}
        style={{fontSize: 24, margin: '0 10px'}}
        onClick={handleToggleFulled}
      />
    </Tooltip>
  )
})
