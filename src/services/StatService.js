import axios from 'axios'
import { saveAs } from 'file-saver';

const api = axios.create({
  baseURL: `http://www.nfl.com/stats`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOffensiveStatsBySeason1: async function(season) {
    const query =
      'categorystats?archive=true&conference=null&role=TM&offensiveStatisticCategory=GAME_STATS&defensiveStatisticCategory=null&&season=' +
      season +
      '&seasonType=REG&tabSeq=2&qualified=true&Submit=Go'
    const results = await api.get(query)
    const data = results.data
    console.log(data.toString())

    let doc = new DOMParser().parseFromString(data, 'text/html')

    var element = document.evaluate(
      "//table[@id='result']//tbody[2]//tr/*",
      doc,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    )

    let rows = []
    let cells = []

    for (var i = 0; i < element.snapshotLength; i++) {
      let e = element.snapshotItem(i).textContent
      e = e.replace(/\,/g,'')

    //   cells.push('"' + e.trim() + '"')
      cells.push(e.trim())
      if (cells.length == 21) {
        rows.push(Object.assign([], cells))
        cells = []
      }
    }

    rows.forEach((row) => {
      console.log(row.toString())
    })
  },

  getOffensiveStatsBySeason: async function(season) {
    const query =
      'categorystats?archive=true&conference=null&role=TM&offensiveStatisticCategory=GAME_STATS&defensiveStatisticCategory=null&&season=' +
      season +
      '&seasonType=REG&tabSeq=2&qualified=true&Submit=Go'
    const results = await api.get(query)
    const data = results.data
    console.log(data.toString())

    let doc = new DOMParser().parseFromString(data, 'text/html')

    var element = document.evaluate(
      "//table[@id='result']//tbody[2]//tr/*",
      doc,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    )

    let headers = ["rank","team","gamesPlayed","averagePointsPerGame","totalPointsPerGame","playsFromScrimmage","yardsPerGame","yardsPerPlay","firstAndGoal","thirdDownsMade","thirdDownsAttempted","thirdDownPercentage","fourthDownsMade","fourthDownsAttempted","fourthDownPercentage","totalPenalties","totalPenaltyYards","averageTimeOfPossession","totalFumbles","totalFumblesLost","totalTurnovers"]
    let rows = []
    let cells = []
    
    let fieldCounter = 0
    let totalStats = []
    let teamStats = {}
    for (var i = 0; i < element.snapshotLength; i++) {
      let e = element.snapshotItem(i).textContent
      e = e.replace(/\","/g,'')
      teamStats[headers[fieldCounter]] = e.trim()
     // console.log(JSON.stringify(teamStats))
      
      fieldCounter ++

      if (fieldCounter > 20) {
        fieldCounter = 0
        totalStats.push(Object.assign({}, teamStats))
        teamStats = {}
      } 
    }

    totalStats.forEach((team) => {
      console.log(JSON.stringify(team))
    })

    var blob = new Blob([JSON.stringify(totalStats)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "tmp2018.txt");
  },
}
