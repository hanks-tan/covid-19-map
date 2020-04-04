<template>
  <div>
    <div class="map-btn" @click="clickDataType">
      <li v-if="isLatestData">最新</li>
      <li v-else>历史</li>
    </div>
    <div class="map-btn" @click="clickLayerType">
      <li v-if="layerType === 'point'">饼图</li>
      <li v-else>分布图</li>
    </div>
  </div>
</template>
<script>
import mapUtil from '../utils/mapUtil'
export default {
  data () {
    return {
      isLatestData: true,
      layerType: mapUtil.layerType.point
    }
  },
  methods: {
    clickDataType () {
      this.isLatestData = !this.isLatestData
      this.$emit('dataTypeChange', this.isLatestData)
    },
    clickLayerType () {
      this.layerType = this.layerType !== mapUtil.layerType.point ? mapUtil.layerType.point : mapUtil.layerType.polygon
      this.$emit('layerTypeChange', this.layerType)
    }
  }
}
</script>
<style lang="less">
  .map-btn{
    display: inline;
    li{
      display: inline-block;
      width: 101px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      padding: 0 10px;
    }
  }
</style>