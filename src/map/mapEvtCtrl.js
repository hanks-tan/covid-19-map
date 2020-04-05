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
        params.date = curDate.format('YYYY-MM-DD')
      }

      mapHttps.getCovidData(params).then(data => {
        var geoData = mapData.getCountryDataByCode(params)
        var layerData = mapData.joinCovDateToGeo(data, geoData)
        layer.setData(layerData)
      })
    })
  }
}

export default MapEvtCtrl
