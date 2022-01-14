import BaseLayer from './baseLayer'
import { Style, Fill, Stroke, Circle, RegularShape } from 'ol/style'
import mapUtil from '../../utils/mapUtil'

const covidDataUtil = mapUtil.covidDataUtil

class PointLayer extends BaseLayer {
  setData (data) {
    this._loadData(data)
  }

  _styleFunc (feature) {
    var count = 0
    if (feature.get('renderData')) {
      count = feature.get('renderData')
    }
    var color = covidDataUtil.getColor(count)
    var level = covidDataUtil.getLevel(count)
    var zoom = this.mapObj.getZoom()
    var stroke = new Stroke({ color: '#e21644', width: 0.5 })
    var fill = new Fill({ color: color })
    var style = new Style({
      image: new Circle({
        radius: level * zoom,
        fill: fill,
        // stroke: stroke
      })
    })
    return style
  }
}

export default PointLayer
