import { Style, Stroke, Fill, Circle as CircleStyle, Text } from 'ol/style'

var stroke = new Stroke({
  color: '#7f858c',
  width: 1
})

var fill = new Fill({
  color: '#777279'
})

const defaultStyle = {
  Point: function (feature) {
    return new Style({
      image: new CircleStyle({
        radius: 2,
        fill: fill,
        stroke: stroke
      })
    })
  },
  Polyline: function (feature) {
    return new Style({
      stroke: stroke
    })
  },
  Polygon: function (feature) {
    return new Style({
      fill: fill,
      stroke: stroke
    })
  },
  Text: function (feature, field) {
    return new Style({
      text: new Text({
        text: feature.get(field) ? feature.get(field).toString() : '',
        fill: fill
      })
    })
  }
}

export default defaultStyle
