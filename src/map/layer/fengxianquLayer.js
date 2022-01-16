import BaseLayer from './baseLayer'
import { Style, Fill, Stroke, Circle, RegularShape } from 'ol/style'
import { options } from 'less'

const colorMap = {
  1: '#bd2130', // 红
  2: '#ffc107', // 黄
  3: '#2461a3' // 蓝
}
class FengxianquLayer extends BaseLayer {
  setData (data) {
    this._loadData(data)
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
          color: options.fillColor
        }),
        stroke: new Stroke({
          color: option.strokeColor,
          width: option.strokeWidth
        })
      })
    })
  }
}

export default FengxianquLayer
