<template>
  <view class="match-list">
    <view 
      class="match-item fr" 
      v-for="(item, index) in matchList" 
      :key="index"
      @click="selectItem(item)"
    >
      <view class="item-name" v-html="highlightName(item.name)"></view>
      <view class="item-date-desc">
        {{ getDateDescription(item.date) }}
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(["festivalList"]),
    matchList() {
      if(this.keyword == '') {
        return []
      }
      return this.festivalList.filter(item => {
        return item.name.includes(this.keyword)
      })
    }
  },
  methods: {
    highlightName(name) {
      return name.replaceAll(this.keyword, `<span style="color: rgb(214, 38, 38);">${this.keyword}</span>`)
    },
    getDateDescription(dateString) {
      let dateArr = dateString.split('-')
      let [month, dayOrNo, day] = dateArr
      const mapDay = ['零', '一', '二', '三', '四', '五', '六', '日']
      switch(dateArr.length) {
        case 2:
          return `${month}月${dayOrNo}日`
        case 3:
          return `${month}月第${dayOrNo}个星期${mapDay[day]}`
        default:
          return '日期格式错误'
      }
    },
    selectItem(item) {
      this.$emit('choose', item.date)
    }
  }
}
</script>

<style lang="scss" scoped>
.match-list {
  position: absolute;
  top: 100%;
  width: 100vw;
  box-shadow: 0 5rpx 8rpx rgba(0, 0, 0, 0.4);
  z-index: 9999;

  .match-item {
    width: 100%;
    height: 100rpx;
    padding-left: 40rpx;
    background-color: #fff;

    &:not(:last-child) {
      border-bottom: 1rpx solid #ccc;
    }

    .item-name {
      margin-right: 30rpx;
    }
  }
}
</style>
