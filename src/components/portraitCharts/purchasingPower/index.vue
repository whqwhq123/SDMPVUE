<template>
  <!--购买力分布-->
  <div class="chart"  >
    <div class="content-echart-content" v-if="chartStatus">
      <h3><i class="tit-icon"></i><span>购买力分布</span></h3>
      <div class="purchasing-power" v-if="modelData">
        <img v-if="imageApi" :src="imageApi + '/power-bg.png'" class="power-bg" >
        <span>{{ modelData.modelDetail}}</span>
      </div>
      <div class="content-bar-echart">
        <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="gmlInit" ref="gmlChart" canvasId="gmlCanvas" throttleTouch="true"  />
      </div>
      <div class="line-group">
        <div class="line-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
  const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    grid: {
      top: '20',
      left: '10',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [1, 2, 3],
        axisLabel: {
          interval: 0,

        },
        axisLine: {
          lineStyle: {
            color: '#9097A7'
          }
        }
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        interval: 10,
        axisLabel: {
          formatter: '{value}%',
          verticalAlign: 'bottom'
        },
        splitLine: false,
        axisLine: {
          lineStyle: {
            color: '#9097A7'
          }
        },
      }
    ],
    series: {
      name: '分段人数',
      type: 'bar',
      barWidth: '28',
      data: [10, 20, 30],
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#222',
          fontSize: 10
        },
        formatter: '{c}%'
      },
      // echarts各个柱形颜色不同
      itemStyle: {
        normal: {
          color: function(params) {
            var colorList = ['#6E7275', '#C5A9A8', '#CF8583', '#E55C58', '#FF443F'];
            return colorList[params.dataIndex]
          }
        }
      }
    }
  };
  import {mapActions} from 'vuex'
  import {imageApi} from "../../../http/url";

  export default {
    name: "index",
    props: {
      chartParams: Object
    },
    data () {
      return {
        echarts,
        modelData: null,
        chartStatus: true
      }
    },
    // watch: {
    //   'chartParams': function (newVal) {
    //     this.pageInit()
    //   }
    // },
    components: {
      mpvueEcharts
    },
    mounted () {
      this.pageInit()
    },
    methods: {
      ...mapActions({
        'getUserPurchasingPower': 'portrait/getUserPurchasingPower'
      }),
      async pageInit () {
        let res =  await this.getUserPurchasingPower(this.chartParams);
        if (res.code === 0 ){
          this.modelData = res.data.StrategyModel;
          let data = [];
          let xData = [];
          let sum = 0;
          res.data.statistics.forEach((item) => {
            sum += item.number
          });
          res.data.statistics.forEach((item) => {
            data.push(Math.round(item.number/sum*10000)/100);
            xData.push(item.buy)
          });

          option.series.data = data;
          option.xAxis.data = xData;
          this.initChart()
        }
        if (res.code === 1 ) {
          this.chartStatus = false;
          return
        }
        if (res.code === 2 ) {
          console.log('购买力分布数据错误');
          this.chartStatus = false;
          return
        }
      },
      initChart () {
        this.$refs.gmlChart.init()
      },
      gmlInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        return chart
      }
    },
    destroyed () {
      console.log('组件销毁')
    }
  };
</script>

<style scoped lang="sass">
  @import "../../../assets/portraitCharts/index"
</style>
