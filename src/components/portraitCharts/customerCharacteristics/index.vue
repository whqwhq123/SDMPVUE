<template>
  <!--客群画像-->
  <div class="chart">
    <div class="content-echart-content" v-show="chartStatus">
      <h3><i class="tit-icon"></i><span>客群特征分布</span></h3>
      <div class="purchasing-power" v-if="modelData">
        <img v-if="imageApi" :src="imageApi + '/power-bg.png'" class="power-bg" >
        <span >
          {{ modelData.modelDetail}}
        </span>
      </div>
      <div class="content-bar-echart">
        <ul>
          <li class="line-data-item" v-for="(item, index) in listData" :key="item.name">
            <div class="line-container">
              <div class="line-header">
                <img v-if="imageApi" :src=" imageApi + '/feature'+ imageList[item.characteristic] +'.png'" alt="">
              </div>
              <div class="line-content">
                <div>
                  <span class="line-name">{{item.characteristic}}</span>
                </div>
                <div class="line-warp">
                  <div class="line-val" :style="'background-color:' + colorList[index] +'; color:' +  colorList[index] + ';width: ' + item.number + '%' ">
                    <div :class="['line-num', item.number > 90 ? 'active': '']">{{item.number}}%</div>
                  </div>
                </div>
              </div>
            </div>

          </li>
        </ul>
      </div>
      <div class="line-group">
        <div class="line-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {imageApi} from "../../../http/url";

  export default {
    name: "index",
    props: {
      chartParams: Object
    },
    data () {
      return {
        imageApi,
        modelData: null,
        colorList: ['#6E7275', '#F9A001', '#7F6154', '#38394F', '#FF443F'],
        listData: [],
        chartStatus: true,
        imageList: {
          '精打细算型': 1,
          '实用经济型': 2,
          '理性平衡型': 3,
          '体验先导型': 4,
          '极致尊享型': 5
        }
      }
    },
    components: {
    },
    mounted () {
     this.pageInit()
    },
    methods: {
      ...mapActions({
        'getUserCharacteristic': 'portrait/getUserCharacteristic'
      }),
      async pageInit () {
        let res =  await this.getUserCharacteristic(this.chartParams);
        if (res.code === 0 ){
          this.modelData = res.data.StrategyModel;
          this.listData = res.data.statistics;
        }
        if (res.code === 1 ) {
          this.chartStatus = false;
          return
        }
        if (res.code === 2 ) {
          this.chartStatus = false;
          return
        }
      },
    }
  };
</script>

<style scoped lang="sass">
  @import "../../../assets/portraitCharts/index"
  .content-echart-content
    .content-bar-echart
      height: auto
  .line-data-item
    height: 70rpx
    padding: 24rpx 0
    .line-container
      height: 100%
      display: flex
      .line-header
        margin-right: 8rpx
        img
          $size: 72rpx
          width: $size
          height: $size
          vertical-align: middle
      .line-content
        flex: 1
        span
          vertical-align: middle
          font-size: 24rpx
          color: #38394F
        .line-warp
          position: relative
          height: 16rpx
          background-color: #EEEEEE
          border-radius: 34rpx
          .line-val
            position: relative
            height: 100%
            border-radius: 34rpx
            .line-num
              position: absolute
              line-height: 16rpx
              vertical-align: middle
              right: -100rpx
              font-size: 28rpx
              &.active
                right: 0
                bottom: 40rpx



</style>
