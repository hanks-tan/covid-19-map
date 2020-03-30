<template>
  <div class="home">
    <map-view class="map-container"></map-view>
  </div>
</template>

<script>
// @ is an alias to /src
import mapView from '@/components/mapView.vue'

export default {
  name: 'Home',
  components: {
    mapView
  }
}
</script>
<style lang="less" scoped>
  .home{
    margin: 0px;
    padding: 0px;
    .map-container {
      background-color: #4f4f52;
      height: 768px;
    }
  }
</style>
