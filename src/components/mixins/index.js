export default {
  data () {
    return {
      cvData: []
    }
  },
  methods: {
    getCovidData () {
      this.$api.getCovidData().then((res) => {
        const lines = res.data.split('\n')
        const dataList = lines.map((line) => {
          return line.split(',')
        })
        return dataList
      })
    }
  }
}
