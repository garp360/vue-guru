import Vue from 'vue'
import Vuex from 'vuex'
import GuruService from '@/services/GuruService.js'
// import TimeService from '@/services/TimeService.js'
import DateUtils from '@/utils/DateUtils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeek: -1,
    deadlines: [],
    gameData: [],
  },
  getters: {
    currentWeek: (state) => {
      return state.currentWeek < 1
        ? DateUtils.getCurrentWeek(state.deadlines)
        : state.currentWeek
    },
    matchups: (state) => (week) => {
      return state.gameData.filter(function(matchup) {
        return matchup.week === week
      })
    },
    teamData: (state) => (params) => {
      return state.gameData.filter(function(matchup) {
        return matchup.week === week
      })
    }
  },
  mutations: {
    SET_SEASON_DATA: (state, gameData) => {
      state.gameData = gameData
    },
    SET_DEADLINES: (state, deadlines) => {
      state.deadlines = deadlines
    },
    SET_CURRENT_WEEK: (state, currentWeek) => {
      state.currentWeek = currentWeek
    },
  },
  actions: {
    setCurrentWeek({ commit }, week) {
      commit('SET_CURRENT_WEEK', week)
    },
    async loadGameData({ commit }, params) {
      const gameData = await GuruService.getGameData(params.season)
      commit('SET_SEASON_DATA', gameData)
      let deadlines = DateUtils.getDeadlines(gameData)
      commit('SET_DEADLINES', deadlines)
      commit('SET_CURRENT_WEEK', DateUtils.getCurrentWeek(deadlines))
    },
    updateSpread({commit}, )
  },
})
