import axios from 'axios'
var parser = require('fast-xml-parser');
var format = require('xml-formatter');
const options = {attributeNamePrefix : "",ignoreAttributes : false}

const api = axios.create({
    baseURL: `http://localhost:5111/`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const nflapi = axios.create({
    baseURL: `http://www.nfl.com/ajax/`,
    withCredentials: false,
    headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml'
    }
})

function augment(matchups) {
    let w = matchups.ss.gms.w
    let y = matchups.ss.gms.y
    let games = matchups.ss.gms.g

    games.forEach(function (game) {
        Object.keys(game).forEach(function (property) {
            if (property === 'gsis') {
                game.id = game[property];
                delete game[property];
            }
        });
        game.season = y
        game.week = w
    });
    return games
}

async function getData(season, week) {
    const query = 'scorestrip?season=' + season + '&seasonType=REG&week=' + week
    const xmlData = await nflapi.get(query)
    let formattedXml = format(xmlData.data);
    let json = parser.parse(formattedXml, options)
    return augment(json);
}

export default {
    initialize: async function () {
        const seasonData = []
        const start = (new Date()).getFullYear() - 1
        for (let season = start; season >= start - 5; season--) {
            for (let week = 1; week <= 17; week++) {
                let weeklyData = await getData(season, week)
                weeklyData.forEach(game => {
                    seasonData.push(game)
                });
            }
        }
        //console.log("Season Data: " + seasonData)
        return seasonData
    },
    saveData: async function(matchup) {
        return await api.post('/historicalData', matchup)
    },
    getHistoricalData: async function () {
        return await api.get('/historicalData')
    }
}