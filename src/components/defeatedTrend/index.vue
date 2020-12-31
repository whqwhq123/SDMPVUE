<template>
  <div class="defeatedFactor-echart">
      <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="gcyyInit" ref="gcyyChart" canvasId="gcyyCanvas" throttleTouch="true"  />
  </div>
</template>

<script>
  const echarts = require('../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    color: ['#D75335'],
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
    grid: {
      top: 10,
      left: 20,
      right: 20,
      bottom: 40,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      position: function(point, params, dom, rect, size){ // point: 鼠标位置
        var tipWidth = point[0] + size.contentSize[0] / 2; // contentSize: 提示dom 窗口大小
        if(tipWidth > size.viewSize[0] ){              // viewSize: echarts 容器大小
          return [size.viewSize[0] - size.contentSize[0], point[1] ];
        } else if(point[0] < size.contentSize[0]){
          return [ size.contentSize[0]/2, point[1]];
        } else {
          return point;
        }
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLabel: {
        show: true,
        // interval: 0,
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
    series: [
      {
        name:'战败人数',
        type:'line',
        stack: '总量',
        data:[]
      }
    ]
};
  export default {
    name: "index",
    props: {
      chartParams: Object,
      detailEchartX: {
        type: Array,
        default: []
      },
      detailData: {
        type: Array,
        default: []
      },
    },
    watch: {
      'detailData':{
        handler: function (newVal) {
          this.pageInit()
        },
        immediate: true,
        deep: true
      }
    },
    data () {
      return {
        echarts,
        modelData: null,
      }
    },
    components: {
      mpvueEcharts
    },
    mounted () {
      this.pageInit()
    },
    methods: {
      pageInit () {
        this.initChart()
      },
      initChart () {
        this.$nextTick(() => {
        this.$refs.gcyyChart.init()
        })
      },
      gcyyInit (canvas, width, height) {
        option.xAxis.data = this.detailEchartX
        option.series[0].data = this.detailData
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
<style scoped>
  .defeatedFactor-echart {
    width: 100%;
    height: 100%;
  }
</style>
