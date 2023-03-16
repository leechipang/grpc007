import Layout from '@/layout'
import { roterPre } from '@/settings'
const integralStateRouter =
  {
    path: `${roterPre}/integral`,
    name: 'integral',
    meta: {
      icon: 'dashboard',
      title: '积分管理'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'merchantState',
        name: 'merchantState',
        meta: {
          title: '后台商家积分消耗',
          noCache: true
        },
        component: () => import('@/views/integral/merchantState/index.vue')
      },
    ]
  }

export default integralStateRouter
