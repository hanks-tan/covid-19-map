<template>
  <div class="info-contanier" v-if="visible">
    <h3>地区:{{ncovData.country}}</h3>
    <p>累计确诊:{{ncovData.confirmed}}</p>
    <p>现存确诊:{{ncovData.curConfirm}}</p>
    <!-- <p>现存疑似:{{ncovData.suspected}}</p> -->
    <p>累计治愈:{{ncovData.cured}}</p>
    <p>累计死亡:{{ncovData.dead}}</p>
  </div>
</template>
<script>
import Overlay from 'ol/Overlay'
export default {
  data () {
    return {
      ncovData: {
        country: '',
        confirmed: 0, // 确诊的
        curConfirm: 0, // 现存确诊的
        suspected: 0, // 疑似的
        cured: 0, // 治愈的
        dead: 0 // 死亡的
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
        positioning: 'center-left',
        className: 'point-overlay'
      })
      this.mapObj.getOlMap().addOverlay(overlay)
      this.overlay = overlay
    },

    show () {
      if (this.properties) {
        this.ncovData.country = this.properties.country
        this.ncovData.confirmed = this.properties.confirmed
        this.ncovData.suspected = this.properties.suspected
        this.ncovData.cured = this.properties.cured
        this.ncovData.dead = this.properties.dead
        this.visible = true
      }
    },

    close () {
      this.mapObj.getOlMap().removeOverlay(this.overlay)
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
<style lang="less">
.info-contanier{
  color: #bfbebe;
  padding: 5px;
  background: #212027ab;
  border: 1px solid #6f6e6e;
  border-radius: 3px;
  text-align: left;
}
</style>