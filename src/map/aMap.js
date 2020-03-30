import { Map, View, Overlay } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Select from 'ol/interaction/Select'
import GeoJSON from 'ol/format/GeoJSON'

import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import dataUtils from '../utils/dataUtils'
import defaultStyle from './defaultStyle'
import mapData from './data/mapData'
import mapUtil from '../utils/mapUtil'

class AMap {
  constructor (options) {
    this.options = Object.assign({}, options)
    this.mapCenter = options.mapCenter
    this.projection = 'EPSG:4326'
    this.view = undefined
    this.map = undefined
    this.vectorLayerList = []
    this.initMap()
  }

  initMap () {
    var baseLayer = new TileLayer({
      source: new XYZ({
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
      })
    })

    this.view = new View(this.getViewOptions())

    // var geoJson = dataUtils.getWorld()
    var worldData = mapData.getCountryDataByCode({layerType: mapUtil.layerType.polygon})
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        // features: new GeoJSON().readFeatures(geoJson)
        features: worldData
      }),
      style: defaultStyle.Polygon
    })

    var popup = document.getElementById('popup')
    this.overlay = new Overlay({
      element: popup,
      offset: [10, 10],
      autoPanAnimation: {
        duration: 250
      }
    })

    this.map = new Map({
      target: 'map',
      view: this.view,
      overlays: [this.overlay],
      layers: [this.vectorLayer]
    })

    this.map.on('click', this._clickHandle.bind(this))

    this.map.on('pointermove', this._pointerMoveHandle.bind(this))

    this.initMapControl()
  }

  initMapControl () {
    var self = this
    var registerSelectControl = function () {
      self.selectControl = new Select({
        condition: function (evt) {
          return evt.type === 'singleclick' || evt.type === 'pointermove'
        }
      })

      self.map.addInteraction(self.selectControl)
      self.selectFeatures = self.selectControl.getFeatures()

      self.selectControl.on(['select', 'remove'], function (e) {
        if (e.selected.length > 0) {
          const ft = e.selected[0]
          if (ft.showDetails) {
            ft.showDetails(e.mapBrowserEvent.coordinate, 'select')
          }
        }

        if (e.deselected.length > 0) {
          const ft = e.deselected[0]
          if (ft.showDetails) {
            ft.showDetails(e.mapBrowserEvent.coordinate, 'romove')
          }
        }
      })
    }

    // 注册选择事件
    registerSelectControl()
  }

  _clickHandle (evt) {
    var features = this.map.getFeaturesAtPixel(evt.pixel)
    if (features.length > 0) {
      features.forEach(item => {
        var type = item.getGeometry().getType()
        var style = defaultStyle[type.replace('Multi')]
        item.setStyle(style)
      })
    }
  }

  _pointerMoveHandle (evt) {
    var features = this.map.getFeaturesAtPixel(evt.pixel)
    if (features.length > 0) {
      var ft = features[0]
      if (ft.showDetails) {
        ft.showDetails(evt.coordinate, 'select')
      }
    }
  }

  getViewOptions () {
    const projection = 'EPSG:4326'
    const zoom = this.options.zoom ? this.options.zoom : 5
    const minZoom = zoom - 3 > 0 ? zoom - 3 : zoom
    const maxZoom = zoom + 3
    const center = this.options.center ? this.options.center : [0, 0] // TODO 默认地图中心设为西安
    return {
      projection,
      zoom,
      center,
      minZoom,
      maxZoom
    }
  }

  getZoom () {
    return this.view.getZoom()
  }

  addLayer (layer) {
    this.map.addLayer(layer.oLayer)
    this.vectorLayerList.push(layer)
  }

  removeLayer (name) {
    var layer = this.vectorLayerList.find(item => item.name === name)
    if (layer) {
      this.map.removeLayer(layer.oLayer)
      layer = null
    }
  }

  clear () {
    var layers = this.vectorLayerList
    layers.forEach(item => {
      this.map.removeLayer(item.oLayer)
      item = null
    })
  }

  getOlMap () {
    return this.map
  }
}

export default AMap
