import axios from 'axios'

parseCSV (csv, dtype) {
  var lines = csv.split('\n')
  // var startLine = lines[0].substr(0, lines[0].length - 1)
  var startLine = lines[0] // XXX 换行又没有了
  var keys = startLine.split(',')
  var yesterDayDataList = []
  var todayDayDataList = []
  var date = ''
  return lines.slice(1).map(function (line) {
    var values = line.split(',')
    var o = {}
    if (date !== values[0]) {
      date = values[0]
      yesterDayDataList = [].concat(todayDayDataList)
      todayDayDataList = []
    }
    keys.forEach(function (key, index) {
      key = key.trim()
      var type = dtype ? dtype[key] : undefined
      o[key] = type ? type(values[index]) : values[index]
    })
    o.curConfirm = mapUtil.computed.curConfirm(o)

    let oYesterDayData = yesterDayDataList.find(item => {
      return item.country === o.country && item.province === o.province && item.city === o.city
    })

    o.add = mapUtil.computed.add(o, oYesterDayData)

    todayDayDataList.push(o)
    return o
  })
}

/**
 * 解析csv数据
 * @param {*} csvData csv文本
 * @returns 返回一个Map对象
 */
function parseCSVToMap (csvData) {
  const lines = csvData.split('\n')
  const startLine = lines[0] // XXX 换行又没有了
  const keys = startLine.split(',')
  const data = lines.slice(1)
  const dataMap = new Map() // 存储新冠数据
  /* dataMap数据结构：
  {
    'date': {                                           ------------ 1级key
      '国家、省、城市代码（用-链接）': {                  -------------2级key
        confirmed: 1
        suspected: 1
        ...
      }
      '国家、省、城市代码（用-链接'：{

      }
    }
  }
  */
  // 设定各个字段对应的列索引
  const dateIndex = 0
  const countryCodeIndex = 2
  const provinceCodeIndex = 4
  const cityCodeIndex = 6

  const confirmedIndex = 7 // 累计确诊列索引
  const suspectedIndex = 8 // 疑似列索引
  const curedIndex = 9 // 现存列索引
  const deadIndex = 10 // 死亡列索引

  data.forEach((d) => {
    const lineDataArray = d.split(',')
    const codes = [lineDataArray[countryCodeIndex], lineDataArray[provinceCodeIndex], lineDataArray[cityCodeIndex]].join('-') // 构造二级key
    const date = lineDataArray[dateIndex]
    const regionValue = {
      confirmed: lineDataArray[confirmedIndex], // 确诊
      suspected: lineDataArray[suspectedIndex], // 疑似
      cured: lineDataArray[curedIndex], // 现存
      dead: lineDataArray[deadIndex] // 死亡
    }
    if (dataMap.get(date)) {
      const thisDayValue = dataMap.get(date)
      thisDayValue.set(codes, regionValue)
    } else {
      const thisDayValue = new Map()
      thisDayValue.set(codes, regionValue)
      dataMap.set(date, thisDayValue)
    }
  })

  return dataMap
}

function historyDataFilter (date) {
  if (this.historyData) {
    var countryData = this.historyData.filter(e => e.date === date && !e.province)
    return countryData
  } else {
    return null
  }
}

export default {
  // 载入原始的Covid数据
  loadOriginData () {
    return axios.get(dataURL).then((res) => {
      return res.data
    }).then(data => {
      var dataList = parseCSVToMap(data)
      dataList.forEach(item => {
        item.curConfirm = mapUtil.computed.curConfirm(item) // 现存确诊
      })
      this.historyData = dataList
      return dataList
    })
  }
}
