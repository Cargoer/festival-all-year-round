<template>
  <view class="add-festival-wrap">
    <Header title="添加节日" leftBtn="back"></Header>
    <view class="add-festival-container fc p-r">
      <uni-forms class="form" ref="baseForm" :modelValue="baseFormData" :rules="rules">
        <uni-forms-item label="节日名称" required name="name">
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入节日名称" />
        </uni-forms-item>
        <uni-forms-item label="节日类型" required name="type">
          <uni-data-checkbox v-model="baseFormData.type" :localdata="festivalTypes" />
        </uni-forms-item>
        <uni-forms-item label="所在日期" v-if="baseFormData.type == 'regular'" required name="date">
          <uni-easyinput v-model="baseFormData.date" placeholder="例：3-15" />
        </uni-forms-item>
        <uni-forms-item label="所在日期" v-if="baseFormData.type == 'weekbased'" required name="date">
          <uni-easyinput v-model="baseFormData.date" placeholder="例：6-3-5，含义：6月第3个星期五" />
        </uni-forms-item>
        <uni-forms-item label="节日图片">
          <uni-easyinput v-model="baseFormData.image" placeholder="请输入相关图片链接" />
        </uni-forms-item>
        <uni-forms-item label="节日介绍">
          <uni-easyinput type="textarea" v-model="baseFormData.description" placeholder="请输入相关介绍，不超过40个字" maxlength="40" />
        </uni-forms-item>
      </uni-forms>
      <view class="submit-btn p-a" @click="submit">添加</view>
    </view>
  </view>
</template>

<script>
import Header from '@/components/header.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      baseFormData: {
        name: '',
        date: '',
        type: '',
        image: '',
        description: ''
      },
      festivalTypes: [
        { text: '公历日期', value: 'regular' },
        { text: '根据星期', value: 'weekbased' },
        // { text: '农历日期', value: 'lunar' },
      ],
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '节日名称不能为空'
          }]
        },
        type: {
          rules: [{
            required: true,
            errorMessage: '节日类型不能为空'
          }]
        },
        date: {
          rules: [{
            required: true,
            errorMessage: '所在日期不能为空'
          }]
        },
      },
    }
  },
  components: {
    Header,
  },
  computed: {
    ...mapState(["festivalTable"])
  },
  methods: {
    // TODO
    // 提交后无法自动从airtable同步刷新，可以再存一份到本地
    submit() {
      this.$refs["baseForm"].validate().then(res => {
        console.log('pass validate:', res);
        // 添加接口
        this.festivalTable.addRecord(this.baseFormData).then(res => {
          uni.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000,
            complete() {
              uni.navigateBack()
            }
          })
        }).catch(err => {
          uni.showToast({
            title: '添加失败' + err?.message,
            icon: 'none',
          })
        })
      }).catch(err => {
        console.log('validate err', err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.add-festival-wrap {
  .add-festival-container {
    min-height: calc(100vh - 88rpx);
    // padding: 20px 30px;
    .form {
      margin-top: 40rpx;
      width: 660rpx;
    }
    .submit-btn {
      width: 680rpx;
      height: 100rpx;
      bottom: 48rpx;
      border-radius: 12rpx;
      background-color: #2979ff;
      color: #fff;
      text-align: center;
      line-height: 100rpx;
    }
  }
}
</style>