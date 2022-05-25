<template>
  <div class="wrap">
    <div class="title">
      <h2>国内 确诊病例 TOP10 的城市变化过程</h2>
    </div>
    <DynamicRankChart
      v-if="rankData"
      :colorCofig="rankData.colorCofig"
      :dateIndex="rankData.dateIndex"
      :labelIndex="rankData.labelIndex"
      :labelCodeIndex="rankData.labelCodeIndex"
      :dimension="rankData.dimension"
      :renderData="rankData.renderData"
      :startDateIndex="rankData.startDateIndex"
      class="chart"
      >
    </DynamicRankChart>
  </div>
</template>

<script>
import DynamicRankChart from '../../components/charts/dynamicRankChart.vue'
import axios from 'axios'
export default {
  data () {
    return {
      lineChartData: undefined,
      rankData: undefined,
      lineRachChartOptins: {
        renderData: [],
        countries: [],
        startDate: '',
        countryColName: 'city',
        dateColName: 'date',
        dataItemName: '',
        title: ''
      }
    }
  },
  components: {
    DynamicRankChart
  },

  mounted () {
    this.init()
  },
  methods: {
    init  () {
      this.$api.getCovidData().then((csvData) => {
        const lines = csvData.data.split('\n')
        const data = []
        lines.forEach((line, index) => {
          const values = line.split(',')
          if (index === 0) {
            data.push(values)
          } else {
            // 过滤出带城市的数据
            if (values[6]) {
              [7, 8, 9, 10].forEach((i) => {
                values[i] = parseInt(values[i])
              })
              data.push(values)
            }
          }
        })
        return data
      }).then((data) => {
        const countryColors = {
          420100: '#00008b',
          440300: '#f00',
          440100: '#ffde00',
          110102: '#002a8f',
          440400: '#003580'
        }

        const options = {
          renderData: data,
          colorCofig: countryColors,
          dimension: 7,
          dateIndex: 0,
          labelIndex: 5,
          labelCodeIndex: 6,
          startDateIndex: 40
        }
        this.rankData = options
      })
    },
    showLineRaceChart () {
      const vm = this
      this.$api.getCovidData().then((csvData) => {
        const lines = csvData.data.split('\n')
        const data = []
        lines.forEach((line, index) => {
          const values = line.split(',')
          if (index === 0) {
            data.push(values)
          } else {
            // 过滤出带城市的数据
            if (values[6]) {
              [7, 8, 9, 10].forEach((i) => {
                values[i] = parseInt(values[i])
              })
              data.push(values)
            }
          }
        })
        return data
      }).then((data) => {
        const citys = [
          '武汉市',
          '深圳市',
          '广州市',
          '黄冈市'
        ]
        vm.lineRachChartOptins.countries = citys
        vm.lineRachChartOptins.startDate = '2020-02-14'
        vm.lineRachChartOptins.countryColName = 'city'
        vm.lineRachChartOptins.dateColName = 'date'
        vm.lineRachChartOptins.dataItemName = 'confirmed'
        vm.lineRachChartOptins.title = '增长'
        vm.lineRachChartOptins.renderData = data
      })
    },
    getData (url) {
      return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
          resolve(res)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    margin: .5rem;
    background-color: whitesmoke;
    min-height:  calc(100vh - 30px);
    color: black;
    border-radius: 5px;
    .title{
      padding: 0 .5rem;
      background: #2196f34a;
      border-radius: 5px 5px 0 0;
    }
    .chart {
      height: 600px;
      padding: 0 .5rem;
    }
  }
</style>
