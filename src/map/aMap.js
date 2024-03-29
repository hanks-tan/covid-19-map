import { Map, View, Overlay } from 'ol'
import Select from 'ol/interaction/Select'

import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import mapUtil from '../utils/mapUtil'
import { Circle, Fill, Stroke, Style } from 'ol/style'
import Object from 'ol/Object'

const covidDataUtil = mapUtil.covidDataUtil
class AMap extends Object {
  constructor (options) {
    super()
    this.options = options
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
      layers: [baseLayer]
    })

    this.initMapControl()
  }

  initMapControl () {
    var self = this
    var registerSelectControl = function () {
      self.selectControl = new Select({
        condition: function (evt) {
          return evt.type === 'singleclick' || evt.type === 'pointermove'
        },
        layers: function (layer) {
          var rlayer = self.vectorLayerList.find(item => item.name === layer.rootName)
          return rlayer
        },
        style: self.selectFeatureStyleFunc.bind(self)
      })

      self.map.addInteraction(self.selectControl)
      self.selectFeatures = self.selectControl.getFeatures()

      self.selectControl.on(['select', 'remove'], function (e) {
        if (e.deselected.length > 0) {
          const ft = e.selected[0]
          self.dispatchEvent({
            type: 'showDetails',
            target: ft,
            position: undefined
          })
        }
        if (e.selected.length > 0) {
          const ft = e.selected[0]
          self.dispatchEvent({
            type: 'showDetails',
            target: ft,
            position: e.mapBrowserEvent.coordinate
          })
        }
      })
    }

    // 注册选择事件
    registerSelectControl()
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
    const minZoom = 1
    const maxZoom = 21
    const center = this.options.center ? this.options.center : [0, 0]
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
      item.oLayer.getSource().clear()
      item = null
    })
  }

  getOlMap () {
    return this.map
  }

  selectFeatureStyleFunc (feature) {
    let count = 1
    if (feature.get('data')) {
      count = feature.get('data').renderData
    }
    const color = covidDataUtil.getColor(count)
    const fill = new Fill({ color: color })
    const level = covidDataUtil.getLevel(count)
    const type = feature.getGeometry().getType()
    const zoom = this.getZoom()
    let style
    if (type === 'Point') {
      style = new Style({
        image: new Circle({
          radius: level * (zoom + 1),
          fill: fill
          // stroke: stroke
        })
      })
    } else {
      style = new Style({
        fill: fill,
        stroke: new Stroke({
          width: 2,
          color: '#409EFF'
        })
      })
    }
    return style
  }

  fit (geom) {
    this.view.fit(geom)
  }

  fitToLayer (aLayer) {
    if (aLayer.getDataExtent) {
      const extent = aLayer.getDataExtent()
      const resolution = this.view.getResolution()
      // 范围缩小一点，要不然碰到地图边界
      extent[0] = extent[0] - 1 * resolution
      extent[1] = extent[1] - 1 * resolution
      extent[2] = extent[2] + 1 * resolution
      extent[3] = extent[3] + 1 * resolution
      if (extent) {
        this.fit(extent)
      }
    }
  }
}

export default AMap
