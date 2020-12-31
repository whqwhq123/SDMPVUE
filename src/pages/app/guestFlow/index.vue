<template>
<div>
  <div class="address-pick" v-if="userInfo.targetType === 'A' || userInfo.targetType === 'M'" style="width: 100%;">
    <shop-select></shop-select>
  </div>
  <div class="defeatReport">
    <div class="application" v-if="guestData">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">数据概况</span>
      </div>
      <div class="application-detail">
        <span @click="checkDetail">更多&nbsp;></span>
      </div>
    </div>
    <div class="achieve-wrap" v-if="guestData">
      <div class="achieve-title">当前在店</div>
      <ul class="achieve-current">
        <li class="achieve-current-left">{{ guestData['inStore'] || '0'}}</li>
        <li class="achieve-current-right">
          <i>累计进店</i>
          <strong>{{ guestData['sumEnter'] || '0' }}</strong>
        </li>
      </ul>
      <ul class="achieve">
        <li>
          <span class="achieve-txt">今日进店</span>
          <span class="achieve-num">{{ guestData['getInCount'] || '0' }}</span>
        </li>
        <li>
          <span class="achieve-txt">首次进店</span>
          <span class="achieve-num">{{ guestData['newPassenger'] || '0' }}</span>
        </li>
        <li>
          <span class="achieve-txt">二次进店</span>
          <span class="achieve-num">{{ guestData['oldPassenger'] || '0' }}</span>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="application" v-if="guestData">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">人流时段分布</span>
      </div>
      <ul class="application-info">
        <li>
          <span class="info-img">
            <!-- <img :src="icon1" alt=""> -->
            <img :src="imageApi+'/guestFlow-icon1.png'" alt="">
          </span>
          <p>
            <span class="info-txt">人群流量高峰区间</span>
            <span class="info-num">{{ guestData.max }}时</span>
          </p>
        </li>


        <li>
          <span class="info-img">
            <!-- <img :src="icon2" alt=""> -->
            <img :src="imageApi+'/guestFlow-icon2.png'" alt="">
          </span>
          <p>
            <span class="info-txt">平均停留时长</span>
            <span class="info-num">{{ guestData.avg }}小时</span>
          </p>
        </li>
      </ul>
      <div class="application-echart" v-if="componentStatus">
        <guestflowTrend :detailEchartX="detailEchartX" :detailData="detailData"></guestflowTrend>
      </div>
    </div>
  </div>
  <loadingView :loadingStatus="loadingStatus"></loadingView>
</div>
</template>
<script>
import {fenxiang} from "../../../utils";
import { mapGetters, mapActions, mapMutations } from 'vuex'
import datePick from '../datePick/index'
import shopSelect from '../shopSelect/index'
import guestflowTrend from '../../../components/guestflowTrend/index'
import loadingView from '../../../components/loading/loading'
import {imageApi} from "../../../http/url";

export default {
  components: {
    guestflowTrend,
    datePick,
    shopSelect,
    loadingView
  },
  data () {
    return {
      imageApi,
      guestData: null,
      defeatData: {},
      listParams: {},
      factorEchartTxt: '',
      detailEchartX: [],
      detailData: [],
      componentStatus: false,
      featureTxt: '',
      icon1: imageApi + '/feature1.png',
      icon2: imageApi + '/feature1.png',
      loadingStatus: true
    }
  },
  computed: {
    ...mapGetters({
      "userInfo": "userInfo",
      'dateTime': 'dateTime',
      "areaInfo": "areaInfo"
    })
  },
  filters: {
    filterEmpty (val) {
      return val ? val: 0
    }
  },
  mounted() {
    // this.componentStatus = true;
    // this.getGuestData();
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  methods: {
    ...mapActions({
      'getDetail': 'guestFlowModule/getDetail',
      'getGuestInfo': 'guestFlowModule/getGuestInfo'
    }),
    getTime (val) {
    },
    async getGuestData () {
      let roleKey = null;
      let foursId = null;
      if (this.userInfo.targetType === 'A' || this.userInfo.targetType === 'M'){
        if (this.areaInfo.type === 'all'){
          roleKey = this.areaInfo.redis
        }
        if (this.areaInfo.type === 'one'){
          foursId = this.areaInfo.foursId
        }
      } else {
        foursId = this.userInfo.foursId
      }
      let res =  await this.getGuestInfo({
        roleKey: roleKey,
        foursId: foursId
      });
      this.loadingStatus = false;
      this.guestData = res.data;
      // 传递给子组件的echart数据
      this.detailEchartX = []
      this.detailData = []
      res.data.data.map((val) => {
        this.detailEchartX.push(val.hour + ':00')
        this.detailData.push(val.enterCount)
      })
      this.componentStatus = true
    },
    checkDetail () {
      // let param = {}
      // param.userPhone = this.userInfo.phone
      // param.foursId = this.userInfo.foursId
      // param.roleCode = this.userInfo.roleCode
      // param.startTime = this.dateTime.start
      // param.endTime = this.dateTime.end
      // param = JSON.stringify(param)
      wx.navigateTo({
        url: '/pages/app/passengerFlow/main'
      })
    },
  },
  onLoad (op) {

    this.getGuestData()

    wx.setNavigationBarTitle({
      title: op.serviceName
    });
  },
  onUpload () {

  },
  onHide(){
    this.componentStatus = false
    this.detailEchartX = []
    this.detailData = []
  },
  onShow () {
    console.log('-------绘制图像--------')
    console.log(this.detailEchartX)
    console.log(this.detailData)
    this.getGuestData()

  }
}
</script>
<style lang="scss" scoped>
.defeatReport {
  padding: 40rpx;
}
// 头部标题
.application {
  position: relative;
}
.application-title {
  margin-bottom: 40rpx;
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
.application-detail {
  position: absolute;
  top: 0;
  right: 0;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(255,68,63,1);
  opacity:1;
}

.achieve-wrap {
  margin-top: 54rpx;
  margin-bottom: 48rpx;
  padding: 30rpx 44rpx;
  background:rgba(56,57,79,1);
  border-radius:16rpx;
}
.achieve-title {
  margin-bottom: 14rpx;
  font-size:32rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(255,255,255,1);
  opacity:1;
}
.achieve-current {
  margin-bottom: 42rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.achieve-current .achieve-current-left {
  line-height: 104rpx;
  font-size:104rpx;
  font-family:Source Han Sans CN;
  font-weight:bold;
  color:rgba(255,255,255,1);
  opacity:1;
}
.achieve-current .achieve-current-right {
  display: flex;
  align-items: center;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(245,245,245,1);
  opacity:1;
}
.achieve-current .achieve-current-right strong {
  margin-left: 10rpx;
  display: inline-block;
  font-size:36rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(245,245,245,1);
  opacity:1;
}
.achieve {
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
  font-size:70rpx;
  font-family:Source Han Sans CN;
  font-weight:bold;
  line-height:70rpx;
  color:rgba(255,255,255,1);
  opacity:1;
}
.achieve li .achieve-txt {
  padding-bottom: 26rpx;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(255,255,255,1);
  opacity:1;
}

// 中间间隔
.line {
  width:100%;
  height:20rpx;
  background:rgba(245,245,245,1);
  margin-bottom: 40rpx;
}
.application-content {
  box-sizing: border-box;
  padding: 22rpx 40rpx 34rpx 40rpx;
  width: 100%;
  height: 160rpx;
  border-radius:16rpx;
  background: linear-gradient(50deg,rgba(56,57,79,1) 0%,rgba(34,34,34,1) 100%);
}


.application-echart {
  margin: 0 0 24rpx 0;
  margin-bottom: 48rpx;
  width: 100%;
  height: 482rpx;
}
.application-info {
  display: flex;
  justify-content: space-between;
  padding: 0 36rpx;
}
.application-info li {
  display: flex;
}
.application-info li p {
  display: flex;
  flex-direction: column;
}
.application-info li p .info-txt {
  font-size: 28rpx;
}
.application-info li p .info-num {
  font-size: 36rpx;
  font-weight: 700;
}
.application-info li .info-img {
  margin-right: 20rpx;
  width: 40rpx;
  height: 40rpx;

}
.application-info li .info-img img {
  width: 40rpx;
  height: 40rpx;
}
</style>
