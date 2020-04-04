const mapUtil = {
  // 字面量
  covidDefaultStartTime: '2019-12-01',
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
  colorList: ['#777279', '#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#800080', '#581845'],
  levels: [-1, 0, 500, 1000, 5000, 10000, 50000, 100000],
  getColor (value) {
    // var colorList = ['#fff', '#f8765c', '#c03a76', '#4b1079', '#8B7500', '#ab2494', '#FFB90F', '#8B3A3A']
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
    // if (value > 100000) {
    //   level = 7
    // } else if (value > 10000) {
    //   level = 6
    // } else if (value > 5000) {
    //   level = 5
    // } else if (value > 1000) {
    //   level = 4
    // } else if (value > 500) {
    //   level = 3
    // } else if (value > 100) {
    //   level = 2
    // } else if (value > 0) {
    //   level = 1
    // } else {
    //   level = 0
    // }
    // return level
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (value > this.levels[i]) {
        return i
      }
    }
  }
}

export default mapUtil
