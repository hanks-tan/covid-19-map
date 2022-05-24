<template>
  <div>
    <div>性别：{{item.sex}}</div>
    <div>年龄：{{item.age}}</div>
    <div>：{{item.sex}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>

</style>
