<template>
  <div>

  </div>
</template>

<script>
import charts from './charts'
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
      type: Number
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {

    },
    getOptions () {
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
    },
    updateData () {
      let source = data.slice(1).filter(function (d) {
        return d[4] === year;
      });
      option.series[0].data = source;
      option.graphic.elements[0].style.text = year;
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>

</style>
