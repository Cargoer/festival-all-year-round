<template>
	<view class="festival-detail-wrap" @click="close">
    <swiper class="swiper" indicator-dots="true" autoplay="false" @click.stop="">
      <swiper-item v-for="(item, index) in festivalsOfTheDay" :key="index" class="swiper-item fc">
        <image 
          :src="item.image" 
          mode="aspectFill" 
          class="festival-image" 
        ></image>
        <view class="festival-name">{{ item.name }}</view>
        <view class="festival-desc">{{ item.description }}</view>
      </swiper-item>
    </swiper>
    <image 
      src="@/static/image/close_btn.png" 
      mode="aspectFill" 
      class="close-btn" 
      @click="close"
    ></image>
	</view>
</template>

<script>
export default {
  props: {
    festivalsOfTheDay: {
      type: Array,
      default: [],
    }
  },
  methods: {
    close() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.festival-detail-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 88rpx);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);

  .swiper {
    width: 600rpx;
    height: 800rpx;
    background-color: #fff;
    border-radius: 12rpx;
  }

  .close-btn {
    width: 48rpx;
    height: 48rpx;
    margin-top: 30rpx;
  }
}
</style>
