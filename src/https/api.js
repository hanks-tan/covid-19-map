import http from './http'

const apiURL = {
  getCovidData: '/data/Wuhan-2019-nCoV1.csv',
  // 检测站
  getStation: './data/station.geojson',
  // 自费检测点
  getZfStation: './data/zfjcd.geojson',
  // 面状风险区
  getFxq: './data/fxq.geojson',
  // 免费核酸检查点
  getFreeCheckPoint: './data/checkPoint.json',
  // 深圳疫情数据
  getSzyzData: './data/sz/all.csv'
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
  },
  getFreeCheckPoint () {
    return http(apiURL.getFreeCheckPoint).then((res) => {
      return res.data.data
    })
  },
  getSzyzData () {
    return http(apiURL.getSzyzData).then((res) => {
      return csv2json(res.data)
    })
  }
}

function csv2json (csvDataStr) {
  let lines = csvDataStr.split('\r\n')
  if (!lines[lines.length - 1]) {
    lines = lines.slice(0, -1)
  }
  const head = lines[0].split(',')
  const data = lines.slice(1)
  const objList = data.map((l, i) => {
    const values = l.split(',')
    const obj = { id: i }
    values.forEach((v, j) => {
      obj[head[j]] = v
    })
    return obj
  })
  return objList
}

export default api
