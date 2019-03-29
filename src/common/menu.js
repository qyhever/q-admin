/**
 * name: [Boolean] '路由名字'
 * icon: [String] '图标'
 * path: [String] '路径'
 * title: [String] '菜单title'
 * breadcrumb: [String] '面包屑' 为 null 则不显示
 * hideChildrenInMenu: [Boolean] 是否显示路由及下面的子路由，对有 children 属性的路由可用
 * hideInMenu: [Boolean] 是否显示当前路由，对没有 children 属性的路由可用
 * children: [Array] 子路由
 */
export const menus = [
  {
    name: 'dashboard',
    icon: 'desktop',
    path: '/dashboard',
    title: '控制台',
    breadcrumb: '控制台'
  },

  {
    name: 'form',
    icon: 'form',
    path: '/form',
    title: '表单页',
    breadcrumb: '表单页',
    children: [
      { name: 'basic', path: '/form/basic', title: '基础表单', breadcrumb: '基础表单' },
      { name: 'step', path: '/form/step', title: '分布表单', breadcrumb: '基础表单' }
    ]
  },

  {
    name: 'table',
    icon: 'table',
    path: '/table',
    title: '表格',
    breadcrumb: '表格',
    children: [
      { name: 'basic', path: '/table/basic', title: '基础表格', breadcrumb: '基础表格' },
      { name: 'query', path: '/table/query', title: '查询表格', breadcrumb: '查询表格' },
      { name: 'queryCreate', path: '/table/query/create', breadcrumb: '添加', hideInMenu: true }
    ]
  },

  {
    name: 'richtext',
    icon: 'link',
    path: '/richtext',
    title: '富文本',
    breadcrumb: '富文本',
    children: [
      { name: 'quill', path: '/richtext/quill' },
      { name: 'tinymce', path: '/richtext/tinymce' },
      { name: 'draft-wysiwyg', path: '/richtext/draft-wysiwyg' },
      { name: 'ckeditor', path: '/richtext/ckeditor' }
    ]
  },

  {
    name: 'common',
    icon: 'appstore-o',
    path: '/common',
    title: '常用',
    breadcrumb: '常用',
    children: [
      { name: 'copy', path: '/common/copy', breadcrumb: '复制' },
      { name: 'qrcode', path: '/common/qrcode', breadcrumb: '二维码' },
      { name: 'download', path: '/common/download', breadcrumb: '下载' }
    ]
  },

  {
    name: 'role',
    icon: 'team',
    path: '/role',
    title: '角色管理',
    breadcrumb: '角色管理'
  },

  {
    name: 'account',
    icon: 'user',
    path: '/account',
    title: '账号管理',
    breadcrumb: '账号管理'
  }

]

export default menus