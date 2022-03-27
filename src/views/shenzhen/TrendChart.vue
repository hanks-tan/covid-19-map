<template>
  <div>
    <el-tabs type="border-card"  v-model="curTabPane" class="tabs">
      <el-tab-pane
        v-for="item in chartList"
        :key="item.code"
        :label="item.label"
        :name="item.code"
        >
        <!-- 图表区 -->
        <div v-if="curTabPane === item.code">
          <!-- 头部 -->
          <div class="chart-header">
            <span class="text">时间范围</span>
            <el-select v-model="typeValue" placeholder="" @change="typeChangeHandle" size="small">
              <el-option
                v-for="type in dateRangeOptions"
                :key="type.code"
                :label="type.label"
                :value="type.code">
              </el-option>
            </el-select>
          </div>
          <MultiLineChart
            :xData="xData"
            :series="dataList"
            class="chart-container"
            >
          </MultiLineChart>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="用户管理">用户管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import moment from 'moment'
import MultiLineChart from '../../components/charts/MultiLineChart.vue'
import mapUtil from '../../utils/mapUtil'
import mixin from './mixin'
export default {
  components: {
    MultiLineChart
  },
  mixins: [mixin],
  data () {
    return {
      chartList: [
        {
          code: 'date',
          label: '日新增总体趋势'
        },
        {
          code: 'age',
          label: '按年龄',
          group: [],
          groupMap: mapUtil.covidDataUtil.ageGroup1,
          formatValue: this.formatAge
        },
        {
          code: 'sex',
          label: '按性别',
          group: [],
          groupMap: [
            { id: 1, label: '男', value: '男' },
            { id: 2, label: '女', value: '女' }
          ]
        },
        {
          code: 'address',
          label: '按区域',
          group: [],
          groupMap: [
            { id: 1, label: '福田区', value: '' },
            { id: 2, label: '南山区', value: '' },
            { id: 3, label: '宝安区', value: '' },
            { id: 4, label: '罗湖区', value: '' },
            { id: 5, label: '龙岗区', value: '' },
            { id: 6, label: '坪山区', value: '' },
            { id: 7, label: '龙华区', value: '' },
            { id: 8, label: '大鹏新区', value: '' },
            { id: 9, label: '坪山新区', value: '' },
            { id: 10, label: '光明新区', value: '' }
          ],
          formatValue: this.formatRegion
        }
      ],
      curTabPane: 'date',
      typeValue: 'day3',
      title: '',
      xData: [],
      dataList: [],
      dateRangeOptions: []
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  watch: {
    curTabPane (val) {
      this.showChart()
    }
  },
  mounted () {
    const dateRangeOptions = this.totalTypeList.slice(1)
    dateRangeOptions.forEach((item) => {
      if (item.label.includes('累计')) {
        item.label = `近${item.label.replace('累计', '日新增')}`
      }
    })
    this.dateRangeOptions = dateRangeOptions
    this.showChart()
  },
  methods: {
    showChart () {
      this.xData = []
      this.dataList = []
      const opt = this.chartList.find((item) => item.code === this.curTabPane)
      if (opt) {
        const totalType = this.totalTypeList.find((item) => item.code === this.typeValue)
        const today = moment()
        const otherDay = moment().subtract(totalType.value, 'day')
        const targetData = this.filterMapDataByDateRange(otherDay, today, this.data)
        if (opt.code === 'date') {
          this.groupByDate(targetData)
        } else {
          this.group(otherDay, today, targetData, opt)
        }
      }
    },
    group (startDate, endDate, data, options) {
      const start = moment(startDate)
      const end = moment(endDate)
      const dist = end.diff(start, 'day')
      const dateList = [start.format('YYYY-MM-DD')]
      for (let i = 0; i < dist - 1; i++) {
        const date = start.add(1, 'day')
        dateList.push(date.format('YYYY-MM-DD'))
      }

      const dataArr = options.groupMap.map((cate) => {
        return {
          name: cate.label,
          type: 'line',
          data: []
        }
      })

      dateList.map((date) => {
        const dataTheDate = data.filter((d) => {
          return d.date === date
        })

        const group = this.createGroupByAge(dataTheDate, options.code, options.groupMap, options.formatValue)
        group.forEach((item) => {
          const g = dataArr.find((j) => j.name === item[0])
          if (g) {
            g.data.push(item[1])
          } else {
            console.log(item[0])
          }
        })
      })

      console.log('结构', dataArr)
      this.xData = dateList
      this.dataList = dataArr
    },
    groupByDate (data) {
      const groupMap = new Map()
      data.forEach((item) => {
        const key = item.date
        const count = groupMap.get(key) || 0
        groupMap.set(key, count + 1)
      })
      const groupArr = Array.from(groupMap)
      groupArr.sort((a, b) => {
        const atime = moment(a[0]).format('X')
        const btime = moment(b[0]).format('X')
        return atime - btime
      })

      const dataList = []
      groupArr.forEach((item) => {
        this.xData.push(item[0])
        dataList.push(item[1])
      })
      this.dataList = [{
        type: 'line',
        data: dataList,
        name: '日新增趋势',
        areaStyle: {}
      }]
    },
    typeChangeHandle (val) {
      this.showChart()
    },
    /**
     * 返回一个二维数组，Array[Array[cate, value]]
     */
    createGroupByAge (data, field, valueRangeMap, valueFunc) {
      const groupData = new Map()
      data.forEach((item) => {
        const fieldValue = item[field]
        const formatValue = valueFunc ? valueFunc(fieldValue) : fieldValue
        let thisKey = ''
        if (valueRangeMap) {
          for (const rangeObj of valueRangeMap) {
            const key = rangeObj.id
            if (!key) {
              continue
            }

            const limit = rangeObj.limit
            const value = rangeObj.value || rangeObj.label
            if (Array.isArray(limit) && limit.length === 2) {
              const v = parseInt(formatValue) // 注意，值必须能转换成数字
              if (typeof v === 'number' && v > limit[0] && v <= limit[1]) {
                thisKey = key
                break
              }
            } else {
              if (value === formatValue) {
                thisKey = key
                break
              }
            }
          }

          if (thisKey) {
            let count = groupData.get(thisKey)
            count = count ? count + 1 : 1
            groupData.set(thisKey, count)
          }
        }
      })

      const groupList = valueRangeMap.map((item) => {
        const label = item.label
        const value = groupData.get(item.id) || 0
        return [label, value]
      })

      return groupList
    },
    formatAge (ageStr) {
      const reg1 = /^\d+(?=月龄$)/
      const reg2 = /^\d+(?=岁)/
      if (reg1.test(ageStr)) {
        return reg1.exec(ageStr)[0]
      } else if (reg2.test(ageStr)) {
        return reg2.exec(ageStr)[0]
      }
      return ''
    },
    formatRegion (region) {
      const reg = /^.{2,}(?=区)/
      if (reg.test(region)) {
        return reg.exec(region)[0] + '区'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/charts.less');
</style>
