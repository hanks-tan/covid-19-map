<template>
  <div class="home">
    <map-view class="map-container"></map-view>
  </div>
</template>

<script>
// @ is an alias to /src
import mapView from '@/components/mapView.vue'
import mapHttp from '../https/mapHttp'
import { Loading } from 'element-ui'

export default {
  name: 'Home',
  components: {
    mapView
  },
  created () {
  },
  mounted () {
    this.loadDate()
  },
  methods: {
    loadDate () {
      const options = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
      var loadingInstance = Loading.service(options)
      this.fullscreenLoading = true
      mapHttp.getTimeSeriesData().then(data => {
        console.log('data load done!') // TODO 同步执行，增加模态框
        loadingInstance.close()
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
      height: 768px;
    }
  }
</style>
