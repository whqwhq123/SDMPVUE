<template>
  <div class="tool">
    <div class="tool-area1">
      <div class="area1-left">
        <span class="tool-title">互动留资</span>
        <span class="area1-img" v-if="imageApi">
          <img :src= "vi.home.retention.imgUrl || imageApi+'/car-icon.png'"  alt="">
        </span>
      </div>
      <ul class="area2-right">
        <li @click="turnToCapital(0)">
          <span class="area2-right-img" v-if="imageApi">
            <img :src="imageApi+'/tool-icon1.png'" alt="">
          </span>
          <span class="area2-right-txt">见面礼</span>
        </li>
        <li @click="turnToCapital(2)">
          <span class="area2-right-img" v-if="imageApi">
            <img :src="imageApi+'/tool-icon2.png'" alt="">
          </span>
          <span class="area2-right-txt">气质选车</span>
        </li>
        <li @click="turnToCapital(1)">
          <span class="area2-right-img" v-if="imageApi">
            <img :src="imageApi+'/tool-icon3.png'" alt="">
          </span>
          <span class="area2-right-txt">AR寻礼</span>
        </li>
      </ul>
    </div>
    <div class="tool-area2">
      <span class="tool-title">潜客洞察</span>
      <div class="area2-box" :style="{ backgroundColor:vi.home.insight.masterBgColor }">
        <div class="area2-bg" v-if="imageApi">
          <img :src="imageApi+'/bg.png'" alt="">
        </div>
        <div class="area2-bg2" :style="{ backgroundColor:vi.home.insight.viceBgColor}"></div>
        <ul class="area2-box-left" :style="{ color: vi.home.insight.viceColor }">
          <li>客户购买力</li>
          <li>性格画像</li>
          <div>逛店记录</div>
        </ul>
        <ul class="area2-box-right" @click="turnToInsight" :style="{ color: vi.home.insight.masterColor }">
          <li>开启</li>
          <li>洞察</li>
        </ul>
      </div>
    </div>
    <div class="tool-area3">
      <span class="tool-title">交易促单</span>
      <div class="area3-box">
        <div class="area3-box-left" @click="turnToQuote">
          <span class="area3-left-title">电子报价单</span>
          <p class="area3-left-box">
            <span>精美报价</span>
            <span>快速生成</span>
          </p>
        </div>
        <ul class="area3-box-right">
          <li class="area3-right-item1" @click="turnToActivity">
            <span class="area3-right-title">店内活动推荐</span>
            <span class="area3-right-txt">精彩活动 一键转发</span>
          </li>
          <li class="area3-right-item2" @click="turnToSpokesMan" :style="{ backgroundColor:vi.home.carSpokesman.masterBgColor, color: vi.home.carSpokesman.masterColor }">
            <span class="area3-right-title" >车主代言人</span>
            <span class="area3-right-txt">玩转集客 营销利器</span>
          </li>
        </ul>
      </div>
       <div @click="needCollect" class="select_need">需求搜集</div>
    </div>
    <div class="tool-wrap" v-if="isShowCapital">
      <!-- @closeCapital子组件启动父组件的方法 :capitalIndex向子组件传递数据 -->
      <leaveInfo @closeCapital = 'closeCapital' :capitalIndex="capitalIndex"></leaveInfo>
    </div>
    <div class="tool-wrap" v-if="isShowInsight">
      <insight></insight>
    </div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
import leaveInfo from "@/pages/leaveInfo";
import insight from "@/pages/insight";
import { mapGetters } from 'vuex'
export default {
  components: {
    leaveInfo,
    insight
  },
  name: 'index',
  data () {
    return {
      imageApi,
      isShowCapital: false,
      isShowInsight: false,
      capitalIndex: -1
    }
  },
  computed: {
    ...mapGetters({
      'vi': 'vi'
    })
  },
  methods: {
    closeCapital () {
      this.isShowCapital = false;
    },
    // 留资
    turnToCapital (index) {
      this.isShowCapital = true
      this.capitalIndex = index
    },
    // 洞察
    turnToInsight () {
      mpvue.navigateTo({
        // url: "/pages/user/main"
        url: "/pages/user/main"
      })
    },
    turnToActivity () {
      mpvue.navigateTo({
        url: '/pages/admin/recommendActivity/main'
      })
    },
    turnToQuote () {
      mpvue.navigateTo({
        url: '/pages/app/quote/edit/main'
      })
    },
    turnToSpokesMan () {
      mpvue.navigateTo({
        url: '/pages/app/spokesman/main'
      })
    },
    needCollect(){
       mpvue.navigateTo({
        url: '/pages/app/needCollect/main'
      })
    }
  },
}
</script>
<style scoped>
/* 弹层样式 */
.tool-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  z-index: 1000;
}
/* 区域一样式 */
.tool-area1 {
  display: flex;
  justify-content: space-between;
  margin-top: 64rpx;
  margin-right: 62rpx;
}
.area1-left {
  display: flex;
  flex-direction: column;
}
.area1-left .tool-title {
  margin-left: 60rpx;
  font-size:40rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.area1-left .area1-img {
  margin-top: 60rpx;
  width: 520rpx;
  height: 344rpx;
}
.area1-left .area1-img img {
  width: 520rpx;
  height: 344rpx;
  object-fit: contain;
}

.area2-right {
  height: 484rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.area2-right li {
  box-sizing: border-box;
  padding-top: 32rpx;
  padding-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 168rpx;
  height: 140rpx;
  background-color: #F2F1F6;
  border-radius: 32rpx;
}
.area2-right li img {
  height: 42rpx;
  width: 42rpx;
}
.area2-right li .area2-right-txt {
  font-size:26rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(26,26,26,1);
}
/* 区域二样式 */
.tool-area2 {
  margin: 64rpx 62rpx 64rpx 60rpx;
}
.tool-area2 .tool-title {
  display: block;
  margin-top: 64rpx;
  margin-bottom: 48rpx;
  font-size:40rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.tool-area2 .area2-box {
  overflow: hidden;
  position: relative;
  height: 208rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 28rpx 74rpx 28rpx 56rpx;
  display: flex;
  justify-content: space-between;
  background: rgba(187,10,48,1);
  border-radius:32rpx;
}
.tool-area2 .area2-box .area2-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 208rpx;
  width: 100%;
}
.tool-area2 .area2-box .area2-bg2 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 380rpx;
  width: 300rpx;
  height: 300rpx;
  border-radius: 150rpx;
  background: #1A1A1A;
}
.tool-area2 .area2-box .area2-bg img {
  height: 208rpx;
  width: 100%;
}
.tool-area2 .area2-box .area2-box-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size:28rpx;
  font-weight:bold;
}
.tool-area2 .area2-box .area2-box-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20rpx 0;
  font-size:40rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(250,250,250,1);
  z-index: 1000;
}
/* 区域三样式 */
.tool-area3 {
  margin: 64rpx 62rpx 64rpx 60rpx;
  padding-bottom: 150rpx;
}
.tool-area3 .tool-title {
  display: block;
  margin-top: 64rpx;
  margin-bottom: 48rpx;
  font-size:40rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.tool-area3 .area3-box {
  display: flex;
  justify-content: space-between;
}
.tool-area3 .area3-box .area3-box-left {
  width: 284rpx;
  height: 260rpx;
  box-sizing: border-box;
  padding: 32rpx 0 22rpx 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:rgba(242,241,246,1);
  border-radius:32rpx;
}
.area3-left-title {
  font-size:30rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.area3-left-box span {
  display: block;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(118,118,118,1);
}

.area3-box-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260rpx;
}
.area3-box-right li {
  width:284rpx;
  height:120rpx;
  box-sizing: border-box;
  padding: 32rpx 0 22rpx 38rpx;
  border-radius:32rpx;
}
.area3-box-right .area3-right-title {
  display: block;
  font-size:30rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
}
.area3-box-right .area3-right-item2 .area3-right-title {
}
.area3-box-right .area3-right-item1 {
  background: rgba(242,241,246,1);;
}
.area3-box-right .area3-right-txt {
  display: block;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
}
.area3-box-right .area3-right-item2 {
  background: #1c283c;
  color: #fff;
}
.area3-box-right .area3-right-item2 .area3-right-txt {
}
.select_need{
  width: 284rpx;
  height: 120rpx;
  box-sizing: border-box;
  padding: 32rpx 0 22rpx 38rpx;
  border-radius: 32rpx;
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 500;
  background: rgba(242,241,246,1);
  margin-top: 20rpx;
}
</style>
