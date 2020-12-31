<template>
  <div :class="[maskStatus?'hidden':'show','page']">
    <div>
      <div class="card-xfsp-content">
        <img v-if="imageApi" class="card-content-bg" :src="imageApi + '/appBg1.png'" alt="">
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
    <div class="page-content">
      <div class="page-nav-content">
        <div :class="['page-nav-item', !cityStatus ? 'active' : '']" @click="swichCity('')">全国</div>
        <div :class="['page-nav-item', cityStatus ? 'active' : '']" @click="swichCity(inCity)">{{inCity}}</div>
      </div>
      <div class="page-list-content">
        <div class="default_img" v-if='realPrice.length == 0'>
          <img v-if="imageApi" :src="imageApi + '/user_default.png'" alt="">
          <span class="default_disc">暂无真实成交记录</span>
        </div>
        <ul class="page-list-warp" v-if='realPrice.length > 0'>
          <div class="page-list-tip">*成交价格来自用户上报，仅供参考</div>
          <li class="page-list-item" v-for="item in realPrice" :key="item.sourceStyleName">
            <div class="page-list-top">
              <div class="car-name">{{ item.sourceStyleName }}</div>
            </div>
            <div class="page-list-btm">
              <ul>
                <li>
                  <div class="item-title">近期成交均价</div>
                  <div class="item-price">
                    <span v-if="item.dealPriceAverage">{{ item.dealPriceAverage }}万</span>
                    <span v-else style="color:#aaa">-</span>
                  </div>
                </li>
                <li>
                  <div class="item-title">指导价</div>
                  <div class="item-price item-zhidao">
                    <span v-if="item.guidePrice">{{ item.guidePrice }}万</span>
                    <span v-else style="color:#aaa">-</span>
                  </div>
                </li>
              </ul>
              <div class="charts-show" @click="showModal(item)">
                <img v-if="imageApi" class="icon-qushi" :src="imageApi + '/qushi-btn.png'" alt="">
                <span>趋势</span>
              </div>
            </div>
          </li>
          <!--<li class="page-list-item">-->
            <!--<div class="page-list-top">-->
              <!--<div class="car-name">2019款 730Li xDriver40I 领先型豪华套装领先型豪华套装</div>-->
            <!--</div>-->
            <!--<div class="page-list-btm">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<div class="item-title">近期成交均价</div>-->
                  <!--<div class="item-price">-->
                    <!--<span>90.88万</span>-->
                  <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<div class="item-title">指导价</div>-->
                  <!--<div class="item-price item-zhidao">-->
                    <!--<span>90.88万</span>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
              <!--<div class="charts-show" @click="showModal">-->
                <!--<img class="icon-qushi" src="/static/images/qushi-btn.png" alt="">-->
                <!--<span>趋势</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li class="page-list-item">-->
            <!--<div class="page-list-top">-->
              <!--<div class="car-name">2019款 730Li xDriver40I 领先型豪华套装领先型豪华套装</div>-->
            <!--</div>-->
            <!--<div class="page-list-btm">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<div class="item-title">近期成交均价</div>-->
                  <!--<div class="item-price no-data">-->
                    <!--<span>—</span>-->
                  <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<div class="item-title">指导价</div>-->
                  <!--<div class="item-price no-data">-->
                    <!--<span>—</span>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
              <!--<div class="charts-show" @click="showModal">-->
                <!--<img class="icon-qushi" src="/static/images/qushi-btn.png" alt="">-->
                <!--<span>趋势</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <!--弹框-->
    <div class="mask-layer" v-if="maskStatus" @click="hideModal"></div>
    <div class="drawer" v-if="maskStatus" >
      <div class="drawer-close" @click="hideModal">
        <img v-if="imageApi" :src="imageApi + '/close2.png'" alt="">
      </div>
      <div class="drawer-content">
        <div class="chart-content">
          <div class="area-title">全国成交均价趋势</div>
          <div class="car-title">{{ chartItem.sourceStyleName }}</div>
          <div class="echarts-wrap">
            <cover-view class="echarts-marsk" v-if="!chartData || chartData.length === 1">
              <cover-view>暂无数据</cover-view>
            </cover-view>
            <div class="echarts">
              <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="handleInit" ref="echarts" canvasId="demo-canvas" throttleTouch="true"  />
            </div>
          </div>
        </div>
      </div>
    </div>
    <loadingView :loadingStatus="loadingStatus"></loadingView>
  </div>
</template>

<script>/**
 * @author yuhongru
 * @data 2019/5/17 12:52
 **/

const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  import {imageApi} from "../../../http/url";

let chart = null;
  var option = {
    // tooltip: {},
    grid: {
      top: 20,
      left: 10,
      right: 20,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 10,
        color: '#888',
        formatter: '{value}月'
      },
      data: []
    },
    yAxis: [
      {
        gridIndex: 0,
        splitNumber: 5,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#e6e6e6'
          }
        },
        axisLabel: {
          fontSize: 10,
          color: '#888',
          inside: true,
          margin: 2,
          verticalAlign: 'bottom'
        },
        axisTick: {
          show: false,
        }
      }
    ],

    series: {
      name: '成交价趋势',
      symbol: "none",
      areaStyle: {
        color: 'rgba(169, 82, 62, 0.45)'
      },
      data: [100],
      type: 'line'
    }
  };
  import {fenxiang} from "../../../utils";
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import loadingView from '../../../components/loading/loading'
  export default {
    name: "index",
    data () {
      return {
        echarts,
        imageApi,
        maskStatus: false,
        loadingStatus: false,
        cityStatus: false,
        inCity: '',
        buyCity: '',
        chartItem: null
      }
    },
    components: {
      mpvueEcharts,
      loadingView
    },
    computed: {
      ...mapGetters({
        'carInfo': 'carInfo',
        'userInfo': 'userInfo',
        'realPrice': 'successPrice/realPrice',
        'chartData': 'successPrice/chartData'
      })
    },
    async mounted () {
      this.chartParamsAdress();
      this.pageInit()
    },
    methods: {
      ...mapActions({
        'getRealPrice': 'successPrice/getRealPrice',
        'getChartsData': 'successPrice/getChartsData'
      }),
      ...mapMutations({
        'SET_CARINFO': 'SET_CARINFO'
      }),
      async pageInit () {
        let params = {
          makeId: this.userInfo.manuId,
          buyCity: this.buyCity
        };
        if (this.carInfo) {
          params.modelId = this.carInfo.getCarNameId
        }
        let res = await this.getRealPrice (params);
        if (res.code === '0') {
          this.SET_CARINFO(res.data.carModel);
        }
      },
      toCarList () {
        wx.navigateTo({
          url: '/pages/app/readCar/carList/main'
        })
      },
      hideModal () {
        this.maskStatus = false
      },
      async showModal (item) {
        this.maskStatus = true;
        this.getCharts(item)
      },
      async getCharts (item) {
        this.chartItem = item;
        let params = {
          makeId: this.userInfo.manuId,
        };
        if (this.carInfo) {
          params.modelId = this.carInfo.getCarNameId
        }
        let res = await this.getChartsData({
          buyCity: this.buyCity,
          modelId: params.modelId,
          makeId: params.makeId,
          sourceStyleName: item.sourceStyleName
        });
        if (res.code === '0') {
          let months = [];
          let vals = [];
          this.chartData.forEach((item) => {
            months.push(item.month);
            vals.push(item.avageDealPrice)
          });
          if (months.length > 0 && vals.length > 0) {
            option.xAxis.data = months;
            option.series.data = vals;
          } else {
            // 此处赋值为了空值展示出图标Y轴
            option.xAxis.data = [1,2,3,4,5,6,7,8,9,10,11,12];
            option.series.data = [100];
          }
          this.initChart()
        }
      },
      initChart () {
        this.$nextTick(() => {
          this.$refs.echarts.init()
        })
      },
      chartParamsAdress () {
        let zxCity = ['北京', '上海', '重庆', '天津'];
        let includeStatus =  zxCity.includes(this.userInfo.provinceName);
        if (includeStatus) {
          this.inCity = this.userInfo.provinceName
        } else {
          let str = this.userInfo.cityName.slice(0, -1);
          this.inCity = str
        }
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
      swichCity(city) {
        if (city) {
          this.buyCity = city;
          this.cityStatus = true;
          this.pageInit()
        } else {
          this.buyCity = '';
          this.cityStatus = false;
          this.pageInit()
        }
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onShow () {
      this.buyCity = '';
      this.pageInit();
      this.cityStatus=false
    },
    onUnload: function() {
      // 本页销毁时 清空carInfo 防止影响其他地方 因为 carList 为公用
      this.SET_CARINFO(null);
    },
  };
</script>

<style scoped lang="sass">
  .hidden
    overflow: hidden
    position: fixed
    top: 0
    left: 0
    width: 100%
    max-height: 100%
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
  .page-content
    margin: 0 40rpx
    margin-top: 40rpx
    background-color: #fff
    min-height: 81vh
    .page-nav-content
      display: flex
      padding: 0 40rpx
      height: 100rpx
      border-bottom: 2rpx solid #eeee
      .page-nav-item
        padding: 0 10rpx
        color: #333
        line-height: 98rpx
        margin-right: 100rpx
        font-weight: 500
        font-size: 30rpx
        &.active
          border-bottom: 4rpx solid #555
    .page-list-content
      padding: 0 40rpx
      .page-list-tip
        font-size: 26rpx
        font-weight: 400
        line-height: 70rpx
        color: rgba(236,165,27,1)
      .page-list-warp
        padding-bottom: 1rpx
      .page-list-item
        border-bottom: 2rpx solid #eee
        margin-bottom: 24rpx
        .page-list-top
          .car-name
            line-height: 40rpx
            font-size: 30rpx
            color: #222
            font-weight: 500
        .page-list-btm
          margin-top: 16rpx
          padding-bottom: 28rpx
          position: relative
          ul
            display: flex
            li
              margin-right: 60rpx
              .item-title
                font-size: 24rpx
                color: #888
              .item-price
                font-size: 30rpx
                color: #d75335
                &.item-zhidao
                  color: #333
                &.no-data
                  color: #aaa
        .charts-show
          position: absolute
          right: 0
          bottom: 34rpx
          font-size: 24rpx
          color: #888
          line-height: 28rpx
          span
            vertical-align: middle
          .icon-qushi
            vertical-align: middle
            $size: 28rpx
            width: $size
            height: $size
            margin-right: 8rpx


  .chart-content
    padding: 0 40rpx
    .echarts-wrap
      margin-top: 30rpx
      height: 480rpx
      margin-bottom: 80rpx
      position: relative
      .echarts-marsk
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        font-size: 30rpx
        color: #888
        z-index: 10
        width: 100%
        height: 100%
        top: 0
        left: 0
      .echarts
        height: 100%
        width: 100%
        position: relative
        z-index: 1
    .area-title
      font-size: 48rpx
      font-weight: 500
      color: #333
      padding-top: 72rpx
      padding-bottom: 30rpx
      text-align: center
    .car-title
      color: #555
      font-size: 36rpx
      line-height: 52rpx

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
    position: fixed
    z-index: 9999
    width: 670rpx
    top: 180rpx
    left: 0
    right: 0
    margin: 0 auto
    background-color: #fff
    .drawer-close
      position: absolute
      left: 0
      right: 0
      margin: 0 auto
      bottom: -120rpx
      $closeSize: 80rpx
      width: $closeSize
      height: $closeSize
      img
        width: 100%
        height: 100%

</style>
<style scoped lang="scss">
  .default_img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100rpx;
    padding-bottom: 100rpx;
    img {
      width: 380rpx;
      height: 288rpx;
    }
    .default_disc {
      font-size: 30rpx;
      color: #888;
    }
  }
</style>
