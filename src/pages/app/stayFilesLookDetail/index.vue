<template>
  <section class="sale_page">
    <date-pick></date-pick>
    <div class="sale_title">
      <span class="sale_sign"></span>
      <span class="sale_sign_text">留资概况</span>
    </div>
    <div class="sale_status" style="margin-top:38rpx;">

      <statistics  :statistics="saleData"></statistics>

    </div>

    <div class="sale_line">
      <div class="dividing_line"></div>
    </div>
    <div class="sale_title">
       <span class="sale_sign"></span>
      <span class="sale_sign_text">留资趋势图</span>
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



    <loading-view :loadingStatus="loadingStatus"></loading-view>
  </section>
</template>
<script>
const echarts = require('../../../../static/js/echarts.min.js');

import mpvueEcharts from 'mpvue-echarts'
import { mapGetters, mapMutations } from 'vuex'
import loadingView from '../../../components/loading/loading'
import Statistics from '../salePerformance/statistics'
import datePick from '../datePick/index'
import {fenxiang} from "../../../utils";
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
      name: '留资数量',
      type: 'line',
      stack: '总量',
      data: [40000, 30000, 20000, 10000, 0, 50000]
    }
  ]
};

export default {
  name: 'stayFiles',
  components: {
    mpvueEcharts,
    loadingView,
    datePick,
    Statistics
  },
  data() {
    return {
      echarts,
      loadingStatus: false,
      loadingStatus: false,
      saleData: {
        type: ['入店客户数','留资数量','留资率'],
        deal: '--',
        total: '--'
        // totalLeavelCount: '--', // 留资总数
        // totalCount: '--' // 进店总数
      },
      listData: [],
     foursID: ''
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'dateTime': 'dateTime'
    }),
    params() {
      let { userId, roleCode,targetType } = this.userInfo
      return {
        userId: userId,
        roleCode: roleCode,
        foursId: this.foursID
      }
    }
  },
  onLoad(option) {
    this.foursID = option.foursId
  },
  onShow(){
    this.stayFileStatus()
    this.getEchartsData()
  },
  onHide(){},
  mounted() { },
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
    stayFileStatus(times) {
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: startTime, end: endTime } = times;
      let params = Object.assign(this.params, { startTime: startTime, endTime: endTime });

      this.$post('liuzi/getLeaveInformationData', params).then(res => {
        let { code, data } = res;

        if (code === 0) {
          let totalLeavelCount = data.totalLeavelCount

           this.saleData.deal = totalLeavelCount
          this.saleData.total = data.totalCount

          data.leaveInfos.forEach(item => {
            item['proportion'] = this.getPercent(item.leaveCount, totalLeavelCount)
          })

              this.listData = data.leaveInfos // table
        }
      })
    },

    getEchartsData(times) {
      times ? times : (times = this.dateTime)
      // 时间选择器
      let { start: startTime, end: endTime } = times
      let params = Object.assign(this.params, { startTime: startTime, endTime: endTime })

      this.loadingStatus = true;
      this.$post('liuzi/getLeaveDataNowMonth', params).then(res => {
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

    initChart() {
      this.$refs.echarts.init()
    },
    handleInit(canvas, width, height) {
      let that = this;
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      // console.log(option)
      chart.setOption(option);

      return chart
    },

    //  求百分比
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "--";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
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
  .sale_status,
  .sale_line,
  .sales_volume_chart,
  .sale_table {
    padding: 0 32rpx;
  }
  .sale_status {
    margin-top: 38rpx;
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

  .sale_status_content {
    // height: 180rpx;
    display: flex;
    justify-content: space-around;
    color: #ffffff;
    background-color: #38394f;
    // padding: 36rpx 80rpx 32rpx 80rpx;
    padding: 36rpx 0 32rpx 0;
    border-radius: 28rpx;
    box-sizing: border-box;
    .sale_num {
      font-size: 70rpx;
      text-align: center;
    }
    .sale_text {
      margin-top: 10rpx;
      font-size: 24rpx;
      text-align: center;
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
    width: 25%;
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
    width: 25%;
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
