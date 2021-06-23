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
      <div class="map-btn select-item">
        <!-- <el-select v-model="renderField" placeholder="请选择" @change="fieldTypeHandle">
          <el-option
            v-for="item in renderFieldList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        选择一种数据
        <el-radio
          v-for="item in renderFieldList" :key="item.value"
          v-model="renderField"
          :label="item.label"
          class="select-radio">
          {{item.label}}
        </el-radio>
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
export default {
  data () {
    return {
      isLatestData: true,
      isPointLayer: true,
      layerType: mapUtil.layerType.point,
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
      renderField: '累计确诊'
    }
  },
  methods: {
    dataTypeHandle () {
      this.$emit('dataTypeChange', this.isLatestData)
    },
    layerTypeHandle () {
      this.layerType = this.isPointLayer ? mapUtil.layerType.point : mapUtil.layerType.polygon
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
    .select-item{
      display: flex;
      flex-direction: column;
      align-items: baseline;
      .select-radio{
        color: #ccc;
        margin-top: 0.5rem;
      }
    }
  }
</style>
