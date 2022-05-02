import BaseVectorLayer from './layer/baseVectorLayer'
import PointLayer from './layer/pointLayer'
import mapUtil from '../utils/mapUtil'
import moment from 'moment'
import query from './data/query'
import world from './data/world'
import api from '../https/api'
import countryLocation from './data/countryLocation'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import Feature from 'ol/Feature'
import Topojson from 'ol/format/TopoJSON'

const covidDataUtil = mapUtil.covidDataUtil
class MapRender {
  constructor (options) {
    this.mapObj = options.mapObj
    this.$mapEvtBus = options.$mapEvtBus
    this._region = options.region ? options.region : 'china' // 指定地图范围
    this._renderType = options.render ? options.render : 'point' // 指定用填充还是散点
    this._renderField = options.renderField ? options.renderField : 'confirmed' // 指定用Covid数据中的哪个属性来渲染
    this._date = options.date ? options.date : covidDataUtil.latestDate // 指定数据日期

    this._curLayer = null
    this._geoData = null
    this._covidData = null
    this.init()
    this.registerEvent()
  }

  async init () {
    this._pointLayer = new PointLayer({
      mapObj: this.mapObj,
      name: 'point'
    })
    this._polygonLayer = new BaseVectorLayer({
      mapObj: this.mapObj,
      name: 'polygon'
    })

    this._covidData = this.getCovidDayDataByRegion(this._region, this._date)
    this._geoData = await this.getGeoData(this._region, this._renderType)
    this.refreshGeoDataProp(this._geoData, this._covidData, this._renderField, this._date)

    this._curLayer = this.loadData(this._geoData, this._renderType)
  }

  registerEvent () {
    // 日期更新
    const self = this
    this.$mapEvtBus.$on('dateChange', (date) => {
      self._date = date
      self._covidData = self.getCovidDayDataByRegion(self._region, date)
      self.refreshLayerData(self._curLayer, self._covidData, self._renderField, date)
    })

    // Covid数据类型更新
    this.$mapEvtBus.$on('covidDataTypeChange', (field) => {
      this._renderField = field
      this.refreshLayerData(this._curLayer, this._covidData, this._renderField, this._date)
    })

    this.$mapEvtBus.$on('regionChange', async (region) => {
      this._curLayer.clearData()
      this._region = region
      this._geoData = await this.getGeoData(this._region, this._renderType)
      this._covidData = await this.getCovidDayDataByRegion(this._region, this._date)
      this.refreshGeoDataProp(this._geoData, this._covidData, this._renderField, this._date)

      this._curLayer = this.loadData(this._geoData, this._renderType)
    })

    this.$mapEvtBus.$on('layerTypeChange', async (layerType) => {
      this._curLayer.clearData()
      this._renderType = layerType
      this._geoData = await this.getGeoData(this._region, this._renderType)
      this.refreshGeoDataProp(this._geoData, this._covidData, this._renderField, this._date)
      this._curLayer = this.loadData(this._geoData, this._renderType)
    })
  }

  /**
   * 根据区域获取当天的COVID数据
   * @param {String} region china/global
   * @param {String} date 日期
   * @returns {Map | null}
   */
  getCovidDayDataByRegion (region, date) {
    let covidDatas
    if (region === 'china') {
      covidDatas = query.getDayDataByLevel(date, 1)
    } else {
      covidDatas = query.getDayCountryData(date)
    }

    if (covidDatas == null || covidDatas.size < 1) {
      return null
    }
    return covidDatas
  }

  /**
   * 获取地理数据
   * @param {String} region 范围
   * @param {String} dataType 类型 covidDataUtil.layerType
   */
  async getGeoData (region, dataType) {
    let fts
    if (dataType === covidDataUtil.layerType.point) {
      if (region === 'china') {
        const result = await api.getChinaPoint()
        const geoData = result.data
        fts = _convertPointToFeatures(geoData.features)
      } else {
        fts = new GeoJSON().readFeatures(countryLocation)
      }
    } else {
      if (region === 'china') {
        const result = await api.getChinaProvince()
        const topojsonData = result.data
        fts = _convertTopojsonToFeatures(topojsonData)
      } else {
        fts = new GeoJSON().readFeatures(world)
      }
    }
    return fts
  }

  /**
   * 给地理数据刷上COVID属性
   * @param {Array[Feature]} geoData
   * @param {Map} covidData
   * @param {String} prop 指定用covid数据中的哪个属性
   * @param {String} date
   */
  refreshGeoDataProp (geoData, covidData, prop, date) {
    if (geoData instanceof Array && covidData instanceof Map) {
      geoData.forEach((ft) => {
        const code = ft.get('code')
        const thisCodeData = covidData.get(code)
        if (thisCodeData) {
          const cloneData = Object.assign({}, thisCodeData)
          cloneData.renderData = cloneData[prop] // 用这个属性渲染地图
          cloneData.date = date
          ft.setProperties(cloneData)
        } else {
          ft.set('renderData', 0)
        }
      })
    }
  }

  refreshLayerData (layer, covidData, prop, date) {
    const geoData = layer.getData()
    this.refreshGeoDataProp(geoData, covidData, prop, date)
  }

  loadData (geoData, type) {
    const layers = {
      point: this._pointLayer,
      polygon: this._polygonLayer
    }
    const layer = layers[type]
    layer.setData(geoData)
    return layer
  }
}

function _convertPointToFeatures (data) {
  if (Array.isArray(data)) {
    const fts = data.map((item) => {
      const point = new Point(item.properties?.cp)
      const ft = new Feature({
        geometry: point
      })
      const prop = {}
      prop.code = item.id
      prop.name = item.properties.name
      ft.setProperties(prop)
      return ft
    })
    return fts
  }
}

function _convertTopojsonToFeatures (data) {
  // 挂载code属性
  const ftData = data?.objects?.ts1?.geometries
  if (Array.isArray(ftData)) {
    ftData.forEach((item) => {
      item.properties.code = item.id
    })
  }
  const fts = new Topojson().readFeatures(data)
  return fts
}

export default MapRender
