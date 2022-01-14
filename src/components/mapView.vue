<template>
  <div>
    <!-- 地图选项 -->
    <map-options class="map-options" ref="mapOpts"
      @dataTypeChange="handleDataTypeChange"
      @layerTypeChange="handleLayerTypeChange"
      @fieldTypeChange="handleFieldTypeChange"
    ></map-options>
    <!-- 地图 -->
    <div id="map">
      <!-- 时间轴 -->
      <time-line class="timeline-container" v-if="!isLatestData" ref="timeLine"
        :startDate="date"
        :speed=1
        @changeDate="handleDateChange">
      </time-line>
      <!-- 悬浮提示 -->
      <tips ref="tips" :aMap="mapObj"></tips>
      <!-- 排行榜 -->
      <rank class="rank"></rank>
    </div>
    <map-legend></map-legend>
  </div>
</template>
<script>
import AMap from '../map/aMap'
import MapEvtCtrl from '../map/mapEvtCtrl'
import mapUtil from '../utils/mapUtil'
import timeLine from '@/components/timeLine.vue'
import mapOptions from '@/components/mapOptions.vue'
import mapLegend from '@/components/mapLegend.vue'
import moment from 'moment'
import Rank from './rank.vue'

const covidDataUtil = mapUtil.covidDataUtil
export default {
  data () {
    return {
      mapObj: undefined, // 地图对象
      layerType: 'point', // 显示类型: point/polygon
      isLatestData: true, // 显示数据类型 最新/历史
      date: undefined,
      fieldType: 'confirmed'
    }
  },
  components: {
    timeLine,
    mapOptions,
    mapLegend,
    tips: () => import('./overlay.vue'),
    Rank
  },
  mounted () {
    this.initMap()
  },
  watch: {
    date (newVal) {
      this.changeMap()
    }
  },
  methods: {
    initMap () {
      this.mapObj = new AMap({
        target: 'map',
        center: [0, 0],
        zoom: 2
      })
      this.mapObj.on('showDetails', (evt) => {
        // console.log(data)
        this.$refs.tips.setData(evt)
      })
      this.mapEvtCtrl = new MapEvtCtrl({
        mapObj: this.mapObj,
        $mapEvtBus: this.$mapEvtBus
      })
      this.date = moment().format('YYYY-MM-DD')
    },
    changeMap () {
      // 渲染地图
      this.$mapEvtBus.$emit(covidDataUtil.mapEvt.render, ({
        layerType: this.layerType, // 地图图层类型
        region: 'world',
        dataType: this.isLatestData ? covidDataUtil.covidDataType.latest : covidDataUtil.covidDataType.history, // 数据类型
        date: this.date, // 数据日期
        fieldType: this.fieldType // 数据字段
      }))
    },
    handleDataTypeChange (dataType) {
      this.isLatestData = dataType
      if (!this.isLatestData) {
        this.date = covidDataUtil.covidDefaultStartTime
      } else {
        this.date = moment().format(covidDataUtil.dateFormat)
      }
    },
    handleLayerTypeChange (layerType) {
      this.layerType = layerType
      this.changeMap()
    },
    handleDateChange (date) {
      this.date = date
    },
    handleFieldTypeChange (fieldType) {
      this.fieldType = fieldType
      this.changeMap()
    }
  }
}
</script>
<style>
  @import url('~ol/ol.css');
  #map{
    height: 100%;
  }
  .map-options {
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    line-height: 2rem;
  }
  .timeline-container{
    width: 100%;
    background-color: rgba(54, 16, 22, 0.4);
    position: absolute;
    z-index: 500;
    bottom: 0;
    display: flex;
  }
  .rank{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 999;
  }
</style>
