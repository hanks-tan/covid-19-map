<template>
  <div class="input_warp">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      class="input-with-select">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less" scoped>
.input_warp{
  width: 40%;
}
</style>
