<template>
  <div>

  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

export default {
  props: {
    xData: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  watch: {
    xData () {
      this.showChart()
    },
    series () {
      this.showChart()
    }
  },
  mounted () {
    this.showChart()
  },
  methods: {
    showChart () {
      const lineNames = []
      const series = this.series.map((item) => {
        const { name, data } = item
        const type = 'line'
        lineNames.push(name)
        return {
          name,
          data,
          type
        }
      })

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: lineNames
        },
        grid: [
          {
            left: '5%',
            right: '5%',
            bottom: '10%'
          }
        ],
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: series
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
