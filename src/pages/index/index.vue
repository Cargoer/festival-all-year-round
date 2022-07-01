<template>
	<view class="main-wrap">
		<!-- <Header :title="title"></Header> -->
    <view class="main-container">
      <uni-calendar 
        class="uni-calendar--hook" 
        :selected="festivalInCalendar" 
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
      <!-- <uni-file-picker limit="1" title="请选择excel文件" @select="handleFileSelect"></uni-file-picker> -->
      
      <view class="buttons fr">
        <view ref="file" class="btn file-btn" @click="activeFileInput">导入节日</view>
        <view v-if="useExcel" class="btn reset-btn" @click="queryFestivalRecords">恢复默认节日</view>
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
import { getDateObj, getWeekBasedDate, readExcel } from '@/utils/tools.js'
import festivalRecords from '@/static/data/festivals.js'
import { mapState, mapGetters, mapMutations } from 'vuex'

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

      useExcel: false
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
    ...mapState(["festivalTable", "festivalList"]),
    ...mapGetters(["festivalInCalendar"])
  },
  async onLoad() {
    this.firstDayOfTheYear = `${this.today.getFullYear()}-1-1`
    this.lastDayOfTheYear = `${this.today.getFullYear()}-12-31`
    this.selectDate = `${this.today.getMonth()+1}-${this.today.getDate()}`

    uni.showLoading()
    await this.queryFestivalRecords()
    uni.hideLoading()

    // let year = this.today.getFullYear()
    // this.selectedInfo = this.festivals.map(item => {
    //   return {
    //     date: `${year}-${item.date}`,
    //     info: item.name
    //   }
    // })
    
    // 展示今日节日弹窗
    // this.festivalsOfTheDay = this.festivalList.filter(item => {
    //   return item.date == this.selectDate
    // })
    this.showDetail = true

    // 选择文件
    let fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.id = 'file-input'
    fileInput.style.display = 'none'
    fileInput.onchange = (e) => {
      this.handleFileSelect(e)
    }
    document.body.appendChild(fileInput)
  },
  methods: {
    ...mapMutations(["setFestivalList"]),
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
      let resultList = [...regularFestivals, ...weekBasedFestivals]
      this.setFestivalList(resultList)
      this.festivalsOfTheDay = this.festivalList.filter(item => {
        return item.date == this.selectDate
      })
      this.useExcel = false
    },
    handleCalendarChange(e) {
      console.log("calendar change:", e)
      let eDate = `${+e.month}-${e.date}`
      if(eDate == this.selectDate) {
        if(this.festivalsOfTheDay.length > 0) {
          this.showDetail = true
        }
      } else {
        this.selectDate = eDate
        this.festivalsOfTheDay = this.festivalList.filter(item => {
          return item.date == eDate
        })
        console.log("festivalsOfTheDay:", this.festivalsOfTheDay)
      }
    },
    handleMonthSwitch(e) {
      console.log("month switch:", e)
    },
    activeFileInput() {
      $("#file-input").click()
    },
    async handleFileSelect(e) {
      console.log("handleFileSelect e:", e.target.files)
      let fileData = await readExcel(e.target.files[0])
      console.log("fileData:", fileData)
      this.setFestivalList(fileData)
      this.useExcel = true
    },
    navToAdd() {
      uni.navigateTo({
        url: `/pages/index/addFestival?selectDate=${this.selectDate}`,
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
    .buttons {
      .btn {
        // width: 120rpx;
        padding: 0 20rpx;
        // height: 40rpx;
        background-color: #2979ff;
        color: #fff;
        font-size: 32rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
