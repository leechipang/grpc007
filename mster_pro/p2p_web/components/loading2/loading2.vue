<template>
  <view>
    <view class="loading">
      <text v-if="scrollCom.now">加载中...</text>
      <text v-if="scrollCom.noMore">没有更多了...</text>
    </view>
  </view>
</template>

<script>
export default {
  onShow() {},
  onLoad() {},
  props: {
    scrollCom: {
      now: false,
      noMore: false,
    },
  },
};
</script>

<style lang="scss" scoped>
page {
}
.loading {
  position: relative;
  z-index: 10;
  text {
    display: block;
    text-align: center;
    color: #666;
    padding: 20rpx 0;
    font-size: 26rpx;
  }
}
</style>
