<template>
  <view class="header fr" :style="withStatusBar">
    <image 
      v-if="leftBtn == 'back'"
      src="@/static/image/back.png" 
      mode="aspectFill" 
      class="back-btn" 
      @click="navBack"
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
    },
    leftBtn: {
      type: String,
      default: ''
    },
  },
  computed: {
    withStatusBar() {
      let statusHeight = uni.getSystemInfoSync().statusBarHeight
      return `padding-top: ${statusHeight}px`
    }
  },
  methods: {
    navBack() {
      uni.navigateBack()
    }
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
  border-bottom: 1px solid #b9b9b9;

  .back-btn {
    position: absolute;
    width: 56rpx;
    height: 64rpx;
    left: 30rpx;
  }

  .title {
    font-size: 36rpx;
  }
}
</style>