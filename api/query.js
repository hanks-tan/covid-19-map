const axios = require('axios')

let covidMapData = null

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
    const regions = [lineDataArray[countryCodeIndex], lineDataArray[provinceCodeIndex], lineDataArray[cityCodeIndex]].filter((item) => item !== '')

    const codes = regions.join('-') // 构造二级key
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

function getDayData(date) {
  return covidMapData.get(date)
}

/**
 * 查询某一天某个地区的数据
 * @param {*} countryCode 
 * @param {*} date 
 * @returns 
 */
function getCountryOneDay(countryCode, date) {
  if (covidMapData.get(date)) {
    return covidMapData.get(date).get(countryCode)
  }
  return null
}

/**
 * 查询某一天各国的数据
 * @param {*} date 
 * @returns 
 */
function getDayCountryData(date) {
  const dayData = covidMapData.get(date)
  if (dayData) {
    let result = new Map()
    dayData.forEach((value, key) => {
      if (key.indexOf('-') < 0) {
        result.set(key, value)
      }
    })
    return result
  }
  return null
}

axios.get('http://localhost:5550/covidData_csv').then((res) => {
  console.log('.')
  return res.data
}).then((data) => {
  covidMapData = parseCSVToMap(data)
  const allCountry = getDayCountryData('2020-01-01')
  console.log('done')

})
