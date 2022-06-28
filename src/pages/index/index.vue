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
import { getDateObj } from '@/utils/tools.js'
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

    // 静态模式
    this.festivals = festivalRecords

    // 采用airtable
    // uni.showLoading()
    // await this.queryFestivalRecords()
    // uni.hideLoading()

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
      this.festivals = await this.festivalTable.getRecords()
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
  }
}
</style>
