<template>
  <div class="page">
    <div>
      <div class="card-xfsp-content">
        <!-- <img class="card-content-bg" :src="imageApi + '/appBg1.png'" alt=""> -->
        <div class="cjyy-value-content">
          <div class="cjyy-value"><span class="num">{{ cjyy.score }}</span><span>%</span></div>
          <!-- <div class="cjyy-progress">
            <progress stroke-width="16rpx" border-radius="8rpx" :percent="cjyy.score" color="#9F8055" backgroundColor="#C1A365"/>
          </div> -->
        </div>
        <div class="division"></div>
        <div class="cjyy-text-content">
          <div class="cjyy-desc">{{ cjyy.level }}</div>
          <div class="cjyy-price-range">{{ cjyy.levelDesc }}</div>
        </div>
        <div class="explain-btn" @click="showModal">
          <img :src="imageApi + '/explain.png'" alt="" v-if='imageApi'>
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
    <!--底部卡片-->
    <div class="page-desc">
      <ul class="page-desc-list-group">
        <li class="page-desc-list-item" v-for="item in cjyy.jiedu" :key="item.name">
          {{ item.description }}
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
          <span>成交意愿说明</span>
        </div>
        <div class="drawer-desc">
         {{ cjyy.hide.description }}
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
  import {fenxiang} from "../../../utils";
  import mpvueEcharts from 'mpvue-echarts'
  import { mapGetters } from 'vuex'
  import loadingView from '../../../components/loading/loading'
  import {imageApi} from "../../../http/url";

let chart = null;

  var option = {
    tooltip: {
      trigger: 'axis',
      position: function(point, params, dom, rect, size){ // point: 鼠标位置
        var tipWidth = point[0] + size.contentSize[0]; // contentSize: 提示dom 窗口大小
        if(tipWidth > size.viewSize[0] ){              // viewSize: echarts 容器大小
          return [size.viewSize[0] - size.contentSize[0], point[1] ];
        } else if(point[0] < size.contentSize[0]){
          return [ size.contentSize[0]/2, point[1]];
        } else {
          return point;
        }
      },
      axisPointer: {
        // type: 'none'
        type: 'shadow',
        shadowStyle: {
          opacity: 0
        }
      }
    },
    // legendHoverLink: false,
    xAxis: {
      data: ['购车行为', '线索痕迹', '品牌关注', '时间影响', '消费水平'],
      axisTick: {show: false},
      axisLine: {show: false},
      axisLabel: {
        textStyle: {
          fontSize: 8,
          color: '#1A1A1A'
        }
      }
    },
    yAxis: {
      max: 100,
      splitLine: {show: false},
      axisTick: {show: false},
      axisLine: {show: false},
      axisLabel: {show: false}
    },
    color: ['#E49DAC'],
    series: {
      name: '成交意愿',
      type: 'pictorialBar',
      barCategoryGap: '-110%',
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        // color: ['#A3A3A3','#E49DAC'],
        normal: {
          opacity: 0.6
        },
        emphasis: {
          opacity: 1
        }
      },
      data: []
      // z: 10
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
        'cjyy': 'insight/cjyy',
        'userInfo': 'userInfo'
      })
    },
    components: {
      mpvueEcharts,
      loadingView
    },
    async mounted () {
      this.loadingStatus = true;
      let data = await this.getDatas();
      option.xAxis.data = data.name;
      option.series.data = data.value;
      this.initChart();
      this.loadingStatus = false;
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
        var animation = wx.createAnimation({
          duration:1000,
          timingFunction:'linear'
        });
        animation.opacity(1).step();
        this.animationData = animation.export();
      },
      hideModal (e){
        var animation = wx.createAnimation({
          duration:300,
          timingFunction:'linear'
        });
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
      getDatas () {
        let name = [];
        let value = [];
        let data = JSON.parse(JSON.stringify(this.cjyy.shuxing));
        data.forEach((item) => {
          name.push(item.name);
          /*0519 安琦更改模型 消费水平 上线1000*/
          // if (item.code=== 'xfsp') {
          //   item.value = item.value / 10
          // }
          // if (item.code=== 'ppgzd') {
          //   item.value = item.value * 100 / 3
          // }
          // if (item.code=== 'sjyx') {
          //   item.value = item.value * 10 / 4
          // }
          value.push(item.value)
        });
        return { name, value }
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
    height: 100%
    padding-top: 1rpx
    .card-xfsp-content
      display: flex
      position: relative
      width: 670rpx
      margin: 0 auto
      margin-top: 30rpx
      box-sizing: border-box
      padding: 25rpx 0 30rpx 50rpx
      background: #F7F7FA
      border-radius: 32rpx
      .card-content-bg
        position: absolute
        z-index: 1
        left: 0
        top: 0
        width: 100%
        height: 100%
      .cjyy-value-content
        width: 150rpx
        margin-right: 40rpx
        position: relative
        color: #1A1A1A
        z-index: 2
        .cjyy-value
          text-align: center
          span
            font-size: 48rpx
          .num
            font-weight: bold
            font-size: 88rpx
        .cjyy-progress
          width: 150rpx
          border-radius: 8rpx
          overflow: hidden
    .cjyy-text-content
      display: flex
      flex-flow: column
      justify-content: center
      position: relative
      z-index: 2
      font-size: 32rpx
      font-weight: 500
      line-height: 54rpx
      color: #1A1A1A
      padding-top: 10rpx
      padding-left: 40rpx
      span
        font-weight: bold
    .division
      position: relative
      z-index: 2
      width: 3rpx
      height: 88rpx;
      margin-top: 24rpx
      background: #707070
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
  .chart
    margin-top: 48rpx
    .chart-title
      padding: 0 40rpx
      font-size: 32rpx
      line-height: 1
      color: #1A1A1A
      font-weight: 500
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
    padding: 24rpx 40rpx 48rpx 48rpx
    .page-desc-title
      font-size: 32rpx
      color: #333
      font-weight: bold
    .page-desc-list-item
      position: relative
      font-size: 32rpx
      color: #767676
      margin-top: 24rpx
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
