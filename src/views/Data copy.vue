<template>
  <div class="wrap">
    <LineChart class="chart"
      v-if="lineChartData"
      :series="lineChartData.series"
      :yAxisData="lineChartData.yAxisData">
    </LineChart>
  </div>
</template>

<script>
import LineChart from '../components/charts/LineChart.vue'
export default {
  data () {
    return {
      lineChartData: undefined
    }
  },
  components: {
    LineChart
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.lineChartData = {
        yAxisData: ['中国', '美国', '俄罗斯', '加南大', '香港', '澳大利亚'],
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    .chart {
      height: 600px;
    }
  }
</style>
