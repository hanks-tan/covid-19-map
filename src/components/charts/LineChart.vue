// 基础折线图
<template>
  <div class="chart"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])
export default {
  props: {
    dataList: {
      type: Array,
      required: true
    },
    gradientLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showChart () {
      const xList = []
      const valueList = []
      this.dataMap.forEach((item) => {
        xList.push(item[0])
        valueList.push(item[1])
      })

      const option = {
        xAxis: {
          type: 'category',
          data: xList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: valueList,
            type: 'line'
          }
        ]
      }

      if (this.gradientLine) {
        const visualMap = [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            // min: 0,
            // max: 400
          }
        ]
        option.visualMap = visualMap
      }

      if (!this.chart) {
        this.chart = echarts.init(this.$el)
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
