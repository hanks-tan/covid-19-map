<template>
  <div>
    <div class="title">数据分布占比</div>
    <div v-for="(gp, i) in groupList" :key="i" class="group-item">
      <div class="item-label">{{gp.prop}}</div>
      <div class="line-bar">
        <template v-for="(item, j) in gp.group ">
          <el-tooltip
            :key="j"
            :content="`${item[0]}: ${item[2]}`"
            placement="right">
            <div
              class="line"
              :style="{width: item[2], background: colors[j % colors.length], left: item[3] + '%'}"
              >
            </div>
          </el-tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import mapUtil from '@/utils/mapUtil'
export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      groupList: [],
      colors: mapUtil.covidDataUtil.colorList
    }
  },
  mounted () {
    this.initGroup()
  },
  methods: {
    initGroup () {
      this.group(this.data)
    },
    group (data) {
      if (!Array.isArray(data)) {
        return null
      }

      // 分组方案 参考distr组件中的
      const groupSeu = {
        sex: {
          label: '性别',
          value: ''
        },
        address: {
          label: '位置',
          value: ''
        },
        age: {
          label: '年龄',
          value: (value) => {
            let age = mapUtil.formatAge(value)
            age = parseInt(age)
            if (!age) return
            const range = mapUtil.covidDataUtil.ageGroup1.find((item) => {
              return age > item.limit[0] && age <= item.limit[1]
            })
            return range.label
          }
        }
      }

      this.groupList = Object.keys(groupSeu).map((prop) => {
        const group = []
        const seu = groupSeu[prop].value
        data.forEach((item) => {
          const val = item[prop]
          if (val) {
            const nkey = seu ? seu(val) : val
            if (!nkey) return
            const gpItem = group.find((g) => g[0] === nkey)
            if (gpItem) {
              gpItem[1] += 1
            } else {
              group.push([nkey, 1])
            }
          }
        })
        let offset = 0
        group.forEach((item) => {
          const prent = Math.round((item[1] / data.length) * 100)
          item.push(`${prent}%`)
          item.push(offset)
          offset += prent
        })
        return {
          prop,
          group
        }
      })
      console.log('分组', this.groupList)
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 1em;
  font-family: fangsong;
  font-weight: bold;
}
.group-item{
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin: .5rem 0;
  font-family: fangsong;
  .item-label{
    text-align: right;
    margin-right: 1rem;
  }
  .line-bar{
    position: relative;
    display: inline;
    background-color: #ffffff24;
    .line{
      position: absolute;
      display: inline;
      height: 100%;
    }
  }
}
</style>
