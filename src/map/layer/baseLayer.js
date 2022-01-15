import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import defaultStyle from '../defaultStyle'
class BaseLayer {
  oLayer = null
  constructor (options) {
    this.mapObj = options.mapObj
    this.name = options.name
    this.styleFunc = options.styleFunc || this._styleFunc
    this.dialog = undefined
    this.init()
  }

  init () {
    var layer = new VectorLayer({
      source: new VectorSource(),
      style: this.styleFunc.bind(this)
    })
    layer.rootName = this.name
    this.oLayer = layer
    if (this.mapObj) {
      this.mapObj.addLayer(this)
    }
  }

  setData (data) {
    this._loadData(data)
  }

  _loadData (data) {
    var fts = data
    this.clearData()
    this.oLayer.getSource().addFeatures(fts)
  }

  clearData () {
    this.oLayer.getSource().clear()
  }

  getData () {
    return this.oLayer.getSource().getFeatures()
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

  setVisible (visible) {
    this.oLayer.setVisible(visible)
  }
}

export default BaseLayer
