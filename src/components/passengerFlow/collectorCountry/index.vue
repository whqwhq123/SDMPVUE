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
      <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="jkbInit" :ref="'areaChart' + chartType" :canvasId="'areaCanvas' + chartType" throttleTouch="true"  />
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
      top: 10,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true
    },
    animation: false,
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLabel: {
        color: '#888'
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false,
      },
      data: []
      // data: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年']
    },
    yAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: "#eee"
        }
      },
      axisLabel: {
        interval: 0,
        fontSize: 12,
        color: '#222',
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false,
      }
    },
    series: {
      name: '集客比',
      emphasis: {
        itemStyle: {
          color: '#FF443F'
        }
      },
      label: {
        show: true,
        position: 'insideRight',
        textStyle: {
          color: '#fff',
          fontSize: 10
        },
        // formatter: '{c}人'
        formatter: (obj) => {
          if (obj.value > 0) {
            return obj.value + '人'
          } else{
            return ''
          }
        }
      },
      barWidth: 18,
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
          this.initChart();
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
        if (this.chartType == 'all') {
          await this.getWholeCountry();
        }
      },
      async getWholeCountry () {
        let p = this.chartParams;
        let params = {
          currentType: this.paramsCurrentTypes[this.actIndex],
          ...p
        };
        let res = await this.getRegionalPassengerFlow(params);
        if (res.code === 0) {
          option.yAxis.data = [ '平均','本店'];
          option.series.data = [ res.data.avg2,res.data.local];
        }else {
          option.yAxis.data = [ '平均','本店'];
          option.series.data = [ res.data.avg2,res.data.local];
        }
        this.initChart()
      },
      initChart () {
        this.$nextTick(()=> {
          if (this.$refs['areaChart' + this.chartType]) {
            this.$refs['areaChart' + this.chartType].init()
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
    height: 300rpx
</style>
