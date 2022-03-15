<template>
  <div>
    <div class="layer_wrap">
      <div
        @click="changeTotalType"
        >{{totalType.label}}</div>
      <div @click="showDistributionChart = !showDistributionChart">分布图</div>
      <div>趋势图</div>
      <div>

      </div>
    </div>
    <Map
      :center="mapCenter"
      ref="map">
    </Map>
    <div class="chart_wrap">
      <DistributionChart v-if="showDistributionChart" :data="szyqData"></DistributionChart>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Map from '../../components/Map.vue'
import Heatmap from 'ol/layer/Heatmap'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import DistributionChart from './DistributionChart.vue'
export default {
  components: {
    Map,
    DistributionChart
  },
  data () {
    return {
      szyqData: null,
      heatlayer: null,
      mapCenter: [114.040504, 22.553397],
      totalTypeList: [
        {
          code: 'day',
          label: '昨日数据',
          value: 2
        },
        {
          code: 'day3',
          label: '三日累计',
          value: 4
        },
        {
          code: 'day7',
          label: '七日累计',
          value: 8
        },
        {
          code: 'day15',
          label: '十五日累计',
          value: 16
        }
      ],
      totalIndex: 0,
      showDistributionChart: false
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
      const data = this.filterMapData(this.totalTypeList[val], this.szyqData)
      this.showHeatmap(data, 1)
    },
    filterMapData (type, data) {
      if (!Array.isArray(data)) {
        return
      }
      const endDate = moment().subtract(type.value, 'day')
      const targetData = data.filter((item) => {
        const dataDate = moment(item.date)
        return dataDate.isAfter(endDate)
      })
      return targetData
    }
  }
}
</script>

<style scoped>
  .layer_wrap{
    position: absolute;
    top: 1rem;
    right: 10rem;
    z-index: 2;
  }
  .chart_wrap{
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 5px;
  }
</style>
