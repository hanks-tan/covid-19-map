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
                v-for="type in totalTypeList"
                :key="type.code"
                :label="type.label"
                :value="type.code">
              </el-option>
            </el-select>
            <div>
              <el-date-picker
                v-if="typeValue === 'custom'"
                v-model="dateRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                @change="dataRangeChanged">
              </el-date-picker>
            </div>
          </div>
          <BaseBar
            :group="item.group"
            :title="title"
            class="chart-container"
            >
          </BaseBar>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from 'moment'
import BaseBar from 'comps/charts/BaseBar'
import mapUtil from 'utils/mapUtil'
import mixin from './mixin'
import conf from './conf'
export default {
  components: {
    BaseBar
  },
  mixins: [mixin],
  data () {
    return {
      chartList: [
        {
          code: 'age',
          label: '按年龄',
          group: [],
          groupMap: mapUtil.covidDataUtil.ageGroup1,
          formatValue: mapUtil.formatAge
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
          formatValue: mapUtil.formatRegion
        }
      ],
      curTabPane: 'age',
      typeValue: 'day',
      title: '',
      dateRangeOptions: [],
      dateRange: ''
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
    this.showChart()
  },
  methods: {
    showChart () {
      const opt = this.chartList.find((item) => item.code === this.curTabPane)
      if (opt) {
        const totalType = this.totalTypeList.find((item) => item.code === this.typeValue)
        let start, end
        if (totalType.code === 'custom') {
          [start, end] = this.dateRange
        } else {
          end = moment(conf.endDate)
          start = moment(conf.endDate).subtract(totalType.value, 'day')
        }
        // const today = moment()
        // const otherDay = moment().subtract(totalType.value, 'day')
        const targetData = this.filterMapDataByDateRange(start, end, this.data)
        const group = this.createGroupByAge(targetData, opt.code, opt.groupMap, opt.formatValue)
        opt.group = group
        this.title = '确诊人数：' + targetData.length
      }
    },
    group (data, field) {
      const group = {}
      data.forEach((item) => {
        const key = item[field]
        if (group[key]) {
          group[key] += 1
        } else {
          group[key] = 1
        }
      })
      return group
    },
    typeChangeHandle (val) {
      this.showChart()
    },
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
    dataRangeChanged () {
    //   const opt = this.chartList.find((item) => item.code === this.curTabPane)
    //   const targetData = this.filterMapDataByDateRange(this.dateRange[0], this.dateRange[1], this.data)
    //   const group = this.createGroupByAge(targetData, opt.code, opt.groupMap, opt.formatValue)
    //   opt.group = group
    //   this.title = '确诊人数：' + targetData.length
      this.showChart()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/charts.less');
</style>
