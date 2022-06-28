<template>
	<view class="main-wrap">
		<Header :title="title"></Header>
    <view class="main-container">
      <uni-calendar 
        class="uni-calendar--hook" 
        :selected="selectedInfo" 
        :showMonth="false" 
        :start-date="firstDayOfTheYear"
        :end-date="lastDayOfTheYear"
        @change="handleCalendarChange" 
        @monthSwitch="handleMonthSwitch" 
      />
      <view class="bottom-area">
        <view class="simple-festival-info">
          <view class="simple-festival-name" v-for="(item, index) in festivalsOfTheDay" :key="index">
            {{ item.name }}
          </view>
        </view>
        <!-- #ifndef MP-WEIXIN -->
        <image 
          src="@/static/image/add.png" 
          mode="aspectFill" 
          class="add-btn" 
          @click="navToAdd"
        ></image>
        <!-- #endif -->
      </view>
      <FestivalDetail
        v-show="showDetail"
        :festivalsOfTheDay="festivalsOfTheDay"
        @close="showDetail = false"
      ></FestivalDetail>
    </view>
	</view>
</template>

<script>
import Header from '@/components/header.vue'
import FestivalDetail from './components/festivalDetail.vue'
import { getDateObj, getWeekBasedDate } from '@/utils/tools.js'
import festivalRecords from '@/static/data/festivals.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title: '每逢佳节',
      festivals: [],
      selectedInfo: [],
      selectDate: '',
      festivalsOfTheDay: [],
      showDetail: false,

      today: new Date(),
      firstDayOfTheYear: '2022-1-1',
      lastDayOfTheYear: '2022-12-31',
    }
  },
  components: {
    Header,
    FestivalDetail
  },
  options: {
    styleIsolation: 'shared'
  },
  computed: {
    ...mapState(["festivalTable"])
  },
  async onLoad() {
    this.firstDayOfTheYear = `${this.today.getFullYear()}-1-1`
    this.lastDayOfTheYear = `${this.today.getFullYear()}-12-31`

    uni.showLoading()
    await this.queryFestivalRecords()
    uni.hideLoading()

    let year = this.today.getFullYear()
    this.selectedInfo = this.festivals.map(item => {
      return {
        date: `${year}-${item.date}`,
        info: item.name
      }
    })
    console.log(this.selectedInfo)
  },
  methods: {
    async queryFestivalRecords() {
      let tempFestivals
      // 静态模式
      // #ifdef MP-WEIXIN
      tempFestivals = festivalRecords
      // #endif

      // airtable
      // #ifndef MP-WEIXIN
      tempFestivals = await this.festivalTable.getRecords()
      // #endif

      let regularFestivals = tempFestivals.filter(item => item.type == 'regular')
      let weekBasedFestivals = tempFestivals.filter(item => item.type == 'weekbased').map(item => {
        let [month, weekno, dayno] = item.date.split('-').map(item => Number(item))
        item.date = getWeekBasedDate(this.today.getFullYear(), month, weekno, dayno)
        return item
      })
      this.festivals = [...regularFestivals, ...weekBasedFestivals]
      console.log("festivals:", this.festivals)
    },
    handleCalendarChange(e) {
      console.log("calendar change:", e)
      if(e) {
        this.festivalsOfTheDay = this.festivals.filter(item => {
          return item.date == `${+e.month}-${e.date}`
        })
        console.log("festivalsOfTheDay:", this.festivalsOfTheDay)
        if(this.festivalsOfTheDay.length > 0) {
          this.showDetail = true
        }
      }
    },
    handleMonthSwitch(e) {
      console.log("month switch:", e)
    },
    navToAdd() {
      uni.navigateTo({
        url: '/pages/index/addFestival'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  ::v-deep.uni-calendar-item--hook {
    height: 120rpx;
  }
  .main-container {
    position: relative;
    padding-top: 40rpx;
    .bottom-area {
      position: relative;
      margin-top: 30rpx;
      .simple-festival-name {
        margin-left: 30rpx;
        margin-bottom: 8rpx;
      }
      .add-btn {
        position: absolute;
        top: 10rpx;
        right: 25rpx;
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
}
</style>
