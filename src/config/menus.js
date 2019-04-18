const menus = [
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
      { name: 'form_basic', path: '/form/basic', title: '基础表单', breadcrumb: '基础表单' },
      { name: 'form_step', path: '/form/step', title: '分布表单', breadcrumb: '基础表单' }
    ]
  },

  {
    name: 'table',
    icon: 'table',
    path: '/table',
    title: '表格',
    breadcrumb: '表格',
    children: [
      { name: 'table_basic', path: '/table/basic', title: '基础表格', breadcrumb: '基础表格' },
      { name: 'table_query', path: '/table/query', title: '查询表格', breadcrumb: '查询表格' },
      { name: 'query_create', path: '/query/create', title: '查询表格-添加', breadcrumb: '添加', hideInMenu: true }
    ]
  },

  {
    name: 'richtext',
    icon: 'link',
    path: '/richtext',
    title: '富文本',
    breadcrumb: '富文本',
    children: [
      { name: 'richtext_quill', path: '/richtext/quill', title: 'quill', breadcrumb: 'quill' },
      { name: 'richtext_braft', path: '/richtext/braft', title: 'braft', breadcrumb: 'braft' },
      { name: 'richtext_tinymce', path: '/richtext/tinymce', title: 'tinymce', breadcrumb: 'tinymce' },
      { name: 'richtext_draft_wysiwyg', path: '/richtext/draft-wysiwyg', title: 'draft-wysiwyg', breadcrumb: 'draft-wysiwyg' },
      { name: 'richtext_ckeditor', path: '/richtext/ckeditor', title: 'ckeditor', breadcrumb: 'ckeditor' }
    ]
  },

  {
    name: 'common',
    icon: 'appstore-o',
    path: '/common',
    title: '常用',
    breadcrumb: '常用',
    children: [
      { name: 'common_copy', path: '/common/copy', title: '复制', breadcrumb: '复制' },
      { name: 'common_qrcode', path: '/common/qrcode', title: '二维码', breadcrumb: '二维码' },
      { name: 'common_download', path: '/common/download', title: '下载', breadcrumb: '下载' }
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
  },

  {
    name: 'test',
    icon: 'info-circle',
    path: '/test',
    title: '测试专用',
    breadcrumb: '测试专用'
  },

  {
    name: 'admin',
    icon: 'icon-administrator',
    path: '/admin',
    title: 'admin专用',
    breadcrumb: 'admin专用'
  },

  {
    name: 'dev',
    icon: 'icon-dev',
    path: '/dev',
    title: 'dev专用',
    breadcrumb: 'dev专用'
  }
]

// 过滤出菜单名字
function getTotalMenuKeys(menus) {
  let ret = []
  menus.forEach(item => {
    ret.push(item.name)
    if (Array.isArray(item.children)) {
      ret = ret.concat(getTotalMenuKeys(item.children))
    }
  })
  return ret
}

function flattenMenus(menus) {
  let ret = []
  menus.forEach(item => {
    if (Array.isArray(item.children)) {
      ret = ret.concat(flattenMenus(item.children))
    } else {
      ret.push(item)
    }
  })
  return ret
}

export const totalMenuKeys = getTotalMenuKeys(menus)

export const flattendMenus = flattenMenus(menus)

export default menus