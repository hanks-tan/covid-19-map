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
      this.$mapEvtBus.$emit(mapUtil.mapEvt.render, ({
        layerType: this.layerType,
        region: 'world',
        dataType: this.isLatestData ? mapUtil.covidDataType.latest : mapUtil.covidDataType.history,
        date: this.date,
        fieldType: this.fieldType
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
    /* top: 0px;
    left: 45%;
    position: absolute;
    margin: 5px;
    z-index: 999;
    color: rgb(34, 34, 37);
    border: 1px solid #848383; */
    position: absolute;
    margin: 5px;
    padding: 5px;
    z-index: 999;
    color: rgb(34, 34, 37);
    border: 1px solid #9e8a8a;
    border-radius: 3px;
    background-color: #9c9ab1db
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
