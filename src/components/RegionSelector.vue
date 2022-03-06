<template>
  <div>
    <span class="col-label">城市</span>
    <el-cascader
      :options="options"
      :props="props"
      clearable
      @change="changeHandle"></el-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: { multiple: true },
      options: []
    }
  },
  mounted () {
    this.getRegions()
  },
  methods: {
    getRegions () {
      this.options = [
        {
          label: '中国',
          value: 'cn',
          children: [
            {
              label: '北京',
              value: 'bj',
              children: [
                {
                  label: '顺义',
                  value: 'sy'
                }
              ]
            },
            {
              label: '广东省',
              value: 'gb',
              children: [
                {
                  label: '深圳',
                  value: 'sz'
                },
                {
                  label: '广州',
                  value: 'gz'
                }

              ]
            }
          ]
        }
      ]
    },
    changeHandle (nodes) {
      const item = nodes.map((item) => {

      })
      this.$emit('change', nodes)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
