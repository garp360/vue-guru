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
    const query = '/matchups'
    const results = await api.get(query)
    const data = results.data
    return data
  },
  updateSpread: async function(id, spread, phs, pvs) {
    const query = '/matchups/' + id
    return await api.patch(query, {
      spread: spread,
      phs: phs,
      pvs: pvs
    })
  }
}
