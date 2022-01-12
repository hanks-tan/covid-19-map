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
        center: [112, 32],
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
</style>
