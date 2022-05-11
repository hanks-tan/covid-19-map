<template>
  <div>
    <div class="card">

    </div>

    <!-- 今日数据 -->
    <div class="box-inner">
      <div class="date">数据更新时间：{{date}}</div>
      <div class="today-data">
        <el-card v-for="item in todayData" :key="item.code" class="card">
          <div class="compare">
            <span>较昨日</span>
            {{item.compareBefore}}
          </div>
          <div class="cur-count">
            {{item.value}}
          </div>
          <div>
            {{item.label}}
          </div>
        </el-card>
      </div>
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
      date: '2022-03-22',
      todayData: [
        {
          name: 'dead',
          label: '新增确诊',
          value: 1333,
          compareBefore: '+5'
        },
        {
          name: 'confirmed',
          label: '累计确诊',
          value: 133,
          compareBefore: '+3'
        },
        {
          name: '',
          label: '现存确诊',
          value: 1333,
          compareBefore: '+5'
        },
        {
          name: 'dead',
          label: '累计境外输入',
          value: 1333,
          compareBefore: '+5'
        },
        {
          name: 'dead',
          label: '累计治愈',
          value: 1333,
          compareBefore: '+5'
        },
        {
          name: 'dead',
          label: '累计死亡',
          value: 1333,
          compareBefore: '+5'
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
    color: #6a6464;
    border-color:#e1e2e2;
  }
  .date{
    text-align: left;
  }
  .today-data{
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(3, 33.33%);
    .compare{
      color: #ea7120;
    }
    .cur-count{
      font-size: 3rem;
    }
  }
</style>
