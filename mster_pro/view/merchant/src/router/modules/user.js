import Layout from '@/layout'
import { roterPre } from '@/settings'
const userRouter =
  {
    path: `${roterPre}/user`,
    name: 'user',
    meta: {
      icon: 'dashboard',
      title: '用户管理'
    },
    alwaysShow: true,
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'label',
        name: 'UserLabel',
        meta: { title: '用户标签', noCache: true },
        component: () => import('@/views/user/group'),
      },
      {
        path: 'maticlabel',
        name: 'UserAutoLabel',
        meta: { title: '自动标签', noCache: true },
        component: () => import('@/views/user/label'),
      },
      {
        path: 'list',
        name: 'UserList',
        meta: { title: '用户列表', noCache: true },
        component: () => import('@/views/user/list'),
      }
    ]
  }

export default userRouter
