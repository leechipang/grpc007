import Layout from '@/layout'
import { roterPre } from '@/settings'
const picMdRouter =
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
        path: 'picMd',
        name: 'picMd',
        meta: {
          title: '首页热卖图',
          noCache: true
        },
        component: () => import('@/views/integral/picMd/index.vue')
      },
    ]
  }

export default picMdRouter
