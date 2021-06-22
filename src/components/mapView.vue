<template>
  <div>
    <map-options class="map-options" ref="mapOpts"
      @dataTypeChange="handleDataTypeChange"
      @layerTypeChange="handleLayerTypeChange"
      @fieldTypeChange="handleFieldTypeChange"
    ></map-options>
    <div id="map">
      <time-line class="timeline-container" v-if="!isLatestData" ref="timeLine"
        :startDate="date"
        :speed=1
        @changeDate="handleDateChange">
      </time-line>
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

export default {
  data () {
    return {
      mapObj: undefined, // 地图对象
      layerType: 'point', // 显示类型: point/polygon
      isLatestData: true, // 显示数据类型 最新/历史
      date: undefined
    }
  },
  components: {
    timeLine,
    mapOptions,
    mapLegend
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
      this.mapEvtCtrl = new MapEvtCtrl({
        mapObj: this.mapObj,
        $mapEvtBus: this.$mapEvtBus
      })
      this.date = moment()
    },
    changeMap () {
      // 渲染地图
      this.$mapEvtBus.$emit(mapUtil.mapEvt.render, ({
        layerType: this.layerType, // 地图图层类型
        region: 'world',
        dataType: this.isLatestData ? mapUtil.covidDataType.latest : mapUtil.covidDataType.history, // 数据类型
        date: this.date, // 数据日期
        fieldType: this.fieldType // 数据字段
      }))
    },
    handleDataTypeChange (dataType) {
      this.isLatestData = dataType
      if (!this.isLatestData) {
        this.date = mapUtil.covidDefaultStartTime
      } else {
        this.date = moment().format(mapUtil.dateFormat)
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
  .ol-zoom {
    display: none;
  }
  .map-options {
    position: absolute;
    margin: 10px;
    padding: 10px;
    z-index: 999;
    color: rgb(34, 34, 37);
    border-radius: 1rem;
    background-color: #9c9ab142;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    line-height: 2rem;
    box-shadow: 1rem 1rem 0.5rem #474545;
  }
  #map{
    height: 100%;
  }
  .timeline-container{
    margin: 0;
    padding: 0px;
    top: 700px;
    left: 0px;
    width: 100%;
    background-color: rgba(54, 16, 22, 0.4);
    position: absolute;
    z-index: 500;
  }
</style>
