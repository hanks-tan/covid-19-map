<template>
  <!-- 动态排名图 -->
  <div>

  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  GraphicComponent,
  GridComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import charts from './charts'

echarts.use([
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
])

export default {
  data () {
    return {

    }
  },
  props: {
    // 颜色配置
    colorCofig: {
      type: Object
    },
    // 更新频率
    updateFrequency: {
      type: Number,
      default: 1000
    },
    // 渲染柱形的数据索引，指示用数组中的哪条数据来渲染柱形
    dimension: {
      type: Number,
      required: true
    },
    // 日期字段索引
    dateIndex: {
      type: Number,
      required: true
    },
    // 标签值索引
    labelIndex: {
      type: Number,
      required: true
    },
    // 标签对应ID索引, 颜色配置用这个值配
    labelCodeIndex: {
      type: Number,
      required: true
    },
    // 用这个时间以后的数据来渲染
    startDateIndex: {
      type: Number,
      default: 0
    },
    // 用来渲染的数据
    renderData: {
      type: Array,
      validator: function (value) {
        const header = value[0]
        if (!Array.isArray(header)) {
          return false
        }
        // 首行必选是列名数组
        const r = header.find((v) => typeof v !== 'string')
        if (r) {
          return false
        }
        return true
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const data = this.renderData
      const dateIndex = this.dateIndex
      const labelIndex = this.labelIndex
      const labelCodeIndex = this.labelCodeIndex
      const colorsConfig = this.colorCofig
      const dimension = this.dimension
      const updateFrequency = this.updateFrequency

      const dateList = this.getAllDate(data, this.dateIndex)
      const startIndex = this.startDateIndex < dateList.length ? this.startDateIndex : 0
      const startDate = dateList[startIndex]
      const option = {
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
            return d[dateIndex] === startDate
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
              return value
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
                return colorsConfig[param.value[labelCodeIndex]] || '#5470c6'
              }
            },
            encode: {
              x: dimension,
              y: labelIndex
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
                text: startDate,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
              },
              z: 100
            }
          ]
        }
      }

      var myChart = charts.init(option, this.$el)

      for (let i = startIndex; i < dateList.length - 1; ++i) {
        (function (i) {
          setTimeout(function () {
            updateDate(dateList[i + 1])
          }, (i - startIndex) * updateFrequency)
        })(i)
      }

      function updateDate (date) {
        const source = data.slice(1).filter(function (d) {
          return d[dateIndex] === date
        })
        option.series[0].data = source
        option.graphic.elements[0].style.text = date
        myChart.setOption(option)
      }
    },
    getAllDate (data, dateIndex) {
      const dateList = []
      data.slice(1).forEach((item) => {
        if (!dateList.includes(item[dateIndex])) {
          dateList.push(item[dateIndex])
        }
      })
      return dateList
    }
  }
}
</script>

<style lang="less" scoped>

</style>
