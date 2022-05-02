<template>
  <div class="map-legend">
    <div v-for="item in categoryList" class="legend-item" :key="item.no">
      <el-tooltip :content="item.level" placement="top">
        <div :style="{backgroundColor:item.color,height:height}" @click="handleLegendClick"></div>
        <!-- <div>{{item.level}}</div> -->
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import mapUtil from '../utils/mapUtil'

const covidDataUtil = mapUtil.covidDataUtil
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
      var colorList = covidDataUtil.colorList
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
      } else if (index === covidDataUtil.levels.length - 1) {
        let max = covidDataUtil.levels[index]
        max = max >= 1000 ? `${max / 1000}k` : max
        legendLabel = `${max}人以上`
      } else {
        // var min = covidDataUtil.levels[index]
        var max = covidDataUtil.levels[index + 1]
        max = max >= 1000 ? `${max / 1000}k` : max
        legendLabel = `少于${max}人`
      }
      return legendLabel
    }
  }
}
</script>
<style lang="less">
.map-legend{
    // right: 0;
    // bottom: 0px;
    // position: absolute;
    text-align: left;
    // width: 140px;
    display: flex;
    // grid-template-columns: repeat(4, 25%);
    // background-color: rgba(54, 16, 22, 0.4);
    .legend-item{
      color: #bfbebe;
    }
  .legend-item div{
    width: 2.9rem;
    height: 1rem;
    display: inline-block;
  }
}
</style>
