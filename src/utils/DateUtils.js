import moment from 'moment'

export default {
    
    getWeekStart: function (mDate) {
        let d = moment(mDate)
        return d.subtract(d.day() - 2)
    },
    getWeekComplete: function (mDate) {
        let d = moment(mDate)
        return d.add(2 - d.day())
    },
    getNextSunday: function (mDate) {
        let d = moment(mDate)
        d = d.add(7 - d.day())
        console.log("===> NextSunday: " + JSON.stringify(d))
        return d
    },
    getDeadlines: function (seasonData) {
        let deadlines = []

        for (let week = 1; week <= 17; week++) {
            let deadline = {
                week: week,
            }

            let weeklyMatchups = seasonData.filter(function (matchup) {
                return matchup.week === week
            });

            if (weeklyMatchups.length > 0) {

                // sort matchups earliest to latest
                weeklyMatchups.sort((a, b) => {
                    return a.eid <= b.eid
                })
                
                let earliestGameTime = moment(weeklyMatchups[0].eid.substring(0, weeklyMatchups[0].eid.length - 2), "YYYYMMDD")
                let latestGameTime = moment(weeklyMatchups[weeklyMatchups.length - 1].eid.substring(0, weeklyMatchups[weeklyMatchups.length - 1].eid.length - 2), "YYYYMMDD")
                
                let start = moment(earliestGameTime).weekday(1)
                // console.log("===> start: " + JSON.stringify(start))
                let complete = moment(latestGameTime)
                // console.log("===> complete: " + JSON.stringify(complete))
                let dline = moment(earliestGameTime).weekday(7).hour(11).minute(45)
                // console.log("===> deadline1: " + JSON.stringify(dline))

                deadline.start = moment(start).format("YYYY-MM-DD")
                deadline.complete = moment(complete).format("YYYY-MM-DD")
                deadline.deadline = moment(dline).format("YYYY-MM-DD hh:mm")

                deadlines.push(deadline)
            }
        }

        return deadlines
    },
    getCurrentWeek: function(deadlines) {
        let currentWeek = 0
        let mDate = moment(new Date())
        for (let index = 0; index < deadlines.length; index++) {
            const deadline = deadlines[index]
            let start = moment(deadline.start, "YYYY-MM-DD")
            let complete = moment(deadline.complete, "YYYY-MM-DD")


            if(mDate.isBefore(complete.add(1, 'days'))) {
                currentWeek = deadline.week
                break; 
            }
            else if(mDate.isBetween(start, complete, null, "[]")) {
                currentWeek = deadline.week
                break; 
            }
        }
        return currentWeek === 0 ? 18 : currentWeek
    }
}