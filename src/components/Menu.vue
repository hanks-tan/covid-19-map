<template>
  <div>
    <li v-for="(menu, i) in menuList" :key="menu.code" class="line">
      <router-link :to="menu.path" class="link">{{menu.name}}</router-link>
    </li>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          code: 'main',
          name: '主页',
          path: '/'
        },
        {
          code: 'data',
          name: '每日疫情',
          path: '/data'
        },
        {
          code: 'shenzhen2022',
          name: '深圳2022年春新冠疫情热力图',
          path: '/shenzhen2022'
        },
        {
          code: 'city',
          name: '城市核酸监测点',
          path: '/city'
        },
        {
          code: 'increase',
          name: '城市疫情趋势对比图',
          path: '/increaseChart'
        },
        {
          code: 'top10',
          name: '国内TOP10数据的变化过程',
          path: '/top10'
        }
      ]
    }
  }
}
</script>

<style scoped>
.line{
  border-block-end: 1px solid #5a5757;
  padding-left: 1rem;
}
  .link{
    color: #fff;
    text-decoration: none;
  }
</style>
