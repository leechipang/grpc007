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
          path: 'seckillConfig',
          name: 'SeckillConfig',
          meta: {
            title: '秒杀配置',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillConfig/index')
        },
        {
          path: 'list',
          name: 'SpikeList',
          meta: {
            title: '秒杀列表',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/index.vue')
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
          path: 'agreement',
          name: `preSaleAgreement`,
          meta: {
            title: '预售协议',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/agreement')
        }
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
      component: () => import('@/views/marketing/assist/index'),
      children: [
        {
          path: 'goods_list',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_goods/index')
        },
        {
          path: 'list',
          name: `assist`,
          meta: {
            title: '助力活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/index')
        },
      ]
    },
    {
        path: 'combination',
        name: 'combinAtion',
        meta: {
          title: '拼团',
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
            name: `combinationList`,
            meta: {
              title: '拼团活动',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/store_combination/index')
          },
          {
            path: 'combination_set',
            name: `combinationSet`,
            meta: {
              title: '拼团设置',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/combination_set/index')
          },
        ]
      }
  ]
}

export default marketingRouter
