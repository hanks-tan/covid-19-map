<template>
  <div class="rank-contanier box">
    <el-tabs type="border-card" v-model="tabsValue">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name">
        <div class="rank-header">
          <div class="">
            国家或地区
          </div>
          <div>
            数量
          </div>
        </div>
        <ul class="rank-content">
          <li v-for="(country, index) in rankData" :key="index" class="row">
            <div>
              {{country.name}}
            </div>
            <div>
              {{country.count}}
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Vue from 'vue';
import Tabs from 'element-ui'
import TabPane from 'element-ui'
import query from '../map/data/query'
Vue.use(Tabs)
Vue.use(TabPane)
export default {
  data () {
    return {
      tabs: [
        {
          title: '累计确诊',
          name: 'full'
        },
        {
          title: '24小时内确诊',
          name: '24hours'
        },
        {
          title: '7日内确诊',
          name: '7days'
        }
      ],
      tabsValue: 'full',
      top: 10,
      curField: 'confirmed',
      rankData: []
    }
  },
  mounted () {
    this.$mapEvtBus.$on('dateChange', (date) => {
      this.getDayDate(date, this.curField, this.top)
    })
    this.getDayDate('2020-02-03', this.curField, this.top)
  },
  methods: {
    getDayDate (date, field, count) {
      if (date) {
        const data = query.getDayData(date)
        const arr = Array.from(data)
        if (Array.isArray(arr)) {
          arr.sort((a, b) => {
            const data1 = a[1]
            const data2 = b[1]
            return data2[field] - data1[field]
          })

          this.rankData = arr.slice(0, count).map((item) => {
            return {
              name: item[0],
              count: item[1][this.curField]
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .rank-container{
    /deep/ .el-tabs{
      background-color: #565658b3;
    }
  }
  /deep/ .rank-header{
    display: flex;
    justify-content: space-around;
  }
  /deep/ .rank-content{
    list-style: none;
    .row{
      display: grid;
      grid-template-columns: 50% 50%;
      justify-items: center;
    }
  }
</style>
