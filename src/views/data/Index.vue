<template>
  <div class="wrap">
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(item,i) in tabs" :key="i" :label="item.label">
          <div v-if="item.code === 'domestic'">
            <DomesticData></DomesticData>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DomesticData from './DomesticData.vue'
export default {
  components: {
    DomesticData,
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
      background-color: white;
      border-radius: 5px;
    }
  }
</style>
