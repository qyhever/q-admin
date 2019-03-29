import { getList, create, remove, queryOne, switchEnabled } from '@/api/account'
import { message } from 'antd'
export default {
  state: {
    list: [],
    page: 1,
    size: 10,
    total: 0,
    values: {},
    rowKeys: [],
    detail: {},
    visible: false
  },

  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    },
    saveSwitchList(state, { _id, enabled }) {
      const { list } = state
      const copyList = [...list]
      copyList.forEach((v) => {
        if (v._id === _id) {
          v.enabled = enabled
        }
      })
      return { ...state, list: copyList }
    }
  },

  effects: {
    async query(payload = {}, { account }) {
      try {
        const page = payload.page || account.page
        const size = payload.size || account.size
        const params = {...payload, ...account.values}
        const res = await getList(params)
        if (res.success) {
          this.updateState({
            list: res.data.list,
            total: res.data.total,
            page,
            size
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async create(payload) {
      try {
        const res = await create(payload)
        if (res.success) {
          message.destroy()
          message.success('添加成功')
          this.updateState({
            values: {},
            visible: false
          })
          this.query({
            page: 1,
            size: 10
          })
        } else {
          return Promise.reject()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // async update(payload) {
    //   try {
    //     const res = await update(payload)
    //     if (res.success) {
    //       message.destroy()
    //       message.success('更新成功')
    //       this.query()
    //     } else {
    //       return Promise.reject()
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async delete(payload) {
      try {
        const res = await remove(payload)
        if (res.success) {
          message.destroy()
          message.success('删除成功')
          this.updateState({
            rowKeys: []
          })
          this.query()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async queryOne(payload) {
      try {
        const res = await queryOne(payload)
        if (res.success) {
          this.updateState({
            detail: res.data
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async switchEnabled(payload) {
      const res = await switchEnabled(payload)
      if (res.success) {
        message.destroy()
        message.success('更新成功')
      }
    }
  }
}