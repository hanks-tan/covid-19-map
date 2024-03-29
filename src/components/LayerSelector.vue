<template>
  <div class="layer_warp">
    <div v-for="(item, i) in layers"
      :key="i"
      class="item"
      @click="layerGroupChange(item)">
      <span :class="{active: item.checked}">{{item.label}}</span>
      <div
        v-for="(sub, j) in item.children"
        :key="j"
        :class="{active: sub.checked}"
        @click.stop="layerChange(sub)"
        class="sub-item">
        {{sub.label}}
      </div>
    </div>
  </div>
</template>

<script>
import PointLayer from '../map/layer/pointLayer'
import FengxianquLayer from '../map/layer/fengxianquLayer'
import mapUtil from '../utils/mapUtil'
import { Style, Fill, Stroke, Circle, Icon, RegularShape } from 'ol/style'

export default {
  data () {
    return {
      layers: [
        {
          name: 'hsjcd',
          label: '核酸检测点',
          checked: false,
          children: [
            {
              name: 'zfjcd',
              label: '自费检测点',
              checked: true,
              layerOption: {
                type: 'point', // 对应图层类
                dataSource: {
                  api: 'getZfStation'
                },
                style: 'zfjcd' // 样式名
              }
            },
            {
              name: 'mfjcd',
              label: '免费检测点',
              checked: false,
              layerOption: {
                type: 'point',
                dataSource: {
                  api: 'getFreeCheckPoint',
                  type: 'pointList'
                },
                style: 'mfjcd' // 样式名
              }
            }
          ]
        },
        {
          name: 'ymjzd',
          label: '疫苗接种点',
          checked: false,
          layerOption: {
            type: 'point',
            dataSource: {
              api: 'getStation'
            },
            style: 'point' // 样式名
          }
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
              layerOption: {
                type: 'fxqLayer',
                showAnimaion: true,
                dataSource: {
                  api: ''
                },
                style: 'fxq' // 样式名
              }
            },
            {
              name: 'gfxq',
              label: '中风险区',
              checked: false,
              layerOption: {
                type: 'fxqLayer',
                showAnimaion: true,
                dataSource: {
                  api: 'getFxq'
                }
              }
            },
            {
              name: 'gfxq',
              label: '低风险区',
              checked: false,
              layerOption: {
                type: 'fxqLayer',
                showAnimaion: true,
                dataSource: {
                  api: 'getStation'
                },
                style: 'fxq' // 样式名
              }
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
        if (Object.prototype.hasOwnProperty.call(item, 'layerOption')) {
          if (item.checked && item.layerOption) {
            const layer = this.createLayer(item.layerOption, item.name)
            item.layer = layer
            if (item.layerOption.dataSource) {
              this.loadData(item.layerOption.dataSource, layer)
            }
          }
        }
      })
    },
    createLayer (option, layerName) {
      const layerClassList = {
        point: PointLayer,
        fxqLayer: FengxianquLayer
      }

      const mapObj = this.getMap()

      const LayerC = layerClassList[option.type]
      if (LayerC) {
        const layer = new LayerC({
          mapObj: mapObj,
          name: layerName,
          styleFunc: option.style ? this.getStyle(option.style) : undefined,
          showAnimaion: option.showAnimaion
        })
        return layer
      }
      return null
    },
    layerGroupChange (data) {
      data.checked = !data.checked
      if (data.children) {
        data.children.forEach((item) => {
          this.layerChange(item, data.checked)
        })
      }
    },
    layerChange (data, checked) {
      if (checked !== undefined) {
        data.checked = checked
      } else {
        data.checked = !data.checked
      }
      if (data.layer) {
        data.layer.setVisible(data.checked)
      } else {
        if (data.checked) {
          data.layer = this.createLayer(data.layerOption, data.name)
          this.loadData(data.layerOption.dataSource, data.layer)
        }
      }
    },
    loadData (source, layer) {
      if (source.api && layer) {
        const api = this.$api[source.api]
        if (api) {
          api().then((res) => {
            let data
            if (source.type === 'pointList') {
              data = mapUtil.dataListToPointsFeature(res, 'longitude', 'latitude')
            } else {
              data = mapUtil.readGeoJSON(res.data)
            }
            layer.setData(data)
          })
        }
      }
    },

    getStyle (styleName) {
      const createIconStyle = (icon) => {
        const style = new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: icon
          })
        })
        return style
      }
      const styles = {
        point: function (ft) {
          return new Style({
            image: new Circle({
              radius: 5,
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        },
        zfjcd: function (ft) {
          const icon = './image/pa_f.png'
          return createIconStyle(icon)
        },
        mfjcd: function (ft) {
          const icon = './image/checkpoint_open.png'
          return createIconStyle(icon)
        },
        fxq: function (ft) {
          const level = ft.get('level')
          const colorMap = {
            1: 'red',
            2: '#e3ef2e',
            3: '#8f8080'
          }
          return new Style({
            fill: new Fill({
              color: colorMap[level] || '#8f8080'
            }),
            style: new Style({
              color: '#ccc',
              width: 2
            })
          })
        }
      }
      if (styles[styleName]) {
        return styles[styleName]
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
      text-align: left;
      .sub-item{
        padding-left: 2rem;
        margin: 0.5rem;
        text-align: left;
      }
    }
    .active{
      color: blue;
    }
  }
</style>
