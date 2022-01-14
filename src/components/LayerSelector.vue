<template>
  <div class="layer_warp">
    <div v-for="(item, i) in layers"
      :key="i"
      class="item"
      :class="[item.checked ? 'active' : '']"
      @click="layerClickHandle">
      {{item.label}}
      <div v-for="(sub, j) in item.children" :key="j" class="sub-item">
        {{sub.label}}
      </div>
    </div>
  </div>
</template>

<script>
import PointLayer from '../map/layer/pointLayer'
import mapUtil from '../utils/mapUtil'
export default {
  data () {
    return {
      layers: [
        {
          name: 'checkPoints',
          label: '核酸检测点',
          checked: false,
          children: [
            {
              name: '',
              label: '自费检测点',
              checked: true,
              layer: null,
              type: 'point',
              dataSource: {
                api: 'getStation'
              }
            },
            {
              name: 'free',
              label: '免费检测点',
              checked: false,
              layer: null,
              type: 'point'
            }
          ]
        },
        {
          name: 'ymjzd',
          label: '疫苗接种点',
          checked: false,
          layer: null,
          type: 'point'
        },
        {
          name: 'fyq',
          label: '风险区',
          checked: false,
          children: [
            {
              name: 'gfxq',
              label: '高风险区',
              checked: false,
              layer: null,
              type: 'point'
            },
            {
              name: 'gfxq',
              label: '中风险区',
              checked: false,
              layer: null,
              type: 'point'
            },
            {
              name: 'gfxq',
              label: '低风险区',
              checked: false,
              layer: null,
              type: 'point'
            }
          ]
        }
      ]
    }
  },
  inject: ['getMap'],
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let layerList = []
      this.layers.forEach((item) => {
        layerList.push(item)
        if (item.children) {
          layerList = layerList.concat(item.children)
        }
      })

      layerList.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'layer')) {
          if (item.checked) {
            const layer = this.createLayer(item)
            item.layer = layer
            if (item.dataSource) {
              this.loadData(item)
            }
          }
        }
      })
    },
    createLayer (option) {
      const layerClassList = {
        point: PointLayer
      }

      const mapObj = this.getMap()

      const LayerC = layerClassList[option.type]
      if (LayerC) {
        const layer = new LayerC({
          mapObj: mapObj,
          name: option.name
        })
        return layer
      }
      return null
    },
    layerClickHandle () {

    },
    loadData (layerCf) {
      if (layerCf.dataSource.api && layerCf.layer) {
        const api = this.$api[layerCf.dataSource.api]
        if (api) {
          api().then((res) => {
            const data = mapUtil.readGeoJSON(res.data)
            layerCf.layer.setData(data)
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .layer_warp{
    background: #67676cb3;
    .item{
      cursor: pointer;
      .sub-item{
        padding-left: 2rem;
        margin: 0.5rem;
      }
    }
    .active{
      color: blue;
    }
  }
</style>
