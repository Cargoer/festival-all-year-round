<template>
	<view class="main-wrap">
		<Header :title="title"></Header>
    <view class="main-container">
      <swiper indicator-dots="true" autoplay="false">
        <swiper-item>

        </swiper-item>
      </swiper>
    </view>
	</view>
</template>

<script>
import Header from '@/components/header.vue'
import { getDateObj } from '@/utils/tools.js'
import festivals from '@/static/data/festivals.js'

export default {
  data() {
    return {
      title: '今日节日',
      festivalsOfToday: [],
    }
  },
  components: {
    Header,
  },
  onLoad() {
    let today = getDateObj(new Date())
    this.festivalsOfToday = festivals?.[today.month]?.[today.day] || []
  },
  methods: {

  }
}
</script>

<style>

</style>
