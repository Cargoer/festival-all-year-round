<template>
	<view class="festival-detail-wrap" @click="close">
    <view class="festival-detail-container fc">
      <view class="top-date">{{ curDate }}</view>
      <swiper v-if="festivalsOfTheDay.length > 0" class="swiper" indicator-dots="true" autoplay="false" @click.stop="">
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
      <view v-else class="no-festival">
        没有节日
      </view>
    </view>
    
    <image 
      src="@/static/image/close_btn.png" 
      mode="aspectFill" 
      class="close-btn" 
      @click="close"
    ></image>
	</view>
</template>

<script>
import { getDateObj } from "@/utils/tools.js"
export default {
  props: {
    festivalsOfTheDay: {
      type: Array,
      default: [],
    },
  },
  computed: {
    curDate() {
      let { month, day } = getDateObj(new Date())
      let enterDate = this.festivalsOfTheDay?.[0]?.date || "今天"
      if(enterDate == `${month}-${day}`) {
        return '今天'
      }
      return enterDate
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

  .festival-detail-container {
    width: 600rpx;
    height: 800rpx;
    background-color: #fff;
    border-radius: 12rpx;

    .top-date {
      border-radius: 12rpx 12rpx 0 0;
      width: 100%;
      height: 100rpx;
      background-color: #666;
      color: #fff;
      text-align: center;
      line-height: 100rpx;
    }

    .swiper {
      width: 600rpx;
      height: 700rpx;
      background-color: #fff;
      border-radius: 0 0 12rpx 12rpx;
    }

    .no-festival {
      margin-top: 100rpx;
    }
  }

  

  .close-btn {
    width: 48rpx;
    height: 48rpx;
    margin-top: 30rpx;
  }
}
</style>
