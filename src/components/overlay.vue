<template>
  <div class="info-contanier box">
    <h3>地区:{{ncovData.country}}</h3>
    <p class="time">截至时间：{{ncovData.date}}</p>
    <p>累计确诊:{{ncovData.confirmed}}</p>
    <p>现存确诊:{{ncovData.curConfirm}}</p>
    <!-- <p>现存疑似:{{ncovData.suspected}}</p> -->
    <p>累计治愈:{{ncovData.cured}}</p>
    <p>累计死亡:{{ncovData.dead}}</p>
  </div>
</template>
<script>
import Overlay from 'ol/Overlay'
export default {
  data () {
    return {
      ncovData: {
        country: '',
        confirmed: 0, // 确诊的
        curConfirm: 0, // 现存确诊的
        suspected: 0, // 疑似的
        cured: 0, // 治愈的
        dead: 0 // 死亡的
      },
      visible: false,
      overlay: undefined
    }
  },
  props: {
    aMap: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var overlay = new Overlay({
        // element: this.$mount().$el,
        element: this.$el,
        stopEvent: false, // 设为false,允许事件传播
        autoPanAnimation: {
          duration: 250
        },
        offset: [30, 0],
        position: this.position,
        positioning: 'center-left',
        className: 'point-overlay'
      })
      this.aMap.getOlMap().addOverlay(overlay)
      this.overlay = overlay
    },

    setData (evt) {
      if (evt.position) {
        const covidData = evt.target.get('data')
        this.ncovData = Object.assign({}, covidData)
        this.overlay.setPosition(evt.position)
      } else {
        this.overlay.setPosition(undefined)
      }
    }
  }
}
</script>
<style lang="less">
.info-contanier{
  color: #ccc;
  text-align: left;
  font-size: 14px;
  min-width: 100px;
  .time{
    font-weight: 600;
  }
}
</style>
