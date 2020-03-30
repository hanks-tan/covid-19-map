<template>
  <div class="time-line-warp">
    <!-- 左侧 -->
    <div class="left">
      <!-- 开始按钮 -->
      <div class="start-btn">
        <div class="circle">
          <div v-if="isPlay" class="triangle" @click="isPlay = false"></div>
          <div v-else class="stop" @click="isPlay = true"></div>
        </div>
      </div>
      <div class="month">{{curMonthStr}}</div>
    </div>
    <!-- 进度条 -->
    <div class="time-line-main">
      <!-- 进度条 -->
      <div class="top-line">
        <div class="progress" :style="{width: progress * unitLen + '%'}"></div>
        <div v-if="isVli">
          <i v-for="item in dateList" :key="item.no" :style="{left:item.offset + '%'}"></i>
        </div>
        <div class="bottom"></div>
      </div>
      <!-- 日期 -->
      <div>
        <div class="date" v-for="item in dateList" :key=item.no :style="{left: item.offset + '%'}">
          {{item.date}}
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import moment from 'moment'
import mapUtil from '../utils/mapUtil'
export default {
  data () {
    return {
      dateList: [], // 每月的日期列表
      isVli: false, // 是否显示日期
      isPlay: true, // 播放/停止
      player: null, // 播放定时器
      progress: 0, // 进度(天)
      unitLen: 0, // 进度条单位长
      curMonth: undefined, // 当前月
      curMonthStr: undefined, // 当前月(string),
      isLatest: false // 最进
    }
  },
  props: {
    startDate: String,
    endDate: String,
    speed: Number
  },
  created () {
    this.initDates(this.startDate)
  },
  watch: {
    isPlay (newVal) {
      if (!newVal) {
        this.startPlay()
      } else {
        this.stopPlay()
      }
    },
    curMonth (newVal) {
      this.curMonthStr = newVal.format('YYYY年MM月')
    }
  },
  mounted () {

  },
  methods: {
    initDates (startDate) {
      this.curMonth = moment(startDate)
      this.progress = 0
      var length = moment(startDate).daysInMonth()
      this.unitLen = 100 / length
      this.dateList = []
      for (let i = 0; i < length; i++) {
        this.dateList.push({
          no: i + 1,
          date: `${i + 1}日`,
          offset: i * this.unitLen
        })
      }
      console.log(this.dateList)
      this.isVli = true
    },
    startPlay () {
      if (this.player) {
        this.stopPlay()
      }
      var self = this
      this.player = window.setInterval(() => {
        // 播放完毕
        if (self.isLatest) {
          self.stopPlay()
          self.reset()
          return
        }
        if (self.dateList.length > 1) {
          var nextDate = moment(self.startDate).add(self.speed, 'days').format(mapUtil.dateFormat)
          if (moment(nextDate).diff(moment(self.curMonth), 'months') >= 1) {
            self.updateMonth(nextDate)
          }

          if (moment(nextDate).diff(moment(), 'days') >= 0) {
            nextDate = moment().format(mapUtil.dateFormat)
            self.isLatest = true
          }
          self.progress = moment(nextDate).date()

          self.$emit('changeDate', nextDate)
        }
      }, 300)
    },
    stopPlay () {
      window.clearInterval(this.player)
      this.player = null
    },
    reset () {
      var startDate = mapUtil.covidDefaultStartTime
      this.$emit('changeDate', startDate)
      this.initDates(startDate)
      this.curMonth = moment(startDate)
      this.isPlay = true
      this.isLatest = false
    },
    updateMonth (date) {
      this.curMonth = moment(date)
      this.initDates(date)
    }
  }
}
</script>
<style lang="less">
  .time-line-warp{
    .left{
      width: 6%;
      .start-btn{
        left: 25px;
        top: -15px;
        position: relative;
        .circle{
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background-color: #9a9ab5;
          .triangle{
            width: 0;
            height: 0;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            border-left: 18px solid #1c943c;
            left: 13px;
            top: 7px;
            position: relative;
          }
          .stop{
            width: 18px;
            height: 25px;
            border-style: double;
            border-width: 0px 0px 0px 16px;
            border-color: #c5b7b7;
            top: 7px;
            left: 12px;
            position: relative;
          }
        }
      }
      .month{
        left: 0px;
        position: relative;
      }
    }
    .time-line-main{
      left: 6%;
      top: 0px;
      width: 94%;
      position: absolute;
      .top-line{
        margin: 0;
        .progress{
          height: 10px;
          background-color: #187b33;
          position: absolute;
          top: 0px;
        }
        .bottom{
          width: 100%;
          height: 10px;
          background-color: rgb(174, 179, 175);
        }
        i{
          display: block;
          width: 1px;
          height: 8px;
          background-color: #ffffff;
          position: absolute;
          top: 0px;
          margin: 0px;
        }
      }
      .date{
        color: beige;
        height: 40px;
        border-left: 1px solid #9a9386;
        position: absolute;
        text-align: center;
        padding-top: 15px;
        padding-bottom: 3px;
      }
    }
  }
</style>
