import { queryCurrentUser, queryTotalRoles } from '@/api/common'
import { queryGeolocation } from '@/utils/utils'
import totalMenus from '@/config/menus'

// 可访问菜单，从 menus 中过滤出 包含 permissions 的 menu
function getAccessMenus(menus, permissions) {
  return menus.filter(item => {
    if (permissions.indexOf(item.name) >= 0) {
      if (item.children) {
        item.children = getAccessMenus(item.children, permissions)
      }
      return true
    } else {
      return false
    }
  })
}

export default {
  state: {
    user: {}, // 当前用户信息
    menus: [], // 可访问菜单
    totalRoles: [], // 平台全部角色
    permissions: [], // 当前用户的资源权限 ['menuName1', 'menuName2'...]
    geoLocation: {} // 当前位置信息
  },

  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async queryCurrentUser() {
      const res = await queryCurrentUser()
      if (res.success) {
        const { permissions } = res.data
        const accessMenus = getAccessMenus(totalMenus, permissions)
        this.updateState({
          user: res.data,
          menus: accessMenus,
          permissions
        })
      }
    },
    // 查询平台全部角色，用于下拉列表选择
    async queryTotalRoles() {
      const res = await queryTotalRoles()
      if (res.success) {
        this.updateState({
          totalRoles: res.data
        })
      }
    },

    async queryGeolocation() {
      const geoLocation = await queryGeolocation()
      this.updateState({
        geoLocation
      })
    }
  }
}
