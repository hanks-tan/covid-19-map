<template>
  <div>
    <el-tabs type="border-card"  v-model="curTabPane" @tab-click="tabChangedHandle">
      <el-tab-pane
        v-for="item in charts"
        :key="item.code"
        :label="item.label"
        :name="item.code"
        >
        <DistributionChart v-if="curTabPane === 'distributionChart'"
          :group="item.group"
          class="chart-container"
          >
        </DistributionChart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DistributionChart from './DistributionChart.vue'
import TrendChart from './TrendChart'
export default {
  components: {
    DistributionChart,
    TrendChart
  },
  data () {
    return {
      charts: [
        {
          code: 'distributionChart',
          label: '分布图'
        },
        {
          code: 'trendChart',
          label: '趋势图'
        }
      ],
      curTabPane: 'age',
      groupData: null
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  watch: {
    curTabPane (val) {
      this.showChart()
    }
  },
  mounted () {
    this.showPan()
  },
  methods: {
    tabChangedHandle (tab) {
      
    },
    // showChart () {
    //   const opt = this.chartList.find((item) => item.code === this.curTabPane)
    //   if (opt.code === 'distributionChart') {

    //   }
    //   if (opt) {
    //     if (Object.keys(opt.group).length === 0) {
    //       opt.group = this.group(this.data, opt.code)
    //     }
    //   }
    // },
    group (data, field) {
      const group = {}
      data.forEach((item) => {
        const key = item[field]
        if (group[key]) {
          group[key] += 1
        } else {
          group[key] = 1
        }
      })
      return group
    }
  }
}
</script>

<style lang="less" scoped>
  .chart-container{
    width: 100vh;
    height: 200px;
  }
</style>