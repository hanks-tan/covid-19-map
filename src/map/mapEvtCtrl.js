import BaseVectorLayer from './layer/baseVectorLayer'
import PointLayer from './layer/pointLayer'
import mapUtil from '../utils/mapUtil'
import moment from 'moment'
import query from './data/query'
import world from './data/world'
import countryLocation from './data/countryLocation'
import GeoJSON from 'ol/format/GeoJSON'
import { Point } from 'ol/geom'
import Feature from 'ol/Feature'

const covidDataUtil = mapUtil.covidDataUtil
class MapEvtCtrl {
  constructor (options) {
    this.mapObj = options.mapObj
    this.$mapEvtBus = options.$mapEvtBus
    this.registerEvent()
  }

  registerEvent () {
    var self = this

    this._pointLayer = new PointLayer({
      mapObj: this.mapObj,
      name: 'point'
    })
    this._polygonLayer = new BaseVectorLayer({
      mapObj: this.mapObj,
      name: 'polygon'
    })

    this.$mapEvtBus.$on(covidDataUtil.mapEvt.render, async function (params) {
      self._pointLayer.clearData()
      self._polygonLayer.clearData()

      let date = params.date
      const latestDate = '2020-04-11'
      if (date) {
        if (!moment(date).isBefore(latestDate)) {
          date = latestDate
        }
      }
      
      // TODO 需要根据layerType 和 region 加载范围数据
      let covidDatas
      if (params.region === 'china') {
        covidDatas = query.getDayDataByLevel(date, 1)
      } else {
        covidDatas = query.getDayCountryData(date)
      }
      if (covidDatas.size < 1) {
        return
      }

      let fts
      if (params.layerType === covidDataUtil.layerType.point) {
        if (params.region === 'china') {
          const result = await this.$api.getChinaPoint()
          const geoData = result.data
          fts = convertPointToFeatures(geoData.features)
        } else {
          fts = new GeoJSON().readFeatures(countryLocation)
        }
      } else {
        if (params.region === 'china') {

        } else {
          fts = new GeoJSON().readFeatures(world)
        }
      }

      fts.forEach((ft) => {
        const code = ft.get('code')
        const thisCodeData = covidDatas.get(code)
        if (thisCodeData) {
          const cloneData = Object.assign({}, thisCodeData)
          cloneData.renderData = cloneData[params.fieldType]
          cloneData.date = params.date
          ft.setProperties(cloneData)
        }
      })

      const layer = params.layerType === covidDataUtil.layerType.point ? self._pointLayer : self._polygonLayer
      layer.setData(fts)

      // mapHttps.getCovidData(params).then(data => {
      //   params.fieldType = params.fieldType === undefined ? covidDataUtil.defaultRendeField : params.fieldType
      //   if (data.length <= 0) {
      //     return
      //   }
      //   if (!data[0].hasOwnProperty(params.fieldType)) {
      //     console.log('rende field not found')
      //   }
      //   data.forEach(element => {
      //     let value = 0
      //     if (params.fieldType.startsWith('add')) {
      //       let key = params.fieldType.replace('add', '').toLowerCase()
      //       value = element.add[key]
      //     } else {
      //       value = element[params.fieldType]
      //     }
      //     element.renderData = value
      //   })
      //   var geoData = mapData.getCountryDataByCode(params)
      //   var layerData = mapData.joinCovDateToGeo(data, geoData)
      //   layer.setData(layerData)
      // })
    })
  }
}

function convertPointToFeatures (data) {
  if (Array.isArray(data)) {
    const fts = data.map((item) => {
      const point = new Point([item?.properties?.cp])
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

export default MapEvtCtrl
