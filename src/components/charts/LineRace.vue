<template>
  <!-- 动态排序折线图 -->
  <div></div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
])
export default {
  props: {
    renderData: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    options: {
      type: Object,
      required: true,
      validator: (value) => {
        const keys = ['startDate', 'countries', 'countryColName', 'dateColName', 'dataItemName']
        for (const k of keys) {
          if (!value[k]) {
            return false
          }
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
      var chartDom = this.$el
      var myChart = echarts.init(chartDom)
      const option = this.getOptions(this.renderData)
      myChart.setOption(option)
      this.chart = myChart
    },
    getOptions (data) {
      const countries = this.options.countries
      const startDate = this.options.startDate
      const countryName = this.options.countryColName
      const dateName = this.options.dateColName
      const renderDataName = this.options.dataItemName

      const countryIndex = data[0].findIndex((i) => i === countryName) // TODO 待优化
      const dataIndex = data[0].findIndex((i) => i === renderDataName)

      const datasetWithFilters = []
      const seriesList = []
      echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: dateName, gte: startDate, parser: 'time' },
                { dimension: countryName, '=': country }
              ]
            }
          }
        })
        seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: function (params) {
              // return params.value[3] + ': ' + params.value[0]
              return params.value[countryIndex] + ': ' + params.value[dataIndex]
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: dateName,
            y: renderDataName,
            label: [countryName, renderDataName],
            itemName: dateName,
            tooltip: [renderDataName]
          }
        })
      })
      const option = {
        animationDuration: 5000, // 播放时长
        dataset: [
          {
            id: 'dataset_raw', // 对应datasetWithFilters 项中的 fromDatasetId
            source: data
          },
          ...datasetWithFilters
        ],
        title: {
          text: this.title
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
        },
        yAxis: {
          name: renderDataName
        },
        grid: {
          right: 140
        },
        series: seriesList
      }
      return option
    }
  }
}
</script>

<style lang="less" scoped>

</style>