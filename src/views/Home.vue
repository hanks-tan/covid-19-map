<template>
  <el-container>
    <GhLink></GhLink>
    <el-header class="header" style="height: 50px">
      <div class="title">
        <div class="menu" @click="showMenuHandle">
          <el-tooltip content="菜单" placement="right">
            <i class="el-icon-menu"></i>
          </el-tooltip>
          <!-- <el-button type="primary" icon="el-icon-menu"></el-button> -->
        </div>
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
    <transition name="menu">
      <Menu v-show="showMenu" class="menulist"></Menu>
    </transition>
  </el-container>
</template>

<script>
// @ is an alias to /src
import MapView from '@/components/mapView'
import query from '../map/data/query'
import moment from 'moment'
import Menu from '@/components/Menu'
import GhLink from '@/components/GhLink.vue'
export default {
  name: 'Home',
  components: {
    MapView,
    Menu,
    GhLink
  },
  data () {
    return {
      dataReady: false,
      region: 'china', // china | global
      curDate: moment().format('YYYY-MM-DD'),
      showMenu: false
    }
  },
  mounted () {
    this.init()
    console.log('%cauthor%ctangxinbo', 'padding:3px .5rem;;background-color:#212529;color:#FFF;border-radius:3px 0px 0px 3px', 'color:#FFF;background-color:#8BC34A;padding:3px 1rem;border-radius:0px 3px 3px 0')
  },
  methods: {
    init () {
      const loading = this.$loading()
      const png = './data/covid_d_20200411.png'
      this.$api.getCovidDataFromImg()
      this.$api.getCovidPngConfig().then((res) => {
        query.covidPngToJson(png, res.data).then((data) => {
          console.log('data', data)
        })
      })

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
    },
    showMenuHandle () {
      this.showMenu = !this.showMenu
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
    padding-left: 0;
    padding-right: 5rem;
    .title{
      justify-self: start;
      font-family: STXinwei;
      font-size: 1.3rem;
      .menu{
        display: inline;
        cursor: pointer;
      }
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
  .menulist{
    position: absolute;
    z-index: 100;
    list-style: none;
    top: 50px;
    background-color: #434447;
    width: 16rem;
    line-height: 2rem;
    text-align: left;
  }
  // .menu-enter-active, .menu-leave-active {
  //   transition: opacity .5s;
  // }
  // .menu-enter, .menu-leave{
  //   opacity: 0;
  // }
  .menu-enter-active{
    transition: all .5s;
  }
  .menu-enter{
    transform: scale(0.5, 0.1);
  }
</style>
