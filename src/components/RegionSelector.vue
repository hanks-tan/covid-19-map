<template>
  <div>
    <span class="col-label">城市</span>
    <el-cascader
      v-model="model"
      :options="options"
      :props="props"
      clearable
      collapse-tags
      filterable
      :show-all-levels="false"
      @change="changeHandle"></el-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: { multiple: true, value: 'code', label: 'value', checkStrictly: false },
      options: [],
      model: ''
    }
  },
  props: {
    initList: {
      type: Array
    }
  },
  mounted () {
    this.getRegions()
  },
  methods: {
    getRegions () {
      this.$api.getRegionData().then((res) => {
        const data = res.data
        this.options = data.filter((item) => item.code === 'CN')
      })
    },
    changeHandle (nodes) {
      const data = nodes.map((item) => {
        const node = item.reduce((prev, cur, index, arr) => {
          const t = prev.find((c) => c.code === cur)
          if (index === arr.length - 1) {
            return t
          }
          return t.children
        }, this.options)
        return node.value
      })
      this.$emit('change', data)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
