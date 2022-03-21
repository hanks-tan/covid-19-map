<template>
  <div class="header">
    <div>
      <span>{{title}}
    </div>
    <el-button
      @click="closeHandle"
      icon="el-icon-close"
    >
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    closeHandle () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .header{
    padding: 5px;
    background-color: wheat;
    .title{
      font-size: 14px;

    }
  }
  .close{
    
  }
</style>
