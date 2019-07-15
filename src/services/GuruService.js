import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:5000/`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getSeasonData: async function ( season ) {
        const query = '/matchups?season=' + season
        const results = await api.get(query)
        const data = results.data
        return data
    },
    // getMatchups: async function (season, week) {
    //     const query = '/matchups?season=' + season + "&week=" + week
    //     const schedule = await api.get(query)
    //     const matchups = schedule.data
    //     return matchups
    // },
    updateMatchups: async function (matchup) {
        // console.log("=====MATCHUP3:" +  JSON.stringify(matchup))
        const query = '/matchups/' + matchup.id
        await api.patch(query, {
            spread: matchup.spread
        })
    }
}