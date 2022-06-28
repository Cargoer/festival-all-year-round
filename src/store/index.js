// import Airtable from 'airtable'
import Vue from 'vue'
import Vuex from 'vuex'
import festivalAirtable from '@/api/airtable.js'
Vue.use(Vuex);

const apiKey = 'YOUR_API_KEY'
const baseKey = 'YOUR_BASE_KEY'
const tableName = 'festivals_test'

const store = new Vuex.Store({
  state: {
    festivalList: [],
    festivalTable: new festivalAirtable(apiKey, baseKey, tableName)
  },
})

export default store