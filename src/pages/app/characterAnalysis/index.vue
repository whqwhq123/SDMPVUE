<template>
  <!--性格-->
  <div class="page">
    <div>
      <div class="card-xfsp-content">
        <!-- <img class="card-content-bg" :src="imageApi + '/appBg1.png'" alt=""> -->
        <div class="card-content">
          <div class="card-type">{{ xghx.level }}</div>
          <div class="card-type-desc">
            {{ xghx.levelDesc }}
          </div>
        </div>
        <div class="explain-btn" @click="showModal">
          <img :src="imageApi + '/explain.png'" alt="" v-if="imageApi">
        </div>
      </div>
    </div>
    <!--中间图表-->
    <div class="chart">
      <div class="chart-title">等级解读</div>
      <div class="echarts-wrap">
        <div style="height: 100%" :class="[maskStatus ? 'hide': 'show']" >
          <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="handleInit" ref="echarts" canvasId="demo-canvas" throttleTouch="true"  />
        </div>
      </div>
    </div>
    <!--底部内容-->
    <div class="page-desc">
      <div class="page-desc-title">如何有效和客户沟通</div>
      <ul class="page-desc-list-group">
        <li class="page-desc-list-item" v-for="info in xghx.jiedu" :key="info.name">
          {{ info.description }}
        </li>
      </ul>
    </div>
    <!--弹框-->
    <div class="mask-layer" v-if="maskStatus" @click="hideModal"></div>
    <div class="drawer" v-show="maskStatus" :animation='animationData'>

      <div class="drawer-content">
        <div class="drawer-close" @click="hideModal">
          <img :src="imageApi + '/close3.png'" alt="" v-if="imageApi">
        </div>
        <div class="drawer-title">
          <!-- <div class="explain-btn">
            <img :src="imageApi + '/explain.png'" alt="">
          </div> -->
          <span>九型人格说明</span>
        </div>
        <div class="drawer-desc">
          {{ xghx.hide.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>/**
 * @author yuhongru
 * @data 2019/5/9 14:21
 **/


const echarts = require('../../../../static/js/echarts.min.js');

  import mpvueEcharts from 'mpvue-echarts'
  import { mapGetters } from 'vuex'
  import {fenxiang} from "../../../utils";
  import loadingView from '../../../components/loading/loading'
  import {imageApi} from "../../../http/url";

let chart = null;
  var option = {
    radar: {
      // shape: 'circle',
      radius: '55%',
      name: {
        textStyle: {
          color: '#1A1A1A',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      axisLine: {
        lineStyle: {
        color: '#fff'
        }
      },
      splitLine: {
        show: false
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(247,247,250,1)',
            'rgba(231,229,235,1)', 'rgba(247,247,250,1)',
            'rgba(231,229,235,1)'],
          shadowColor: '#fff',
          shadowBlur: 10
        }
      },
      indicator: [
        { name: '完美型', max: 100},
        { name: '助人型', max: 100},
        { name: '成就型', max: 100},
        { name: '感觉型', max: 100},
        { name: '思考型', max: 100},
        { name: '忠诚型', max: 100},
        { name: '活跃型', max: 100},
        { name: '领袖型', max: 100},
        { name: '和平型', max: 100},
        //{ name: '市场（Marketing）', max: 25000}
      ]
    },
    series: {
      name: '',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [100, 10, 20, 30, 40, 50, 60, 70, 80],
          name : '类型',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#C6405F'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.9,
              color: '#C6405F'
            }
          }
        }
      ]
    }
  };
  export default {
    name: "index",
    data () {
      return {
        echarts,
        imageApi,
        current: 0,
        animationData: null,
        maskStatus: false,
        loadingStatus: false,
      }
    },
    computed: {
      ...mapGetters({
        'xghx': 'insight/xghx',
        'userInfo': 'userInfo'
      })
    },
    components: {
      mpvueEcharts,
      loadingView
    },
    async mounted () {
      this.loadingStatus = true;
      let data = await this.getIndicator();
      option.radar.indicator = data.indicator;
      option.series = {
        name: '分值',
        type: 'radar',
        data : [
          {
            value : data.value,
            name : '分值',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#C6405F'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.9,
                color: '#C6405F'
              }
            }
          }
        ]
      };
      this.initChart();
      this.loadingStatus = false
    },
    methods: {
      checkedTag (e) {
        let current = e.mp.detail.current;
        let source = e.mp.detail.source;
        if (source !== 'touch') return;
        this.current = current;
      },
      showModal (e){
        this.maskStatus = true;
        let animation = wx.createAnimation({
          duration:1000,
          timingFunction:'linear'
        });
        animation.opacity(1).step();
        this.animationData = animation.export();
      },
      hideModal (e){
        let animation = wx.createAnimation({
          duration:300,
          timingFunction:'linear'
        })
        animation.opacity(0).step();
        this.animationData = animation.export();
        this.maskStatus=false
      },

      initChart () {
        this.$refs.echarts.init()
      },
      handleInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        return chart
      },
      getIndicator () {
        let indicator = [];
        let value = [];
        /*原最大值为所有项中最大值，为了好看加3*/
        let maxValue = parseInt(this.xghx.maxValue) + 3;
        this.xghx.shuxing.forEach((item) => {
          indicator.push({ name: item.name, max: maxValue });
          value.push(item.value)
        });
        return { indicator, value }
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    }
  };
</script>

<style scoped lang="sass">
  .page
    background-color: #fff
    min-height: 100%
    padding-top: 1rpx
    .card-xfsp-content
      display: flex
      position: relative
      width: 670rpx
      margin: 0 auto
      margin-top: 30rpx
      box-sizing: border-box
      padding: 40rpx 0 50rpx 40rpx
      background: #F7F7FA
      border-radius: 16px;
      // background: linear-gradient(90deg,rgba(227,203,147,1) 0%,rgba(195,156,90,1) 100%)
      .card-content-bg
        position: absolute
        z-index: 1
        left: 0
        top: 0
        width: 100%
        height: 100%

    .xfsp-text-content
      position: relative
      z-index: 2
      font-size: 30rpx
      line-height: 34rpx
      line-height: 54rpx
      color: #333
      padding-left: 40rpx
      font-weight: 500
      span
        font-weight: bold
    .division
      position: relative
      z-index: 2
      width: 3rpx
      background: linear-gradient(rgba(70, 59, 39, 0), rgba(70, 59, 39, 1), rgba(70, 59, 39, 1), rgba(70, 59, 39, 0))
    .explain-btn
      position: absolute
      z-index: 2
      top: 8rpx
      right: 12rpx
      line-height: 34rpx
      $size: 34rpx
      width: $size
      height: $size
      img
        vertical-align: middle
        width: 100%
        height: 100%


</style>
<style scoped lang="sass">
  .card-content
    position: relative
    z-index: 2
    .card-type
      font-size: 40rpx
      color: #1A1A1A
      font-weight: 500
    .card-type-desc
      color: #1A1A1A
      margin-top: 26rpx
      font-size: 28rpx

</style>
<style scoped lang="sass">
  .chart
    padding: 0 40rpx
    margin-top: 48rpx
    .chart-title
      font-size: 32rpx
      line-height: 1
      color: #1A1A1A
    .echarts-wrap
      width: 100%
      height: 500rpx
</style>
<style scoped lang="sass">
  .page-desc
    width: 670rpx
    margin: 0 auto
    background-color: #F7F7FA
    box-sizing: border-box
    padding: 48rpx 62rpx 40rpx 48rpx;
  .page-desc-title
    font-size: 32rpx
    color: #1A1A1A
    font-weight: bold
  .page-desc-list-item
    position: relative
    font-size: 28rpx
    color: #767676
    margin-top: 36rpx
    // padding-left: 26rpx
    line-height: 36rpx
    // &:after
    //   position: absolute
    //   content: ''
    //   $size: 6rpx
    //   width: $size
    //   height: $size
    //   background-color: #ccc
    //   top: 15rpx
    //   left: 0

</style>
<style scoped lang="sass">
  .hide
    display: none
  .show
    display: block
  .mask-layer
    position: fixed
    z-index: 999
    width: 100%
    height: 100%
    top: 0
    left: 0
    background-color: #000
    opacity: 0.8
  .drawer
    opacity: 0
    position: fixed
    z-index: 9999
    width: 100%
    top: 50%
    margin-top: -118rpx
    .drawer-close
      position: absolute
      right: 12rpx
      top: 6rpx
      $closeSize: 30rpx
      width: $closeSize
      height: $closeSize
      img
        width: 100%
        height: 100%
    .drawer-content
      position: relative
      width: 490rpx
      height: 300rpx
      box-sizing: border-box
      padding: 60rpx 50rpx 60rpx 48rpx
      margin: 0 auto
      border-radius: 16rpx;
      background-color: #fff
      .explain-btn
        display: inline-block
        position: relative
        margin-right: 16rpx
        z-index: 2
        top: 0
        right: 0
        line-height: 34rpx
        $size: 34rpx
        width: $size
        height: $size
        img
          vertical-align: middle
          width: 100%
          height: 100%
      .drawer-title
        color: #1A1A1A
        font-size: 32rpx
        vertical-align: middle
        font-weight: 500
      .drawer-desc
        margin-top: 36rpx
        font-size: 28rpx
        color: #767676
        line-height: 40rpx
</style>
