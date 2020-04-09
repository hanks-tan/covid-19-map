import BaseLayer from './baseLayer'
import { Style, Fill, Stroke } from 'ol/style'
import mapUtil from '../../utils/mapUtil'

class BaseVectorLayer extends BaseLayer {
  setData (data) {
    this.data = data
    this._loadData()
  }

  _styleFunc (feature) {
    var count = 0
    if (feature.get('data') !== {}) {
      count = feature.get('data').renderData
    }
    if (count === undefined) {
      count = 0
    }
    var color = mapUtil.getColor(count)
    var style = new Style({
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        width: 1,
        color: '#7f858c'
      })
    })
    return style
  }
}

export default BaseVectorLayer
