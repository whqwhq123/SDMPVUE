<template>
  <div>
    <shopSelect v-if="userInfo.targetType === 'A' || userInfo.targetType === 'M'"></shopSelect>
    <datePick v-if="type"></datePick>
    <purchasingPower v-if="componentStatus" :chartParams="params"></purchasingPower>
    <buyCarWish v-if="componentStatus" :chartParams="params"></buyCarWish>
    <characterDistribution v-if="componentStatus" :chartParams="params"></characterDistribution>
    <customerCharacteristics v-if="componentStatus" :chartParams="params"></customerCharacteristics>
    <intentionCarType v-if="componentStatus" :chartParams="params"></intentionCarType>
    <div v-if="chartsDataStatus.length === 0">
      <img class="no-data" v-if="imageApi" :src="imageApi + '/user_default.png'" alt="">
      <div class="no-data-text">暂无{{title}}</div>
    </div>
    <loadingView :loadingStatus="loadingStatus"></loadingView>
  </div>
</template>

<script>
  import buyCarWish from '../../../components/portraitCharts/buyCarWish'
  import purchasingPower from '../../../components/portraitCharts/purchasingPower'
  import intentionCarType from '../../../components/portraitCharts/intentionCarType'
  import characterDistribution from '../../../components/portraitCharts/characterDistribution'
  import customerCharacteristics from '../../../components/portraitCharts/customerCharacteristics'

  import loadingView from '../../../components/loading/loading'
  import datePick from '../datePick/index'
  import shopSelect from '../shopSelect'

  import http from '../../../http/api'
  import {fenxiang} from "../../../utils";
  import {imageApi} from "../../../http/url";
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        imageApi,
        componentStatus: false,
        loadingStatus: true,
        userId: '',
        title: '',
        type: '' //
      }
    },
    watch: {
      componentLoaded (newVal) {
        if (newVal.length  === 5) {
          this.loadingStatus = false
        }
      }
    },
    computed: {
      ...mapGetters({
        'userInfo': 'userInfo',
        'dateTime': 'dateTime',
        'areaInfo': 'areaInfo',
        'chartsDataStatus': 'portrait/chartsDataStatus',
        'componentLoaded': 'portrait/componentLoaded'
      }),
      params () {
        let roleKey = null;
        let foursId = null;
        let times = '';
        if (this.userInfo.targetType === 'A' || this.userInfo.targetType === 'M'){
          if (this.areaInfo.type === 'all'){
            roleKey = this.areaInfo.redis
          }
          if (this.areaInfo.type === 'one'){
            foursId = this.areaInfo.foursId
          }
        }
        if (this.type) {
          times = this.dateTime ? this.dateTime.start + ',' + this.dateTime.end : '' // 成功战败画像有时间范围
        } else {
          times = '' // 客群画像无时间范围查询所有
        }
        return {
          tradeStatus: this.type ? this.type : '',
          foursId: this.userInfo.foursId ? this.userInfo.foursId : foursId,
          type: '1', // 1, 汽车 2， 房产
          userId: this.userId ? this.userId : '',
          time: times,
          roleKey: roleKey || ''
        }
      }
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
    components: {
      loadingView,
      datePick,
      shopSelect,

      buyCarWish, // 购买力画像
      purchasingPower, //
      intentionCarType,
      characterDistribution,
      customerCharacteristics
    },
    methods: {
      ...mapMutations({
        changeTime:'changeTime',
        changeSelect: 'changeSelect',
        'clearComponentLoaded': 'portrait/clearComponentLoaded',
        'setChartsDataStatus': 'portrait/setChartsDataStatus'
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
    },
    onLoad(op) {
      this.type = op.type;
      console.log('画像路由接参', op);
      wx.setNavigationBarTitle({
        title: op.serviceName
      });
      this.title = op.serviceName
      if (op.userId) {
        this.userId = op.userId
      }
    },
    onShow() {
      this.loadingStatus = true;
      this.$nextTick(()=> {
        this.componentStatus = true;
        // setTimeout(()=> {
        //   this.loadingStatus = false
        // }, 1000)
      })
    },
    onHide () {
      this.clearComponentLoaded();
      this.setChartsDataStatus({type: 2});
      this.componentStatus = false;
      this.userId='';
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    },
    onUnload () {
      this.clearComponentLoaded();
      this.setChartsDataStatus({type: 2});
      this.componentStatus = false;
      this.changeTime(null);
      this.getAllRedis();
      this.userId='';
    }
  };
</script>

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
