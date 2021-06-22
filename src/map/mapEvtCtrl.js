import BaseVectorLayer from './layer/baseVectorLayer'
import PointLayer from './layer/pointLayer'
import mapHttps from '../https/mapHttp'
import mapUtil from '../utils/mapUtil'
import mapData from './data/mapData'
import moment from 'moment'

class MapEvtCtrl {
  constructor (options) {
    this.mapObj = options.mapObj
    this.$mapEvtBus = options.$mapEvtBus
    this.registerEvent()
  }

  registerEvent () {
    var self = this
    this.$mapEvtBus.$on(mapUtil.mapEvt.render, function (params) {
      console.log(params)
      self.mapObj.clear()
      var layer = null
      if (params.layerType === mapUtil.layerType.point) {
        layer = new PointLayer({
          mapObj: self.mapObj,
          name: params.layerType
        })
      } else {
        layer = new BaseVectorLayer({
          mapObj: self.mapObj,
          name: params.layerType
        })
      }
      var curDate = moment()
      if (params.dataType === mapUtil.covidDataType.history) {
        if (!params.date) {
          params.date = mapUtil.covidDefaultStartTime
        } else {
          var date = moment(params.date).format('YYYY-MM-DD')
          params.date = date
        }
      } else {
        // curDate = moment('20200405') // TODO 测试时间，用完删除
        // params.date = curDate.format('YYYY-MM-DD')
        params.date = '2020-04-11'
      }

      mapHttps.getCovidData(params).then(data => {
        params.fieldType = params.fieldType === undefined ? mapUtil.defaultRendeField : params.fieldType
        if (data.length <= 0) {
          return
        }
        if (!data[0].hasOwnProperty(params.fieldType)) {
          console.log('rende field not found')
        }
        data.forEach(element => {
          let value = 0
          if (params.fieldType.startsWith('add')) {
            let key = params.fieldType.replace('add', '').toLowerCase()
            value = element.add[key]
          } else {
            value = element[params.fieldType]
          }
          element.renderData = value
        })
        var geoData = mapData.getCountryDataByCode(params)
        var layerData = mapData.joinCovDateToGeo(data, geoData)
        layer.setData(layerData)
      })
    })
  }
}

export default MapEvtCtrl
