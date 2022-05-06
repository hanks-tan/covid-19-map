<template>
  <div>
    <!-- 地图 -->
    <div id="map">
      <div class="top">
        <DataSwitch
          :options="layerTypeOptions"
          :curValue.sync="layerType">
        </DataSwitch>
        <div class="history">
          <el-tooltip content="历史回放" placement="top">
            <el-button
            type="primary"
            icon="el-icon-video-play"
            circle
            size="small"
            @click="openHistoryHandle"></el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="legend">
        <el-tooltip content="图例" placement="top" v-show="!showMapLegend">
          <el-button
          type="primary"
          icon="el-icon-menu"
          size="small"
          @click="showMapLegend = !showMapLegend"
          circle></el-button>
        </el-tooltip>
        <map-legend v-show="showMapLegend"></map-legend>
      </div>
      <DataSwitch
        class="data-type-switch"
        :options="renderFieldList"
        :curValue.sync="renderField"
        borderRadius="1rem">
      </DataSwitch>
      <!-- 时间轴 -->
      <TimeLine class="timeline-container" v-if="!isLatestData" ref="timeLine"
        :startDate.sync="date"
        :speed=1
        @changeDate="handleDateChange">
      </TimeLine>
      <!-- 悬浮提示 -->
      <tips ref="tips" :aMap="mapObj"></tips>
      <!-- 排行榜 -->
      <rank
        :region="region"
        :date="date"
        class="rank">
      </rank>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import AMap from '../map/aMap'
// import MapEvtCtrl from '../map/mapEvtCtrl'
import MapRender from '../map/mapRender'
import mapUtil from '../utils/mapUtil'
// import timeLine from '@/components/timeLine.vue'
import mapLegend from '@/components/mapLegend.vue'
import Rank from './rank.vue'
import DataSwitch from './Switch.vue'

const covidDataUtil = mapUtil.covidDataUtil
export default {
  props: {
    region: {
      type: String,
      default: 'china'
    }
  },
  data () {
    return {
      mapObj: undefined, // 地图对象
      isLatestData: true, // 显示数据类型 最新/历史
      renderFieldList: [
        {
          value: 'confirmed',
          label: '累计确诊'
        },
        {
          value: 'curConfirm',
          label: '现存确诊'
        },
        {
          value: 'addConfirm',
          label: '新增确诊病例'
        },
        {
          value: 'dead',
          label: '累计死亡'
        }
      ],
      layerTypeOptions: [
        {
          label: '分级图',
          value: 'polygon'
        },
        {
          label: '散点图',
          value: 'point'
        }
      ],
      // mapDataOptions: {
      //   layerType: '', // 显示类型: point/polygon
      //   renderField: 'confirmed',
      //   date: covidDataUtil.latestDate
      // }
      layerType: 'point',
      renderField: 'confirmed',
      date: covidDataUtil.latestDate,
      showMapLegend: false // 显示图例
    }
  },
  components: {
    mapLegend,
    Rank,
    DataSwitch,
    tips: () => import('./overlay.vue'),
    TimeLine: () => import('comps/timeLine')
  },
  mounted () {
    this.initMap()
  },
  watch: {
    // mapDataOptions: {
    //   deep: true,
    //   handler (val, old) {
    //     this.changeMap()
    //     if (val.)
    //   }
    // },
    layerType (val) {
      this.$mapEvtBus.$emit('layerTypeChange', val)
    },
    date (val) {
      this.$mapEvtBus.$emit('dateChange', val)
    },
    renderField (val) {
      this.$mapEvtBus.$emit('covidDataTypeChange', val)
    },
    region: {
      immediate: true,
      handler (val) {
        // this.changeMap()
        this.$mapEvtBus.$emit('regionChange', val)
        this.setMapView()
      }
    },
    showMapLegend (val) {
      if (val) {
        setTimeout(() => {
          this.showMapLegend = false
        }, 10000)
      }
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
      // this.mapEvtCtrl = new MapEvtCtrl({
      //   mapObj: this.mapObj,
      //   $mapEvtBus: this.$mapEvtBus
      // })
      this.mapEvtCtrl = new MapRender({
        mapObj: this.mapObj,
        $mapEvtBus: this.$mapEvtBus,
        region: this.region,
        render: this.layerType,
        renderField: this.renderField,
        date: this.date
      })
      // this.mapDataOptions.layerType = 'polygon'
      this.setMapView()
    },
    changeMap () {
      // 渲染地图
      const options = Object.assign({ region: this.region }, this.mapDataOptions)
      // this.$mapEvtBus.$emit(covidDataUtil.mapEvt.render, ({
      //   layerType: this.layerType, // 地图图层类型
      //   region: 'world',
      //   dataType: this.isLatestData ? covidDataUtil.covidDataType.latest : covidDataUtil.covidDataType.history, // 数据类型
      //   date: this.date, // 数据日期
      //   fieldType: this.fieldType // 数据字段
      // }))
      this.$mapEvtBus.$emit(covidDataUtil.mapEvt.render, options)
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
      // this.mapDataOptions.date = date
      this.$mapEvtBus.$emit('dateChange', date)
    },
    handleFieldTypeChange (fieldType) {
      this.fieldType = fieldType
      this.changeMap()
    },
    setMapView () {
      const extent = this.getExtentByRegion()
      if (this.mapObj) {
        this.mapObj.fit(extent)
      }
    },
    getExtentByRegion () {
      let extent = [-180, -90, 180, 90]
      if (this.region === 'china') {
        extent = [75, 0, 149, 59]
      }
      return extent
    },
    openHistoryHandle () {
      this.isLatestData = !this.isLatestData
      if (!this.isLatestData) {
        this.date = covidDataUtil.covidDefaultStartTime
      } else {
        this.date = covidDataUtil.latestDate
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import url('~ol/ol.css');
  @left: 1rem;
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
  .maptools-box{
    position: absolute;
    top: 50px;
    height: calc(100% - 50px);
    width: 100%;
    .map-options-switch{
      margin: 1rem 0 0 1rem;
    }
  }
  .timeline-container{
    // width: calc(100% - 140px - 20px);
    width: 100%;
    background-color: rgba(54, 16, 22, 0.4);
    position: absolute;
    z-index: 500;
    bottom: 0;
    display: flex;
  }
  .rank{
    position: absolute;
    right: 1rem;
    margin-top: 1rem;
    z-index: 100;
  }
  .data-type-switch{
    position: absolute;
    bottom: 5rem;
    left: @left;
    z-index: 100;
  }
  .top{
    position: absolute;
    left: @left;
    margin-top: 1rem;
    display: inline;
    z-index: 100;
  }
  .history{
    left: 1rem;
    display: inline;
    margin-left: 1rem;
  }
  .legend{
    z-index: 100;
    bottom: 7rem;
    left: @left;
    position: absolute;
  }
</style>
