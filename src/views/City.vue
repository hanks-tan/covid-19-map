<template>
  <div>
    <div id="map">
      <div class="top" v-if="mapObj">
        <el-input placeholder="请输入内容" v-model="input">
          <el-button slot="prepend" icon="el-icon-menu" @click="showLayerSwith=!showLayerSwith"></el-button>
        </el-input>
        <LayerSelector
          v-show="showLayerSwith"
          class="layer"></LayerSelector>
      </div>
      <div class="bottom">
        <div class="sos">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayerSelector from '../components/LayerSelector.vue'
import AMap from '../map/aMap'
export default {
  data () {
    return {
      mapObj: null,
      input: '',
      showLayerSwith: false
    }
  },
  components: {
    LayerSelector
  },
  provide () {
    const self = this
    return {
      getMap () {
        return self.mapObj
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.mapObj = new AMap({
        target: 'map',
        center: [114.21923, 22.717446],
        zoom: 16
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
    position: absoulte;
  }
  .top{
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 50%;
    z-index: 100;
    .layer{
      position: absolute;
      left: 0;
      z-index: 100;
    }
  }
  .bottom{
    position: absolute;
    bottom: 1rem;
    text-align: center;
    z-index: 100;
  }
</style>
