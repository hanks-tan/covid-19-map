<template>
  <div></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, BarChart, CanvasRenderer]);
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    group: {
      type: Object
    }
  },
  watch: {
    group (val) {
      this.showChart(val)
    }
  },
  mounted () {
    this.showChart()
  },
  methods: {
    showChart () {
      if (!this.chart) {
        this.chart = echarts.init(this.$el)
      }
      const xData = []
      const chartValues = []
      Object.keys(this.group).forEach((key) => {
        xData.push(key)
        chartValues.push(this.group[key])
      })
      const options = {
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: chartValues,
            type: 'bar'
          }
        ]
      }
      this.chart.setOption(options)
    }
  }
}
</script>

<style lang="less" scoped>

</style>