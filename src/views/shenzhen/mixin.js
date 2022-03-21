import moment from 'moment'
export default {
  data () {
    return {
      personCategory: [
        {
          code: 'age',
          label: '按年龄'
        },
        {
          code: 'sex',
          label: '按性别'
        },
        {
          code: 'area',
          label: '按区域'
        }
      ],
      totalTypeList: [
        {
          code: 'day',
          label: '昨日数据',
          value: 1
        },
        {
          code: 'day3',
          label: '三日累计',
          value: 3
        },
        {
          code: 'day7',
          label: '七日累计',
          value: 7
        },
        {
          code: 'day15',
          label: '十五日累计',
          value: 15
        }
      ]
    }
  },
  methods: {
    filterMapDataBySubDate (sub, data) {
      if (!Array.isArray(data)) {
        return
      }
      const endDate = moment().subtract(sub, 'day')
      const targetData = data.filter((item) => {
        const dataDate = moment(item.date)
        return dataDate.isAfter(endDate)
      })
      return targetData
    },
    /**
     * 返回一个日期范围内的数据，包括startDate, 但不包括endDate
     * @param {*} startDate
     * @param {*} endDete
     * @param {*} data
     * @returns Array
     */
    filterMapDataByDateRange (startDate, endDete, data) {
      const start = moment(startDate).subtract(1, 'day')
      const end = moment(endDete)
      const targetData = data.filter((item) => {
        const dataDate = moment(item.date)
        return dataDate.isBetween(start, end)
      })
      return targetData
    }
  }

}
