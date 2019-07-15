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
        seasonData: []
    },
    getters: {
        currentWeek: (state) => {
            return state.currentWeek < 1 ? DateUtils.getCurrentWeek(state.deadlines) : state.currentWeek
        },
        matchups: (state) => (week) => {
            return state.seasonData.filter(function (matchup) {
                return matchup.week === week
            });
        },
    },
    mutations: {
        SET_SEASON_DATA: (state, seasonData) => {
            state.seasonData = seasonData
        },
        SET_DEADLINES: (state, deadlines) => {
            state.deadlines = deadlines
        },
        SET_CURRENT_WEEK: (state, currentWeek) => {
            state.currentWeek = currentWeek
        }
    },
    actions: {
        setCurrentWeek({commit}, week) {
            commit('SET_CURRENT_WEEK', week)
        },
        async loadSeasonData({commit}, params) {
            const seasonData = await GuruService.getSeasonData(params.season)
            commit('SET_SEASON_DATA', seasonData)
            let deadlines = DateUtils.getDeadlines(seasonData)
            commit('SET_DEADLINES', deadlines)
            commit('SET_CURRENT_WEEK', DateUtils.getCurrentWeek(deadlines))
        }
    }
})