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
      <!-- <div class="top-line">
        <div class="progress" :style="{width: progress * unitLen + '%'}"></div>
        <div v-if="isVli">
          <i v-for="item in dateList" :key="item.no" :style="{left:item.offset + '%'}"></i>
        </div>
        <div class="bottom"></div>
      </div> -->
      <!-- 日期 -->
        <div class="date-item" v-for="(item, index) in dateList" :key="item.no">
          <div class="top-line" :class="{active: item.old}" @click="setProgressHandle(index)"></div>
          <div class="date-label" @click="setProgressHandle(index)">{{item.date}}</div>
        </div>
      </div>
    </div>
</template>
<script>
import moment from 'moment'
import mapUtil from '../utils/mapUtil'
const covidDataUtil = mapUtil.covidDataUtil
export default {
  data () {
    return {
      dateList: [], // 每月的日期列表
      isVli: false, // 是否显示日期
      isPlay: true, // 播放/停止
      player: null, // 播放定时器
      curMonth: undefined, // 当前月
      curMonthStr: undefined, // 当前月(string),
      isLatest: false, // 最进
      progress: 0,
      curDate: this.startDate
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
    },
    progress (newVal) {
      this.dateList.forEach((date, index) => {
        if (index > newVal) {
          date.old = false
        }
      })
    }
  },
  mounted () {

  },
  methods: {
    initDates (startDate) {
      this.curMonth = moment(startDate)
      var length = moment(startDate).daysInMonth()
      var num = moment(startDate).get('date')
      const countInCurMonth = length - num + 1
      this.dateList = []
      for (let i = 0; i < countInCurMonth; i++) {
        this.dateList.push({
          no: i + 1,
          date: `${num + i}日`,
          old: false
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

        if (moment(self.curDate).get('month') !== moment(self.curMonth).get('month')) {
          self.updateMonth(self.curDate)
          self.progress = 0
          return
        }

        if (moment(self.curDate).diff(moment(), 'days') >= 0) {
          self.isLatest = true
          return
        }

        if (self.dateList.length > 0) {
          self.dateList[self.progress].old = true
          self.$emit('changeDate', self.curDate)
          self.progress += self.speed
          self.curDate = moment(self.curDate).add(self.speed, 'day').format(covidDataUtil.dateFormat)
        }
      }, 1000)
    },
    stopPlay () {
      window.clearInterval(this.player)
      this.player = null
    },
    reset () {
      var startDate = covidDataUtil.covidDefaultStartTime
      this.$emit('changeDate', startDate)
      this.initDates(startDate)
      this.curMonth = moment(startDate)
      this.isPlay = true
      this.isLatest = false
    },
    updateMonth (date) {
      this.curMonth = moment(date)
      this.initDates(date)
    },
    setProgressHandle (index) {
      this.progress = index
    }
  }
}
</script>
<style lang="less">
  .time-line-warp{
    height: 60px;
    .left{
      width: 6%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .start-btn{
        left: 15px;
        top: -15px;
        position: absolute;
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
            cursor: pointer;
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
            cursor: pointer;
          }
        }
      }
      .month{
        left: 0px;
        position: relative;
      }
    }
    .time-line-main{
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      flex-grow: 1;
      .date-item{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .top-line{
          height: 20px;
          border-left: 1px solid #fff;
          background: #aeb3af;
          height: 10px;
        }
        .active{
          background: #187b33;
        }
        .date-label{
          flex-grow: 1;
          border-left: 1px solid #9a9386;
        }
      }
    }
  }
</style>
