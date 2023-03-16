import Layout from '@/layout'
import { roterPre } from '@/settings'
const marketingRouter =
{
  path: `${roterPre}/marketing`,
  name: 'marketing',
  meta: {
    title: '营销'
  },
  alwaysShow: true,
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'coupon',
      name: 'Coupon',
      meta: {
        title: '优惠券',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/coupon/index'),
      children: [
        {
          path: 'list',
          name: 'CouponList',
          meta: {
            title: '优惠劵列表',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponList/index')
        },
        {
          path: 'user',
          name: 'CouponUser',
          meta: {
            title: '会员领取记录',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponUser/index')
        },
        {
          path: 'creatCoupon/:id?',
          name: 'CreatCoupon',
          meta: {
            title: '添加优惠劵',
            noCache: true,
            activeMenu: `${roterPre}/marketing/coupon/list`
          },
          component: () => import('@/views/marketing/coupon/couponList/creatCoupon')
        },
        {
          path: 'send',
          name: 'CouponSend',
          meta: {
            title: '优惠券发送记录',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponSend/index')
        }
      ]
    },
    {
      path: 'studio',
      name: 'Studio',
      meta: {
        title: '直播间',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/studio/index'),
      children: [
        {
          path: 'list',
          name: 'StudioList',
          meta: {
            title: '直播间列表',
            noCache: true
          },
          component: () => import('@/views/marketing/studio/studioList/index')
        },
        {
          path: 'creatStudio',
          name: 'CreatStudio',
          meta: {
            title: '创建直播间',
            noCache: true
          },
          component: () => import('@/views/marketing/studio/studioList/creatStudio')
        }
      ]
    },
    {
      path: 'broadcast',
      name: 'Broadcast',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/broadcast/index'),
      children: [
        {
          path: 'list',
          name: 'BroadcastList',
          meta: {
            title: '直播商品列表',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast/broadcastList/index')
        },
        {
          path: 'addProduct',
          name: 'BroadcastProduct',
          meta: {
            title: '创建直播商品',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast/broadcastList/addProduct')
        }
      ]
    },
    {
      path: 'seckill',
      name: 'Seckill',
      meta: {
        title: '秒杀管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'list',
          name: 'SpikeGoods',
          meta: {
            title: '秒杀商品',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/index')
        },
        {
          path: 'createGoods/:id?/:edit?',
          name: 'CreateSpikeGoods',
          meta: {
            title: '添加秒杀商品',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/createGoods')
        }
      ]
    },
    {
      path: 'presell',
      name: 'preSell',
      meta: {
        title: '预售商品管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'list',
          name: `preSaleList`,
          meta: {
            title: '预售商品',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/index')
        },
        {
          path: 'create/:id?/:edit?',
          name: `preSaleCreate`,
          meta: {
            title: '添加预售商品',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/create')
        },
      ]
    },
    {
      path: 'assist',
      name: 'assist',
      meta: {
        title: '助力活动商品',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'list',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/index')
        },
        {
          path: 'create/:id?/:edit?',
          name: `assistProductCreate`,
          meta: {
            title: '添加助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/create')
        },
        {
          path: 'assist_set',
          name: `assistSet`,
          meta: {
            title: '助力活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_activity/index')
        }
      ]
    },
    {
        path: 'combination',
        name: 'combinAtion',
        meta: {
          title: '拼团管理',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/combination/index'),
        children: [
          {
            path: 'combination_goods',
            name: `combinationGoods`,
            meta: {
              title: '拼团商品',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/combination_goods/index')
          },
          {
            path: 'combination_list',
            name: `combinationLoods`,
            meta: {
              title: '拼团列表',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/store_combination/index')
          },
          {
            path: 'create/:id?/:edit?',
            name: `combinationCreate`,
            meta: {
              title: '添加拼团商品',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/combination_goods/create')
          },
        ]
      },
  ]
}

export default marketingRouter
