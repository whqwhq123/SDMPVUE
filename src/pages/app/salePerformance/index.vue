<template>
  <section class="sale_page">
    <date-pick></date-pick>
    <div class="sale_title">
      <span class="sale_sign"></span>
      <span class="sale_sign_text">销售概况</span>
    </div>
    <div class="sale_status" style="margin-top:38rpx;">
      <statistics  :statistics="saleData"></statistics>
    </div>

    <!-- <div class="sale_set_todos">
      <img class="sale_set_icon" src="/static/images/icon-tip.png" alt>
      <span class="no_set">
        本月尚未设定任务
        <span class="to_set">去设定&nbsp;&nbsp;></span>
      </span>
    </div>-->
    <div class="sale_line">
      <div class="dividing_line"></div>
    </div>
    <div class="sale_title">
      <span class="sale_sign"></span>
      <span class="sale_sign_text">销售量趋势图</span>
    </div>
    <div class="sales_volume_chart">
      <div class="chart_wrap">
        <mpvue-echarts
          lazyLoad
          :echarts="echarts"
          :onInit="handleInit"
          ref="echarts"
          canvasId="demo-canvas"
          throttleTouch="true"
        />
      </div>
    </div>
    <div class="sale_line">
      <div class="dividing_line"></div>
    </div>
    <view v-if="!isGroup">
        <!-- 销售总监&店总 -->

    <div class="sale_title">
      <span class="sale_sign"></span>
      <span class="sale_sign_text">业绩排行榜</span>
    </div>
    <div class="sale_table">
      <view class="table">
        <view class="tr bg-w">
          <view class="th">排行</view>
          <view class="th">姓名</view>
          <view class="th">销售数量</view>
          <view class="th">占比</view>
          <view class="th">客群画像</view>
        </view>
        <block v-for="(item, index) in listData" :key="index">
          <view class="tr" v-if="index % 2 == 0">
            <view
              class="td"
              :class="{'first': index ==0, 'second': index==1|| index ==2}"
            >{{index+1}}</view>
            <view class="td">{{item.userName}}</view>
            <view class="td">{{item.count}}</view>
            <view class="td">{{item.precent}}</view>
            <view class="td look_btn" @tap="lookDetail(item)">{{item.text}}</view>
          </view>
          <view class="tr bg-g" wx:else>
            <view
              class="td"
              :class="{'first': index ==0, 'second': index==1 || index ==2}"
            >{{index+1}}</view>
            <view class="td">{{item.userName}}</view>
            <view class="td">{{item.count}}</view>
            <view class="td">{{item.precent}}</view>
            <view class="td look_btn" @tap="lookDetail(item)">{{item.text}}</view>
          </view>
        </block>

        <view v-if="listData.length===0" class="not_data">
          暂无业绩数据！
        </view>
      </view>
    </div>
    </view>

    <!-- 集团销售业绩-->
    <group-table v-if="isGroup" :groupTable="groupTable"></group-table>
    <loading-view :loadingStatus="loadingStatus"></loading-view>
  </section>
</template>

<script>
const echarts = require('../../../../static/js/echarts.min.js');

import {fenxiang} from "../../../utils";
import mpvueEcharts from 'mpvue-echarts'
import { mapGetters, mapMutations } from 'vuex'
import loadingView from '../../../components/loading/loading'
import datePick from '../datePick/index'
import GroupTable from './groupTable'
import Statistics from './statistics'
let chart = null;
var option = {
  tooltip: {
    trigger: 'axis',
    position: function(point, params, dom, rect, size){ // point: 鼠标位置
      var tipWidth = point[0] + size.contentSize[0]; // contentSize: 提示dom 窗口大小
      if(tipWidth > size.viewSize[0] ){              // viewSize: echarts 容器大小
        return [size.viewSize[0] - size.contentSize[0], point[1] ];
      } else if(point[0] < size.contentSize[0]){
        return [ size.contentSize[0]/2, point[1]];
      } else {
        return point;
      }
    },
    formatter: '{b0} : {c0}'
  },
  toolbox:{
    show: false
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    boundaryGap: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#444444'
      },
    },

    data: ['20190607', '20190614', '20190621', '20190628']

  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#888'
      },
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
      inside: true,


    },

    axisLabel: {
      inside: true,
      verticalAlign: 'bottom'
    },
    minInterval: 1

  },
  lineStyle: {
    color: '#D75335'
  },
  dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
        backgroundColor: '#EEEEEE',
        fillerColor: '#C4C4D2',
        handleStyle: {
          color: 'rgba(56,57,79,0.6)'
        },
        height: 20,
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '120%',
        start: 0,
        end: 100
      }
    ],
  series: [
    {
      name: '销量',
      type: 'line',
      stack: '总量',
      data: [40000, 30000, 20000, 10000, 0, 50000]

    }
  ]
};


export default {
  components: {
    mpvueEcharts,
    loadingView,
    datePick,
    GroupTable,
    Statistics
  },
  data() {
    return {
      echarts,
      loadingStatus: false,
      saleData: {
        type: ['接待客户数','成交数量','成交率'],
        deal: '--',
        total: '--'
      },
      listData: [],
      groupTable: {
        time: {},
        type: 'xsyj',
        title: '业绩排行榜TOP5',
        header: ['排行', '经销商', '成交数量', '占比', '详情'],
        body: []
      }
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'dateTime': 'dateTime'
    }),
    params() {
      let { userId, roleCode,targetType } = this.userInfo
      let foursId = ''
      if(targetType ==='A' || targetType==='M') { // 集团

      } else {
         foursId =this.userInfo.foursId
      }
      return {
        userId: userId,
        roleCode: roleCode,
        foursId: foursId,
      }
    },
    //  是否是集团
    isGroup(){
       let { userId, roleCode,targetType } = this.userInfo
        let foursId = ''
        if(targetType ==='A' || targetType==='M') { // 集团
          return true
        } else {
          return false
        }
    }

  },
  mounted () {
    this.initAllData()
  },
  onShow(){
    this.initAllData()
  },
  onHide(){},
  onLoad(op) {
    wx.setNavigationBarTitle({
      title: op.serviceName
    })


  },
  onUnload() {
    this.changeTime(null)
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  methods: {
    ...mapMutations({
      changeTime: 'changeTime'
    }),
    // 判断是不是及集团
    initAllData(){
      if(this.isGroup) { // 集团
         this.getAllFoursInfo() // 获取经销商
      } else {
        this.saleStatus()
        this.getSaleTable()
        this.getEchartsData()
      }
    },
    saleStatus(times) {
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: beginTime, end: endTime } = times
      let params = Object.assign(this.params, { beginTime: beginTime, endTime: endTime })
      this.$get(`userQuery/userQueryCount/${params.userId}`, params).then(res => {
        let { code, data } = res

        if (code === 0) {
          this.saleData.deal = data.deal
          this.saleData.total = data.total
        }
      })

    },
    getSaleTable(times) {
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: beginTime, end: endTime } = times
      let params = Object.assign(this.params, { beginTime: beginTime, endTime: endTime })
      this.$get(`userQuery/rankingList/${params.userId}`, params).then(res => {
        const { code, data } = res
        if (code === 0) {
          let total = data.total
          let precent = null

          let res = data.rankingList.map(item => {

            precent = this.getPercent(item.count, total)

            return Object.assign(item, {
              precent: precent,
              text: '查看'
            })
          });
          this.listData = res
        }
      })
    },
    lookDetail(row) {
      wx.navigateTo({
        url: `/pages/app/portrait/main?type=&userId=${row.userId}&serviceName=客群画像`
      })
    },
    initChart() {
      this.$nextTick(() => {
        if (this.$refs.echarts) {
          this.$refs.echarts.init()
        }
      })
    },
    handleInit(canvas, width, height) {
      let that = this;
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(option);

      return chart
    },
    getEchartsData(times) {
      this.loadingStatus = true
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: beginTime, end: endTime } = times
      let params = Object.assign(this.params, { beginTime: beginTime, endTime: endTime })

      this.$get(`userQuery/userCountByDayTime/${params.userId}`, params).then(res => {
        const { code, data } = res
        if (code === 0) {
          option.xAxis.data = data.time
          option.series[0].data = data.count

          this.initChart();
        }
        this.loadingStatus = false

      }).catch(() => {
        this.loadingStatus = false
      })

    },
    /**
     *  获取集团数据
     */
    // 获取经销商
    getAllFoursInfo(){
      let {manuId, areaId, type} = this.userInfo
      let params = {
        manuId :manuId,
        areaId: areaId,
        type: type
      }
      this.$post('/fsi/getAllFoursInfo', params).then(res=>{
        const {code, data} = res
        if(code===0) {
          this.getPerformanceBase(null,data)
          this.getPerformanceList(null,data)
          // this.saleStatus(null, data)
          // this.getSaleTable(null, data)
          // this.getEchartsData(null, data)
        }
      })
    },
    // 获取集团
    getPerformanceBase(times, area){
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: startTime, end: endTime } = times
      let params = {
        dateType: 3, // 时间类型 1 本月 2本年 3自定义
        redisIds: area,
        startTime: startTime,
        endTime: endTime
      };
      this.$post('/salesPerformance/getPerformanceBaseByRedisIds', params).then(res=>{
        const {code, data} = res
        if(code===0) {
          this.saleData.deal = data.successCount
          this.saleData.total = data.allTotal
          // 图表
          let time = [], count= [];
          data.trend.forEach(item=>{
            time.push(item.dateStr)
            count.push(item.value)
          })

           option.xAxis.data = time
            option.series[0].data = count
            this.initChart();
        }
      })
    },
    // 集团 业绩排行榜 top5
    getPerformanceList(times, area){
        times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: startTime, end: endTime } = times
      let params = {
        manuId: this.userInfo.manuId,
        dateType: 3, // 时间类型 1 本月 2本年 3自定义
        redisIds: area,
        startTime: startTime,
        endTime: endTime,
        pageNo: 1,
        pageSize: 5
      };
      this.$post('/salesPerformance/getPerformanceListByRedisIds', params).then(res=>{
        const {code, data} = res
        if(code===0) {

          data.recordList.forEach(item => {
            item['percent'] = this.floatToPercent(item.percent)
          })

          this.groupTable.time = this.dateTime
          this.groupTable.body =data.recordList
        }
      })
    },
    //  求百分比
    getPercent(num, total) {

      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "--";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
    },
    floatToPercent(num){
        var percent=Number(num*100).toFixed(2)+"%";
        return percent;
    }
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>

<style lang="scss" scoped>
.sale_page {
  .sale_title,

  .sale_line,
  .sales_volume_chart,
  .sale_table {
    padding: 0 32rpx;
  }
  .sale_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40rpx;
    .sale_sign {
      margin-right: 20rpx;
      width: 8rpx;
      height: 32rpx;
      background: rgba(255, 68, 63, 1);
      border-radius: 4rpx;
    }
    .sale_sign_text {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
    }
  }



  .sale_set_todos {
    margin-top: 32rpx;
    height: 60rpx;
    line-height: 60rpx;
    background-color: #fff6e6;
    // padding: 18rpx 40rpx 14rpx 40rpx;
    padding: 0 40rpx;
    font-size: 26rpx;
    box-sizing: border-box;
    .sale_set_icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 10rpx;
    }
    .no_set {
      color: #555;
      font-weight: bold;
    }
    .to_set {
      color: #ff443f;
      margin-left: 12rpx;
    }
  }

  .dividing_line {
    height: 20rpx;
    background-color: rgba(245, 245, 245, 1);
    margin-top: 48rpx;
  }

  .sales_volume_chart {
    .chart_wrap {
      height: 500rpx;
    }
  }
}
</style>

<style lang="scss" scoped>
.sale_table {
  margin-top: 26rpx;
  .table {
    border: 0px solid darkgray;
    .not_data {
      height:100rpx;width:100%;background:#F5F5F5;color:#222222;font-size:24rpx;text-align:center;line-height:100rpx;
    }
  }
  .tr {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100rpx;
    align-items: center;
    font-size: 24rpx;
    .first {
      color: #d75335;
    }
    .second {
      color: #eca51b;
    }
    .look_btn {
      color: #ff443f;
    }
  }
  .td {
    width: 20%;
    justify-content: center;
    text-align: center;
    color: #444444;
  }
  .bg-w {
    background: snow;
  }
  .bg-g {
    background: #f5f5f5;
  }
  .th {
    width: 20%;
    justify-content: center;
    background: #38394f;
    color: #fff;
    display: flex;
    height: 88rpx;
    align-items: center;
    font-size: 24rpx;
  }
}
</style>


