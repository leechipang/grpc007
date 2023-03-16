import Layout from '@/layout'
import { roterPre } from '@/settings'
const userScoreLogRouter =
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
        path: 'userScoreLog',
        name: 'userScoreLog',
        meta: {
          title: '后台用户积分消耗',
          noCache: true
        },
        component: () => import('@/views/integral/userScoreLog/index.vue')
      },
    ]
  }

export default userScoreLogRouter
