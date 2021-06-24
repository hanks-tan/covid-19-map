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
        <div class="date-item" v-for="item in dateList" :key=item.no>
          <div class="top-line" :class="{active: item.old}"></div>
          <div class="date-label">{{item.date}}</div>
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
      curMonth: undefined, // 当前月
      curMonthStr: undefined, // 当前月(string),
      isLatest: false, // 最进
      progress: 0
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
      var length = moment(startDate).daysInMonth()
      this.dateList = []
      for (let i = 0; i < length; i++) {
        this.dateList.push({
          no: i + 1,
          date: `${i + 1}日`,
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
        if (self.dateList.length > 1) {
          var nextDate = moment(self.startDate).add(self.speed, 'days').format(mapUtil.dateFormat)
          self.dateList[self.progress].old = true
          self.progress += 1
          if (moment(nextDate).diff(moment(self.curMonth), 'months') >= 1) {
            self.updateMonth(nextDate)
            self.progress = 0
          }

          if (moment(nextDate).diff(moment(), 'days') >= 0) {
            nextDate = moment().format(mapUtil.dateFormat)
            self.isLatest = true
          }
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
