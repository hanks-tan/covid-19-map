<template>
  <div class="linechart-wrap">
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
    yAxisData: Array,
    series: Array
  },
  computed: {
    options () {
      return {
        yAxisData: this.yAxisData,
        series: this.series
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      charts.addLineChart(this.options, this.$el)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
