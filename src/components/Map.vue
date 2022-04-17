<template>
  <div id="map"></div>
</template>

<script>
import AMap from '../map/aMap'
export default {
  props: {
    center: {
      type: Array,
      default: function () {
        return [112, 32]
      }
    },
    zoom: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      mapObj: undefined // 地图对象
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.mapObj = new AMap({
        target: 'map',
        center: this.center,
        zoom: this.zoom
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('~ol/ol.css');
  #map{
    height: 100%;
    width: 100%;
  }
</style>
