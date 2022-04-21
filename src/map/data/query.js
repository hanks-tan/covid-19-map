import moment from 'moment'
import { Png2csv } from 'csv2png'

function covidPngToJson (img, config) {
  const pc = new Png2csv({
    png: img,
    config
  })
  return pc.parse().then((data) => {
    return parseCSVToMap(data, 'array')
  })
}

/**
 * 获取一个日期的前几天的日期
 * @param {string} date
 * @param {number} num
 * @returns
 */
function getDayBefore (date, num) {
  return moment(date).subtract(num, 'day').format('yyyy-MM-DD')
}

/**
 * 获取排名
 * @param {Map} dataMap
 * @param {string} field
 * @param {number} topCount
 * @param {number} regionType 国家或地区。 1-国家地区， 2-省， 3-市
 * @returns {Array}
 */
function getRankData (dataMap, field, topCount, regionType) {
  if (!regionType) {
    regionType = 1
  }

  if (dataMap) {
    const arr = Array.from(dataMap).filter((item) => {
      return item[0].split('-').length === regionType
    })
    if (Array.isArray(arr)) {
      arr.sort((a, b) => {
        const data1 = a[1]
        const data2 = b[1]
        return data2[field] - data1[field]
      })
      const rankData = arr.slice(0, topCount).map((item) => {
        const names = window.region.get(item[0])
        const name = names[names.length - 1]
        return {
          name: name,
          count: item[1][field]
        }
      })
      return rankData
    }
  }
  return []
}

/**
 * 解析csv数据
 * @param {string | Array} csvData
 * @param {String} type 指定输入类型, csv或者数组
 * @returns 返回一个Map对象
 */
function parseCSVToMap (csvData, type = 'csv') {
  let data
  if (type === 'csv') {
    const lines = csvData.split('\n')
    // const startLine = lines[0] // XXX 换行又没有了
    // keys = startLine.split(',')
    data = lines.slice(1)
  } else {
    // keys = csvData[0]
    data = csvData.slice(1)
  }
  const dataMap = new Map() // 存储新冠数据
  const regionMap = new Map()
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
    const lineDataArray = type === 'csv' ? d.split(',') : d
    const regions = [lineDataArray[countryCodeIndex], lineDataArray[provinceCodeIndex], lineDataArray[cityCodeIndex]].filter((item) => item !== '')

    const codes = regions.join('-') // 构造二级key
    const date = lineDataArray[dateIndex]
    const covidCount = [confirmedIndex, suspectedIndex, curedIndex, deadIndex].map((item) => {
      return parseInt(lineDataArray[item])
    })
    const regionValue = {
      country: lineDataArray[cityCodeIndex - 1] || lineDataArray[provinceCodeIndex - 1] || lineDataArray[countryCodeIndex - 1],
      confirmed: covidCount[0], // 累计确诊
      suspected: covidCount[1], // 疑似
      cured: covidCount[2], // 累计治愈
      dead: covidCount[3], // 累计死亡
      curConfirm: covidCount[0] - covidCount[2] // 现存确诊
    }
    if (dataMap.get(date)) {
      const thisDayValue = dataMap.get(date)
      thisDayValue.set(codes, regionValue)
    } else {
      const thisDayValue = new Map()
      thisDayValue.set(codes, regionValue)
      dataMap.set(date, thisDayValue)
    }

    const regionNameIndex = [1, 3, 5] // 国家、省、市字段索引
    const regionName = [lineDataArray[regionNameIndex[0]], lineDataArray[regionNameIndex[1]], lineDataArray[regionNameIndex[2]]].filter((item) => item !== '')
    regionMap.set(codes, regionName)

    window.region = regionMap
  })

  return dataMap
}

function getDayData (date) {
  return window.cvData.get(date)
}

/**
 * 查询某一天某个地区的数据
 * @param {*} countryCode
 * @param {*} date
 * @returns
 */
function getCountryOneDay (countryCode, date) {
  if (window.cvData.get(date)) {
    return window.cvData.get(date).get(countryCode)
  }
  return null
}

/**
 * 查询某一天各国的数据
 * @param {*} date
 * @returns
 */
function getDayCountryData (date) {
  const dayData = window.cvData.get(date)
  if (dayData) {
    const result = new Map()
    dayData.forEach((value, key) => {
      if (!key.includes('-')) {
        result.set(key, value)
      }
    })
    return result
  }
  return null
}

/**
 *
 * @param {String} date
 * @param {Number} level 0 - 2, 国、省、市
 * @param {String} country 指定国家
 * @returns {Map}
 */
function getDayDataByLevel (date, level, country = 'CN') {
  const dayData = window.cvData.get(date)
  if (dayData) {
    const result = new Map()
    dayData.forEach((value, key) => {
      if (key.startsWith(country)) {
        const codes = key.split('-')
        const code = codes[level]
        if (code && level === (codes.length - 1)) {
          result.set(code, value)
        }
      }
    })
    return result
  }
  return null
}

/**
 * 获取截至某日期的排名
 * @param {string} date
 * @param {string} field
 * @param {number} count
 * @param {number} regionType 国家或地区。 1-国家地区， 2-省， 3-市
 * @returns {Array}
 */
function getDeadlineRankData (date, field, count, regionType) {
  if (date) {
    const data = getDayData(date)
    return getRankData(data, field, count, regionType)
  }
  return []
}

/**
 * 获取某日前24小时增长数据
 * @param {*} date
 * @returns {Map}
 */
function get24HourData (date) {
  const todayDataMap = getDayData(date)

  const yesterday = getDayBefore(date, 1)
  const yesterdayDataMap = getDayData(yesterday)
  const result = new Map()
  todayDataMap.forEach((data, key) => {
    const yesterDayData = yesterdayDataMap.get(key)
    let obj = data
    if (yesterDayData) {
      obj = {}
      Object.keys(data).forEach((prop) => {
        const value = yesterDayData[prop]
        obj[prop] = data[prop] - value
      })
    }
    result.set(key, obj)
  })
  return result
}

function get7DayData (date) {
  const todayDataMap = getDayData(date)
  const otherday = getDayBefore(date, 7)
  const otherdayDataMap = getDayData(otherday)
  const result = new Map()
  todayDataMap.forEach((data, key) => {
    const yesterDayData = otherdayDataMap.get(key)
    let obj = data
    if (yesterDayData) {
      obj = {}
      Object.keys(data).forEach((prop) => {
        const value = yesterDayData[prop]
        obj[prop] = data[prop] - value
      })
    }
    result.set(key, obj)
  })
  return result
}

/**
 * 获取24小时内的排名数据
 * @param {*} date
 * @param {*} field
 * @param {*} count
 * @param {*} regionType
 * @returns {Array}
 */
function get24HourRankData (date, field, count, regionType) {
  if (date) {
    const oneDayData = get24HourData(date, field)
    return getRankData(oneDayData, field, count, regionType)
  }
  return []
}

function get7DayRankData (date, field, count, regionType) {
  if (date) {
    const oneDayData = get7DayData(date, field)
    return getRankData(oneDayData, field, count, regionType)
  }
  return []
}

export default {
  covidPngToJson,
  parseCSVToMap,
  getDayData,
  getCountryOneDay,
  getDayCountryData,
  getDayDataByLevel,
  getDeadlineRankData,
  get24HourRankData,
  get7DayRankData
}
