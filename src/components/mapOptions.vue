<template>
  <div class="box">
    <div class="header">地图渲染方式</div>
    <div class="main">
      <div class="map-btn">
        <el-switch
          v-model="isLatestData" active-text="最新数据" inactive-text="历史数据" @change="dataTypeHandle">
        </el-switch>
      </div>
      <div class="map-btn">
        <el-switch
          v-model="isPointLayer" active-text="散点图" inactive-text="填充图" @change="layerTypeHandle">
        </el-switch>
      </div>
      <div class="map-btn selector">
        选择一种数据
        <el-radio-group v-model="renderField" @change="fieldTypeHandle" class="map-radio-group">
          <el-radio
            v-for="item in renderFieldList" :key="item.value"
            :label="item.value"
            class="select-radio">
            {{item.label}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Switch, Select, Option, Divider, Radio } from 'element-ui'
import mapUtil from '../utils/mapUtil'
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Radio)
const covidDataUtil = mapUtil.covidDataUtil
export default {
  data () {
    return {
      isLatestData: true,
      isPointLayer: true,
      layerType: covidDataUtil.layerType.point,
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
        // {
        //   value: 'dead',
        //   label: '死亡率'
        // },
        // {
        //   value: '',
        //   label: '累计治愈'
        // },
        // {
        //   value: '',
        //   label: '治愈率'
        // }
      ],
      renderField: 'confirmed'
    }
  },
  methods: {
    dataTypeHandle () {
      this.$emit('dataTypeChange', this.isLatestData)
    },
    layerTypeHandle () {
      this.layerType = this.isPointLayer ? covidDataUtil.layerType.point : covidDataUtil.layerType.polygon
      this.$emit('layerTypeChange', this.layerType)
    },
    fieldTypeHandle () {
      this.$emit('fieldTypeChange', this.renderField)
    }
  }
}
</script>
<style lang="less" scope>
  .header{
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    color: #bebfbf;
  }
  .main{
    .selector{
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }
    .map-radio-group{
      text-align: left;
      .select-radio{
        color: #ccc;
        margin-top: 0.5rem;
        display: block;
      }
    }
  }
</style>
