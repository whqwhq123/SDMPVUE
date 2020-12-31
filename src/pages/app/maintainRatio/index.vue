<template>
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
      <div class="page-content">
        <div class="page-charts-content">
          <div class="page-charts-title">保值率</div>
          <div class="echarts-wrap">
            <cover-view class="echarts-marsk" v-if="chartData.length === 1&&chartData[0]===80">
              <cover-view>暂无数据</cover-view>
            </cover-view>
            <div class="echarts" >
              <mpvue-echarts lazyLoad  :echarts="echarts" :onInit="handleInit" ref="echarts" canvasId="demo-canvas" throttleTouch="true"  />
            </div>
          </div>
          <div class="tip">
            *保值率计算结果仅供参考
          </div>
        </div>
        <div class="page-table-content">
          <table>
            <thead>
              <tr>
                <th class="ratio"><div>年限保值率</div></th>
                <th class="price"><div>估价</div></th>
              </tr>
            </thead>
            <tbody>
              <tr :class="[(index + 1) % 2 > 0 ? 'one' : 'two']" v-for="(item, index) in tableList" :key="index + item" v-if="index < listLimit">
                <td class="ratio">
                  <span>第{{ item.keepValueYear||index+1 }}年：</span>
                  <span>{{ item.keepValueRate || '—' }}</span><span v-if="item.keepValueRate">%</span>
                </td>
                <td :class="[item.keepValue?'price':'defaut-price']"><span>{{ item.keepValue || '—' }}</span><span v-if="item.keepValue && item.keepValue !== '暂无'">万</span></td>
              </tr>
            </tbody>
          </table>
          <div class="table-list-more" v-show="listLimit === 5" @click="getMore">
            <div>展开更多</div>
          </div>
          <div class="table-list-more" v-show="listLimit === 10" @click="cutOut">
            <div>收起</div>
          </div>
        </div>
      </div>
      <loadingView :loadingStatus="loadingStatus"></loadingView>
    </div>
</template>

<script>/**
 * @author yuhongru
 * @data 2019/5/16 14:25
 **/

const echarts = require('../../../../static/js/echarts.min.js');
  import mpvueEcharts from 'mpvue-echarts'
  import {imageApi} from "../../../http/url";

let chart = null;
  var option = {
    // tooltip: {},
    grid: {
      top: 10,
      left: 10,
      right: 20,
      bottom: 8,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 10,
        color: '#888'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E6E6E6'
        }
      },
      data: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年']
    },
    yAxis: [
      {
        gridIndex: 0,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: '#e6e6e6'
          }
        },
        axisLabel: {
          fontSize: 10,
          color: '#888',
          formatter:function(val){
            return parseInt(val)+'%';
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: true,
          areaStyle:{
            color: ['#fff', '#F5F5F5']
          }
        }
      }
    ],
    series: {
      name: '保值率',
      symbol: "none",
      data: [],
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
        tableList: [],
        chartData: [],
        listLimit: 5,
        loadingStatus: false
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
        'keepValue': 'maintainRatio/keepValue'
      })
    },
    mounted () {

    },
    methods: {
      ...mapActions({
        'getKeepValue': 'maintainRatio/getKeepValue'
      }),
      ...mapMutations({
        'SET_CARINFO': 'SET_CARINFO'
      }),

      async pageInit () {
        this.chartData = await this.getChartData();
        option.series.data = this.chartData;
        this.initChart();
      },
      toCarList () {
        wx.navigateTo({
          url: '/pages/app/readCar/carList/main'
        })
      },
      async getChartData () {
        this.loadingStatus = true;
        let params = {
          makeId: this.userInfo.manuId,
        };
        if (this.carInfo) {
          params.modelId = this.carInfo.getCarNameId
        }
        let res =  await this.getKeepValue(params);
        let arr = [];
        if (res.code === '0') {
          this.SET_CARINFO(res.data.carModel);

          if(res.data.carKeepValueList.length==0){
            arr=[80];
            this.tableList=[0,0,0,0,0,0,0,0,0,0]
          }else{
            arr = res.data.carKeepValueList.map((item) => {
                return item.keepValueRate * 100;
            })
            this.tableList = res.data.carKeepValueList.map((item) => {
              item.keepValueRate = Math.round(item.keepValueRate * 10000) / 100
              return item
            });
          }

        }
        this.loadingStatus = false;
        this.initChart()
        return arr
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
      getMore () {
        this.listLimit = 10
      },
      cutOut () {
        this.listLimit = 5
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onShow () {
      this.listLimit=5,
      this.pageInit()
    },
    onUnload: function() {
      console.log('卖点销毁');
      // 本页销毁时 清空carInfo 防止影响其他地方 因为 carList 为公用
      this.SET_CARINFO(null);
    }
  };
</script>

<style scoped>

</style>
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
  .page-content
    margin: 0 40rpx
    margin-top: 40rpx
    padding: 0 40rpx
    background-color: #fff
    .page-charts-title
      font-weight: bold
      font-size: 28rpx
      padding-top: 48rpx
      padding-bottom: 40rpx
    .echarts-wrap
      width: 100%
      height: 500rpx
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
    .tip
      margin-top: 28rpx
      margin-bottom: 32rpx
      color: #ECA51B
      font-size: 26rpx

  .page-table-content
    padding-bottom: 56rpx
    tr
      display: flex

    th,td
      height: 80rpx
      line-height: 80rpx
      text-align: center
      font-size: 26rpx
    th
      color: #fff
      background-color: #aaa
    td
      color: #444
    .ratio
      width: 276rpx
      border-right: 2rpx solid #fff
    .price
      width: 312rpx
      span
        color: #d75335
    .defaut-price
      width: 312rpx
      span
        color: #444
  td.ratio
      border-right: 2rpx solid #f5f5f5
  tbody
    .two
      background-color: #f5f5f5
    .ratio
      text-align: left
      padding-left: 48rpx
      box-sizing: border-box
  .table-list-more
    background-color: #f5f5f5
    color: #555
    font-size: 26rpx
    line-height: 80rpx
    text-align: center
    border-top: 1px solid #dedede;
</style>

