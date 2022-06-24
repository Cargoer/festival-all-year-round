<template>
  <view class="header fr" :style="withStatusBar">
    <image 
      src="@/static/image/back.png" 
      mode="aspectFill" 
      class="back-btn" 
    ></image>
    <view class="title">{{ title }}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    withStatusBar() {
      let statusHeight = uni.getSystemInfoSync().statusBarHeight
      return `padding-top: ${statusHeight}px`
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 88rpx;
  justify-content: center;
  position: sticky;
  top: 0;

  .back-btn {
    position: absolute;
    width: 56rpx;
    height: 64rpx;
    left: 11rpx;
  }

  .title {
    font-size: 36rpx;
  }
}
</style>