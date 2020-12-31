<template>
  <!--车系列表-->
  <div>
    <div class="page-header">
      <div class="list-title">选择车系</div>
      <div class="list-back" @click="back">取消</div>
    </div>
    <div>
      <ul>
        <li class="car-series-item" v-for="(item, key, index) in carSeries" :key="key">
          <div class="car-series-title">{{ key }}</div>
          <ul class="car-list">
            <li class="car-item" v-for="car in item" :key="car.carName" @click="toCarChart(car)">
              <div class="car-image">
                <img :src="car.imgUrl" alt="">
              </div>
              <div class="car-text">
                <div class="car-name">{{ car.carName }}</div>
                <div class="car-price">
                  <span>指导价</span>
                  <span class="num">{{ car.msrp }}<span v-if="car.msrp">万元</span></span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @data 2019/5/9 20:56
   **/
  import {fenxiang} from "../../../../utils";
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import { SET_CARINFO } from "../../../../store/mutations_type";
  import loadingView from '../../../../components/loading/loading'
  export default {
    name: "index",
    data () {
      return {
        loadingStatus: false,
      }
    },
    computed: {
      ...mapGetters({
        'carSeries': 'readCar/carSeries',
        'userInfo': 'userInfo'
      })
    },
    components: {
      loadingView
    },
    async mounted () {
      this.loadingStatus = true;
      let res = await this.getCarSeries({
        carBrand: this.userInfo.manuId ,// 品牌Id
        foursId:this.userInfo.foursId //4s店id
      });
      this.loadingStatus= false
    },
    methods: {
      back () {
        wx.navigateBack()
      },
      toCarChart (car) {
        this.SET_CARINFO(car);
        wx.navigateBack()
      },
      ...mapActions({
        'getCarSeries': 'readCar/getCarSeries'
      }),
      ...mapMutations([
        SET_CARINFO
      ])
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    }
  };
</script>

<style scoped lang="sass">
  .page-header
    height: 112rpx
    background-color: #222
    display: flex
    line-height: 92rpx
    padding: 0 40rpx
    justify-content: space-between
  .list-title
    font-size: 48rpx
    color: #ececec
    font-weight: bold
  .list-back
    color: #888
    font-size: 30rpx

</style>
<style scoped lang="sass">
  .car-series-title
    background-color: #F5F5F5
    font-size: 26rpx
    color: #555
    line-height: 60rpx
    padding: 0 40rpx
  .car-list
    padding: 0 40rpx
    .car-item
      display: flex
      padding: 24rpx 0
      border-bottom: 2rpx solid #ECECEC
      .car-image
        img
          width: 206rpx
          height: 146rpx
      .car-text
        padding-top: 26rpx
        .car-name
          font-size: 30rpx
          color: #333
        .car-price
          margin-top: 15rpx
          font-size: 26rpx
          color: #555
          .num
            margin-left: 8rpx
            color: #D75335

</style>
