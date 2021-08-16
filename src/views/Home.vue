<template>
  <div class="home">
    <map-view class="map-container" v-if='dataReady'></map-view>
  </div>
</template>

<script>
// @ is an alias to /src
import mapView from '@/components/mapView.vue'
import mapHttp from '@/https/mapHttp'
import { Loading } from 'element-ui'
import axios from 'axios'
import query from '../map/data/query'

export default {
  name: 'Home',
  components: {
    mapView
  },
  data () {
    return {
      dataReady: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let loadingInstance = Loading.service({ fullscreen: true })
      // mapHttp.getTimeSeriesData().then(() => {
      //   loadingInstance.close()
      //   this.dataReady = true
      // })
      const url = process.env.BASE_URL + '/data/Wuhan-2019-nCoV1.csv'
      axios.get(url).then((res) => {
        return res.data
      }).then((data) => {
        window.cvData = query.parseCSVToMap(data)
        loadingInstance.close()
        this.dataReady = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
  .home{
    background-color: #4f4f52;
    .map-container{
      height: 100vh;
    }
  }
</style>
