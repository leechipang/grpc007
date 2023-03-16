import Layout from '@/layout'
import { roterPre } from '@/settings'
const stationRouter  =
  {
    path: `${roterPre}/station`,
    name: 'station',
    meta: {
      icon: '',
      title: '站内消息'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'notice/:id?',
        name: 'stationNotice',
        meta: {
          title: '站内消息'
        },
        component: () => import('@/views/station/notice/index')
      }
    ]
  }

export default stationRouter
