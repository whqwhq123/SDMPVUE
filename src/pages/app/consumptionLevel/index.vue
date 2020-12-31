<template>
<!--消费水平-->
  <div class="page">
    <div>
      <div class="card-xfsp-content">
        <!-- <img class="card-content-bg" :src="imageApi + '/appBg1.png'" alt=""> -->
        <div class="xfsp-value-content">
          <div class="xfsp-value">{{ xfsp.wealth }}</div>
          <div class="xfsp-tag">财富值</div>
        </div>
        <div class="division"></div>
        <div class="xfsp-text-content">
          <div class="xfsp-desc">
            <div>{{ xfsp ? xfsp.level[0] : ''}}</div>
            <div>{{ xfsp ? xfsp.level[1] : ''}}</div>
          </div>
          <!--<div class="xfsp-price-range">匹配购车价格 <span>{{ xfsp.price }}</span></div>-->
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
    <!--底部卡片-->
    <swiper
      class="tag-class-group"
      previous-margin="95rpx"
      next-margin="95rpx"
      @change="checkedTag"
      :current="current"
    >
      <block>
        <swiper-item
          :class="[key === currentCode ? 'active' : '', 'tag-class-item']"
          v-for="(tagItem, key) in xfsp.jiedu"
          :key="tagItem.name">
          <div class="tag-class-content">
            {{ index }}
            <div class="tag-class-title">{{ tagItem.name }}</div>
            <div class="tag-class-dec">{{ tagItem.description }}</div>
            <div class="tag-class-title tag-class-title-2" v-if="tagItem.factor.length > 0">关键因素</div>
            <div class="tag-group">
              <div class="tag-item" v-for="(tag, num) in tagItem.factor" :key="tag" v-if='num<6'>
                {{ tag }}
              </div>
            </div>
          </div>
        </swiper-item>
      </block>
    </swiper>

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
          <span>消费水平说明</span>
        </div>
        <div class="drawer-desc">
         {{ xfsp.hide.description }}
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
    radar: {
      radius: '55%',
      triggerEvent: true,
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
      ]
    },
    series: {
      name: '分值',
      type: 'radar',

      data : [
        {
          value : [10, 20, 50, 75, 100],
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
    }
  };

  export default {
    name: "index",
    data () {
      return {
        echarts,
        imageApi,
        animationData: null,
        maskStatus: false,
        loadingStatus: false,

        current: 0,
        currentCode: '',
        currentAndName: {},
        nameAndCurrent: {}
      }
    },
    computed: {
      ...mapGetters({
        'xfsp': 'insight/xfsp',
        'userInfo': 'userInfo'
      })
    },
    components: {
      mpvueEcharts,
      loadingView
    },
    async mounted () {
      this.current = 0;
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
      this.loadingStatus = false;
    },
    methods: {
      checkedTag (e) {
        let current = e.mp.detail.current;
        let source = e.mp.detail.source;
        if (source !== 'touch') return;
        this.current = current;
        let op = chart.getOption();
        let name = this.nameAndCurrent[this.current].name;
        // 图表文字颜色变化
        op.radar[0].indicator = op.radar[0].indicator.map((item, index) => {
          if (item.name === name) {
            item.color = '#1A1A1A'
            item.fontSize='16'
          }else {
            item.color = '#767676'
          }
          return item
        });
        this.currentCode = this.nameAndCurrent[this.current].code;
        chart.setOption(op);
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
        let that = this;
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        chart.setOption(option);
        chart.on('click', function (params) {
          let type = params.targetType;
          if (type === "axisName") {
            let op = chart.getOption();
            // 图表文字颜色变化
            op.radar[0].indicator = op.radar[0].indicator.map((item, index) => {
              if (item.name === params.name) {
                item.color = '#1A1A1A'
                item.fontSize='16'
              }else {
                item.color = '#767676'
              }
              return item
            });
            chart.setOption(op);
            that.currentCode = that.currentAndName[params.name].code;
            that.current = that.currentAndName[params.name].index;
          }
        });
        return chart
      },
      getIndicator () {
        let indicator = [];
        let value = [];
        let that = this
        this.xfsp.shuxing.forEach((item, index) => {
          indicator.push({ name: item.name, max: 100, color: '#767676'});
          value.push(item.value);
          that.currentAndName[item.name] = {
            code: item.code,
            index: index
          };
          that.nameAndCurrent[index] ={
            code: item.code,
            name: item.name
          }
        });
        if (indicator[0]){
          that.currentCode = that.currentAndName[ indicator[0].name].code;
          indicator[0].color = '#1A1A1A'
          indicator[0].fontSize='16'
        }
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
    border-radius: 32rpx;
    // background: linear-gradient(90deg,rgba(227,203,147,1) 0%,rgba(195,156,90,1) 100%)
    .card-content-bg
      position: absolute
      z-index: 1
      left: 0
      top: 0
      width: 100%
      height: 100%
    .xfsp-value-content
      color: #333
      position: relative
      z-index: 2
      margin-right: 40rpx
      .xfsp-value
        text-align: center
        font-size: 92rpx
        line-height: 1
        font-weight: bold
      .xfsp-tag
        width: 110rpx
        margin: 0 auto
        text-align: center
        font-size: 26rpx
        padding: 0 10rpx
        line-height: 32rpx
        border-radius: 17rpx
  .xfsp-text-content
    position: relative
    z-index: 2
    font-size: 30rpx
    display: flex
    flex-flow: column
    justify-content: center
    line-height: 54rpx
    color: #1A1A1A
    padding-left: 40rpx
    font-weight: 500
    span
      font-weight: bold
    .xfsp-desc
      padding-right: 40rpx
  .division
    position: relative
    z-index: 2
    width: 3rpx
    height: 88rpx
    margin-top: 24rpx
    // background: linear-gradient(rgba(70, 59, 39, 0), rgba(70, 59, 39, 1), rgba(70, 59, 39, 1), rgba(70, 59, 39, 0))
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
    padding: 0 40rpx
    margin-top: 48rpx
    .chart-title
      font-size: 32rpx
      line-height: 1
      color: #1A1A1A
      font-weight: 500
    .echarts-wrap
      width: 100%
      height: 500rpx
</style>
<style scoped lang="sass">
  .tag-class-group
    height: 680rpx
    margin: 0 auto
    margin-bottom: 20rpx
    .tag-class-item
      opacity: 0.6
      &.active
        opacity: 1
      .tag-class-content
        background-color: #F7F7FA
        height: 680rpx
        margin: 0 15rpx
        box-sizing: border-box
        padding: 48rpx 46rpx 54rpx 40rpx
        .tag-class-title
          color: #1A1A1A
          font-size: 32rpx
          font-weight: 500
        .tag-class-dec
          margin-top: 40rpx
          font-size: 28rpx
          line-height: 36rpx
          color: #767676
        .tag-class-title-2
          margin-top: 60rpx
          font-size: 32rpx
          color: #1A1A1A
          font-weight: 500
      .tag-group
        margin-top: 40rpx
        margin-right: -28rpx
        .tag-item
          float: left
          padding: 8rpx 10rpx
          font-size: 26rpx
          margin-right: 28rpx
          margin-bottom: 30rpx
          border: 2rpx solid rgba(179,179,179,1)
          border-radius: 4rpx
          color: #767676
          // background-color: #ececec

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
        top: 0
        right: 0
        margin-right: 16rpx
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
