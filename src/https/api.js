import http from './http'

const apiURL = {
  getCovidData: '/data/Wuhan-2019-nCoV1.csv',
  // 检测站
  getStation: './data/station.geojson',
  // 自费检测点
  getZfStation: './data/zfjcd.geojson',
  // 面状风险区
  getFxq: './data/fxq.geojson'
}

const api = {
  getCovidData () {
    return http.get(apiURL.getCovidData)
  },
  getStation () {
    return http(apiURL.getStation)
  },
  getZfStation () {
    return http(apiURL.getZfStation)
  },
  getFxq () {
    return http(apiURL.getFxq)
  }
}

export default api
