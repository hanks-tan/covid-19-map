<template>
  <div class="map-legend">
    <div v-for="item in categoryList" class="legend-item" :key="item.no">
      <div :style="{backgroundColor:item.color}" @click="handleLegendClick"></div>
      <span>{{item.level}}</span>
    </div>
  </div>
</template>
<script>
import mapUtil from '../utils/mapUtil'

export default {
  data () {
    return {
      categoryList: []
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var colorList = mapUtil.colorList
      for (let i = 0; i < colorList.length; i++) {
        this.categoryList.push({
          no: i,
          color: colorList[i],
          level: this.formatLevel(i)
        })
      }
    },
    handleLegendClick () {
    },
    formatLevel (index) {
      var legendLabel = ''
      if (index === 0) {
        legendLabel = '0人'
      } else if (index === mapUtil.levels.length - 1) {
        legendLabel = `${mapUtil.levels[index]}人以上`
      } else {
        var min = mapUtil.levels[index]
        var max = mapUtil.levels[index + 1]
        legendLabel = `${min}-${max}人`
      }
      return legendLabel
    }
  }
}
</script>
<style lang="less">
.map-legend{
    right: 1%;
    padding: 5px;
    bottom: 0px;
    text-align: left;
    position: absolute;
    background-color: rgba(54, 16, 22, 0.4);
    .legend-item{
      color: #bfbebe;
    }
  .legend-item div{
    margin-right: 10px;
    width: 20px;
    height: 10px;
    display: inline-block;
  }
}
</style>
