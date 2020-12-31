<template>
<div>
  <div class="defeatReport" v-if="isShowEchart">
    <!-- 战败趋势图 -->
    <div class="application">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">战败趋势图</span>
      </div>
    </div>
    <!-- 战败因素分析 -->
    <div class="application">
      <div class="application-echart">
        <defeated-trend :detailEchartX="detailEchartX" :detailData="detailData"></defeated-trend>
      </div>
    </div>
    <div class="line"></div>
    <!-- 战败数据统计 -->
    <div class="application">
      <div class="application-title">
        <span class="application-title-pot"></span>
        <span class="application-title-txt">战败数据统计</span>
      </div>
    </div>
    <!-- 战败数据统计报表 -->
    <div class="application">
      <div class="application-table">
        <div class="application-table-tab">
          <span>时间</span>
          <span>接待人数</span>
          <span>战败人数</span>
          <span>战败率</span>
        </div>
        <ul class="application-table-box">
          <li v-for="(item, index) in failData" :key="index" :class="{'application-table-zebra': index%2 === 1}">
            <span>{{item.time}}</span>
            <span>{{item.total}}</span>
            <span>{{item.failTotal}}</span>
            <span>{{item.failRate}}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <img class="no-data" :src="defaultImg" alt="">
    <div class="no-data-text">暂无{{title}}</div>
  </div>
</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import defeatedTrend from '../../../components/defeatedTrend/index'
import {imageApi} from "../../../http/url";
export default {
  components: {
    defeatedTrend
  },
  data () {
    return {
      isShowEchart: false,
      detailParam: {},
      detailEchartX: [],
      detailData: [],
      failData: [],
      defaultImg: imageApi + '/user_default.png'
    }
  },
  onLoad: function (options) {
    this.detailParam = JSON.parse(options.param)
  },
  mounted() {
    this.detailInit()
  },
  methods: {
    ...mapActions({
      'getDetail': 'defeatDetailModule/getDetail',
    }),
    async detailInit () {
      let res =  await this.getDetail(this.detailParam);
      if (res.code == 0 ){
        this.failData = res.data.form
        this.detailEchartX = res.data.time
        this.detailData = res.data.failCountList
        this.isShowEchart = true
      } else {
        this.isShowEchart = false
      }
      // this.detailEchartX = this.detailEchartX.reverse()
      // this.detailData = this.detailData.reverse()

    },
  },
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
.application-content {
  box-sizing: border-box;
  padding: 22rpx 40rpx 34rpx 40rpx;
  width: 100%;
  height: 160rpx;
  border-radius:16rpx;
  background: linear-gradient(50deg,rgba(56,57,79,1) 0%,rgba(34,34,34,1) 100%);
}
// 中间间隔
.line {
  width:100%;
  height:20rpx;
  background:rgba(245,245,245,1);
  margin-bottom: 40rpx;
}
.application-echart {
  margin-bottom: 48rpx;
  width: 100%;
  height: 482rpx;
}
// 表格样式
.application-table-tab {
  display: flex;
  height:88rpx;
  background:rgba(56,57,79,1);
  opacity:1;
}
.application-table-tab span {
  display: block;
  width: 25%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(255,255,255,1);
  opacity:1;
}
.application-table-box li {
  display: flex;
  height:100rpx;
}
.application-table-box li span {
  display: block;
  width: 25%;
  font-size:24rpx;
  text-align: center;
  font-family:Source Han Sans CN;
  font-weight:400;
  height:100rpx;
  line-height:100rpx;
  color:rgba(68,68,68,1);
  opacity:1;
}
.application-table-zebra {
  background:rgba(245,245,245,1);
  opacity:1;
}
.application-default {
  // width: 100%;
  // display: flex;
  // justify-items: center;
  // align-items: center;
}
.application-default img{
  // width: 120rpx;
  // height: 160rpx;
}
</style>
<style scoped>
  .no-data{
    width: 400rpx;
    height: 300rpx;
    display: block;
    margin: 0 auto;
    margin-top: 166rpx;
  }
  .no-data-text{
    color: #888888;
    font-size: 32rpx;
    margin-top: 24rpx;
    text-align: center;
  }
</style>
