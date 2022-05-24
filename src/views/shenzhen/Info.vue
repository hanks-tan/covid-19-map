<template>
  <div>
    <div @click="showDetailsHandle"
      class="collapse-item__header"
      :class="{active: showDetail}">
    <!-- {{date}} 新增 {{count}} -->
      <i
        class="el-icon-arrow-right collapse-item__arrow"
        :class="{active: showDetail}"></i>
    </div>
    <Details
      v-if="showDetail"
      :data="data">

    </Details>
  </div>
</template>

<script>
import Details from './Details.vue'
export default {
  components: {
    Details
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      showDetail: false
    }
  },
  computed: {
    count () {
      return this.data.length
    },
    date () {
      return this.data[0].date
    }
  },
  methods: {
    showDetailsHandle () {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang="less" scoped>
  .collapse-item__header{
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: .5rem;
    transition: border-bottom-color .3s;
    font-size: 1.1rem;
  }
  .collapse-item__header.active{
    border-bottom-color: transparent;
  }
  .collapse-item__arrow{
    margin: 0 8px 0 auto;
    transition: transform .3s;
    font-weight: 300;
  }
  .collapse-item__arrow.active{
    transform: rotate(90deg);
  }
</style>
