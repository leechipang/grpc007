<template>
  <view>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        <view
          @click="go('/pages/store/home/index?id=' + item.mer_id)"
          class="nan clear"
        >
          <image src="/static/img/9.png"></image>
          <text>{{ item.merchant.mer_name }}</text>
          <image src="/static/img/10.png"></image>
          <text>{{ item.status }}</text>
        </view>
        <view
          @click="go('/pages/integral/detail?id=' + item.order_id)"
          class="produ clear"
        >
          <view class="pic">
            <image :src="item.StoreCart.product.image"></image>
          </view>
          <view class="det">
            <text class="name">{{
              item.StoreCart.product.store_name | string(17)
            }}</text>
            <text class="chi"
              >{{ item.StoreCart.productAttr.sku }} X{{ item.total_num }}</text
            >
            <view class="pri">
              <image
                class="bi"
                v-if="item.score > 0"
                src="/static/img/20.png"
              ></image>
              <text class="number" v-if="item.score > 0">{{ item.score }}</text>
              <text class="price" v-if="item.total_price != '0.00'"
                >+￥{{ item.total_price }}</text
              >
            </view>
          </view>
        </view>
        <text class="order">订单号：{{ item.order_sn }}</text>
      </li>
    </ul>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import { order } from "@/api/api.js";
export default {
  computed: mapGetters(["isLogin"]),
  components: {},
  data() {
    return {
      list: [],
    };
  },
  onShow() {
    if (!this.isLogin) {
      uni.navigateTo({
        url: "/pages/users/login/index",
      });
    }

    this.list = [];
    this.order();
  },
  onLoad() {},
  filters: {
    string(value, number) {
      if (value == undefined) {
        return "";
      }
      if (value.length > number) {
        return value.slice(0, number) + "...";
      } else {
        return value;
      }
    },
  },
  methods: {
    go(url) {
      uni.navigateTo({
        url: url,
      });
    },
    order() {
      order({
        page: 1,
        limit: 10,
      })
        .then((res) => {
          if (res.status == 200) {
            this.list = res.data;
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
.list {
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
</style>
