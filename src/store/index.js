import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    festivalList: [],
    bigEventList: [],
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
      console.log("[store] setFestivalList:", val)
      state.festivalList = val
    },
    setBigEventList(state, val) {
      console.log("[store] setBigEventList:", val)
      state.bigEventList = val
    },
    addFestival(state, val) {
      console.log("[store] addFestival:", val)
      state.festivalList.push(val)
    }
  }
})

export default store