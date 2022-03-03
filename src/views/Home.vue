<template>
  <div class="home">
    <map-view class="map-container" v-if='dataReady'></map-view>
  </div>
</template>

<script>
// @ is an alias to /src
import mapView from '@/components/mapView.vue'
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
      const loading = this.$loading()
      this.$api.getCovidData().then((res) => {
        window.cvData = query.parseCSVToMap(res.data)
        loading.close()
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
