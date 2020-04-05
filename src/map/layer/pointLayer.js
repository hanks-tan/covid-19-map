import BaseLayer from './baseLayer'
import { Style, Fill, Stroke, Circle, RegularShape } from 'ol/style'
import mapUtil from '../../utils/mapUtil'

class PointLayer extends BaseLayer {
  setData (data) {
    this.data = data
    this._loadData()
  }

  _styleFunc (feature) {
    var count = 0
    if (feature.get('data')) {
      // count = feature.get('data').currentConfirmedCount // XXX 更新接口可能导致这个字段变更
      count = feature.get('data').confirmed // TODO 选中后消失问题
    }
    if (count === undefined) {
      count = 0
    }
    var color = mapUtil.getColor(count)
    var level = mapUtil.getLevel(count)
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
