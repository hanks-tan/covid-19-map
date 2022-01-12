<template>
  <div id="map">
    
  </div>
</template>

<script>
import AMap from '../map/aMap'
export default {
  data () {
    return {
      mapObj: undefined // 地图对象
    }
  },
  methods: {
    init () {
      this.mapObj = new AMap({
        target: 'map',
        center: [0, 0],
        zoom: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('~ol/ol.css');
  #map{
    height: 100vh;
    width: 100%;
  }
</style>
