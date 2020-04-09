import axios from 'axios'
import mapUtil from '../utils/mapUtil'

// 数据源： https://lab.isaaclin.cn/nCoV/
const remoteURL = 'https://lab.isaaclin.cn/nCoV'
const dataURL = {
  overAll: remoteURL + '/api/overall',
  provinceData: remoteURL + '/api/provinceName', // 返回数据库内有数据条目的国家、省份、地区、直辖市列表
  area: remoteURL + '/api/area',
  news: remoteURL + '/api/news',
  historyData: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv'
  // historyData: 'http://localhost:5550/covidData_csv'
}

export default {
  historyData: undefined,
  getNCovData (params) {
    return new Promise((resolve, reject) => {
      fetch(dataURL.provinceData, params).then(res => {
        return res.json()
      }).then(data => {
        resolve(data)
      })
    })
  },

  getLatestNCovData (params) {
    return new Promise((resolve, reject) => {
      fetch(dataURL.area, params).then(res => {
        return res.json()
      }).then(data => {
        console.log(data)
        resolve(data.results)
      })
    })
  },

  getCovidData (params) {
    var date = params.date
    if (!this.historyData) {
      return new Promise((resolve, reject) => {
        this.getTimeSeriesData().then(data => {
          var r = this.historyDataFilter(date)
          resolve(r)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.historyDataFilter(date))
      })
    }
  },

  getTimeSeriesData () {
    return axios.get(dataURL.historyData).then((res) => {
      return res.data
    }).then(data => {
      var dataList = this.parseCSV(data)
      dataList.forEach(item => {
        item.curConfirm = mapUtil.computed.curConfirm(item) // 现存确诊
      })
      this.historyData = dataList
      return dataList
    })
  },

  historyDataFilter (date) {
    if (this.historyData) {
      var countryData = this.historyData.filter(e => e.date === date && !e.province)
      return countryData
    } else {
      return null
    }
  },

  parseCSV (csv, dtype) {
    var lines = csv.split('\n')
    // var startLine = lines[0].substr(0, lines[0].length - 1)
    var startLine = lines[0] // XXX 换行又没有了
    var keys = startLine.split(',')
    return lines.slice(1).map(function (line) {
      var values = line.split(',')
      var o = {}
      keys.forEach(function (key, index) {
        key = key.trim()
        var type = dtype ? dtype[key] : undefined
        o[key] = type ? type(values[index]) : values[index]
      })
      return o
    })
  }
}
