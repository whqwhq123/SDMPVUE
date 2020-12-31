<template>
  <!--购车意愿-->
  <div class="chart">
    <div class="content-echart-content" v-if="chartStatus">
      <h3><i class="tit-icon"></i><span>购车意愿度</span></h3>
      <div class="purchasing-power" v-if="modelData">
        <img v-if="imageApi" :src="imageApi + '/power-bg.png'" class="power-bg">
        <span >
          {{modelData.modelDetail}}
        </span>
      </div>
      <div class="content-bar-echart">
          <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="gcyyInit" ref="gcyyChart" canvasId="gcyyCanvas" throttleTouch="true"  />
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
   //  color: ['#6E7275', '#38394F', '#ECA51B', '#FF443F'],
    color: [ '#FF443F', '#ECA51B', '#38394F', '#6E7275'],
    // tooltip: {
    //   trigger: 'item',
    //   formatter: "{a}{b}: {c} ({d}%)"
    // },
    legend: {
      x: 'left',
      y: 'bottom',
      data:[]
    },
    label: {
      normal: {
        show: true,
        fontSize: 10
      },
      emphasis: {
        show: true
      },
      // formatter: '{b}\n{d}%'
      formatter: (obj) => {
        if (obj.seriesName === '购车意愿') {
          return obj.name + '\n' +obj.percent + '%'
        } else {
          return ''
        }
      }
    },
    series: [
      {
        name:'购车意愿',
        type:'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          },
        },
        data:[

        ]
      },
      {
        name:'11',
        type:'pie',
        radius: ['0', '40%'],
        center: ['50%', '45%'],
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
  import {imageApi} from "../../../http/url";

  export default {
    name: "index",
    props: {
      chartParams: Object
    },
    data () {
      return {
        echarts,
        imageApi,
        modelData: null,
        chartStatus: true
      }
    },
    // watch: {
    //   'chartParams':{
    //     handler: function (newVal) {
    //       console.log('新值', newVal);
    //       this.pageInit()
    //     },
    //     deep: true
    //   }
    // },
    components: {
      mpvueEcharts
    },
    mounted () {
     this.pageInit()
      console.log('组件创建了：');
    },
    methods: {
      ...mapActions({
        'getUserTradeIntention': 'portrait/getUserTradeIntention'
      }),
      async pageInit () {
        let res =  await this.getUserTradeIntention(this.chartParams);
        if (res.code === 0 ){
          this.modelData = res.data.StrategyModel;
          let data = [];
          let legend = [];
          res.data.statistics.forEach((item) => {
            data.push({
              value: item.number,
              name: item.trade_intention
            });
            legend.push({
              icon: 'circle',
              name: item.trade_intention,
            },)
          });
          option.series[0].data = data;
          option.legend.data = legend;
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
        this.$nextTick(()=> {
          this.$refs.gcyyChart.init()
        })
      },
      gcyyInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        return chart
      }
    },
    // onShow () {
    //   this.pageInit()
    // }
  };
</script>

<style scoped lang="sass">
  @import "../../../assets/portraitCharts/index"
  .content-echart-content
    .content-bar-echart
      height: 612rpx
</style>
