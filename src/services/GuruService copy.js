import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:5000/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getGameData: async function(season) {
    const query = '/matchups?season=' + season
    const results = await api.get(query)
    const data = results.data
    return data
  },
  getPredictionData: async function(season, week) {
    const query = '/predictions?season=' + season + '&week=' + week
    const results = await api.get(query)
    const data = results.data
    return data
  },
  updateMatchups: async function(matchup) {
    const query = '/matchups/' + matchup.id
    await api.patch(query, {
      spread: matchup.spread,
    })
  },
  initializePredictions: async function(predictions) {
    const query = '/predictions'
    for (let index = 0; index < predictions.length; index++) {
      const prediction = predictions[index]
      await api.post(query, prediction)
    }
  },
}
