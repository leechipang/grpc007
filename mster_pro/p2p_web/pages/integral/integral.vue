<template>
  <view>
    <view class="top">
      <image src="/static/img/8.png"></image>
    </view>
    <ul class="list clear">
      <li @click="go('/pages/integral/list')" class="clear">
        <image src="/static/img/6.png"></image>
        <text>兑换明细</text>
      </li>
      <li @click="go('/pages/integral/platform')" class="clear">
        <image src="/static/img/7.png"></image>
        <text>平台积分</text>
      </li>
    </ul>
    <view class="jifen">
      <view class="dui clear">
        <text>积分兑换</text>
        <image src="/static/img/1.png"></image>
      </view>
      <ul class="det">
        <li class="clear" v-for="(item, index) in list2" :key="index">
          <view class="pro">
            <image :src="item.image"></image>
          </view>
          <view class="tit">
            <text class="name">{{ item.store_name }}</text>
            <text class="pop">{{ item.sales }}人已兑</text>
            <view class="money clear">
              <image class="bi" src="/static/img/20.png"></image>
              <text class="number">{{ item.score }}+</text>
              <text class="price">￥{{ item.price }}</text>
              <text
                @click="go('/pages/integral/product?id=' + item.product_id)"
                class="now"
                >立即兑换</text
              >
            </view>
          </view>
        </li>
      </ul>
    </view>
    <view class="more">
      <text class="dui">更多兑换</text>
      <ul class="list-d clear">
        <li
          @click="go('/pages/integral/product?id=' + item.product_id)"
          class="clear"
          v-for="(item, index) in list1"
          :key="index"
        >
          <view class="pro">
            <image :src="item.image"></image>
          </view>
          <text class="fugu">{{ item.store_name }}</text>
          <view class="money clear">
            <image
              v-if="item.score > 0"
              class="bi"
              src="/static/img/20.png"
            ></image>
            <text v-if="item.score > 0" class="number">{{ item.score }}</text>
            <text v-if="item.score > 0 && item.price != '0.00'" class="number"
              >+</text
            >
            <text v-if="item.price != '0.00'" class="price"
              >￥{{ item.price }}</text
            >
          </view>
        </li>
      </ul>
    </view>
    <loading2 :scrollCom="scrollCom"></loading2>
  </view>
</template>
<script>
import { scoreProduct } from "@/api/api.js";
export default {
  components: {},
  data() {
    return {
      list1: [],
      list2: [],
      scrollCom: {
        pageSize: 10,
        pageNo: 1,
        isLoading: false,
        now: false,
        noMore: false,
      },
    };
  },
  onShow() {
    this.list1 = [];
    this.scrollCom = {
      pageSize: 10,
      pageNo: 1,
      isLoading: false,
      now: false,
      noMore: false,
    };
    this.scoreProduct();
  },
  onLoad() {},
  onReachBottom: function () {
    if (!this.scrollCom.noMore) {
      if (this.scrollCom.isLoading) {
        this.scrollCom.pageNo++;
        this.scrollCom.isLoading = false;
        this.scrollCom.now = true;
        setTimeout(() => {
          this.scoreProduct();
        }, 300);
      }
    }
  },
  methods: {
    scoreProduct() {
      scoreProduct({
        page: this.scrollCom.pageNo,
        limit: 10,
      })
        .then((res) => {
          if (res.status == 200) {
            // this.list1 = res.data.data.list;
            this.list2 = res.data.top;

            var list = res.data.data.list;
            this.list1 = this.list1.concat(list);
            if (list.length < this.scrollCom.pageSize) {
              this.scrollCom.noMore = true;
            }
            this.scrollCom.isLoading = true;
            this.scrollCom.now = false;
          }
          console.log(this.list1);
        })
        .catch((err) => {});
    },
    go(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
page {
}
.top {
  width: 750rpx;
  height: 240rpx;
  image {
    display: block;
    width: 750rpx;
    height: 240rpx;
  }
}
.list {
  width: 698rpx;
  height: 98rpx;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 47rpx;
  li {
    position: relative;
    width: 50%;
    float: left;
    image,
    text {
      float: left;
    }
    image {
      margin-left: 91rpx;
      margin-top: 32rpx;
      width: 34rpx;
      height: 34rpx;
      display: block;
    }
    text {
      padding-left: 6rpx;
      font-size: 32rpx;
      line-height: 98rpx;
      color: #202020;
    }
  }
  li:nth-child(2):after {
    content: "";
    display: block;
    width: 2rpx;
    height: 34rpx;
    background-color: #f2f2f2;
    position: absolute;
    top: 31rpx;
    left: 0;
  }
}
.jifen {
  padding: 0 30rpx;
  margin-top: 16rpx;
  background-color: #fff;
  .dui {
    text,
    image {
      float: left;
    }
    text {
      font-size: 34rpx;
      line-height: 110rpx;
      color: #202020;
      font-weight: bold;
      padding-right: 10rpx;
    }
    image {
      width: 128rpx;
      height: 38rpx;
      margin-top: 36rpx;
    }
  }
  .det {
    li {
      border-bottom: 1px solid #f6f6f6;
      padding-bottom: 26rpx;
      padding-top: 26rpx;
      .pro {
        background-color: #f9f9fb;
        float: left;
        width: 200rpx;
        height: 200rpx;
        image {
          width: 154rpx;
          height: 154rpx;
          display: block;
          margin: 0 auto;
          margin-top: 23rpx;
        }
      }
      .tit {
        padding-left: 18rpx;
        width: 488rpx;
        float: left;
        .name {
          font-size: 28rpx;
          color: #403c54;
        }
        .pop {
          font-size: 24rpx;
          line-height: 24rpx;
          color: #cac8cb;
          display: block;
          padding-top: 20rpx;
          padding-bottom: 12rpx;
        }
        .money {
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
          .now {
            float: right;
            background-color: #febd4a;
            line-height: 58rpx;
            color: #fff;
            padding: 0 21rpx;
            border-radius: 29rpx;
          }
        }
      }
    }
  }
}
.more {
  .dui {
    display: block;
    font-size: 34rpx;
    line-height: 110rpx;
    color: #202020;
    font-weight: bold;
    padding-right: 10rpx;
    background-color: #fff;
    padding-left: 30rpx;
  }
  .list-d {
    padding: 0 26rpx;
    padding-right: 16rpx;
    margin-top: 18rpx;
    li {
      width: 344rpx;
      background-color: #fff;
      float: left;
      margin-right: 10rpx;
      margin-bottom: 16rpx;
      border-radius: 16rpx;
      overflow: hidden;
      padding-bottom: 10rpx;
      .fugu {
        width: 344rpx;
        height: 84rpx;
        overflow: hidden;

        font-weight: bold;
        padding: 22rpx 22rpx;
        padding-bottom: 0rpx;
        display: block;
        font-size: 28rpx;
        line-height: 34rpx;
        color: #403c54;
      }
      .pro {
        width: 344rpx;
        height: 344rpx;
        image {
          display: block;
          width: 344rpx;
          height: 344rpx;
        }
      }
      .money {
        margin-left: 22rpx;
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
}
</style>
