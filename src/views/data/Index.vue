<template>
  <div class="wrap">
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(item,i) in tabs" :key="i" :label="item.label">
          <div v-if="item.code === 'domestic'">
            <DomesticData></DomesticData>
          </div>
          <!-- <div id="map" class="map">
            <Map></Map>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DomesticData from './DomesticData.vue'
import Map from '@/components/Map'
export default {
  components: {
    DomesticData,
    Map
  },
  data () {
    return {
      count: 0,
      tabs: [
        {
          label: '国内疫情',
          code: 'domestic'
        },
        {
          label: '国际疫情',
          code: 'international'
        }
      ]
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    color: black;
    .content{
      margin: 10px;
      background-color: #f3f3f4;
    }
    .map{
      height: 300px;
      width: 100%;
      background: #607d8b;
      position: relative;
    }
    /deep/ .el-tabs--border-card{
      background: #fff;
      border: 0;
      border-radius: 5px;
      .el-tabs__content{
        font-size: 1.2rem;
      }
    }
  }
  /deep/ .el-tabs--border-card .el-tabs__header{
    background-color: #607d8b;
  }
</style>
