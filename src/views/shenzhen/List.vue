<template>
  <div>
    <!-- <li v-for="(item, i) in data" :key="i" class="list">
      <ListItem
        :info="item[visibleKey]"
        :order="i + 1">
      </ListItem>
    </li> -->
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, i) in data"
        :key="i"
        :title="`${item[visibleKey]}`"
        :name="i">
        {{item.sex}}
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  components: {
    ListItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    visibleKey: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .list{
    list-style: none;
    text-align: left;
  }
</style>
