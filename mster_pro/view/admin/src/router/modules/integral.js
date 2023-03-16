import Layout from '@/layout'
import { roterPre } from '@/settings'
const integralRouter =
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
        path: 'merchant',
        name: 'merchant',
        meta: {
          title: '后台商家积分',
          noCache: true
        },
        component: () => import('@/views/integral/merchant/index.vue')
      },
    ]
  }

export default integralRouter
