<template>
  <!-- 基础柱形图 -->
  <div></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    group: {
      type: Array
    },
    title: {
      type: String
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
      this.group.forEach((item) => {
        xData.push(item[0])
        chartValues.push(item[1])
      })
      const options = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
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
            type: 'bar',
            barWidth: '30', // 柱形宽, 百分比
            itemStyle: {
              borderColor: 'transparent',
              color: 'rgb(145 204 117)'
            }
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
