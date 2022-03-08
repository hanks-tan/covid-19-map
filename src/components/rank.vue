<template>
  <div class="rank-container box">
    <el-tabs type="border-card" v-model="tabsValue" class="tabs">
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
    <div class="date">截至日期：{{date}}</div>
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
      rankData: [],
      date: '2020-02-14',
      regionType: 3 // 1 国家，2省，3市
    }
  },
  watch: {
    tabsValue (val) {
      this.getRankData()
    },
    date () {
      this.getRankData()
    }
  },
  mounted () {
    this.$mapEvtBus.$on('dateChange', (date) => {
      this.date = date
    })
    this.getRankData()
  },
  methods: {
    getRankData () {
      if (this.tabsValue === 'full') {
        this.rankData = query.getDeadlineRankData(this.date, this.curField, this.top, this.regionType)
      } else if (this.tabsValue === '24hours') {
        this.rankData = query.get24HourRankData(this.date, this.curField, this.top, this.regionType)
      } else {
        this.rankData = query.get7DayRankData(this.date, this.curField, this.top, this.regionType)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @bgColor: #565658b3;
  .rank-container{
    .date{
      color: #ccc;
    }
    .tabs{
      background: transparent;
      border: 0;
      /deep/ .el-tabs__header{
        background: transparent;
        border-bottom: 1px solid #606773;
        .el-tabs__item.is-active{
          background: #16161561;
          border: 0;
        }
      }
    }
    /deep/ .rank-header{
      display: flex;
      justify-content: space-around;
      color: #ccc;
    }
    /deep/ .rank-content{
      list-style: none;
      color: #ccc;
      .row{
        display: grid;
        grid-template-columns: repeat(2, 50%);
        justify-items: center;
        padding: 5px 0;
      }
    }
  }
</style>
