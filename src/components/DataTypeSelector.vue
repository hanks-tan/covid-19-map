<template>
  <div>
    <span class="col-label">{{label}}</span>
    <el-select v-model="value" placeholder="" @change="$emit('change', $event)">
      <el-option v-for="(item, i) in options" :key="i" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import mapUtil from '../utils/mapUtil'
export default {
  data () {
    return {
      options: mapUtil.covidDataUtil.covidDataTypeList,
      value: 'confirmed'
    }
  },
  props: {
    label: {
      type: String
    },
    dataType: {
      type: String,
      default: 'confirmed'
    }
  },
  created () {
    this.value = this.dataType
  }
}
</script>

<style lang="less" scoped>

</style>
