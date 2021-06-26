import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import defaultStyle from '../defaultStyle'

import Vue from 'vue'
import tip from '../../components/tip'

// var DialogComp = Vue.extend(tip)

class BaseLayer {
  oLayer = null
  data = null
  constructor (options) {
    this.mapObj = options.mapObj
    this.name = options.name
    this.data = options.data
    this.styleFunc = options.styleFunc
    this.dialog = undefined
    this.init()
  }

  init () {
    var layer = new VectorLayer({
      source: new VectorSource(),
      style: this._styleFunc.bind(this)
    })
    layer.rootName = this.name
    this.oLayer = layer
    this.mapObj.addLayer(this)
    this.setData(this.data)
  }

  setData (data) {
    this.data = data
    this._loadData()
  }

  _loadData () {
    if (!this.data) {
      return
    }
    var self = this
    var fts = this.data
    // fts.forEach(item => {
    //   item.showDetails = function (point, status) {
    //     self.showDetails(item, point, status)
    //   }
    // })
    this.oLayer.getSource().addFeatures(fts)
  }

  clearData () {
    this.oLayer.getSource().clear()
    this.data = null
  }

  getData () {
    return this.data
  }

  setMap (map) {
    if (map) {
      this.mapObj = map
      this.mapObj.addLayer(this)
    }
  }

  _styleFunc (feature) {
    var type = feature.getGeometry().getType()
    type = type.replace('Multi', '')
    var func = defaultStyle[type]
    return func(feature)
  }

  showDetails (feature, point, status) {
    if (status === 'select') {
      var covidData = feature.get('data')
      covidData.country = feature.get('name')
      if (this.dialog) {
        this.dialog.refresh({
          properties: covidData,
          position: point
        })
      } else {
        this.dialog = this._createDialog(covidData, point)
        this.dialog.show()
      }
    } else {
      if (this.dialog) {
        this.dialog.close()
      }
      this.dialog = null
    }
  }

  _createDialog (data, point) {
    var dialog = new DialogComp({
      data: {
        mapObj: this.mapObj,
        properties: data,
        position: point
      }
    })

    return dialog
  }
}

export default BaseLayer
