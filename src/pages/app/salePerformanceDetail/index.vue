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
          ref="xslecharts"
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
import datePick from '../datePick/index'
 import {fenxiang} from "../../../utils";
 import Statistics from '../salePerformance/statistics'
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
      foursID: '',
      listData: []
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'dateTime': 'dateTime'
    }),
    percents() {
      let { deal, total } = this.saleData
      let res = this.getPercent(deal, total)
      return  res
    }
  },

   onShow(){
    this.saleStatus()
  },
  onHide(){},
  onLoad(option) {
    this.foursID = option.foursId
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
    saleStatus() {
       let params = {
        foursId: this.foursID,
        dateType: 3,
        startTime:this.dateTime.start,
        endTime: this.dateTime.end
      }
      this.loadingStatus = true
      this.$post('salesPerformance/getPerformanceBaseByFourIds', params).then(res => {
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
         this.loadingStatus = false
      })
    },
    initChart() {
      this.$refs.xslecharts.init()
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
    //  求百分比
    getPercent(num, total) {

      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "--";
      }
      return total <= 0 ? "0" : (Math.round(num / total * 10000) / 100.00);
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
