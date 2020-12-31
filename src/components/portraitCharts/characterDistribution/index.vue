<template>
  <!--性格分布-->
  <div class="chart">
    <div class="content-echart-content" v-if="chartStatus">
      <h3><i class="tit-icon"></i><span>性格分布</span></h3>
      <div class="purchasing-power" v-if="modelData">
        <img v-if="imageApi" :src="imageApi + '/power-bg.png'" class="power-bg" >
        <span  >{{ modelData.modelDetail}}</span>
      </div>
      <div class="content-bar-echart">
        <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="xgfbInit" ref="xgfbChart" canvasId="xgfbCanvas" throttleTouch="true"  />
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
    // color: ['#6D7174', '#222222','#F9A001','#811B0F','#38394F','#4A4A5D','#C52500','#38394F','#FF443F'],
    color: [ '#FF443F', '#38394F','#C52500','#4A4A5D','#38394F','#811B0F','#F9A001','#222222','#6D7174'],
    // tooltip: {
    //   trigger: 'item',
    //   formatter: "{b} : {c} ({d}%)"
    // },
    calculable: true,
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
        if (obj.seriesName === '性格分布') {
          return obj.name + '\n' +obj.percent + '%'
        } else {
          return ''
        }
      }
    },
    series: [
      {
        name: '性格分布',
        type: 'pie',
        radius: ['30%', '75%'],
        center: ['50%', '55%'],
        roseType: 'radius',

        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          },
        },
        data: [
        ]
      }, {
        name:'11',
        type:'pie',
        radius: ['0', '30%'],
        center: ['50%', '55%'],
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
        'getUserCharacter': 'portrait/getUserCharacter'
      }),
      async pageInit () {
        let res =  await this.getUserCharacter(this.chartParams);
        if (res.code === 0 ){
          this.modelData = res.data.StrategyModel;
          let data = res.data.statistics.map((item) => {
            return {
              value: item.number,
              name: item.userCharacter
            }
          });
          option.series[0].data = data;
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
        this.$refs.xgfbChart.init()
      },
      xgfbInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        return chart
      }
    },

  };
</script>

<style scoped lang="sass">
  @import "../../../assets/portraitCharts/index"
</style>
