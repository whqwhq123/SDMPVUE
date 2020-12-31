<template>
  <!--消费水平-->
  <div class="page">
    <div>
      <div class="card-xfsp-content">
        <img class="card-content-bg" :src="imageApi + '/appBg1.png'" alt="">
        <div class="card-content">
          <div class="car-name" >
            {{ carInfo ? carInfo.carName : '' }}
          </div>
          <div class="car-action">
            <div class="car-price">指导价{{ carInfo ? carInfo.msrp : '' }}<span v-if="carInfo && carInfo.msrp">万元</span></div>
            <div class="car-btn" @click="toCarList">换车型</div>
          </div>
        </div>
      </div>
    </div>
    <!--中间图表-->
    <div class="chart">
      <div class="chart-title">竞争力</div>
      <div class="echarts-wrap" v-if="!loadingStatus">
        <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="handleInit" ref="echarts" canvasId="demo-canvas" throttleTouch="true"  />
      </div>
    </div>
    <!--底部卡片-->
    <div class="car-content">
      <div class="car-hot">
        <img class="car-icon-tip" :src="imageApi + '/icon-tip.png'" alt="">
        <span>同级别车系中，动力、空间、操控表现突出</span>
      </div>
      <div class="car-content-item">
        <div class="item-title">卖点</div>
        <div class="item-tag-group" v-if="carAllInfo">
          <div class="item-tag-item" v-for="(tag, index) in carAllInfo.advantageList" :key="tag" v-if="index < 7">{{ tag }}</div>
        </div>
      </div>
    </div>

    <!--弹框-->
    <!--<div class="mask-layer" v-if="maskStatus" @click="hideModal"></div>-->
    <!--<div class="drawer" v-show="maskStatus" :animation='animationData'>-->

      <!--<div class="drawer-content">-->
        <!--<div class="drawer-close" @click="hideModal">-->
          <!--<img src="/static/images/close3.png" alt="">-->
        <!--</div>-->
        <!--<div class="drawer-title">-->
          <!--<div class="explain-btn">-->
            <!--<img src="/static/images/explain.png" alt="">-->
          <!--</div>-->
          <!--<span>汽车消费水平</span>-->
        <!--</div>-->
        <!--<div class="drawer-desc">-->
          <!--我们从客户的APP使用偏好、兴趣爱好、手机终端偏好、通信行为偏好等维度进行兴趣偏好评估-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <loadingView :loadingStatus="loadingStatus"></loadingView>
  </div>
</template>

<script>/**
 * @author yuhongru
 * @data 2019/5/9 14:21
 **/


const echarts = require('../../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null;
  var option = {
    // tooltip: {},
    radar: {
      radius: '55%',
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      axisLine: {
        lineStyle: {
          color: '#555555'
        }
      },
      splitLine: {
        show: false
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(136,136,136,1)',
            'rgba(136,136,136,0.8)', 'rgba(136,136,136,0.6)',
            'rgba(136,136,136,0.4)', 'rgba(136,136,136,0.2)'],
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 10
        }
      },
      /*正常最大值为5，为了好看最大值加一*/
      indicator: [
        { name: '操控', max: 6},
        { name: '动力', max: 6},
        { name: '空间', max: 6},
        { name: '外观', max: 6},
        { name: '舒适性', max: 6},
        { name: '性价比', max: 6},
        { name: '油耗', max: 6},
        { name: '内饰', max: 6},
        //{ name: '市场（Marketing）', max: 25000}
      ]
    },
    series: {
      name: '汽车参数',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [],
          name : '汽车参数',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#DABE83'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.9,
              color: '#DABE83'
            }
          }
        }
      ]
    }
  };
  import {fenxiang} from "../../../../utils";
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import loadingView from '../../../../components/loading/loading'
  import {imageApi} from "../../../../http/url";

export default {
    name: "index",
    data () {
      return {
        echarts,
        imageApi,
        loadingStatus: false,
      }
    },

    components: {
      mpvueEcharts,
      loadingView
    },
    computed: {
      ...mapGetters({
          'carInfo': 'carInfo',
          'carAllInfo': 'readCar/carAllInfo',
          'userInfo': 'userInfo'
        })
    },
    mounted () {
     //  this.theInit()
    },
    methods: {
      ...mapActions({
        'getCarInfo': 'readCar/getCarInfo',
      }),
      ...mapMutations({
        'SET_CARINFO': 'SET_CARINFO'
      }),
      async theInit () {
        this.loadingStatus = true;
        let params = {
          makeId: this.userInfo.manuId,
        };
        if (this.carInfo) {
          params.modelId = this.carInfo.getCarNameId
        }
        let res = await this.getCarInfo(params);
        if (res.code === '0') {
          console.log('热门车信息', res.data.carModel);
          this.SET_CARINFO(res.data.carModel);
          let carDimension = this.carAllInfo.carDimension;
          option.series = {
            name: '汽车参数',
            type: 'radar',
            data : [
              {
                value : [
                  carDimension.carControl,
                  carDimension.carPower,
                  carDimension.carSpace,
                  carDimension.carExterior,
                  carDimension.carComfort,
                  carDimension.carCost,
                  carDimension.carOil,
                  carDimension.carTirm,
                ],
                name : '汽车参数',
                symbol: 'none',
                itemStyle: {
                  normal: {
                    color: '#DABE83'
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.9,
                    color: '#DABE83'
                  }
                }
              }
            ]
          }
        }
        this.loadingStatus = false;
        this.initChart();
      },
      initChart () {
        this.$nextTick(()=>{
          this.$refs.echarts.init()
        })

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
      toCarList () {
        wx.navigateTo({
          url: '/pages/app/readCar/carList/main'
        })
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onShow () {
      this.theInit()
    },
    onUnload: function() {
      console.log('卖点销毁');
      // 本页销毁时 清空carInfo 防止影响其他地方 因为 carList 为公用
      this.SET_CARINFO(null);
    }
  };
</script>

<style scoped lang="sass">
  .page
    background-color: #222
    min-height: 100%
    padding-top: 1rpx
    .card-xfsp-content
      display: flex
      position: relative
      width: 670rpx
      margin: 0 auto
      margin-top: 30rpx
      box-sizing: border-box
      padding: 25rpx 40rpx 30rpx 40rpx
      background: linear-gradient(90deg,rgba(227,203,147,1) 0%,rgba(195,156,90,1) 100%)
      .card-content-bg
        position: absolute
        z-index: 1
        left: 0
        top: 0
        width: 100%
        height: 100%
    .card-content
      position: relative
      width: 100%
      z-index: 2
      font-size: 48rpx
      color: #333
      font-weight: bold
      .car-name
        font-size: 40rpx
        color: #333

      .car-action
        display: flex
        width: 100%
        justify-content: space-between
      .car-price
        color: #D75335
        font-size: 28rpx
      .car-btn
        background-color: #333
        line-height: 56rpx
        font-size: 28rpx
        color: #fff
        border-radius: 28rpx
        padding: 0 26rpx
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
      color: #fff
    .echarts-wrap
      width: 100%
      height: 500rpx
</style>
<style scoped lang="sass">
  .car-content
    width: 670rpx
    flex: 1
    background-color: #fff
    margin: 0 auto
    margin-top: 40rpx
    padding: 0 40rpx
    padding-bottom: 106rpx
    box-sizing: border-box
    .car-hot
      font-size: 26rpx
      color: #eca51b
      line-height: 60rpx
      background-color: #ffeecc
      margin: 0 -40rpx
      padding: 0 40rpx
      span
        vertical-align: middle
    .car-icon-tip
      vertical-align: middle
      $size: 34rpx
      width: $size
      height: $size
      margin-right: 16rpx
    .car-content-item
      padding-top: 1rpx
    .item-title
      color: #333
      font-weight: bold
      font-size: 32rpx
      margin-top: 60rpx
    .item-tag-group
      overflow: hidden
      margin-right: -20rpx
      .item-tag-item
        float: left
        font-size: 26rpx
        margin-top: 20rpx
        margin-right: 20rpx
        color: #555
        padding: 6rpx 6rpx
        background-color: #ececec
        border-radius: 4rpx
</style>
<style scoped lang="sass">
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
        $closeSize: 36rpx
        width: $closeSize
        height: $closeSize
        img
          width: 100%
          height: 100%
      .drawer-content

        position: relative
        width: 670rpx
        height: 236rpx
        box-sizing: border-box
        padding: 40rpx
        margin: 0 auto
        background-color: #fff
        .explain-btn
          display: inline-block
          position: relative
          top: 0
          right: 0
          margin-right: 16rpx
        .drawer-title
          font-size: 30rpx
          vertical-align: middle
          font-weight: bold
        .drawer-desc
          margin-top: 24rpx
          font-size: 26rpx
          color: #555
          line-height: 36rpx
</style>
