<template>
<div>
    <div class="address-pick" v-if="userInfo.targetType === 'A' || userInfo.targetType === 'M'">
      <shop-select></shop-select>
    </div>
    <div class="date-pick">
      <date-pick @selectedTimes="getTime"></date-pick>
    </div>
    <div class="defeatReport">
    <!-- 标题 -->
    <div class="application">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">战败数据</span>
      </div>
      <div class="application-detail">
        <span @click="checkDetail">查看详情&nbsp;></span>
      </div>
    </div>
    <!-- 战败数据 -->
    <ul class="achieve" v-if="defeatData.total < 10000 || defeatData.failTotal < 10000">
      <li>
        <span class="achieve-num"><i>{{defeatData.total}}</i>位</span>
        <span class="achieve-txt">接待人数</span>
      </li>
      <li>
        <span class="achieve-num"><i>{{defeatData.failTotal}}</i>位</span>
        <span class="achieve-txt">战败人数</span>
      </li>
      <li>
        <span class="achieve-num"><i>{{defeatData.closeRate}}</i>%</span>
        <span class="achieve-txt">战败率</span>
      </li>
    </ul>
    <ul class="achieve achieve-special" v-else>
      <li>
        <span class="achieve-txt">接待人数</span>
        <span class="achieve-num"><i>{{defeatData.total}}</i>位</span>
      </li>
      <li>
        <span class="achieve-txt">战败人数</span>
        <span class="achieve-num"><i>{{defeatData.failTotal}}</i>位</span>
      </li>
      <li>
        <span class="achieve-txt">战败率</span>
        <span class="achieve-num"><i>{{defeatData.closeRate}}</i>%</span>
      </li>
    </ul>
    <div class="line"></div>
    <!-- 战败因素分析 -->
    <div class="application">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">战败因素分析</span>
      </div>
      <div class="application-echart application-echart-pie" v-if="componentStatus">
        <defeated-factor :chartParams="listParams"></defeated-factor>
      </div>
    </div>
    <div class="line" v-if="isShowFeature"></div>
    <!-- 客群特征分析 -->
    <div class="application" v-if="isShowFeature">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">客群特征分布</span>
      </div>
      <div class="application-content">
        <span>{{featureTxt}}</span>
      </div>
      <div class="application-echart">
        <ul>
          <li v-for="(item, index) in featureList" :key="index">
            <p class="application-echart-left"><img :src="item.url" alt=""></p>
            <p class="application-echart-right">
              <span class="echart-right-title">{{item.title}}</span>
              <span class="echart-right-box">
                <i v-bind:style="{'background-color': item.color, 'width': item.num + '%'}"></i>
                <strong v-bind:style="{'color': item.color, 'right': (80 - item.num) + '%'}" v-if="item.num < 90">{{item.num}}%</strong>
                <strong v-bind:style="{'color': item.color, 'right': '0', 'bottom': '20rpx'}" v-else>{{item.num}}%</strong>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {fenxiang} from "../../../utils";
import { mapGetters, mapActions, mapMutations } from 'vuex'
import datePick from '../datePick/index'
import shopSelect from '../shopSelect/index'
import defeatedFactor from '../../../components/defeatedReport/defeatedFactor/index'
import http from '../../../http/api'
import {imageApi} from "../../../http/url";

export default {
  components: {
    defeatedFactor,
    shopSelect,
    datePick
  },
  data () {
    return {
      isShowFeature: false,
      featureList: [],
      featureListBase: [
        {
          title: '精打细算型',
          num: 0,
          url: imageApi +'/feature1.png',
          picName: 'feature1',
          color: '#6E7275',
          index: 1
        },
        {
          title: '实用经济型',
          num: 0,
          url: imageApi +'/feature2.png',
          picName: 'feature2',
          color: '#F9A001',
          index: 2
        },
        {
          title: '理性平衡型',
          num: 0,
          url: imageApi +'/feature3.png',
          picName: 'feature3',
          color: '#7F6154',
          index: 3
        },
        {
          title: '体验先导型',
          num: 0,
          url: imageApi +'/feature4.png',
          picName: 'feature4',
          color: '#38394F',
          index:4
        },
        {
          title: '极致尊享型',
          num: 0,
          url: imageApi +'/feature5.png',
          picName: 'feature5',
          color: '#FF443F',
          index: 5
        }
      ],
      defeatData: {},
      listParams: {},
      factorEchartTxt: '',
      childrenEchartData: [],
      childrenEchartX: [],
      componentStatus: false,
      featureTxt: ''
    }
  },
  computed: {
  ...mapGetters({
    "userInfo": "userInfo",
    'dateTime': 'dateTime',
    'areaInfo': 'areaInfo',
    'count':'count'
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.initParams()
      this.componentStatus = true
      this.factorInit()
      this.factorFeatureInit()
    })
  },
  methods: {
    ...mapMutations({
      changeTime: 'changeTime',
      changeSelect: 'changeSelect',
      'changeCount':"changeCount"
    }),
    ...mapActions({
      'getFactor': 'defeatReportModule/getFactor',
      'getFactorFeature': 'defeatReportModule/getFactorFeature',
      'getFactorEchart': 'defeatReportModule/getFactorEchart'
    }),
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
    initParams () {
      console.log('-------初始化数据--------')
      console.log(this.userInfo)
      console.log(this.areaInfo)
      this.listParams.userPhone = this.userInfo.phone
      this.listParams.foursId = this.userInfo.foursId
      this.listParams.roleCode = this.userInfo.roleCode
      this.listParams.startTime = this.dateTime.start
      this.listParams.endTime = this.dateTime.end
      let roleKey = '';
      let foursId = '';
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
      this.listParams.roleKey = roleKey;
      this.listParams.foursId = foursId;
    },
    async factorInit () {
      let res =  await this.getFactor(this.listParams);
      if (res.code == 0 ){
        this.defeatData = res.data[0]
      }
    },
    async factorFeatureInit () {
      let featureParams = {}
      featureParams.tradeStatus = '2' // 战败
      featureParams.foursId = this.userInfo.foursId
      featureParams.type = '1' // 汽车
      featureParams.time = `${this.dateTime.start},${this.dateTime.end}`
      let roleKey = '';
      let foursId = '';
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
      featureParams.roleKey = roleKey;
      featureParams.foursId = foursId;
      let res =  await this.getFactorFeature(featureParams);
      if (res.code == 0 ){
        this.featureList = []
        this.featureTxt = res.data.StrategyModel.modelDetail
        let featureData = res.data.statistics
        for (let i = 0; i < featureData.length; i++) {
          for (let j = 0; j < this.featureListBase.length; j++) {
            if (featureData[i].characteristic == this.featureListBase[j].title) {
              this.featureListBase[j].num = Number(featureData[i].number)
              this.featureList.push(this.featureListBase[j])
            }
          }
        }
        this.isShowFeature = true
      } else {
        this.isShowFeature = false
      }
    },
    getTime (val) {
    },
    checkDetail () {
      let param = {}
      param.userPhone = this.userInfo.phone
      param.roleCode = this.userInfo.roleCode
      param.startTime = this.dateTime.start
      param.endTime = this.dateTime.end
      let roleKey = '';
      let foursId = '';
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
      param.roleKey = roleKey
      param.foursId = foursId
      param = JSON.stringify(param)
      wx.navigateTo({
        url: '../../app/defeatDetail/main?param=' + param
      })
    }
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  onLoad (op) {
    this.defeatData = {}
    wx.setNavigationBarTitle({
      title: op.serviceName
    });
  },
  onShow () {
    this.listParams.startTime = this.dateTime.start
    this.listParams.endTime = this.dateTime.end
    this.initParams()
    this.factorInit()
    this.factorFeatureInit()
  },
  onUnload() {
    this.getAllRedis();
    this.changeTime(null)
  },
}
</script>
<style lang="scss" scoped>
.defeatReport {
  padding: 0 40rpx 40rpx 40rpx;
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
  font-weight:bold;
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
  // height: 160rpx;
  border-radius:16rpx;
  background: linear-gradient(50deg,rgba(56,57,79,1) 0%,rgba(34,34,34,1) 100%);
}


.application-echart {
  margin: 40rpx 0;
  margin-bottom: 48rpx;
  width: 100%;
  // height: 482rpx;
}
.application-echart ul li {
  margin-bottom: 50rpx;
  display: flex;
  align-items: center;
}
.application-echart ul li .application-echart-left {
  margin-right: 8rpx;
  width: 72rpx;
  height: 72rpx;
}
.application-echart ul li .application-echart-left img {
  width: 72rpx;
  height: 72rpx;
}
.application-echart ul li .application-echart-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.application-echart ul li .application-echart-right .echart-right-title {
  margin-bottom: 8rpx;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(56,57,79,1);
  opacity:1;
}
.application-echart ul li .application-echart-right .echart-right-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 16rpx;
  background: #EEEEEE;
  border-radius: 34rpx;
}
.application-echart ul li .application-echart-right .echart-right-box i {
  // margin-right: 20rpx;
  display: inline-block;
  width: 20rpx;
  height: 16rpx;
  background: red;
  border-radius: 34rpx;
}
.application-echart ul li .application-echart-right .echart-right-box strong {
  position: absolute;
  margin-left: 20rpx;
  font-size:28rpx;
  font-family:Source Han Sans CN;
  font-weight:bold;
  color:rgba(110,114,117,1);
  opacity:1;
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
  .date-pick {
    margin-bottom: 40rpx;
  }
</style>
