<template>
  <div class="wrap">
    <div class="setting-wrap box">
      <!-- 区域选择器 -->
      <RegionSelector @change="regionChangeHandle" class="setting-item region-selector"></RegionSelector>
      <!-- 列选择器 -->
      <DataTypeSelector label="类型" @change="dataTypeChangeHandle" class="setting-item"></DataTypeSelector>
      <div class="setting-item">
        <span class="col-label">开始时间</span>
        <el-date-picker
          v-model="startDate"
          @change="dateChangeHandle"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <LineRace
      v-if="lineRachChartOptions.renderData.length > 0"
      :options="lineRachChartOptions"
      :renderData="lineRachChartOptions.renderData"
      :title="lineRachChartOptions.title"
      class="chart box"
      :key="this.lineChartKey"
    ></LineRace>
  </div>
</template>

<script>
import LineRace from '../../components/charts/LineRace.vue'
import RegionSelector from '../../components/RegionSelector.vue'
import DataTypeSelector from '../../components/DataTypeSelector.vue'
import mapUtil from '../../utils/mapUtil'
export default {
  components: {
    LineRace,
    RegionSelector,
    DataTypeSelector
  },
  data () {
    return {
      lineRachChartOptions: {
        renderData: [],
        countries: [
          '武汉市',
          '深圳市',
          '广州市',
          '黄冈市'
        ],
        startDate: '2020-02-14',
        countryColName: 'city',
        dateColName: 'date',
        dataItemName: '',
        title: ''
      },
      startDate: '2020-02-14',
      cvData: null,
      lineChartKey: 0
    }
  },
  mounted () {
    this.getData().then((data) => {
      this.cvData = data
      this.showLineRaceChart(data)
    })
  },
  methods: {
    getData () {
      return this.$api.getCovidData().then((csvData) => {
        const lines = csvData.data.split('\r\n')
        const data = []
        lines.forEach((line, index) => {
          const values = line.split(',')
          if (index === 0) {
            data.push(values)
          } else {
            // 过滤出带城市的数据
            if (values[6]) {
              [7, 8, 9, 10].forEach((i) => {
                values[i] = parseInt(values[i])
              })
              data.push(values)
            }
          }
        })
        return data
      })
    },
    showLineRaceChart () {
      this.lineRachChartOptions.startDate = '2020-02-14'
      this.lineRachChartOptions.countryColName = 'city'
      this.lineRachChartOptions.dateColName = 'date'
      this.lineRachChartOptions.dataItemName = 'confirmed'
      this.lineRachChartOptions.title = '增长'
      this.lineRachChartOptions.renderData = this.cvData
      this.lineChartKey += 1
    },
    regionChangeHandle (data) {
      this.lineRachChartOptions.countries = data
      this.lineRachChartOptions.title = this.getTitle()
      this.lineChartKey += 1
    },
    dataTypeChangeHandle (dataType) {
      this.lineRachChartOptions.dataItemName = dataType
      this.lineRachChartOptions.title = this.getTitle()
      this.lineChartKey += 1
    },
    dateChangeHandle (date) {
      this.lineRachChartOptions.startDate = date
      this.lineRachChartOptions.title = this.getTitle()
      this.lineChartKey += 1
    },
    getTitle () {
      const dataType = mapUtil.covidDataUtil.covidDataTypeList.find((item) => item.value === this.lineRachChartOptions.dataItemName)
      return `自 ${this.lineRachChartOptions.startDate} 以来的 ${dataType.label} 数据`
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    margin: .5rem;
    min-height:  calc(100vh - 30px);
    color: black;
    border-radius: 5px;
    .box {
      border-radius: 5px;
      background-color: white;
    }
    .setting-wrap{
      display: flex;
      background-color: #2196f30d;
      .setting-item{
        margin: 0 1rem;
      }
      .region-selector{
        /deep/ .el-cascader{
          width: 20rem;
        }
      }
    }
    .chart{
      height: 600px;
    }
  }
</style>
