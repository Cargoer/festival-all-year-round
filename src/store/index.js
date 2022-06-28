// import Airtable from 'airtable'
import Vue from 'vue'
import Vuex from 'vuex'
import festivalAirtable from '@/api/airtable.js'
Vue.use(Vuex);

const apiKey = 'keyZ4ydi5sz7NHOIZ'
const baseKey = 'appDaegi6Z13k4i06'
const tableName = 'festivals_test'

const store = new Vuex.Store({
  state: {
    festivalList: [],
    festivalTable: new festivalAirtable(apiKey, baseKey, tableName)
  },
})

export default store