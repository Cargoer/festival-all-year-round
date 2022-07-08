<template>
	<view class="main-wrap">
		<!-- <Header :title="title"></Header> -->
    <view class="main-container">
      <view class="ops fr p-r">
        <uni-search-bar 
          :focus="searchFocus" 
          v-model="searchValue" 
          cancelButton="none"
          clearButton="none"
          placeholder="请输入节日名称"
        ></uni-search-bar>
        <view ref="file" class="btn file-btn" @click="activeFileInput">导入节日</view>
        <view class="btn file-btn" @click="exportFestival">导出节日</view>
        <view v-if="useExcel" class="btn reset-btn" @click="queryFestivalRecords">恢复默认节日</view>
        <MatchList 
          :keyword="searchValue"
          @choose="locateFestival"
        ></MatchList>
      </view>

      <uni-calendar 
        class="uni-calendar--hook" 
        :selected="festivalInCalendar" 
        :showMonth="false" 
        :start-date="firstDayOfTheYear"
        :end-date="lastDayOfTheYear"
        @change="handleCalendarChange" 
        @monthSwitch="handleMonthSwitch" 
        :date="locateDate"
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
      
      <view class="count-down-entry" @click="navToCountDown">节日倒数</view>
      
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
import MatchList from './components/matchList.vue'
import { getDateObj, getWeekBasedDate, readExcel, exportExcel } from '@/utils/tools.js'
import festivalRecords from '@/static/data/festivals.js'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      title: '每逢佳节',  // 页面标题
      selectDate: '',  // 选中日期
      festivalsOfTheDay: [],  // 选中日期的节日列表
      showDetail: false,  // 显示节日详情弹窗

      today: new Date(),
      firstDayOfTheYear: '2022-1-1',  // 日历最早选择时间
      lastDayOfTheYear: '2022-12-31',  // 日历最晚选择时间

      searchValue: '',  // 搜索框输入内容
      searchFocus: false,
      showMatch: false,
      locateDate: '',  // 点搜索结果的定位日期

      useExcel: false,  // 是否导入了excel文件
    }
  },
  components: {
    Header,
    FestivalDetail,
    MatchList,
  },
  options: {
    styleIsolation: 'shared'
  },
  computed: {
    ...mapState(["festivalTable", "festivalList"]),
    ...mapGetters(["festivalInCalendar"])
  },
  mounted() {
    window.onerror = function(event) {
      console.log("log:", event)
    }
  },
  async onLoad() {
    this.firstDayOfTheYear = `${this.today.getFullYear()}-1-1`
    this.lastDayOfTheYear = `${this.today.getFullYear()}-12-31`
    this.selectDate = `${this.today.getMonth()+1}-${this.today.getDate()}`

    uni.showLoading()
    await this.queryFestivalRecords()
    uni.hideLoading()
    
    // 展示今日节日弹窗
    this.showDetail = true

    // 选择文件
    // TODO 兼容其他端尤其是小程序端
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
      console.log("resultList:", resultList)
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
    exportFestival() {
      exportExcel(this.festivalList)
    },
    locateFestival(e) {
      console.log("locateFestival e:", e)
      this.locateDate = `${this.today.getFullYear()}-${e}`
      this.searchValue = ''
    },
    navToAdd() {
      console.log(nam)
      uni.navigateTo({
        url: `/pages/index/addFestival?selectDate=${this.selectDate}`,
      })
    },
    navToCountDown() {
      uni.navigateTo({
        url: `/pages/dayCountDown/index`
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
    .ops {
      // padding-left: 30rpx;
      margin-bottom: 25rpx;
      .btn {
        // width: 120rpx;
        padding: 10rpx 18rpx;
        // height: 40rpx;
        background-color: #2979ff;
        color: #fff;
        font-size: 30rpx;
        margin-right: 16rpx;
        border-radius: 10rpx;
      }
    }
    .count-down-entry {
      position: fixed;
      right: 30rpx;
      bottom: 30rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>
