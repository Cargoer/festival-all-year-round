// import Airtable from 'airtable'
import Vue from 'vue'
import Vuex from 'vuex'
import festivalAirtable from '@/api/airtable.js'
Vue.use(Vuex);

const apiKey = ''
const baseKey = ''
const tableName = 'festivals_test'

const store = new Vuex.Store({
  state: {
    festivalList: [],
    festivalTable: new festivalAirtable(apiKey, baseKey, tableName)
  },
  getters: {
    festivalInCalendar(state) {
      let year = new Date().getFullYear()
      return state.festivalList.map(item => {
        return {
          date: `${year}-${item.date}`,
          info: item.name
        }
      })
    }
  },
  mutations: {
    setFestivalList(state, val) {
      state.festivalList = val
    },
    addFestival(state, val) {
      state.festivalList.push(val)
    }
  }
})

export default store