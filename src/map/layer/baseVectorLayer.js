import BaseLayer from './baseLayer'
import { Style, Fill, Stroke } from 'ol/style'
import mapUtil from '../../utils/mapUtil'

class BaseVectorLayer extends BaseLayer {
  setData (data) {
    this._loadData(data)
  }

  _styleFunc (feature) {
    var count = 0
    if (feature.get('renderData')) {
      count = feature.get('renderData')
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
