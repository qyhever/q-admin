import moment from 'moment'
import data from '@/assets/generateData'
import { parse } from 'qs'

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
