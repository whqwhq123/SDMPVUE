<template>
  <div class="page">
    <div class="page-item">
      <h3><i class="tit-icon"></i><span>人流量分布</span></h3>
      <visitorsFlowrate v-if="componentStatus" :chartParams="params" :loadingStatus="loadingStatus"></visitorsFlowrate>
    </div>
    <div class="page-item">
      <h3><i class="tit-icon"></i><span>集客比</span></h3>
      <collectot v-if="componentStatus" :chartType="1" :chartParams="params" :loadingStatus="loadingStatus"></collectot>
    </div>
    <div class="page-item" v-if="areaInfo['type']==='one' || userInfo.targetType === 'S'">
      <h3><i class="tit-icon"></i><span>同区集客比</span></h3>
      <collectorArea v-if="componentStatus" :chartType="'area'" :chartParams="params" :loadingStatus="loadingStatus"></collectorArea>
    </div>
    <div class="page-item" v-if="areaInfo['type']==='one' || userInfo.targetType === 'S'">
      <h3><i class="tit-icon"></i><span>全国集客比</span></h3>
      <collectorCountry v-if="componentStatus" :chartType="'all'" :chartParams="params" :loadingStatus="loadingStatus"></collectorCountry>
    </div>
    <div v-if="chartsDataStatus.length === 0">
      <img class="no-data" v-if="imageApi" :src="imageApi + '/user_default.png'" alt="">
      <div class="no-data-text">暂无{{title}}</div>
    </div>
    <loadingView :loadingStatus="loadingStatus"></loadingView>
  </div>
</template>

<script>
  import collectot from '../../../components/passengerFlow/collector'
  import collectorArea from '../../../components/passengerFlow/collectorArea'
  import collectorCountry from '../../../components/passengerFlow/collectorCountry'
  import visitorsFlowrate from '../../../components/passengerFlow/visitorsFlowrate'
  import loadingView from '../../../components/loading/loading'
  import {fenxiang} from "../../../utils";
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        foursId: '',
        componentStatus: false,
        loadingStatus: true
      }
    },
    watch: {
      componentLoaded (newVal) {
        if (newVal.length > 2) {
          this.loadingStatus = false
        }
      }
    },
    computed: {
      ...mapGetters({
        'userInfo': 'userInfo',
        'areaInfo': 'areaInfo',
        'chartsDataStatus': 'passengerFlow/chartsDataStatus',
        'componentLoaded': 'passengerFlow/componentLoaded'
      }),
      params () {
        let roleKey = null;
        let foursId = null;
        if (this.userInfo.targetType === 'A' || this.userInfo.targetType === 'M'){
          if (this.areaInfo.type === 'all'){
            roleKey = this.areaInfo.redis
          }
          if (this.areaInfo.type === 'one'){
            foursId = this.areaInfo.foursId
          }
        }
        return {
          foursId: this.userInfo.foursId ? this.userInfo.foursId : foursId,
          roleKey: roleKey
        }
      }
    },
    components: {
      collectot,
      collectorArea,
      collectorCountry,
      visitorsFlowrate,
      loadingView
    },
    mounted () {
      this.loadingStatus = true;
      this.$nextTick(()=> {
        this.componentStatus = true;
        // setTimeout(()=> {
        //   this.loadingStatus = false
        // }, 1000)
      })
    },
    methods: {
      ...mapMutations({
        'clearComponentLoaded': 'passengerFlow/clearComponentLoaded',
        'setChartsDataStatus': 'passengerFlow/setChartsDataStatus'
      })
    },
    onShow () {
      this.loadingStatus = true;
      this.$nextTick(()=> {
        this.componentStatus = true;
      })
    },
    onHide () {
      this.componentStatus = false;
      this.setChartsDataStatus({type: 2});
      this.clearComponentLoaded()
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onUnload () {
      this.componentStatus = false;
      this.setChartsDataStatus({type: 2});
      this.clearComponentLoaded()
    }
  };
</script>

<style scoped lang="sass">
  .page-item
    .tit-icon
      display: inline-block
      vertical-align: middle
      width: 8rpx
      height: 32rpx
      margin-right: 20rpx
      background: #FF443F
      border-radius: 4rpx
    h3
      font-size: 32rpx
      font-weight: 500
      color: #222
      padding: 40rpx
      span
        vertical-align: middle
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
