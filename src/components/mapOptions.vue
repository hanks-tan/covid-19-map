<template>
  <div>
    <!-- <div class="map-btn" @click="clickDataType">
      <li v-if="isLatestData">最新</li>
      <li v-else>历史</li>
    </div>
    <div class="map-btn" @click="clickLayerType">
      <li v-if="layerType === 'point'">散点图</li>
      <li v-else>填充图</li>
    </div>
    <div class="map-btn">
      <select name="map-seletion" class="map-seletion">
        <option class="select-item" value="1">累计确诊</option>
        <option class="select-item" value="2">现存确诊</option>
        <option class="select-item" value="2">累计死亡</option>
        <option class="select-item" value="2">死亡率</option>
      </select>
    </div> -->
    <div class="map-btn">
      <el-switch
        v-model="isLatestData" active-text="最新数据" inactive-text="历史数据" @change="dataTypeHandle">
      </el-switch>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="map-btn">
      <el-switch
        v-model="isPointLayer" active-text="散点图" inactive-text="填充图" @change="layerTypeHandle">
      </el-switch>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="map-btn">
      <el-select v-model="renderField" placeholder="请选择" @change="fieldTypeHandle">
        <el-option
          v-for="item in renderFieldList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Switch, Select, Option, Divider } from 'element-ui'
import mapUtil from '../utils/mapUtil'
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
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
        },
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
      this.layerType = this.isPointLayer ? mapUtil.layerType.point : mapUtil.layerType.polygon
      this.$emit('layerTypeChange', this.layerType)
    },
    fieldTypeHandle () {
      this.$emit('fieldTypeChange', this.renderField)
    }
  }
}
</script>
<style lang="less">
  .map-btn{
    display: inline;
    li{
      display: inline-block;
      width: 101px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      padding: 0 10px;
    }
    .map-seletion{
      background-color: white;
    }
    .select-item{
      background-color: transparent;
    }
  }
</style>
