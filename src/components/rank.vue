<template>
  <div class="rank-container">
    <div class="rank-switch" v-show="!showRank">
      <el-tooltip content="疫情趋势" placement="left">
        <el-button
          :icon="rankIcon"
          type="primary"
          size="small"
          @click="showRank = !showRank"
        circle></el-button>
      </el-tooltip>
    </div>
    <div class="rank-content box" v-if="showRank">
      <el-tooltip content="关闭" placement="left">
        <div class="close" @click="showRank = false">+</div>
      </el-tooltip>
      <div class="title">疫情趋势</div>
      <div class="field-selector">
        <el-radio v-model="curField" label="confirmed">确诊数据</el-radio>
        <el-radio v-model="curField" label="dead">死亡数据</el-radio>
      </div>
      <el-tabs type="border-card" v-model="tabsValue" class="tabs">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title + fields[curField]" :name="item.name">
          <div class="rank-header">
            <div class="">
              国家或地区
            </div>
            <div>
              数量
            </div>
          </div>
          <ul class="rank-content">
            <template v-if="rankData.length > 0">
              <li v-for="(country, index) in rankData" :key="index" class="row">
                <div>
                  {{country.name}}
                </div>
                <div>
                  {{country.count}}
                </div>
              </li>
            </template>
            <div v-else>
              暂无数据
            </div>
          </ul>
        </el-tab-pane>
      </el-tabs>
      <div class="date">截至日期：{{date}}</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabs, TabPane } from 'element-ui'
import query from '../map/data/query'
import mapUtil from '../utils/mapUtil'
Vue.use(Tabs)
Vue.use(TabPane)
const covidDataUtil = mapUtil.covidDataUtil
export default {
  props: {
    region: {
      type: String,
      default: 'china'
    },
    date: {
      type: String,
      default: covidDataUtil.latestDate
    }
  },
  data () {
    return {
      fields: {
        confirmed: '确诊',
        dead: '死亡'
      },
      // TODO 切换
      curField: 'confirmed',
      tabs: [
        {
          title: '累计',
          name: 'full'
        },
        {
          title: '24小时内',
          name: '24hours'
        },
        {
          title: '7日内',
          name: '7days'
        }
      ],
      tabsValue: 'full',
      top: 10, // 取前10的数据
      rankData: [],
      regionType: 3, // 1 国家，2省，3市
      showRank: false // 显示排行榜
    }
  },
  watch: {
    tabsValue (val) {
      this.getRankData()
    },
    date () {
      this.getRankData()
    },
    region (val) {
      if (val === 'china') {
        this.regionType = 2
      } else {
        this.regionType = 1
      }
      this.getRankData()
    },
    curField (val) {
      this.getRankData()
    }
  },
  computed: {
    rankIcon () {
      return this.showRank ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
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
      let data = []
      if (this.tabsValue === 'full') {
        data = query.getDeadlineRankData(this.date, this.curField, this.top, this.regionType)
      } else if (this.tabsValue === '24hours') {
        data = query.get24HourRankData(this.date, this.curField, this.top, this.regionType)
      } else {
        data = query.get7DayRankData(this.date, this.curField, this.top, this.regionType)
      }
      this.rankData = data.filter((item) => {
        return item.count > 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @bgColor: #565658b3;
  .rank-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    .title{
      font-size: 1.2rem;
      text-align: left;
      color: #e3e6e8;
    }
    .field-selector {
      text-align: left;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;
      padding: 1rem 0;
    }
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
      .close{
        float: right;
        font-size: 1.5rem;
        transform: rotate(45deg);
        cursor: pointer;
      }
      .row{
        display: grid;
        grid-template-columns: repeat(2, 50%);
        justify-items: center;
        padding: 5px 0;
      }
    }
  }
</style>
