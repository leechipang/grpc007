import Layout from '@/layout'
import { roterPre } from '@/settings'
const userRecordRouter =
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
        path: 'userScoreRecord',
        name: 'userScoreRecord',
        meta: {
          title: '后台用户积分消耗',
          noCache: true
        },
        component: () => import('@/views/integral/userScoreRecord/index.vue')
      },
    ]
  }

export default userRecordRouter
