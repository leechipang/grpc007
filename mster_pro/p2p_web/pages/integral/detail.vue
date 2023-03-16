<template>
  <view>
    <view class="bgc"></view>
    <ul class="list">
      <li>
        <view
          @click="go('/pages/store/home/index?id=' + det.merchant.mer_id)"
          class="nan clear"
        >
          <image src="/static/img/9.png"></image>
          <text>{{ det.merchant.mer_name }}</text>
          <image src="/static/img/10.png"></image>
        </view>
        <view class="produ clear" v-if="det.StoreCart">
          <view class="pic">
            <image :src="det.StoreCart.product.image"></image>
          </view>
          <view class="det">
            <text class="name">{{
              det.StoreCart.product.store_name | string(17)
            }}</text>
            <text class="chi"
              >{{ det.StoreCart.productAttr.sku }} X{{ det.total_num }}</text
            >
            <view class="pri">
              <image class="bi" src="/static/img/20.png"></image>
              <text class="number">{{ det.score }}</text>
              <text class="price">+￥{{ det.total_price }}</text>
            </view>
          </view>
        </view>
      </li>
    </ul>
    <view class="address">
      <view class="name">
        <text>{{ det.real_name }}</text>
        <text>{{ det.user_phone }}</text>
      </view>
      <view class="default">
        <text></text>
        <text>{{ det.user_address }}</text>
      </view>
    </view>
    <ul class="type">
      <li>
        <text>配送方式</text>
        <text>{{ det.order_type }}</text>
      </li>
      <li>
        <text>快递费用</text>
        <text>+￥{{ det.pay_postage }}</text>
      </li>
      <!-- <li v-if="det.p2pMerchant">
        <text>积分平台</text>
        <text>{{ det.p2pMerchant.name }}</text>
      </li> -->
      <li>
        <text>兑换积分</text>
        <text>{{ det.score }}积分</text>
      </li>
      <li>
        <text>附加金额</text>
        <text>￥{{ det.total_price }}</text>
      </li>
      <li>
        <text>订单状态</text>
        <text>{{ det.status }}</text>
      </li>
      <li>
        <text>订单号</text>
        <text>{{ det.order_sn }}</text>
      </li>
      <li>
        <text>兑换时间</text>
        <text>{{ det.pay_time }}</text>
      </li>
    </ul>
  </view>
</template>
<script>
import { detail } from "@/api/api.js";
export default {
  components: {},
  data() {
    return {
      det: {
        merchant: {},
        StoreCart: {
          product: {},
          productAttr: {},
        },
        p2pMerchant: {},
      },
    };
  },
  onShow() {},
  onLoad(e) {
    this.detail(e.id);
  },
  methods: {
    go(url) {
      uni.navigateTo({
        url: url,
      });
    },
    detail(id) {
      detail(id)
        .then((res) => {
          if (res.status == 200) {
            this.det = res.data;
          }
          console.log(res);
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
page {
}
.bgc {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.list {
  position: relative;
  z-index: 1;
  li {
    padding: 0 22rpx;
    border-bottom: 12rpx solid #f6f6f6;
    background-color: #fff;
    .nan {
      image,
      text {
        float: left;
      }
      image:nth-child(1) {
        width: 34rpx;
        height: 32rpx;
        display: block;
        margin-top: 35rpx;
      }
      text:nth-child(2) {
        display: block;
        padding-left: 16rpx;
        font-size: 28rpx;
        line-height: 100rpx;
        color: #202020;
      }
      image:nth-child(3) {
        margin-left: 8rpx;
        margin-top: 42rpx;
        width: 12rpx;
        height: 18rpx;
        display: block;
      }
      text:nth-child(4) {
        float: right;
        display: block;
        font-size: 32rpx;
        line-height: 100rpx;
        color: #e7381d;
      }
    }
    .produ {
      border-bottom: 1px solid #f6f6f6;
      padding-bottom: 22rpx;
      .pic {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        overflow: hidden;
        float: left;
        image {
          width: 140rpx;
          height: 140rpx;
        }
      }
      .det {
        width: 545rpx;
        float: left;
        margin-left: 16rpx;
        .name {
          font-weight: bold;
          font-size: 28rpx;
          line-height: 28rpx;
          color: #403c54;
        }
        .chi {
          font-size: 24rpx;
          line-height: 24rpx;
          color: #818181;
          display: block;
          padding-top: 10rpx;
        }
        .pri {
          padding-top: 6rpx;
          image,
          text {
            float: left;
          }
          .bi {
            margin-right: 4rpx;
            margin-top: 14rpx;
            display: block;
            width: 30rpx;
            height: 30rpx;
          }
          .number {
            font-size: 28rpx;
            line-height: 58rpx;
            color: #ff352c;
            font-weight: bold;
          }
          .price {
            font-size: 24rpx;
            line-height: 58rpx;
            color: #ff352c;
            font-weight: bold;
          }
        }
      }
    }
    .order {
      font-size: 28rpx;
      line-height: 80rpx;
      color: #303030;
    }
  }
}
.address {
  position: relative;
  z-index: 1;
  padding: 0 28rpx;
  padding-top: 14rpx;
  padding-bottom: 26rpx;
  border-bottom: 12rpx solid #f6f6f6;
  .name {
    padding-bottom: 14rpx;
    text {
      font-size: 32rpx;
      line-height: 32rpx;
      color: #403c54;
      font-weight: bold;
      padding-right: 30rpx;
    }
  }
  .default {
    text:nth-child(1) {
      font-size: 28rpx;
      line-height: 28rpx;
      color: #dc7987;
    }
    text:nth-child(2) {
      padding-left: 13rpx;
      font-size: 28rpx;
      line-height: 28rpx;
      color: #5e5e5e;
    }
  }
}
.type {
  padding-top: 10rpx;
  position: relative;
  z-index: 1;
  li {
    padding: 28rpx;
    padding-bottom: 0;
    text {
      font-size: 30rpx;
      line-height: 30rpx;
      color: #202020;
    }
    text:nth-child(2) {
      color: #818181;
      float: right;
    }
  }
}
</style>
