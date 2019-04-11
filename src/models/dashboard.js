import { getHitokoto, weatherToday } from '@/api/dashboard'

export default {
  state: {
    weather: {},
    quote: {}
  },

  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async fetchData() {
      const [quote, weather] = await Promise.all([
        getHitokoto(),
        weatherToday()
      ])
      this.updateState({
        quote,
        weather
      })
    }
  }
}
