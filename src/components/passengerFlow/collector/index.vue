<template>
  <!--集客比-->
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
    <div class="chart-warp" v-if="chartType && !loadingStatus">
      <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="jkbInit" :ref="'jkbChart' + chartType" :canvasId="'jkbCanvas' + chartType" throttleTouch="true"  />
    </div>
  </div>
</template>

<script>
  const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    // tooltip: {},
    color: ['#FF7B78'],
    grid: {
      top: 20,
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
      // data: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年']
    },
    yAxis: [
      {
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
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
          inside: true
        },
        splitLine: {
          show: false,
        }
      }
    ],
    series: {
      name: '集客比',
      emphasis: {
        itemStyle: {
          color: '#FF443F'
        }
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#222',
          fontSize: 10
        },
        formatter: '{c}人'
      },
      barWidth: 30,
      data: [],
      // data: [10,20,30,40,50,60,70,80,90],
      type: 'bar'
    }
  };
  import {mapActions,mapGetters} from 'vuex'
  import {imageApi} from "../../../http/url";
  import {notice} from "../../../utils/notice";

  export default {
    name: "index",
    props: {
      chartParams: Object,
      chartType: String,
      loadingStatus: Boolean
    },
    data () {
      return {
        echarts,
        chartStatus: true,
        actIndex: 0,
        timeList: ['今天', '本周', '本月', '本年'],
        barWidths: {
          0: 30,
          1: 18,
          2: 30,
          3: 30
        },

        paramsCurrentTypes: {
          0: 1,
          1: 6,
          2: 7,
          3: 5
        }
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
    onShow () {
      this.pageInit();
    },
    methods: {
      ...mapActions({
        'getGuestChartData': 'passengerFlow/getGuestChartData',
        'getRegionalPassengerFlow': 'passengerFlow/getRegionalPassengerFlow'
      }),
      async pageInit () {
        if (this.chartType == '1') {
          await this.getAllCollector();
        }
      },
      async getAllCollector () {
        let params = null;
        let p = this.chartParams;
        if (this.actIndex === 0) {
          await this.getAllToDay();
        } else {
          params = {
            currentType: this.paramsCurrentTypes[this.actIndex],
            ...p
          };
          await this.getAllOtherTime(params)
        }
        option.series.barWidth = this.barWidths[this.actIndex];
        this.initChart()
      },
      async getAllToDay ()   {
        let params = null;
        let params2 = null;
        let data = [];
        let xData = [ '昨天', '今天'];
        let p = this.chartParams;
        params = {
          currentType: 1,
          ...p
        };
        params2 = {
          currentType: 2,
          ...p
        };
        let res2 =  await this.getGuestChartData(params2);
        if (res2.code === 0 ){
          data.push(res2.data.count);
        } else  {
          notice({title: res.errMsg, icon: 'none', duration: 1000})
        }
        let res1 =  await this.getGuestChartData(params);
        if (res1.code === 0 ){
          data.push(res1.data.count);
        } else {
          notice({title: res.errMsg, icon: 'none', duration: 1000})
        }
        option.xAxis.data = xData;
        option.series.data = data;

      },
      async getAllOtherTime (params) {
        let res =  await this.getGuestChartData(params);
        let data = [];
        let xData = [];
        if (res.code === 0 ){
          res.data.data.forEach((item)=> {
            data.push(item.getInCount);
            xData.push(item.time)
          });
          option.xAxis.data = xData;
          option.series.data = data;
        }
      },

      initChart () {
        this.$nextTick(()=> {
          if ( this.$refs['jkbChart' + this.chartType]) {
            this.$refs['jkbChart' + this.chartType].init()
          }
        })
      },
      jkbInit (canvas, width, height) {
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
        this.pageInit();
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

  .chart-warp
    margin-top: 40rpx
    height: 520rpx
</style>
