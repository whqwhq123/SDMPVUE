<template>
  <div class="defeatedFactor-echart-wrap">
      <div class="application-content">
        <span>{{factorEchartTxt}}</span>
      </div>
      <div class="defeatedFactor-child-echart" v-if="isShowEchart">
        <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="gcyyInit" ref="gcyyChart" canvasId="gcyyCanvas" throttleTouch="true"/>
        <!--<div class="flex">-->
         <!--<div> 战败</div>-->
          <!--<div>关键因素</div>-->
        <!--</div>-->
      </div>
      <div class="defaultImg-wrap" v-else>
        <img :src="defaultImg" alt="">
      </div>
  </div>
</template>

<script>
  const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    color: ['#FF443F', '#222222', '#F9A001', '#6E7275', '#38394F', '#FF443F'],
    tooltip: {
        trigger: 'axis',
        formatter: "{b}: {c} ({d}%)",
        // position: ['50%, 50%']
    },
    grid: {
      left: '20%',
      right: '20%'
    },
    legend: {
      x: 'left',
      icon: 'circle',
      data:[],
      bottom: '0%',
      orient:'horizontal',
    },
    label: {
      normal: {
        show: true,
        fontSize: 14
      },
      color: '#222',
      emphasis: {
        show: false
      },
      formatter: (obj) => {
        if (obj.seriesName === '战败') {
          return obj.percent + '%'
        } else {
          return obj.name
        }
      },
    },
    // silent: true,
    series: [
      {
        name: '战败',
        type: 'pie',
        radius: ['34%', '58%'],
        center: ['50%', '40%'],
        data: [{
          value: 0,
          name: '选择竞品车型'
        }, {
          value: 0,
          name: '用车需求不明确'
        }, {
          value: 0,
          name: '价格因素'
        }, {
          value: 0,
          name: '购买意愿不强'
        }, {
          value: 0,
          name: '其他'
        }]
      },
      {
        name:'11',
        type:'pie',
        radius: ['0', '34%'],
        center: ['50%', '40%'],
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
          name: '战败\n关键因素',
          value: '0'
        }]
      }
    ]
  };
  import {imageApi} from '../../../http/url'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: "index",
    props: {
      chartParams: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        echarts,
        modelData: null,
        factorEchartTxt: '',
        defaultImg: imageApi + '/user_default.png',
        dataLenth: 0,
        isShowEchart: true
      }
    },
    computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'dateTime': 'dateTime',
      'areaInfo': 'areaInfo'
      })
    },
    components: {
      mpvueEcharts
    },
    mounted () {
      this.$nextTick(() => {
        this.pageInit()
      })
    },
    methods: {
      ...mapActions({
        'getFactorEchart': 'defeatReportModule/getFactorEchart'
      }),
      async pageInit () {
        let res =  await this.getFactorEchart(this.chartParams);
        if (res.code == 0 ){
          this.factorEchartTxt = res.data.element ? res.data.element : '暂无数据'
          this.modelData = res.data.element;
          let data = []
          let dataX = []
          res.data.elementRankRate.forEach((item) => {
            data.push({
              value: Number(item.elementRate),
              name: item.elementName
            });
            dataX.push(item.elementName)
            return data, dataX
          });
          // 是否显示默认状态
          this.dataLenth = res.data.elementRankRate.length;
          console.log('----------当前的长度--------', this.dataLenth)
          if (data.length) {
            option.series[0].data = data;
            option.legend.data = dataX;
            this.initChart()
          } else {
            this.isShowEchart = false
          }
        }
      },
      initChart () {
        this.$refs.gcyyChart.init()
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
    onShow(){
      this.isShowEchart = true
      this.pageInit()
    },
  };
</script>
<style scoped>
  .flex {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    line-height: 28rpx;
    font-size: 26rpx;
    color: '#222222'
  }
  .defeatedFactor-echart-wrap {
    width: 100%;
    height: 100%;
  }
  .application-content {
    margin-bottom: 40rpx;
    box-sizing: border-box;
    padding: 22rpx 40rpx 34rpx 40rpx;
    width: 100%;
    border-radius:16rpx;
    background: linear-gradient(50deg,rgba(56,57,79,1) 0%,rgba(34,34,34,1) 100%);
  }
  .application-content span {
    display: block;
    line-height: 54rpx;
    font-size:30rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    opacity:1;
  }
  .defeatedFactor-echart-wrap .defeatedFactor-child-echart {
    position: relative;
    height: 750rpx;
  }
  .defaultImg-wrap {
    margin-top: 50rpx;
    width: 100%;
    height: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .defaultImg-wrap img {
    width: 400rpx;
    height: 300rpx;
  }
</style>
