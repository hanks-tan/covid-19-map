import GeoJSON from 'ol/format/GeoJSON'
import world from './world'
import countryLocation from './countryLocation'
import mapUtil from '../../utils/mapUtil'

const geoJson = new GeoJSON()
const mapData = {
  /**
   * 获取国家地理数据
   * @param {*} params
   * @returns {Array(ol.Feature)} countryData
   */
  getCountryDataByCode (params) {
    var dataObj = Object.assign({}, countryLocation)
    if (params.layerType !== mapUtil.layerType.point) {
      dataObj = Object.assign({}, world)
    }
    var countryData = geoJson.readFeatures(dataObj)
    if (params.code) {
      return countryData.find(item => item.get('code') === params.code)
    } else {
      return countryData
    }
  },

  /**
   * 连接cov数据和点数据
   * @param {*} covData
   * @param {Array(ol.Feature)} geoData
   */
  joinCovDateToGeo (covData, geoData) {
    if (geoData.length > 0) {
      var result = geoData.map(item => {
        var itemData = covData.find(cov => {
          return cov.countryCode === item.get('code')
        })
        var properties = item.getProperties()
        properties.data = itemData !== undefined ? itemData : {}
        item.setProperties(properties)
        return item
      })
      return result
    } else {
      return geoData
    }
  }
}

export default mapData
