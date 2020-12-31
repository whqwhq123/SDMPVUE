<template>
  <!--意向车型-->
  <div class="chart">
    <div class="content-echart-content" v-if="chartStatus">
      <h3><i class="tit-icon"></i><span>意向车型分布</span></h3>
      <div class="purchasing-power"  v-if="modelData">
        <img v-if="imageApi" :src="imageApi + '/power-bg.png'" class="power-bg" >
        <span>
            {{modelData.modelDetail}}
        </span>
      </div>
      <div class="content-bar-echart">
        <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="yxcxInit" ref="yxcxChart" canvasId="yxcxCanvas" throttleTouch="true"  />
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
    // color: ['#6E7275', '#AAAAAA', '#38394F', '#7F6154', '#ECA51B', '#FF443F'],
    color: [ '#FF443F', '#ECA51B','#7F6154',  '#38394F', '#AAAAAA', '#6E7275'],
    // tooltip: {
    //   trigger: 'item',
    //   formatter: "{a} <br/>{b}: {c} ({d}%)"
    // },
    legend: {
      x: 'left',
      y: 'bottom',
      orient: 'vertical',
      data:[]
    },
    label: {
      normal: {
        show: true,
        fontSize: 14
      },
      color: '#222',
      emphasis: {
        show: true
      },
      // formatter: "{d}%"
      formatter: (obj) => {
        if (obj.seriesName === '意向车型') {
          return obj.percent + '%'
        } else {
          return ''
        }
      }
    },
    series: [
      {
        name: "意向车型",
        type: "pie",
        radius: ["30%", "55%"],
        center: ["50%", "40%"],
        // avoidLabelOverlap: false,

        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: []
      },
      {
        name:'11',
        type:'pie',
        radius: ['0', '30%'],
        center: ["50%", "40%"],
        itemStyle: {
          color: '#fff'
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#222'
            },
            position: 'center'
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#222',
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        silent: true,
        animation: false,
        data: [{
          name: '',
          value: '0'
        }]
      }
    ]
  };
  import {mapActions} from 'vuex'
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
        'getUserCarType': 'portrait/getUserCarType'
      }),
      async pageInit () {
        let res =  await this.getUserCarType(this.chartParams);
        if (res.code === 0 ){
          this.modelData = res.data.StrategyModel;
          let data = [];
          let legendData = []
          res.data.statistics.forEach((item) => {
            data.push({
              value: item.number,
              name: item.car_type
            });
            legendData.push({
              icon: 'circle',
              name: item.car_type
            })
          });
          option.series[0].data = data;
          option.legend.data = legendData;
        }
        if (res.code === 1 ) {
          this.chartStatus = false;
          return
        }
        if (res.code === 2 ) {
          this.chartStatus = false;
          return
        }
        this.initChart()
      },
      initChart () {
        this.$refs.yxcxChart.init()
      },
      yxcxInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        return chart
      }
    }
  };
</script>

<style scoped lang="sass">
  @import "../../../assets/portraitCharts/index"
  .content-echart-content
    .content-bar-echart
      height: 824rpx
</style>
