<template>
  <section class="trade_wrap">
    <!-- <div class="poster" v-if="posterData">
      <img class="img" :src="posterData.thumbnail">
      <span class="poster_title">今日海报</span>
      <img @tap="downPoster" class="icon_large" v-if="imageApi" :src="imageApi+'/enlarge.png'" alt="">
    </div> -->
    <img :src="imageApi+'/new_close.png'" alt="" class="new_close" @click="backFun" v-if="imageApi">
    <div class="article" v-for="(item,index) in articles" :key="index"  @tap="lookDetail(item)">
      <div class="label">
        <div class="item" v-for="(label, i) in item.newsLabel" :key="i">{{label}}</div>
      </div>
      <div class="article_title">{{item.newsTitle}}</div>
      <div class="browse">
        <div class="num"><img class="icon_eyes" v-if="imageApi" :src="imageApi+'/icon-eyes.png'" alt="">{{item.count}}</div>
        <div class="time">{{item.time}}</div>
      </div>
      <div class="content">{{item.brief}}</div>
      <div class="banner">

        <img class="item_img" v-for="(itemImg, i) in item.pic" :key="i" :src="itemImg" alt="">
      </div>
      <div class="cat_line"></div>
    </div>
    <!-- <tab_bar :selected="3"></tab_bar> -->
  </section>
</template>
<script>
import { mapGetters, mapMutations,mapActions } from 'vuex'
 import {saasApi,imageApi} from "../../../http/url";
import tab_bar from '../../../components/tabBar'
export default {
  data(){
    return{
      imageApi,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      articles: [],
      posterData:{},
      imgDraw: {},
    }
  },
  components: {
    tab_bar
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    }),
    //  codeImg() {
    //   return saasApi + 'weixin/qr.jpg?body=' + [this.userInfo.foursId, this.userInfo.userId].join() + '&type=salesman_4'
    // }
  },
  onLoad(options){
    this.total=0;
    this.posterData={};
    this.imgDraw={};
    this.getPosterData();
    this.fetchArticleList();
  },
  onShow(){
    this.total=0;
    this.posterData={};
    this.imgDraw={};
    this.getPosterData();
    this.fetchArticleList();
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (this.pageSize < this.total) {
      this.pageSize += 1;
      this.fetchArticleList()
    }

  },
  methods:{
    backFun(){
        wx.navigateBack({
            
        })
    },
    onImgOK(e) {
      console.log(e)
    },
    downPoster(){
    mpvue.navigateTo({
        url: '/pages/app/todayPoster/main'
      })
    },
    getPosterData(){
      this.$post('/poster/queryPosterByBrand', {relationBrand:this.userInfo.manuId}).then(res=>{
        const {code,data}=res
        if(code===0){
          this.posterData=data;
        }
      })
    },
    fetchArticleList() {
      let params={
            pageNo:this.currentPage,
            pageSize:this.pageSize,
            relationBrand:this.userInfo.manuId,
            brandId:this.userInfo.manuId
          }
      this.$post('/news/getSalesmanNewsPage', params).then(res=>{
        const {code,data}=res
        console.log(code, data)
        if(code===0){
          this.total=data.totalCount;
          data.recordList.forEach(item => {
            item['pic']= item['pic'].split(',').filter(Boolean);
            if (typeof item['newsLabel'] === 'string') {
              item['newsLabel'] = item['newsLabel'].split(',').filter(Boolean);
            }
          });
          this.articles=data.recordList;
        }
      })
    },
    lookDetail(row){
       mpvue.navigateTo({
        url: '/pages/app/tradeDetail/main?id='+row.id+'&brandId='+this.userInfo.manuId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trade_wrap{
  padding-bottom: 134rpx;
  padding-top: 116rpx;
  .new_close{
      width: 56rpx;
      height: 56rpx;
      position: absolute;
      right: 40rpx;
      top: 28rpx;
  }
  .poster{
    position: relative;
    box-sizing: border-box;
    .img{
      width: 100%;
      height: 432rpx;
      vertical-align: middle;
    }
    .icon_large{
    position: absolute;
    right: 36rpx;
    bottom: 14rpx;
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;

  }
  .poster_title{
    position: absolute;
    right: 106rpx;
    bottom: 22rpx;
    font-size:32rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#FFFFFF;
    }
  }
  .article{
    margin-top: 28rpx;
    padding: 0 36rpx 0 42rpx;
    .label{
      display: flex;
      // padding-left: 20rpx;
    }
    .item{
      // height: 36rpx;
      // line-height: 36rpx;
      padding: 4rpx 8rpx;
      background: #F0F0F0;
      border-radius: 8rpx;
      font-size:24rpx;
      font-family:Source Han Sans CN;
      font-weight:400;
      color: #999999;
      margin-right: 12rpx;
    }
    .article_title{
      // padding-left: 20rpx;
    }
    .article_title{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size:40rpx;
      font-family:Source Han Sans CN;
      font-weight:500;
      color: #1A1A1A;
      margin-top: 18rpx;
    }
    .browse{
      display: flex;
      justify-content: space-between;
      margin-top: 32rpx;
      padding: 0 0rpx 0 00rpx;
      .icon_eyes{
        width: 30rpx;
        height: 20rpx;
        margin-right: 10rpx;
      }
      .num,.time{
        font-size:24rpx;
        font-family:Source Han Sans CN;
        font-weight:400;
        color: #999999;
      }
    }
    .content{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      font-size: 28rpx;
      font-weight: 400;
      color: #767676;
      font-family: Source Han Sans CN;
      margin-top: 44rpx;
      box-sizing: border-box;
      line-height:44rpx;
      text-indent: 40rpx;
    }
    .banner{
      margin-top: 32rpx;
      box-sizing: border-box;
      .item_img{
        width: 220rpx;
        height: 140rpx;
        vertical-align: middle;
        border-radius:8rpx; 

      }
      .item_img:nth-child(2){
        margin: 0 6rpx;
      }
    }
    .cat_line{
      width: 614rpx;
      margin: 46rpx 0 52rpx 28rpx;
      border: 2rpx solid #F2F2F2;
    }
  }

}




</style>
