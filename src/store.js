import Vue from 'vue'
import Vuex from 'vuex'
import GuruService from '@/services/GuruService.js'
// import TimeService from '@/services/TimeService.js'
import DateUtils from '@/utils/DateUtils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameData: [],
    currentWeek: 1,
    currentSeason: 2019,
    matchups: [],
  },
  getters: {
    currentSpreadStatus: (state) => {
      const matchups = state.matchups
      let spreadsSet = true
      for (let index = 0; index < matchups.length; index++) {
        const matchup = matchups[index]
        if (!matchup.hasOwnProperty('spread') || !matchup.spread) {
          spreadsSet = false
          break
        }
      }
      return spreadsSet
    },
    currentPredictionStatus: (state) => {
      const matchups = state.matchups
      let predictionsSet = true
      for (let index = 0; index < matchups.length; index++) {
        const matchup = matchups[index]
        if (
          !matchup.hasOwnProperty('phs') ||
          !matchup.phs ||
          !matchup.hasOwnProperty('pvs') ||
          !matchup.pvs
        ) {
          predictionsSet = false
          break
        }
      }
      return predictionsSet
    },
  },
  mutations: {
    SET_GAME_DATA: (state, gameData) => {
      state.gameData = gameData
    },
    UPDATE_SPREAD: (state, game) => {
      for (let index = 0; index < state.gameData.length; index++) {
        let g = state.gameData[index]
        if (g.id === game.id) {
          g.spread = game.spread
        }
      }
    },
  },
  actions: {
    async loadGameData({ commit, state }) {
      const gameData = await GuruService.getGameData()

      const week = gameData.reduce((min, g) => {
        return g.week < min ? g.week : min;
      });

      state.currentWeek = week

      let now = new Date()
      let month = now.getMonth()
      let season = now.getFullYear()
      if (month < 2) {
        season -= season
      }
      state.currentSeason = season

      const matchups = gameData.filter(val => {
        return (val.gd == 0 && val.season == season && val.week == week);
      });

      state.matchups = matchups
      commit('SET_GAME_DATA', gameData)
    },
    async setSpread({ commit }, params) {
      JSON.stringify(params)
      if (
        params.hasOwnProperty('id') &&
        params.id != null &&
        params.hasOwnProperty('spread') &&
        params.spread != null
      ) {
        const game = await GuruService.updateSpread(params.id, params.spread, params.phs, params.pvs)
        commit('UPDATE_SPREAD', game)
      }
    },
  },
})
