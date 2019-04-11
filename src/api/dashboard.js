import axios from 'axios'

export function getHitokoto() {
  const url = 'https://v1.hitokoto.cn/'
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function weatherToday() {
  const url = 'https://free-api.heweather.net/s6/weather/now'
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        location: 'auto_ip',
        key: '826d945576ae4dbcaf73c2cc90f7d18b'
      }
    }).then(res => {
      // 图标 https://www.heweather.com/documents/condition
      const data = res.data.HeWeather6[0].now
      data.icon_url = 'https://cdn.heweather.com/cond_icon/' + data.cond_code + '.png'
      data.location = res.data.HeWeather6[0].basic.location
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
