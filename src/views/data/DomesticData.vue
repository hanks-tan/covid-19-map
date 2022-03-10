<template>
  <div>
    <div class="card">
      <a href="/top10">
        国内TOP10数据的变化过程
      </a>
    </div>
    <div class="card">
      <a href="/increaseChart">
        各地区的增长情况
      </a>
    </div>

    <!-- 今日数据 -->
    <div class="today-data">
      <el-card v-for="item in todayData" :key="item.code" class="card">
        <div>
          <span>较昨日</span>
          {{item.compareBefore}}
        </div>
        <div>
          {{item.value}}
        </div>
        <div>
          {{item.label}}
        </div>
      </el-card>
    </div>

    <!-- 趋势图 -->
    <div>
      <!-- 新增病例趋势图 -->
      <!-- 现存病例趋势图 -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todayData: [
        {
          name: 'dead',
          label: '新增确诊',
          value: 1333,
          compareBefore: 5
        },
        {
          name: 'confirmed',
          label: '累计确诊',
          value: 133,
          compareBefore: 3
        },
        {
          name: '',
          label: '现存确诊',
          value: 1333,
          compareBefore: 5
        },
        {
          name: 'dead',
          label: '累计境外输入',
          value: 1333,
          compareBefore: 5
        },
        {
          name: 'dead',
          label: '累计治愈',
          value: 1333,
          compareBefore: 5
        },
        {
          name: 'dead',
          label: '累计死亡',
          value: 1333,
          compareBefore: 5
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin: 1rem;
    border-radius: 5px;
    background-color: #cdc6c63d;
  }
  .today-data{
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(3, 33.33%);
  }
</style>
