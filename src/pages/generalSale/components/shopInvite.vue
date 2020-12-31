<template>
  <div >
    <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
      <swiper-item class="swiper-item">
        <div class="card" style="box-shadow:0px 20px 60px rgba(0,0,0,0.08);">
          <div class="sub-tit">集客留资 潜客互动</div>
          <div class="tit">到店邀请函</div>
          <div class="data-pannel">
            <div class="today-data">
              <div class="today-data-tit">今日预约到店</div>
              <div class="today-data-num"><span class="today-data-big-num">{{todayCount}}</span>人</div>
            </div>
            <div class="all-data">
                <span>预约总人数</span>
                <span class="all-data-num">{{totalCount}}人</span>
            </div>
            <div class="action">
              <button class="share-btn" @click="toList">预约列表</button>
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item class="swiper-item" v-for="item in dataList" :key="item.inviteId">
        <div class="card">
          <div class="sub-tit">集客留资 潜客互动</div>
          <div class="tit">到店邀请函</div>
          <div
            class="banner-image"
            :style="{backgroundImage:'url(' + item.invitePic + ')'}"
          ></div>
          <div class="banner-title">{{item.picTitle}}</div>
          <div class="action">
            <button class="share-btn" @click="toCMiniPro(item)">分享</button>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <!-- <div class="card-warp">
      
    </div> -->

  
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {imageApi} from "../../../http/url";
import http from '../../../http/api'
export default {
  data() {
    return {
      dataList: [],
      todayCount: 0,
      totalCount: 0
    };
  },
  computed: {
      ...mapGetters({
        'vi': 'vi',
        'loginInfo': 'userInfo',

      })
  },
  onLoad () {
    console.log('shopInvite load')
    this.getAppointmentCountReq()
    this.getInviteActivityListReq()
  },
  onShow() {
    console.log('shopInvite show', this.loginInfo)
    this.getAppointmentCountReq()
    this.getInviteActivityListReq()
  },
  methods: {
    ...mapActions({
      getAppointmentCount: 'shopInvite/getAppointmentCount',
      getInviteActivityList: 'shopInvite/getInviteActivityList',
      
    }),
    ...mapMutations({
      setShareParams: 'user/setShareParams',
    }),
    toCMiniPro(item) {
      this.setShareParams({
        shareTitle: item.picTitle,
        shareDisc: item.invitePic
      })
      wx.navigateTo({
        url: '/pages/generalSale/shopInviteShare/main?id=' + item.inviteId + '&salesman=' + this.loginInfo.userId
      })
    },
    toList () {
      wx.navigateTo({
        url: '/pages/generalSale/shopInvite/main'
      })
    },
    // 获取邀约数据
    async getAppointmentCountReq () {
      let res = await this.getAppointmentCount({
        salesman: this.loginInfo.userId
      })
      if (res.code === 0) {
        this.todayCount = res.data.todayCount
        this.totalCount = res.data.totalCount
      }
      console.log('getAppointmentCountReq', res)
    },
    async getInviteActivityListReq() {
      let res = await this.getInviteActivityList ({
        foursId: this.loginInfo.foursId
      })
      if (res.code === 0) {
        this.dataList = res.data
      }
    }
  }
};
</script>

<style scoped>
.swiper_scope {
  height: 1032rpx;
}
.swiper-item {
  box-sizing: border-box;
  /* padding: 54rpx 40rpx; */
  margin-top: 54rpx;
  overflow: visible;
  /* box-shadow: 0px 20rpx 60rpx 0px rgba(0,0,0,0.08); */
}
.card {
  padding: 32rpx 30rpx 48rpx 30rpx;
  margin-right: 16rpx;
  border-radius:26rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
}
.sub-tit {
  font-size: 28rpx;
  color: #444;
  line-height: 1;
  margin-bottom: 20rpx;
}
.tit {
  font-size: 50rpx;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 48rpx;
}
.banner-image {
  width: 670rpx;
  display: block;
  margin: 0 -30rpx;
  height: 421.65rpx;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.banner-title {
  margin-top: 24rpx;
  margin-bottom: 74rpx;
  font-size: 32rpx;
  color: #333;
  line-height: 44rpx;
}
.share-btn {
  width: 320rpx;
  height: 80rpx;
  font-size: 30rpx;
  background-color: #fff;
  border: 2rpx solid #bb0a30;
  color: #bb0a30;
  border-radius: 80rpx;
}

.data-pannel{
  
}
.today-data {
  padding: 34rpx 38rpx;
  color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  background-image:linear-gradient(46deg,rgba(191,14,50,1) 0%,rgba(250,77,80,1) 100%);
}
.today-data-tit {
  font-size: 52rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
}
.today-data-num{
  line-height: 1;
  margin-top: 24rpx;
  text-align: center;
  font-size: 60rpx;
}
.today-data-big-num{
  font-size: 100rpx;

}
.all-data{
  display: flex;
  justify-content: space-between;
  font-size: 36rpx;
  color: #444;
  line-height: 120rpx;
  height: 120rpx;
  padding: 0 42rpx;
  margin-bottom: 38rpx;
  background-color: #f5f5f5;
}
.all-data-num{
  font-weight: bold;
}
.card-warp{
  padding: 54rpx 40rpx;
}
</style>
<style lang="scss" scoped>
.dot_list {
  display: flex;
  justify-content: center;
  margin-top: 40rpx;
  position: absolute;
  transform: translateX(-45rpx);
  bottom: 40rpx;
  left: 50%;
  .dot {
    width: 12rpx;
    height: 12rpx;
    background: rgba(229, 229, 229, 1);
    opacity: 1;
    border-radius: 48rpx;
    display: inline-block;
    margin-right: 12rpx;
  }
  .dot_active {
    width: 36rpx;
    height: 12rpx;
    background: rgba(153, 153, 153, 1);
    opacity: 1;
    border-radius: 48rpx;
    display: inline-block;
    margin-right: 12rpx;
    transition: all 0.5s linear;
  }
}
</style>

