<template>
  <view>
    <view class="bgc"></view>
    <view class="ge">
      <image src="/static/img/14.png"></image>
    </view>
    <view class="cont">
      <view class="bili">
        <image src="/static/img/11.png"></image>
        <text>积分比例及当前积分</text>
      </view>
      <ul class="tit clear">
        <li>
          <text>平台</text>
        </li>
        <li>
          <text>原积分</text>
        </li>
        <li>
          <text>比例</text>
        </li>
        <li>
          <text>当前积分</text>
        </li>
      </ul>
      <ul
        v-for="(item, index) in det.userScore"
        :key="index"
        class="list clear"
      >
        <li class="logo">
          <image style="border-radius: 50%" :src="item.merchant.logo"></image>
          <text>{{ item.merchant.name | string(4) }}</text>
        </li>
        <li>
          <text>{{ item.mer_score }}</text>
        </li>
        <li>
          <text>{{ item.merchant.rate_to_us }}:1</text>
        </li>
        <li>
          <text>{{ item.score }}</text>
        </li>
      </ul>
      <view class="rule">
        <text class="shi">{{ det.scoreArticle.title }}</text>
        <view v-html="det.scoreArticle.content.content" class="ru-list">
          <!-- <text>1.每次兑换商品仅能使用一个平台的积分作为兑换积分</text>
          <text>2.每个平台的兑换比例都不相同，请注意</text>
          <text>3.商品显示的积分是兑换后需要支付的积分</text>
          <text>4.兑换积分后，不能退回，请注意</text> -->
        </view>
      </view>
    </view>
    <view style="height: 100rpx"></view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import { scoreArticle } from "@/api/api.js";
export default {
  computed: mapGetters(["isLogin"]),
  components: {},
  data() {
    return {
      det: {
        scoreArticle: {
          content: "",
        },
      },
    };
  },
  onShow() {
    if (!this.isLogin) {
      uni.navigateTo({
        url: "/pages/users/login/index",
      });
    }
    this.scoreArticle();
  },
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
  onLoad() {},
  methods: {
    scoreArticle() {
      scoreArticle({})
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
  background-color: #fef9e3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ge {
  position: relative;
  z-index: 1;
  width: 750rpx;
  height: 397rpx;
  image {
    display: block;
    width: 750rpx;
    height: 397rpx;
  }
}
.cont {
  position: relative;
  z-index: 1;
  background-color: #fff3d9;
  width: 666rpx;
  border-radius: 19rpx;
  margin: 0 auto;
  margin-top: -134rpx;
  padding-top: 28rpx;
  .bili {
    margin: 0 auto;
    width: 467rpx;
    height: 76rpx;
    position: relative;
    image {
      display: block;
      width: 467rpx;
      height: 76rpx;
    }
    text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 34rpx;
      line-height: 34rpx;
      color: #f9eccc;
      width: 100%;
      text-align: center;
    }
  }
  .tit {
    background-color: #ffdcb0;
    width: 610rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    li:nth-child(1) {
      width: 217rpx;
    }
    li:nth-child(2) {
      width: 140rpx;
    }
    li:nth-child(3) {
      width: 120rpx;
    }
    li:nth-child(4) {
      width: 134rpx;
    }
    li {
      float: left;
      text {
        display: block;
        text-align: center;
        font-size: 28rpx;
        line-height: 76rpx;
        color: #d96400;
      }
    }
  }
  .list {
    width: 610rpx;
    margin: 0 auto;
    box-sizing: border-box;
    border-left: 1px solid #ffe9c7;
    li:nth-child(1) {
      width: 214rpx;
    }
    li:nth-child(2) {
      width: 140rpx;
    }
    li:nth-child(3) {
      width: 120rpx;
    }
    li:nth-child(4) {
      width: 134rpx;
    }
    li {
      border-right: 1px solid #ffe9c7;
      border-bottom: 1px solid #ffe9c7;
      box-sizing: border-box;
      float: left;
      height: 100rpx;
      text {
        display: block;
        text-align: center;
        font-size: 28rpx;
        line-height: 100rpx;
        color: #d96400;
      }
    }
    .logo {
      image,
      text {
        float: left;
      }
      text {
        padding-left: 4rpx;
      }
      image {
        margin-left: 20rpx;
        margin-top: 30rpx;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .rule {
    padding: 46rpx 28rpx;
    padding-bottom: 28rpx;
    .shi {
      font-size: 30rpx;
      line-height: 30rpx;
      color: #d96400;
      display: block;
      padding-bottom: 21rpx;
    }
    .ru-list {
      font-size: 28rpx;
      line-height: 44rpx;
      color: #fc9238;
      text {
        display: block;
      }
    }
  }
}
</style>
