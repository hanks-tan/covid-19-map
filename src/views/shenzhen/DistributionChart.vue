<template>
  <div>
    <el-tabs type="border-card"  v-model="curTabPane" @tab-click="tabChangedHandle">
      <el-tab-pane
        v-for="item in chartList"
        :key="item.code"
        :label="item.label"
        :name="item.code"
        >
        <BaseBar
          :group="item.group"
          class="chart-container"
          >
        </BaseBar>
      </el-tab-pane>
      <!-- <el-tab-pane label="用户管理">用户管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import BaseBar from '../../components/charts/BaseBar.vue'
export default {
  components: {
    BaseBar
  },
  data () {
    return {
      chartList: [
        {
          code: 'age',
          label: '按年龄',
          group: {},
          groupMap: [
            '*月龄',
            '1-10岁',
            '11-18岁',
          ]
        },
        {
          code: 'sex',
          label: '按性别',
          group: {}
        },
        {
          code: 'area',
          label: '按区域',
          group: {}
        }
      ],
      curTabPane: 'age'
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
    this.showChart()
  },
  methods: {
    tabChangedHandle (tab) {
      
    },
    showChart () {
      const opt = this.chartList.find((item) => item.code === this.curTabPane)
      if (opt) {
        if (Object.keys(opt.group).length === 0) {
          opt.group = this.group(this.data, opt.code)
        }
      }
    },
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