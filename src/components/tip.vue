<template>
  <div class="info" v-if="visible">
    <div class="header">{{ncovData.country}}</div>
    <div class="content">
      <div class="data-info" id="currentConfirmedCount">{{ncovData.currentConfirmedCount}}</div>
      <div class="data-info" id="confirmedCount">{{ncovData.confirmedCount}}</div>
      <div class="data-info" id="curedCount">{{ncovData.curedCount}}</div>
      <div class="data-info" id="deadCount">{{ncovData.deadCount}}</div>
    </div>
  </div>
</template>
<script>
import Overlay from 'ol/Overlay'
export default {
  data () {
    return {
      ncovData: {
        country: '',
        currentConfirmedCount: 0,
        confirmedCount: 0,
        curedCount: 0,
        deadCount: 0
      },
      visible: false,
      overlay: undefined
    }
  },
  created () {
    this.init()
  },
  watch: {
    position (newVal) {
      if (this.overlay) {
        this.overlay.setPosition(newVal)
      }
    }
  },
  methods: {
    init () {
      var overlay = new Overlay({
        element: this.$mount().$el,
        stopEvent: false, // 设为false,允许事件传播
        autoPanAnimation: {
          duration: 250
        },
        offset: [30, 0],
        position: this.position,
        positioning: 'center-center',
        className: 'point-overlay'
      })
      this.mapObj.getOlMap().addOverlay(overlay)
      this.overlay = overlay
    },

    show () {
      if (this.properties) {
        this.ncovData = this.properties
        this.visible = true
      }
    },

    close () {
      this.visible = false
    },

    refresh (params) {
      if (params.properties) {
        this.ncovData = params.properties
        this.position = params.position
      }
    }
  }
}
</script>
