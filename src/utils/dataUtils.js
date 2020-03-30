import world from '../map/data/world'
import countryLocation from '../map/data/countryLocation'

var clone = function (obj) {
  return Object.assign({}, obj)
}

var decode = function (json) {
  function decodePolygon (coordinate, encodeOffsets, encodeScale) {
    var result = []
    var prevX = encodeOffsets[0]
    var prevY = encodeOffsets[1]

    for (var i = 0; i < coordinate.length; i += 2) {
      var x = coordinate.charCodeAt(i) - 64
      var y = coordinate.charCodeAt(i + 1) - 64
      // ZigZag decoding
      x = (x >> 1) ^ (-(x & 1))
      y = (y >> 1) ^ (-(y & 1))
      // Delta deocding
      x += prevX
      y += prevY

      prevX = x
      prevY = y
      // Dequantize
      result.push([x / encodeScale, y / encodeScale])
    }

    return result
  }
  if (!json.UTF8Encoding) {
    return json
  }
  var encodeScale = json.UTF8Scale
  if (encodeScale == null) {
    encodeScale = 1024
  }

  var features = json.features

  for (var f = 0; f < features.length; f++) {
    var feature = features[f]
    var geometry = feature.geometry
    var coordinates = geometry.coordinates
    var encodeOffsets = geometry.encodeOffsets

    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c]

      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(
          coordinate,
          encodeOffsets[c],
          encodeScale
        )
      } else if (geometry.type === 'MultiPolygon') {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2]
          coordinate[c2] = decodePolygon(
            polygon,
            encodeOffsets[c][c2],
            encodeScale
          )
        }
      }
    }
  }
  // Has been decoded
  json.UTF8Encoding = false
  return json
}

var worldData = decode(world)

const dataUtils = {
  getGeoData (params) {
    var geoData = null
    if (params.layerType === 'point') {
      geoData = this.getCountryLocation(params.countryName)
    } else {
      geoData = this.getCountry(params.countryName)
    }
    return geoData
  },
  getWorld () {
    return this.progressWorld()
  },
  getCountry (countryName) {
    var worldData = this.progressWorld()
    if (countryName) {
      var result = worldData.find(item => item.countryName === countryName)
      return result
    }
    return worldData
  },

  getCountryLocation (countryName) {
    if (countryName) {
      var result = countryLocation.find(item => item.countryName === countryName)
      return result
    }
    return clone(countryLocation)
  },

  progressWorld () {
    var worldObj = clone(worldData)
    worldObj.features.forEach(item => {
      item.type = 'Feature'
      if (item.properties.name === 'China') {
        console.log(item)
        var coordList = item.geometry.coordinates.filter(elt => {
          return elt.length > 0
        })
        item.geometry.coordinates = coordList
      }
    })
    return worldData
  }

}
export default dataUtils
