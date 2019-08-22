import axios from 'axios'

const api = axios.create({
  baseURL: `https://www.worldtimeserver.com/handlers/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getTime: async function() {
    // let o = {
    //     LocIDDescription: 'United States - Texas',
    //     LocIDLocationID: 'US-TX',
    //     CountryCode: 'US',
    //     CountryName: 'United States',
    //     State: 'Texas',
    //     City: 'Plano',
    //     TimeZone: 'America/Chicago',
    //     DstZoneName: 'Central Daylight Time',
    //     DstZoneAbbrev: 'CDT',
    //     StdZoneName: 'Central Standard Time',
    //     StdZoneAbbrev: 'CST',
    //     IsInDST: true,
    //     ThisTime: '2019-07-03T05:31:28.8720077Z',
    //     DateTime_12HR: '5:31 AM',
    //     DateTime_24HR: '05:31:28',
    //     FormattedDate: 'Wednesday, July 3, 2019',
    //     Lat: 33.0203,
    //     Lng: -96.7019,
    //     ErrorMsg: null,
    //     serverTimeStamp: 1562131888872.0076,
    //     dataFrom: 'IP'
    // }

    const query = '/GetData.ashx?action=GCTData&_=' + new Date().getTime()
    const locationTimeDetail = await api.get(query)

    return locationTimeDetail.ThisTime
  },
}
