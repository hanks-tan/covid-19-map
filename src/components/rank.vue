<template>
  <div class="rank-contanier box">
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name">
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Vue from 'vue';
import Tabs from 'element-ui'
import TabPane from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
export default {
  data () {
    return {
      tabs: [
        {
          title: '累计确诊',
          name: '1',
          content: '1'
        },
        {
          title: '24小时内确诊',
          name: '24hours',
          content: '2'
        },
        {
          title: '7日内确诊',
          name: '7days',
          content: '3'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .rank-container{
    
  }
</style>