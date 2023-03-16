import Layout from '@/layout'
import { roterPre } from '@/settings'
const userScoreRouter =
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
        path: 'userScore',
        name: 'userScore',
        meta: {
          title: '后台用户积分',
          noCache: true
        },
        component: () => import('@/views/integral/userScore/index.vue')
      },
    ]
  }

export default userScoreRouter
