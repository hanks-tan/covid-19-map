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
      let vm = this
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
      let vm = this
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
    init1 () {
      let vm = this
      var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

      var chartDom = this.$el
      var myChart = echarts.init(chartDom)
      var option

      const updateFrequency = 2000
      const dimension = 0
      const countryColors = {
        Australia: '#00008b',
        Canada: '#f00',
        China: '#ffde00',
        Cuba: '#002a8f',
        Finland: '#003580',
        France: '#ed2939',
        Germany: '#000',
        Iceland: '#003897',
        India: '#f93',
        Japan: '#bc002d',
        'North Korea': '#024fa2',
        'South Korea': '#000',
        'New Zealand': '#00247d',
        Norway: '#ef2b2d',
        Poland: '#dc143c',
        Russia: '#d52b1e',
        Turkey: '#e30a17',
        'United Kingdom': '#00247d',
        'United States': '#b22234'
      }
      const data1 = vm.getData('https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json')
      const data2 = vm.getData(ROOT_PATH + '/data/asset/data/life-expectancy-table.json')

      Promise.all([data1, data2]).then((datas) => {
        const flags = datas[0].data
        const data = datas[1].data
        const years = []
        for (let i = 0; i < data.length; ++i) {
          if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
            years.push(data[i][4])
          }
        }
        function getFlag (countryName) {
          if (!countryName) {
            return ''
          }
          return (
            flags.find(function (item) {
              return item.name === countryName
            }) || {}
          ).emoji
        }
        const startIndex = 10
        const startYear = years[startIndex]
        option = {
          grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
          },
          xAxis: {
            max: 'dataMax',
            axisLabel: {
              formatter: function (n) {
                return Math.round(n) + ''
              }
            }
          },
          dataset: {
            source: data.slice(1).filter(function (d) {
              return d[4] === startYear
            })
          },
          yAxis: {
            type: 'category',
            inverse: true,
            max: 10,
            axisLabel: {
              show: true,
              fontSize: 14,
              formatter: function (value) {
                return value + '{flag|' + getFlag(value) + '}'
              },
              rich: {
                flag: {
                  fontSize: 25,
                  padding: 5
                }
              }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
          },
          series: [
            {
              realtimeSort: true,
              seriesLayoutBy: 'column',
              type: 'bar',
              itemStyle: {
                color: function (param) {
                  return countryColors[param.value[3]] || '#5470c6'
                }
              },
              encode: {
                x: dimension,
                y: 3
              },
              label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace'
              }
            }
          ],
          // Disable init animation.
          animationDuration: 0,
          animationDurationUpdate: updateFrequency,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear',
          graphic: {
            elements: [
              {
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                  text: startYear,
                  font: 'bolder 80px monospace',
                  fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
              }
            ]
          }
        }
        // console.log(option);
        myChart.setOption(option)
        for (let i = startIndex; i < years.length - 1; ++i) {
          (function (i) {
            setTimeout(function () {
              updateYear(years[i + 1])
            }, (i - startIndex) * updateFrequency)
          })(i)
        }
        function updateYear (year) {
          const source = data.slice(1).filter(function (d) {
            return d[4] === year
          })
          option.series[0].data = source
          option.graphic.elements[0].style.text = year
          myChart.setOption(option)
        }
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
