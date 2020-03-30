import Vue from 'vue'
import tip from '../components/tip'
var Tip = Vue.extend(tip)

class OverlayCtrl {
  constructor (options) {
    this.mapObj = options.mapObj
  }

  showOverlay (feature, point, type) {
    var tipObj = new Tip({
      mapObj: this.mapObj,
      position: point,
      data: feature.get('data')
    })
    tipObj.show()
  }
}

export default OverlayCtrl

