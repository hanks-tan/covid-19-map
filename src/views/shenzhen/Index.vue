<template>
  <div class="container">
    <div class="search_wrap">
      <el-input placeholder="请输入日期或者地址" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="layer_wrap">
      <div class="selector_wrap">
        <div
          @click="changeTotalType"
          class="layer_item"
          :class="{disabled: showTimeLine}"
          >{{totalType.label}}</div>
        <div @click="showChartHandle(0)" class="layer_item" :class="{disabled: showTimeLine}">分布图</div>
        <div @click="showChartHandle(1)" class="layer_item" :class="{disabled: showTimeLine}">趋势图</div>
        <div @click="showTimeLineHandle" class="layer_item last_item">时间轴</div>
      </div>
      <div v-show="totalType.code === 'custom'" class="date_picker">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          @change="dataRangeChanged">
        </el-date-picker>
      </div>
    </div>
    <Map
      :center="mapCenter"
      ref="map">
    </Map>
    <div class="chart_wrap" v-show="!showTimeLine">
      <transition name="chart" mode="out-in">
        <DistributionChart v-if="showChart === 'distributionChart'" :data="szyqData"></DistributionChart>
        <TrendChart v-else-if="showChart === 'trendChart'" :data="szyqData"></TrendChart>
      </transition>
    </div>
    <TimeLine
      v-if="showTimeLine" class="timeline-container"
      startDate="2022-03-01"
      :speed=1
      @changeDate="handleDateChange">
    </TimeLine>
    <div class="datainfo" :class="{move:showTimeLine}">数据时间范围：{{covidDataDate.start}} 至 {{covidDataDate.end}}</div>
  </div>
</template>

<script>
import moment from 'moment'
import Map from 'comps/Map.vue'
import Heatmap from 'ol/layer/Heatmap'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
// import DistributionChart from './DistributionChart.vue'
// import TrendChart from './TrendChart.vue'
import mixin from './mixin'
// import TimeLine from 'comps/timeLine'
import conf from './conf'

export default {
  components: {
    Map,
    DistributionChart: () => import('./DistributionChart.vue'),
    TrendChart: () => import('./TrendChart.vue'),
    TimeLine: () => import('comps/timeLine')
  },
  mixins: [mixin],
  data () {
    return {
      szyqData: null,
      heatlayer: null,
      mapCenter: [114.040504, 22.553397],
      totalIndex: 0,
      showChart: '',
      input: '',
      dateRange: '',
      showTimeLine: false,
      covidDataDate: {
        start: conf.startDate,
        end: conf.endDate
      }
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
    showHeatmap (data) {
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
      if (this.showTimeLine) {
        return
      }
      this.totalIndex = this.totalIndex >= this.totalTypeList.length - 1 ? 0 : this.totalIndex + 1
    },
    changeMapData (val) {
      // const data = this.filterMapDataBySubDate(this.totalTypeList[val].value, this.szyqData)
      const opt = this.totalTypeList[this.totalIndex]
      let start, end
      if (opt.code === 'custom') {
        [start, end] = this.dateRange
      } else {
        end = moment(conf.endDate)
        start = moment(conf.endDate).subtract(opt.value, 'day')
      }
      const data = this.filterMapDataByDateRange(start, end, this.szyqData)
      this.showHeatmap(data)
    },
    showChartHandle (cmd) {
      // 时间轴打开时禁用其它的
      if (this.showTimeLine) {
        return
      }
      const chartType = cmd === 0 ? 'distributionChart' : 'trendChart'
      if (this.showChart === chartType) {
        this.showChart = ''
      } else {
        this.showChart = chartType
      }
    },
    dataRangeChanged () {
      this.changeMapData()
    },
    showTimeLineHandle () {
      this.showTimeLine = !this.showTimeLine
    }
  }
}
</script>

<style lang="less" scoped>
  @topMargin:1rem;
  @leftMargin: 1rem;
  @border: 1px solid var(--border-color);
  .container{
    height: 100vh;
    width: 100%;
  }
  .search_wrap{
    position: absolute;
    top: @topMargin;
    left: @leftMargin;
    z-index: 2;
    width: 30%;
    /deep/ .el-input-group{
      .el-input__inner{
        background:#153359cf;
        border: @border;
        color: var(--drak-font-color);
      }
      .el-input-group__append{
        background-color: #0d1c3bd4;
        border: @border;
      }
    }
  }
  .layer_wrap{
    position: absolute;
    top: @topMargin;
    right: 1rem;
    z-index: 2;
    text-align: left;
    .selector_wrap{
      background-color: #474545;
      display: inline-flex;
      border-radius: 3px;
      padding: 10px 0;
      .layer_item{
        padding: 0 10px;
        border-right: 1px solid burlywood;
        cursor: pointer;
      }
      .last_item{
        border-right: 0;
      }
      .disabled {
        color: #918f8f;
        cursor: not-allowed;
      }
    }
    .date_picker{
      margin-top: 5px;
    }
  }
  .chart_wrap{
    position: absolute;
    left: @leftMargin;
    bottom: 1rem;
    width: 40%;
  }
  .chart-enter-active, .chart-leave-active{
    transition: opacity .3s ease;
  }
  .chart-enter, .chart-leave-to{
    opacity: 0;
  }
  .timeline-container{
    width: 100%;
    background-color: rgba(54, 16, 22, 0.4);
    position: absolute;
    z-index: 500;
    bottom: 0;
    display: flex;
  }
  .datainfo{
    position: absolute;
    z-index: 2;
    bottom: 1rem;
    right: 1rem;
  }
  .move{
    bottom: 3.5rem;
  }
</style>
