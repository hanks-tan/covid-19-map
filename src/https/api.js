import http from './http'

const apiURL = {
  getCovidData: '/data/Wuhan-2019-nCoV1.csv',
  // 检测站
  getStation: './data/station.geojson'
}

const api = {
  getCovidData () {
    return http.get(apiURL.getCovidData)
  },
  getStation () {
    return http(apiURL.getStation)
  }
}

export default api
