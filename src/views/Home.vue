<template>
  <el-container>
    <el-header class="header" style="height: 50px">
      <div class="title">
        新冠疫情分布图
      </div>
      <div class="data-switch">
        <div class="data-switch-item left" :class="{on:region === 'china'}" @click="region = 'china'">
          中国
        </div>
        <div class="data-switch-item right" :class="{on:region === 'world'}" @click="region = 'world'">
          全球
        </div>
      </div>
      <div class="date">
        日期：{{curDate}}
      </div>
    </el-header>
    <el-main>
      <MapView
        v-if='dataReady'
        :region="region"
        class="map-container"
        >
      </MapView>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import MapView from '@/components/mapView'
import query from '../map/data/query'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    MapView
  },
  data () {
    return {
      dataReady: false,
      region: 'china', // china | global
      curDate: moment().format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const loading = this.$loading()
      this.$api.getLatestCovidData().then((res) => {
        window.cvData = query.parseCSVToMap(res.data)
        loading.close()
        this.dataReady = true
      })
      setTimeout(() => {
        this.$api.getCovidData().then((res) => {
          window.cvData = query.parseCSVToMap(res.data)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .el-header{
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    background-color: #1b284e;
    align-items: center;
    .title{
      justify-self: start;
      font-family: STXinwei;
      font-size: 1.3rem;
    }
    .data-switch{
      .data-switch-item{
        background-color: #5d5da5;
        display: inline;
        padding: .5rem 1rem;
        cursor: pointer;
        color: #b1b0b0;
      }
      .left{
        border-radius: 1rem 0 0 1rem;
        border-right: 1px solid #614747;
      }
      .right{
        border-radius: 0 1rem 1rem 0;
      }
      .on{
        background-color: #567ae8;
        color: rgb(249, 248, 248);
      }
    }
    .date{
      justify-self: end;
    }
  }
  .el-main{
    height: calc(100vh - 50px);
    background-color: #24243e;
    margin: 0;
    padding: 0;
    .map-container{
      height: 100%;
    }
  }
</style>
