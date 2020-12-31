<template>
  <div class="home" >
    <loadingView :loadingStatus="loadingStatus"></loadingView>
    <!-- 标题内容 -->
    <div :class="[loadingStatus ? 'meizhaole' : '']">
      <div class="title">
        <div class="title-info">
          <div class="title-info-img">
            <img v-if="imageApi" :src="imageApi+'/header-man.png'" alt="">
          </div>
          <div class="title-info-admin" v-if="userInfo">
            <span class="info-admin-name">{{ userInfo ? userInfo.userName : "" }}&nbsp;{{ userInfo ? userInfo.phone : '' }}</span>
            <span class="info-admin-position">{{ userInfo ? userInfo.roleName : '' }}</span>
          </div>
        </div>
        <div class="title-quit" @click="logout">退出</div>
      </div>
      <!-- 工作概况 -->
      <ul class="achieve" v-if="roleInfo && (roleInfo.totalFollowedCust < 10000 || roleInfo.followedCust < 100000)">
        <li>
          <span class="achieve-num"><i>{{ roleInfo ? roleInfo.totalFollowedCust : '--' }}</i>位</span>
          <span class="achieve-txt">总接待量</span>
        </li>
        <li>
          <span class="achieve-num"><i>{{ roleInfo ? roleInfo.followedCust : '--'  }}</i>位</span>
          <span class="achieve-txt">总成交量</span>
        </li>
        <li>
          <span class="achieve-num"><i>{{ followedRate }}</i>%</span>
          <span class="achieve-txt">总成交率</span>
        </li>
      </ul>
      <!-- qingbo测试 -->
      <ul class="achieve achieve-special" v-else-if="roleInfo">
        <li>
          <span class="achieve-txt">总接待量</span>
          <span class="achieve-num"><i>{{ roleInfo ? roleInfo.totalFollowedCust : '--' }}</i>位</span>
        </li>
        <li>
          <span class="achieve-txt">总成交量</span>
          <span class="achieve-num"><i>{{ roleInfo ? roleInfo.followedCust : '--'  }}</i>位</span>
        </li>
        <li>
          <span class="achieve-txt">总成交率</span>
          <span class="achieve-num"><i>{{ followedRate }}</i>%</span>
        </li>
      </ul>
      <!-- 任务目标 -->
      <block v-if="roleInfo">
        <div class="application">
          <div class="application-title">
            <span class="application-title-pot"></span>
            <span class="application-title-txt">应用管理</span>
          </div>
          <ul class="application-box">
            <li @click="toApp(service)"  v-for="(service, index) in roleInfo.service" :key="service.serviceName">
              <span class="application-box-img"><img :src="service.mpIcon" alt=""></span>
              <p>
                <span class="application-box-mainTitle">{{ service.serviceName }}</span>
              </p>
            </li>
          </ul>
        </div>
      </block>
    </div>
  </div>
</template>
<script>
  const routers = {
    mp_kqhx: '/pages/app/portrait/main?type=&', // 客群画像
    mp_cgkqhx: '/pages/app/portrait/main?type=1&', // 成功客群
    mp_zbkqhx: '/pages/app/portrait/main?type=2&', // 战败客群
    mp_lzyj: '/pages/app/stayFiles/main?', // 留资业绩
    mp_xsyj: '/pages/app/salePerformance/main?', // 销售业绩
    mp_zbbb: '/pages/app/defeatReport/main?', // 战败报表
    mp_xskq: '/pages/app/salesGroup/main?', // 销售客群
    mp_kltj: '/pages/app/guestFlow/main?'  // 客流统计
  };
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {imageApi} from "../../http/url";
import http from "../../http/api";
  import loadingView from '../../components/loading/loading'
export default {
  data () {
    return {
      imageApi,
      loadingStatus: true
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'roleInfo': 'roleInfo'
    }),
    followedRate () {
      if (this.roleInfo) {
        if (this.roleInfo.totalFollowedCust === 0) {
          return 0
        }
        return (Math.round(this.roleInfo.followedCust / this.roleInfo.totalFollowedCust * 10000) / 100).toFixed(2);
      }
      return 0
    }
  },
  components: {
    loadingView
  },
  mounted () {

  },
  onLoad () {

    this.pageInit()
  },
  methods: {
    ...mapActions({
      'getRoleInfo': 'getRoleInfo',
    }),
    ...mapMutations({

      'changeSelect': 'changeSelect'
    }),
    async pageInit () {
      this.loadingStatus = true;
      let res = await this.getRoleInfo({
        platform: 'mp'
      });
      if (this.userInfo.targetType === 'A' || this.userInfo.targetType === 'M'){
        this.getAllRedis()
      }
      this.loadingStatus = false
    },
    async getAllRedis(){
      const res = await http.post('/fsi/getAllFoursInfo',{
        manuId: this.userInfo.manuId,
        type:1
      });
      console.log(this.activeIndex);
      this.changeSelect({
        redis: res.data,
        item: null,
        foursId: null,
        type:'all',
        labelName: '全部经销商'
      })
    },
    logout() {

      wx.reLaunch({
        url: '../login/main'
      });
      // this.resetStore();
      // let pages = getCurrentPages();
    },
    toApp (service) {
      wx.navigateTo({
        url: routers[service.serviceCode] + 'serviceName=' + service.serviceName
      })
    },
    onShow() {
      // this.loadingStatus = true;
      this.pageInit()
      console.log('出现')
    },
    onHide () {
      this.loadingStatus = false;
      console.log('隐藏')
    },
    onUnload () {
      this.loadingStatus = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .meizhaole {
    opacity: 0;
  }
.home {
  padding: 40rpx;
}
// 头部标题
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-info {
  display: flex;
  align-items: center;
}
.title-info-img {
  margin-right: 20rpx;
  width: 72rpx;
  height: 72rpx;
}
.title-info-img img {
  width: 100%;
  height: 100%;
}
.title-info-admin {
  display: flex;
  flex-direction: column;
}
.title-info-admin .info-admin-name {
  display: inline-block;
  font-size:30rpx;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:30rpx;
  font-family:PingFangSC-Regular;
  margin-bottom: 12rpx;
}
.title-info-admin .info-admin-position {
  display: inline-block;
  width:104rpx;
  height:30rpx;
  line-height: 30rpx;
  text-align: center;
  background:rgba(255,68,63,1);
  border-radius:20rpx;
  font-size:20rpx;
  font-family:SourceHanSansCN-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.title-quit {
  width:108rpx;
  height:50rpx;
  line-height: 50rpx;
  border-radius:26rpx;
  text-align: center;
  border:4rpx solid rgba(68,68,68,1);
  font-size:24rpx;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(68,68,68,1);
}
// 工作概况
.achieve {
  margin-top: 54rpx;
  margin-bottom: 48rpx;
  padding: 46rpx 40rpx;
  background:rgba(56,57,79,1);
  border-radius:16rpx;
  display: flex;
  justify-content: space-between;
}
.achieve li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.achieve li .achieve-num {
  height: 70rpx;
  line-height: 70rpx;
  margin-bottom: 20rpx;
  font-size:28rpx;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.achieve li .achieve-num i {
  display: inline-block;
  font-size:70rpx;
  font-family:Arial-BoldMT;
  font-weight:normal;
  color:rgba(255,255,255,1);
  margin-right: 4rpx;
}
.achieve li .achieve-txt {
  font-size:24rpx;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
}
// 工作概况2
.achieve-special {
  margin-top: 54rpx;
  margin-bottom: 48rpx;
  padding: 46rpx 40rpx;
  background:rgba(56,57,79,1);
  border-radius:16rpx;
  display: flex;
  flex-wrap: wrap;
}
.achieve-special li {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.achieve-special li:nth-of-type(1){
  margin-bottom: 58rpx;
  width: 100%;
}
.achieve-special li:nth-of-type(2){
  width: 50%;
}
.achieve-special li:nth-of-type(3){
  width: 50%;
}
.achieve-special li .achieve-num {
  margin-bottom: 0;
  margin-top: 26rpx;
}
// 任务列表
.application-title {
  margin-bottom: 56rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.application-title-pot {
  margin-right: 20rpx;
  width:8rpx;
  height:32rpx;
  background:rgba(255,68,63,1);
  border-radius:4rpx;
}
.application-title-txt {
  font-size:32rpx;
  font-family:SourceHanSansCN-Medium;
  font-weight:500;
  color:rgba(34,34,34,1);
}

.application-box {
  display: flex;
  flex-wrap: wrap;
}
.application-box li {
  margin-bottom: 50rpx;
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.application-box li .application-box-img {
  width: 72rpx;
  height: 72rpx;
}
.application-box li .application-box-img img {
  width: 72rpx;
  height: 72rpx;
}
.application-box li p {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 12rpx;
  height: 60rpx;
}
.application-box li p .application-box-mainTitle {
  display: block;
  height: 24rpx;
  font-size:24rpx;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#444444;
  text-align: center;
}
.application-box li p .application-box-subTitle {
  display: block;
  height: 24rpx;
  font-size:24rpx;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#AAAAAA;
  text-align: center;
}
// 中间间隔
  .line {
    width:100%;
    height:20rpx;
    background:rgba(245,245,245,1);
    margin-bottom: 52rpx;
  }
  .application-content span {
    display: block;
    line-height: 54rpx;
    font-size:30rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    opacity:1;
  }
</style>
