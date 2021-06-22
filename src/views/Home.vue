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
      mapHttp.getTimeSeriesData().then(() => {
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
    margin: 0px;
    padding: 0px;
    .map-container {
      background-color: #4f4f52;
      height: 100vh;
    }
  }
</style>
