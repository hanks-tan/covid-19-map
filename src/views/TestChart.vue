<template>
  <div class="wrap">

  </div>
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
import axios from 'axios'

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
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

      const url = ROOT_PATH + '/data/asset/data/life-expectancy-table.json'
      axios.get(url).then((res) => {
        this.run(res.data)
      })
    },
    run (_rawData) {
      // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
      const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
      ]
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
                { dimension: 'Year', gte: 1800 },
                { dimension: 'Country', '=': country }
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
              return params.value[3] + ': ' + params.value[0]
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'Year',
            y: 'Income',
            label: ['Country', 'Income'],
            itemName: 'Year',
            tooltip: ['Income']
          }
        })
      })
      const option = {
        animationDuration: 10000,
        dataset: [
          {
            id: 'dataset_raw',
            source: _rawData
          },
          ...datasetWithFilters
        ],
        title: {
          text: 'Income of Germany and France since 1950'
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
          name: 'Income'
        },
        grid: {
          right: 140
        },
        series: seriesList
      }

      var chartDom = this.$el
      var myChart = echarts.init(chartDom)

      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    height: 600px;
  }
</style>
