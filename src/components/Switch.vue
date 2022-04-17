<template>
  <div class="switch" :class="{radius: borderRadius}">
    <div
      v-for="item in options"
      :key="item.value"
      :value="value"
      class="switch-item"
      :class="{active: curValue === item.value, radius: borderRadius}"
      @click="clickHandle(item)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    curValue: {
      type: String,
      required: true
    },
    borderRadius: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    clickHandle (data) {
      this.$emit('update:curValue', data.value)
    }
  }
}
</script>

<style lang="less" scoped>
.switch{
  display: inline-flex;
  align-items: center;
  background-color: #474545;
  .switch-item{
    padding: .2rem 1rem;
  }
  .active{
    // border-radius: 1rem;
    background-color: cadetblue;
  }
}
.radius{
  border-radius: 1rem;
}
</style>
