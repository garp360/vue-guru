import GuruService from '@/services/GuruService'
import store from '@/store'

function getLast8(gameData, team) {
  const matchups = gameData
    .filter((game) => game.gd === 1 && (game.h === team || game.v === team))
    .sort(function(a, b) {
      return a.eid >= b.eid ? 1 : a.week <= b.week ? -1 : -1
    })
    .sort(function(a, b) {
      return a.id - b.id
    })
  return matchups.slice(matchups.length - 8, matchups.length)
}

function getSumLast4h(gameData, team) {
  const matchups = gameData
    .filter((game) => game.gd === 1 && game.h === team)
    .sort(function(a, b) {
      return a.eid >= b.eid ? 1 : a.week <= b.week ? -1 : -1
    })
  let last4 = matchups.slice(matchups.length - 4, matchups.length)
  let sum = last4.reduce((acc, game) => {
    return acc + Number(game.hs)
  }, 0)
  return sum
}

function getSumLast4v(gameData, team) {
  const matchups = gameData
    .filter((game) => game.gd === 1 && game.v === team)
    .sort(function(a, b) {
      return a.eid >= b.eid ? 1 : a.week <= b.week ? -1 : -1
    })
  let last4 = matchups.slice(matchups.length - 4, matchups.length)
  let sum = last4.reduce((acc, game) => {
    return acc + Number(game.vs)
  }, 0)
  return sum
}

function getSumLastX(count, gameData, team) {
    const matchups = gameData
      .filter((game) => game.gd === 1 && (game.h === team || game.v === team))
      .sort(function(a, b) {
        return a.eid >= b.eid ? 1 : a.week <= b.week ? -1 : -1
      })
    let lastX = matchups.slice(matchups.length - count, matchups.length)
    let sum = lastX.reduce((acc, game) => {
      return acc + Number(game.vs)
    }, 0)
    return sum
  }

export default {
  getPrediction: function(matchup) {
    let prediction = {}
    let gameData = store.state.gameData
    if (matchup) {
        const hhtp = getSumLast4h(gameData, matchup.h)
        const hvtp = getSumLast4v(gameData, matchup.h)
        const h2tp = getSumLastX(2, gameData, matchup.h)
        const hAvgPtsFor =  Math.round((hhtp + hvtp + h2tp) / 10)
        
        const vhtp = getSumLast4h(gameData, matchup.v)
        const vvtp = getSumLast4v(gameData, matchup.v)
        const v2tp = getSumLastX(2, gameData, matchup.v)

        const vAvgPtsFor = Math.round((vhtp + vvtp + v2tp) / 10)

        console.log(matchup.v + " [" + vAvgPtsFor + "]  @ " + matchup.h + " [" + hAvgPtsFor + "] ")
        prediction.pvs = vAvgPtsFor
        prediction.phs = hAvgPtsFor
    }
    return prediction
  },
  getPredictions: function(matchups) {
    let gameData = store.state.gameData
    if (matchups) {
      matchups.forEach((matchup) => {
        const hhtp = getSumLast4h(gameData, matchup.h)
        const hvtp = getSumLast4v(gameData, matchup.h)
        const h2tp = getSumLastX(2, gameData, matchup.h)
        const hAvgPtsFor =  Math.round((hhtp + hvtp + h2tp) / 10)
        
        const vhtp = getSumLast4h(gameData, matchup.v)
        const vvtp = getSumLast4v(gameData, matchup.v)
        const v2tp = getSumLastX(2, gameData, matchup.v)

        const vAvgPtsFor = Math.round((vhtp + vvtp + v2tp) / 10)

        console.log(matchup.v + " [" + vAvgPtsFor + "]  @ " + matchup.h + " [" + hAvgPtsFor + "] ")
      })
    }
  }
}
