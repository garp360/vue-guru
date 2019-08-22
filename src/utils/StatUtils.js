import moment from 'moment'

export default {
  getWeekStart: function(mDate) {
    let d = moment(mDate)
    return d.subtract(d.day() - 2)
  },
  getWeekComplete: function(mDate) {
    let d = moment(mDate)
    return d.add(2 - d.day())
  },
  getNextSunday: function(mDate) {
    let d = moment(mDate)
    d = d.add(7 - d.day())
    console.log('===> NextSunday: ' + JSON.stringify(d))
    return d
  }
}
