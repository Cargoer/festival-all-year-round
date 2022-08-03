<template>
  <view class="day-count-down-wrap">
    <view class="count-down-list">
      <view class="count-down-item fr" v-for="(item, index) in countDownList" :key="index">
        距
        <span class="festival-name">{{item.name}}</span> 
        <!-- <span class="description">{{getDescription(item)}}</span> -->
        还有
        <span class="num">{{getRemainDay(item.date)}}</span>
        天
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      commonFestival: [
        {
          name: '元旦',
          date: '1-1',
          label: ['放假'],
        },
        {
          name: '劳动节',
          date: '5-1',
          label: ['放假'],
        },
        {
          name: '国庆节',
          date: '10-1',
          label: ['放假'],
        },
      ],
      countDownList: [],
    }
  },
  onLoad() {
    this.countDownList = this.commonFestival
  },
  methods: {
    getDescription() {
      // 若采用假期的说法，有可能节日当天并不是假期的第一天，导致天数计算错误
      let vacation = ['1-1', '5-1']
    },
    getRemainDay(date) {
      let today = new Date(new Date().toLocaleDateString())
      let [month, day] = date.split('-').map(item => Number(item))
      let dateInTheYear = new Date(
        today.getFullYear(), 
        month-1, 
        day,
      )
      if(dateInTheYear < today) return
      return Math.floor((dateInTheYear - today) / (24 * 60 * 60 * 1000))
    }
  }
}
</script>

<style lang="scss" scoped>
.day-count-down-wrap {

  .count-down-list {
    margin-top: 30rpx;
    padding: 0 40rpx;

    .count-down-item {
      height: 100rpx;
      line-height: 100rpx;
      // margin-left: 40rpx;
      border-bottom: 1px solid #ccc;

      .festival-name {
        font-weight: bold;
      }

      .num {
        color: #FF5122;
      }
    }
  }
}
</style>
