<template>
  <div class="wrap">
    <RankChart class="chart-box"></RankChart>
    <IncreaseChart class="chart-box"></IncreaseChart>
    <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">
        <IncreaseChart v-if="count >= 1"></IncreaseChart>
      </li>
    </ul> -->
  </div>
</template>

<script>
import IncreaseChart from './IncreaseChart.vue'
import RankChart from './RankChart.vue'
export default {
  components: {
    IncreaseChart,
    RankChart
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    padding: 10px;
    background-color: white;
  }
  .chart-box{
    padding:10px;
  }
</style>
