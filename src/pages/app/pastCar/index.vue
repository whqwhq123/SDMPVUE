<template>
    <div class="page">
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
            <div class="list_message">
                <div class="default_img" v-if='historyCar.length == 0'>
                    <img v-if="imageApi" :src="imageApi + '/user_default.png'" alt="">
                    <span class="default_disc">暂无历代车型资料</span>
                </div>
                <div v-else>
                    <div class="list_title">
                        历代车型
                    </div>
                    <div class="post_car_mes">
                        <div class="list_item" v-for="(item, index) in historyCar" :key="item.historyYear + index">
                            <div class="list_item_name">
                                {{ item.historyYear }}
                            </div>
                            <div class="car_name">
                              {{ item.historyTitle }}
                            </div>
                            <div class="car_disc">
                               {{ item.historyContent }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {fenxiang} from "../../../utils";
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import loadingView from '../../../components/loading/loading'
  import {imageApi} from "../../../http/url";

  export default {
    data() {
      return {
        imageApi,
        dataList: []
      };
    },
    components: {
      loadingView
    },
    computed: {
      ...mapGetters({
        "carInfo": "carInfo",
        "userInfo": "userInfo",
        "historyCar": "pastCar/historyCar"
      })
    },
    methods: {
      ...mapActions({
        'getHistoryCar': 'pastCar/getHistoryCar'
      }),
      ...mapMutations({
        'SET_CARINFO': 'SET_CARINFO'
      }),
      toCarList () {
        wx.navigateTo({
          url: '/pages/app/readCar/carList/main'
        })
      },
      async pageInit () {
        let params = {
          makeId: this.userInfo.manuId,
        };
        if (this.carInfo) {
          params.modelId = this.carInfo.getCarNameId
        }
        let res = await this.getHistoryCar (params);
        if (res.code === '0') {
          this.SET_CARINFO(res.data.carModel);
        }
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onShow () {
      this.pageInit()
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
<style scoped lang="scss">
    .page-content{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .list_message{
            width: 670rpx;
            min-height:950rpx;
            background: #fff;
            padding: 48rpx 40rpx 40rpx 40rpx;
            margin-top: 40rpx;
            box-sizing: border-box;
            .list_title{
                font-size: 28rpx;
                color: #333;
                font-weight: bold;
            }
            .default_img{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-top: 100rpx;
                padding-bottom: 100rpx;
                img{
                    width: 380rpx;
                    height: 288rpx;
                }
                .default_disc{
                    font-size: 30rpx;
                    color: #888;

                }
            }
        }
        .post_car_mes{
            border-left: 1px dashed #ccc;
            margin-left: 12rpx;

            font-size: 0;
            .list_item{
                margin-left: 34rpx;
                position: relative;
                font-size: 0;
                .list_item_name{
                    color: #333;
                    font-size: 28rpx;
                    font-weight: 500;
                    margin-top: 40rpx;
                    line-height: 19rpx;
                }
                .list_item_name::before{
                    content: '';
                    display: block;
                    width: 24rpx;
                    height: 24rpx;
                    background: #D75335;
                    border-radius: 50%;
                    position: absolute;
                    left:-45rpx;
                    top:-2rpx;
                }
                .car_name{
                    color: #333;
                    font-size: 26rpx;
                    font-weight: 500;
                    margin-top: 24rpx;
                }
                .car_disc{
                    font-size:26rpx;
                    font-family:SourceHanSansCN-Normal;
                    font-weight:400;
                    color:rgba(136,136,136,1);
                    line-height:38rpx;
                    margin-top: 12rpx;
                }
            }
        }
    }
</style>

