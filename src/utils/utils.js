import moment from 'moment'
import data from '@/assets/generateData'
import { parse } from 'qs'
const AMap = window.AMap

export const queryFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
}

export const queryFormColLayout = {
  xxl: 6,
  lg: 8
}

export const modalFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

export function isUrl(path) {
  // eslint-disable-next-line
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

export function format(date, val) {
  return moment(date).format(val)
}

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD')
}

export function formatTime(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * param address(Array) ["140000", "140300", "140311"]
 * return 山西省-阳泉市-郊区
 */
export const toAddress = (address) => {
  const ret = []
  data.forEach((province) => {
    if (province.value === address[0]) {
      ret.push(province.label)
      province.children.forEach((city) => {
        if (city.value === address[1]) {
          ret.push(city.label)
        }
        city.children.forEach((county) => {
          if (county.value === address[2]) {
            ret.push(county.label)
          }
        })
      })
    }
  })
  return ret.join('-')
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1])
}

export function queryGeolocation() {
  return new Promise((resolve, reject) => {
    const map = new AMap.Map('iCenter')
    map.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        timeout: 20000  // 超过20秒后停止定位，默认：无穷大
      })
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', data => {
        resolve({
          province: data.addressComponent.province,
          city: data.addressComponent.city,
          district: data.addressComponent.district,
          lng: data.position.lng,
          lat: data.position.lat
        })
      })
      AMap.event.addListener(geolocation, 'error', error => {
        console.log('定位失败', error)
        reject(error)
      })
    })
  })
}

export function downloadIamge(src, name) {
  const image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  // src赋值一定要在 跨域 属性设置之后
  image.src = src
  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    console.log(canvas)
    const url = canvas.toDataURL('image/png')

    // 生成一个a元素
    const a = document.createElement('a')

    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || +new Date()
    // 将生成的URL设置为a.href属性
    a.href = url
    // 创建一个单击事件
    // const event = new MouseEvent('click')
    // // 触发a的单击事件
    // a.dispatchEvent(event)
    a.click()
  }
}

export function scrollTo (el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}
