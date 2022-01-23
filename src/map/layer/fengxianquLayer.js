import BaseLayer from './baseLayer'
import { Style, Fill, Stroke, Circle, RegularShape } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import { getVectorContext } from 'ol/render'
import { unByKey } from 'ol/Observable'
import { easeOut } from 'ol/easing'

const colorMap = {
  1: '#bd2130', // 红
  2: '#ffc107', // 黄
  3: '#2461a3' // 蓝
}
class FengxianquLayer extends BaseLayer {
  _flashLayer = null
  setData (data) {
    this._loadData(data)

    if (this.options.showAnimaion) {
      if (!this._flashLayer) {
        this._createFlashLayer()
        const source = this._flashLayer.getSource()
        source.on('addfeature', (e) => {
          this._flash(e.feature)
        })
      }
      this._startAnimation()
    }
  }

  _styleFunc (feature) {
    const geomType = feature.getGeometry().getType()
    const color = colorMap[feature.get('level') || 3]
    if (geomType === 'Point') {
      return this._createPointStyle({
        size: 5,
        fillColor: color,
        strokeColor: '#ccc',
        strokeWidth: 1
      })
    } else if (geomType === 'Polygon') {
      return new Style({
        fill: new Fill({
          color: color
        }),
        style: new Style({
          color: '#ccc',
          width: 2
        })
      })
    }
  }

  _createPointStyle (option) {
    return new Style({
      image: new Circle({
        radius: option.size,
        fill: new Fill({
          color: option.fillColor
        }),
        stroke: new Stroke({
          color: option.strokeColor,
          width: option.strokeWidth
        })
      })
    })
  }

  _createFlashLayer () {
    this._flashLayer = new VectorLayer({
      source: new VectorSource(),
      // style () {
      //   return new Style({
      //     image: new Circle({
      //       radius: 20,
      //       stroke: new Stroke({
      //         color: 'red',
      //         width: 1
      //       })
      //     })
      //   })
      // }
    })
    this.mapObj.getOlMap().addLayer(this._flashLayer)
  }

  _startAnimation () {
    const features = this.oLayer.getSource().getFeatures()
    const pointsFeature = []
    features.forEach((item) => {
      const geom = item.getGeometry()
      if (geom.getInteriorPoint) {
        const point = geom.getInteriorPoint()
        const pt = new Feature({
          geometry: point
        })
        pt.setProperties({
          time: 0
        })
        pointsFeature.push(pt)
      }
    })

    if (pointsFeature.length === 0) {
      return
    }
    const source = this._flashLayer.getSource()
    let index = 0
    const timer = setInterval(() => {
      if (index === pointsFeature.length) {
        clearInterval(timer)
      } else {
        source.addFeature(pointsFeature[index])
        index++
      }
    }, 1000)
  }

  _flash (feature) {
    const map = this.mapObj.getOlMap()
    let start = Date.now()
    const flashGeom = feature.getGeometry().clone()
    const listenerKey = map.on('postrender', animate)

    const duration = 30000
    function animate (event) {
      const frameState = event.frameState
      const elapsed = frameState.time - start
      if (elapsed >= duration) {
        // unByKey(listenerKey)
        start += duration
        return
      }
      // const vectorContext = getVectorContext(event)
      const elapsedRatio = elapsed / duration
      // radius will be 5 at start and 30 at end.
      const radius = easeOut(elapsedRatio) * 25 + 5
      const opacity = easeOut(1 - elapsedRatio)

      const style = new Style({
        image: new Circle({
          radius: radius,
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, ' + opacity + ')',
            width: 0.25 + opacity
          })
        })
      })

      feature.setStyle(style)
      // feature.drawGeometry(flashGeom)
      // tell OpenLayers to continue postrender animation
      map.render()
    }
  }
}

export default FengxianquLayer
