import GeoJSON from 'ol/format/GeoJSON'

const covidDataUtil = {
  // 字面量
  covidDefaultStartTime: '2019-12-01',
  defaultRendeField: 'confirmed',
  computed: {
    // 现存确诊
    curConfirm (data) {
      return data.confirmed - data.cured - data.dead
    },
    // 新增
    add (toDayData, yesterdayData) {
      var obj = Object.assign({}, yesterdayData)
      if (yesterdayData === undefined) {
        obj.confirmed = 0
        obj.suspected = 0
        obj.cured = 0
        obj.dead = 0
      }
      return {
        confirm: toDayData.confirmed - obj.confirmed,
        suspect: toDayData.suspected - obj.suspected,
        cure: toDayData.cured - obj.cured,
        dead: toDayData.dead - obj.dead
      }
    }

  },
  covidDataType: {
    latest: '1', // 最新数据
    history: '0' // 历史数据
  },
  layerType: {
    point: 'point',
    polygon: 'polygon'
  },
  mapEvt: {
    render: 'render',
    legendChange: 'legendChange'
  },
  dateFormat: 'YYYY-MM-DD',
  // colorList: ['#777279', '#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#800080', '#581845'],
  colorList: [
    'rgba(119, 114, 121, 0.7)',
    // 'rgba(218, 247, 166, 0.7)',
    // 'rgba(255, 195, 0, 0.7)',
    // 'rgba(255, 87, 51, 0.7)',
    // 'rgba(199, 0, 57, 0.7)',
    // 'rgba(144, 12, 63, 0.7)',
    // 'rgba(128, 0, 128, 0.7)',
    // 'rgba(88, 24, 69, 0.7)'

    // 方案二
    // 'rgba(240, 249, 33, 0.7)',
    // 'rgba(253, 175, 49, 0.7)',
    // 'rgba(237, 121, 83, 0.7)',
    // 'rgba(210, 79, 113, 0.7)',
    // 'rgba(174, 40, 146, 0.7)',
    // 'rgba(128, 4, 168, 0.7)',
    // 'rgba(73, 3, 160, 0.7)'

    // 方案三
    // 'rgba(252, 253, 191, 0.7)',
    // 'rgba(254, 180, 123, 0.7)',
    // 'rgba(247, 114, 92, 0.7)',
    // 'rgba(202, 62, 114, 0.7)',
    // 'rgba(161, 48, 126, 0.7)',
    // 'rgba(90, 22, 126, 0.7)',
    // 'rgba(33, 17, 78, 0.7)'

    // 方案四
    'rgba(218, 247, 166, 0.7)',
    'rgba( 253, 175, 115, 0.7 )',
    'rgba( 252, 141, 89, 0.7 )',
    'rgba( 239, 105, 69, 0.7 )',
    'rgba( 227, 74, 51, 0.7 )',
    'rgba( 114, 33, 33, 0.7 )',
    'rgba(90, 22, 126, 0.7)'
  ],
  levels: [-1, 0, 500, 1000, 5000, 10000, 50000, 100000],
  getColor (value) {
    var level = this.getLevel(value)
    return this.colorList[level]
  },
  mergeCountryData (dataList) {
    var countryDataList = []
    dataList.forEach(item => {
      var countryData = countryDataList.find(elt => elt.countryName === item.countryName)
      if (countryData) {
        countryData.currentConfirmedCount += item.currentConfirmedCount
        countryData.confirmedCount += item.confirmedCount
        countryData.suspectedCount += item.suspectedCount
        countryData.curedCount += item.curedCount
        countryData.deadCount += item.deadCount
      } else {
        countryDataList.push(countryData)
      }
    })

    return countryDataList
  },

  joinData (geoDataList, data) {
    if (geoDataList.length > 0 && data.length > 0) {
      data.forEach(item => {
        var geoData = geoDataList.find(geod => geod.properties.name === item.countryEnglishName) // 疫情数据的countryEnglishName有可能为空
        if (geoData) {
          if (geoData.properties.data) {
            geoData.properties.data.currentConfirmedCount += item.currentConfirmedCount
            geoData.properties.data.confirmedCount += item.confirmedCount
            geoData.properties.data.suspectedCount += item.suspectedCount
            geoData.properties.data.curedCount += item.curedCount
            geoData.properties.data.deadCount += item.deadCount
          } else {
            geoData.properties.data = item
          }
        } else {
          // 未匹配到地理位置的国家
          console.log(item.countryName)
        }
      })
    }
    return geoDataList
  },

  getLevel (value) {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (parseInt(value) > this.levels[i]) {
        return i
      }
    }
  }
}

function readGeoJSON (geojson) {
  return new GeoJSON().readFeatures(geojson)
}
export default {
  covidDataUtil,
  readGeoJSON
}
