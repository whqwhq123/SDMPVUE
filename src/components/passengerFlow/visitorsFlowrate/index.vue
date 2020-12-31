<template>
  <!--人流量-->
  <div class="chart">
    <div class="time-slot">
      <ul class="time-slot-group">
        <li
          :class="['time-slot-item', index === actIndex ? 'active' : '']"
          v-for="(time, index) in timeList"
          :key="time"
          @click="checkedTime(index)"
        >
          <div class="time-slot-text">{{time}}</div>
        </li>
      </ul>
    </div>
    <div class="chart-desc">
      <div class="chart-type">
        <div class="chart-type-tit">
          <img src="/static/images/icon-type-01.png" alt="">
          <span>{{ actTitText[actIndex].tit[0] }}</span>
        </div>
        <div class="charts-type-val">
            {{ maxVal }}{{actTitText[actIndex].unit[0]}}
        </div>
      </div>
      <div class="chart-type">
        <div class="chart-type-tit">
          <img src="/static/images/icon-type-02.png" alt="">
          <span>{{ actTitText[actIndex].tit[1] }}</span>
        </div>
        <div class="charts-type-val">
          {{ avgVal }}{{actTitText[actIndex].unit[1]}}
        </div>
      </div>
    </div>
    <div class="chart-warp" v-if="!loadingStatus">
      <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="rllInit" ref="rllChart" canvasId="rllCanvas" throttleTouch="true"  />
    </div>
  </div>
</template>

<script>
  const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    // tooltip: {},
    grid: {
      top: 10,
      left: 20,
      right: 20,
      bottom: 40,
      containLabel: true
    },
    animation: false,
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
        end: 50
      }
    ],
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 10,
        color: '#888'
      },
      axisTick: {
        show: false
      },

      data: []
    },
    yAxis: [
      {
        axisLine: {
          show: false
        },
        axisLabel: {
          fontSize: 10,
          inside: true,
          verticalAlign: 'bottom',
          color: '#888',
          formatter:function(val){
            return parseInt(val);
          }
        },
        axisTick: {
          show: false
        },
        minInterval: 1,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E6E6E6'
          }
        },
      }
    ],
    series: {
      name: '保值率',
      symbol: "none",
      data: [],
      type: 'line'
    }
  };
  import {mapActions,mapGetters} from 'vuex'
  import {imageApi} from "../../../http/url";
  export default {
    name: "index",
    props: {
      chartParams: Object,
      loadingStatus: Boolean
    },
    data () {
      return {
        echarts,
        chartStatus: true,
        actIndex: 0,
        paramsCurrentTypes: {
          0: 1,
          1: 2,
          2: 3,
          3: 4,
          4: 5
        },
        timeList: ['今天', '昨天', '上周', '上月', '今年'],
        actTitText: {
          0: {
            tit: ['人群客流高峰区间', '平均停留时长'],
            unit: ['时', '小时']
          },
          1: {
            tit: ['人群客流高峰区间', '平均停留时长'],
            unit: ['时', '小时']
          },
          2: {
            tit: ['最高日', '日均人流'],
            unit: ['日', '人']
          },
          3: {
            tit: ['最高日', '日均人流'],
            unit: ['日', '人']
          },
          4: {
            tit: ['最高月', '日均人流'],
            unit: ['月', '人']
          }
        },
        maxVal: '',
        avgVal: ''
      }
    },
    watch: {
      loadingStatus: function(newVal,oldVal) {
        if (!newVal) {
          this.initChart()
        }
      }
    },
    computed: {
      ...mapGetters({
        "userInfo": "userInfo",
        "areaInfo": "areaInfo"
      })
    },
    components: {
      mpvueEcharts
    },
    mounted () {
      this.pageInit();
    },
    onShow() {
      this.pageInit();
    },
    methods: {
      ...mapActions({
        'getGuestChartData': 'passengerFlow/getGuestChartData'
      }),
      async pageInit () {
        let params = null;
        let p = this.chartParams;
        params = {
          currentType: this.paramsCurrentTypes[this.actIndex],
          ...p
        };
        let res =  await this.getGuestChartData(params);
        let data = [];
        let xData = [];
        if (res.code === 0 ){
          res.data.data.forEach((item)=> {
            if (this.actIndex === 0 || this.actIndex === 1) {
              xData.push(item.hour);
              data.push(item.enterCount);
            }else {
              xData.push(item.time);
              data.push(item.getInCount);
            }
          });
          this.maxVal = res.data.max;
          this.avgVal = res.data.avg;
          option.xAxis.data = xData;
          option.series.data = data;
          this.initChart()
        }

      },
      initChart () {
        this.$nextTick(()=> {
          if (this.$refs.rllChart) {
            this.$refs.rllChart.init()
          }
        })
      },
      rllInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.clear();
        chart.setOption(option,true);
        return chart
      },

      checkedTime (index) {
        this.actIndex = index;
        this.pageInit()
      }
    },
  };
</script>

<style scoped lang="sass">
  .time-slot-group
    display: flex
    background-color: #F5F5F5
    line-height: 98rpx
    padding: 0 40rpx
    .time-slot-item
      flex: 1
      font-size: 26rpx
      color: #aaa
      text-align: center
      &.active
        font-size: 30rpx
        color: #222
        .time-slot-text
          &::after
            display: block
            content: ''
            width: 32rpx
            height: 4rpx
            background-color: #38394F
            margin: 0 auto

  .chart-desc
    display: flex
    padding: 0 40rpx
    .chart-type
      flex: 1
      text-align: center
      margin-bottom: 28rpx
      .chart-type-tit
        font-size: 24rpx
        color: #555
        line-height: 36rpx
        margin-top: 26rpx
        margin-bottom: 10rpx
        span
          vertical-align: middle
        img
          $size: 36rpx
          height: $size
          width: $size
          margin-right: 28rpx
          vertical-align: middle
      .charts-type-val
        color: #222
        font-size: 32rpx
        font-weight: 500
        text-align: center



  .chart-warp
    height: 520rpx
</style>
