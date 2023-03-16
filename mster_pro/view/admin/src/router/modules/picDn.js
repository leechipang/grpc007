import Layout from '@/layout'
import { roterPre } from '@/settings'
const picDnRouter =
  {
    path: `${roterPre}/integral`,
    name: 'integral',
    meta: {
      icon: 'dashboard',
      title: '首页图片管理'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'picDn',
        name: 'picDn',
        meta: {
          title: '首页新品图',
          noCache: true
        },
        component: () => import('@/views/integral/picDn/index.vue')
      },
    ]
  }

export default picDnRouter
