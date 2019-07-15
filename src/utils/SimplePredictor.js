import GuruHistoryService from '@/services/GuruHistoryService'

let historicalData = []

async function initialize() {
    console.log("Initializing ...")

    let data = await GuruHistoryService.getHistoricalData()
    historicalData = data.data

    console.log("data:" + JSON.stringify(historicalData.length))
    if (historicalData.length === 0) {
        const seasonData = await GuruHistoryService.initialize()
        await Promise.all(seasonData.map(async (matchup) => {
            if(matchup.gt === 'REG') {
                await GuruHistoryService.saveData(matchup)
            }
        }));
    }

    historicalData.forEach(matchup => {

    });

    console.log("Initialized!!!")
}

export default {
    getPredictions: async function () {
        if (historicalData.length === 0) {
           await initialize()
        }
        
        console.log(historicalData.length)
    }
}