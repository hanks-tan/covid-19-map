import http from './http'

const apiURL = {
  // 获取covid全量数据
  getCovidData: process.env.NODE_ENV === 'production' ? 'http://cdn.data.gogmap.com/Wuhan-2019-nCoV.csv' : '/data/Wuhan-2019-nCoV.csv',
  // 最近的数据（2020.4.11）
  getLatestCovidData: '/data/latest.csv',
  // 获取covid全量数据图
  getCovidImg: 'http://cdn.data.gogmap.com/covid_d_20200411.png',
  // 全量数据图对应的配置
  allDataPngConfig: './data/covid_d_20200411.json',
  // 检测站
  getStation: './data/station.geojson',
  // 自费检测点
  getZfStation: './data/zfjcd.geojson',
  // 面状风险区
  getFxq: './data/fxq.geojson',
  // 免费核酸检查点
  getFreeCheckPoint: './data/checkPoint.json',
  // 深圳疫情数据
  getSzyzData: 'http://cdn.data.gogmap.com/all.csv',
  // 行政区划数据
  getRegionData: './data/city.json',
  // 中国各省点位数据
  chinaProvincePoint: './data/chinaProvincePoint.json',
  // 中国各省范围数据(topojson格式)
  chinaProvince: './data/china.json'
}

const api = {
  getCovidData () {
    return http.get(apiURL.getCovidData)
  },
  getLatestCovidData () {
    return http.get(apiURL.getLatestCovidData)
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
  },
  getRegionData () {
    return http.get(apiURL.getRegionData)
  },

  getChinaPoint () {
    return http(apiURL.chinaProvincePoint)
  },

  getChinaProvince () {
    return http(apiURL.chinaProvince)
  },
  getCovidDataFromImg () {
    fetch(apiURL.getCovidImg).then((res) => {
      res.arrayBuffer().then((data) => {
        return data
      })
    })
  },
  getCovidPngConfig () {
    return http(apiURL.allDataPngConfig)
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
