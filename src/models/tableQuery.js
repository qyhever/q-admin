import { getList, create, update, remove, queryOne } from '@/api/tableQuery'
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
    }
  },

  effects: {
    async query(payload = {}, { tableQuery }) {
      try {
        const page = payload.page || tableQuery.page
        const size = payload.size || tableQuery.size
        const params = {...payload, ...tableQuery.values}
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
    async update(payload) {
      try {
        const res = await update(payload)
        if (res.success) {
          message.destroy()
          message.success('更新成功')
          this.query()
        } else {
          return Promise.reject()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async delete(payload) {
      try {
        const res = await remove(payload)
        console.log(res)
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
    }
  }
}