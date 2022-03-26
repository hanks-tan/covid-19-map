<template>
  <div>
    <div class="search_wrap">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="layer_wrap">
      <div
        @click="changeTotalType"
        class="layer_item"
        >{{totalType.label}}</div>
      <div @click="showChartHandle(0)" class="layer_item">分布图</div>
      <div @click="showChartHandle(1)" class="layer_item last_item">趋势图</div>
      <div>

      </div>
    </div>
    <Map
      :center="mapCenter"
      ref="map">
    </Map>
    <div class="chart_wrap">
      <DistributionChart v-if="showChart === 'distributionChart'" :data="szyqData"></DistributionChart>
      <TrendChart v-else-if="showChart === 'trendChart'" :data="szyqData"></TrendChart>
    </div>
  </div>
</template>

<script>
import Map from '../../components/Map.vue'
import Heatmap from 'ol/layer/Heatmap'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import DistributionChart from './DistributionChart.vue'
import TrendChart from './TrendChart.vue'
import mixin from './mixin'
export default {
  components: {
    Map,
    DistributionChart,
    TrendChart
  },
  mixins: [mixin],
  data () {
    return {
      szyqData: null,
      heatlayer: null,
      mapCenter: [114.040504, 22.553397],
      totalIndex: 0,
      showChart: '',
      input: ''
    }
  },
  computed: {
    totalType () {
      return this.totalTypeList[this.totalIndex]
    }
  },
  watch: {
    totalIndex (val) {
      this.changeMapData(val)
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.getSzyzData().then((res) => {
        this.szyqData = res
        if (this.$refs.map.mapObj) {
          this.showHeatmap(res)
        }
      })
    },
    showHeatmap (data, v) {
      const amap = this.$refs.map.mapObj
      if (amap) {
        if (this.heatlayer) {
          amap.getOlMap().removeLayer(this.heatlayer)
        }
        this.heatlayer = this.createHeatmap()
        amap.getOlMap().addLayer(this.heatlayer)
        const fts = data.map((d) => {
          const x = parseFloat(d.x, 10)
          const y = parseFloat(d.y, 10)
          return new Feature({
            geometry: new Point([x, y])
          })
        })
        const source = this.heatlayer.getSource()
        source.addFeatures(fts)
      }
    },
    createHeatmap () {
      const layer = new Heatmap({
        source: new VectorSource(),
        blur: 7,
        radius: 5,
        weight: function () {
          return 3
        }
      })
      return layer
    },
    changeTotalType () {
      this.totalIndex = this.totalIndex >= this.totalTypeList.length - 1 ? 0 : this.totalIndex + 1
    },
    changeMapData (val) {
      const data = this.filterMapDataBySubDate(this.totalTypeList[val].value, this.szyqData)
      this.showHeatmap(data, 1)
    },
    showChartHandle (cmd) {
      const chartType = cmd === 0 ? 'distributionChart' : 'trendChart'
      if (this.showChart === chartType) {
        this.showChart = ''
      } else {
        this.showChart = chartType
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @topMargin:1rem;
  .search_wrap{
    position: absolute;
    top: @topMargin;
    left: 1rem;
    z-index: 2;
    width: 30%;
  }
  .layer_wrap{
    position: absolute;
    top: @topMargin;
    right: 10rem;
    z-index: 2;
    display: inline-flex;
    background-color: cornflowerblue;
    border-radius: 3px;
    padding: 10px 0;
    .layer_item{
      padding: 0 10px;
      border-right: 1px solid burlywood;
    }
    .last_item{
      border-right: 0;
    }
  }
  .chart_wrap{
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 5px;
    width: 40%;
  }
</style>
