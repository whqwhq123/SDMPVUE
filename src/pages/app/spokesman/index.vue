<template>
  <div style="height: 100%">
    <!--车主代言-->
    <div v-if="activityStatus" >
       <div class="spo-header" v-if="imageApi" :style="{ backgroundImage: 'url(' + imageApi + '/spokes_header_bg.png' + ')'}">
        <div>
          <span class="title-1">车主代言人</span>
          <span class="title-2">转介绍集客利器</span>
        </div>
      </div>
      <div class="spo-box">
        <div class="spo-box-header">
          <div class="tit-1">一大波客户即将来袭！</div>
          <div class="tit-2">将您的专属二维码或链接发给您的客户</div>
        </div>
        <div class="spo-code-image">
          <img v-if="saasApi && userInfo" :src="codeImgUrl || ''" alt="">
        </div>
        <div class="spo-box-action">
          <div class="spo-box-action-btn" @click="toOtherSmallApp">
            <img v-if="imageApi" :src="imageApi + '/weChart.png'" alt="">
            <div class="btn-text">发给客户</div>
          </div>
        </div>
      </div>

      <div class="spo-customer">
        <ul class="spo-customer-group">
          <li class="spo-customer-item">
            <div class="customer-num">{{proxyPersonCount}}人</div>
            <div class="customer-tit">代言人</div>
          </li>
          <li class="spo-customer-item">
            <div class="customer-num">{{participantsCount}}人</div>
            <div class="customer-tit">转介绍</div>
          </li>
          <li class="spo-customer-item">
            <div class="customer-num">{{purchaseCount}}人</div>
            <div class="customer-tit">成交</div>
          </li>
        </ul>
        <div class="to-customer-action">
          <button class="the-btn" @click="toCustomerList" :style="{background:getColor.bgColor,color:getColor.color}">查看客户</button>
        </div>
      </div>
    </div>
    <div v-if="noDataStatus" class="no_car" :style="{ backgroundImage: 'url(' + imageApi + '/spokes_header_bg.png' + ')'}">
      <img v-if="imageApi" class="image-tip" :src="imageApi+ '/spokeman-nodata.png'" alt="">
      <div class="no_reperset">尚未开通</div>
      <div class="no_reperset-small">
        请登录店内<span>PC端后台</span>创建活动
      </div>
    </div>

  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/22 10:05
   **/
  //import { saasApi, imageApi } from "../../../http/url"
  import { saasApi, imageApi } from "../../../http/url"
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        saasApi,
        imageApi,
        proxyPersonCount: 0,
        participantsCount: 0,
        purchaseCount: 0,
        activityId: 0,
        activityStatus: false,
        noDataStatus: false
      }
    },
    computed: {
      ...mapGetters({
        "userInfo": "userInfo",
        'vi':'vi'
      }),
      codeImgUrl() {
        var state = this.$store.state
        return saasApi + 'weixin/qr.jpg?body=' + state.userInfo.foursId + ',' + 3 + ','+  state.userInfo.userId + ',' +  state.userInfo.phone + ',' + this.activityId + '&type=mp_spoken_man'
      },
      getColor(){
        return this.vi.all.pageBtn
      }
    },
    onShow () {
      this.activityStatus = false;
      this.noDataStatus = false;
      mpvue.setNavigationBarTitle({
        title: this.userInfo.foursName,
      })
      this.getSpokesmanInfo()
    },
    onLoad(){
      console.log(this.vi.all)
    },
    methods: {
      ...mapActions({
        'getSpokesmanInfoReq': 'spokesman/getSpokesmanInfoReq'
      }),
      async getSpokesmanInfo () {
        let res = await this.getSpokesmanInfoReq({
          foursId: this.userInfo.foursId,
          salesmanId: this.userInfo.userId
        })
        if (res.code === 0) {
          this.proxyPersonCount = res.data.proxyPersonCount
          this.participantsCount = res.data.participantsCount
          this.purchaseCount = res.data.purchaseCount
          this.activityId = res.data.activityId || 0
          if (res.data.activityId) {
            this.activityStatus = true;
            this.noDataStatus = false;
          }else {
            this.activityStatus = false;
            this.noDataStatus = true;
          }
        }
      },
      /**
       * 跳转留资小程序
       * @param scene  4S店 类型 销售ID 报价单ID
       * */
      toOtherSmallApp () {
        let that = this
        let params = [that.userInfo.foursId, 3, that.userInfo.userId, that.userInfo.phone, that.activityId].join()
        mpvue.navigateToMiniProgram({
          appId: 'wxb531f813eaa2c2ea',
          path: '/pages/sell/index?scene='+ params,
          // envVersion: 'trial',
          success (res) {
            console.log('跳转c端销售落地页',res, params)
          }
        })
      },
      toCustomerList () {
        mpvue.navigateTo({
          url: '/pages/user/main',
        })
      },

    }

  }
</script>

<style scoped lang="scss">
  .spo-header{
    width: 100%;
    padding-top: 56rpx;
    box-sizing: border-box;
    text-align: center;
    height: 240rpx;
    font-size: 36rpx;
    background-size: cover;
    .title-1 {
      color: #CDB698;
    }
    .title-2 {
      color: #fff;
    }
  }
  .spo-box{
    width: 654rpx;
    height: 704rpx;
    margin: 0 auto;
    margin-top: -100rpx;
    border-radius: 32rpx;
    border:2rpx solid rgba(242,242,242,1);
    background-color: #fff;
    .spo-box-header{
      padding-top: 54rpx;
      line-height: 1;
      text-align: center;

      .tit-1 {
        font-size: 36rpx;
        color: #1A1A1A;
        margin-bottom: 34rpx;
      }
      .tit-2 {
        color: #767676;
        font-size: 30rpx;
      }
    }
    .spo-code-image{
      width: 310rpx;
      height: 310rpx;
      margin: 0 auto;
      margin-top: 46rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .spo-box-action{
      height: 146rpx;
      margin-top: 54rpx;
      padding-top: 1rpx;
      .spo-box-action-btn{
        width: 100%;
        height: 100%;
        border: none;
        padding-top: 30rpx;
        box-sizing: border-box;
        background-color: #F7F7FA;
        border-radius:32rpx;
        text-align: center;
        line-height: 1;
        img {
          display: block;
          width: 65rpx;
          height: 55rpx;
          margin: 0 auto;
        }
        .btn-text{
          color: #767676;
          font-size: 26rpx;
          margin-top: 16rpx;
        }
      }
    }
  }

  .spo-customer-group{
    width: 654rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .spo-customer-item{
      width: 164rpx;
      text-align: center;
    }
    .customer-num{
      font-size: 40rpx;
      color: #1a1a1a;
      margin-top: 64rpx;
    }
    .customer-tit {
      margin-top: 48rpx;
      margin-bottom: 64rpx;
      color: #767676;
      font-size: 24rpx;
    }
  }
  .to-customer-action{
    width: 654rpx;
    display: block;
    line-height: 84rpx;
    margin: 0 auto;
    margin-bottom: 192rpx;
    .the-btn {
      background-color: #1A1A1A;
      border-radius: 42rpx;
      color: #fff;
      font-size: 28rpx;
    }
  }
  .no_car{
    /*display: flex;*/
    height: 100%;
    padding-top: 88rpx;
    box-sizing: border-box;
    background-color: #202020;
    background-repeat: no-repeat;
    background-size: 100% auto;
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    .image-tip{
      display: block;
      width: 654rpx;
      height: 886rpx;
      margin: 0 auto;

    }
  }
  .no_reperset{
    font-size: 48rpx;
    color: #CDB698;
    margin-top: 60rpx;
    margin-bottom: 40rpx;
    text-align: center;
  }
  .no_reperset-small{
    font-size: 28rpx;
    color: #fff;
    text-align: center;
    span{
      color: #CDB698;
    }
  }
</style>
