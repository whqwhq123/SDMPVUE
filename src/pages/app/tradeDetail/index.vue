<template>
 <section class="detail_wrap">
     <div class="article">
      <div class="label">
        <div class="item" v-for="(item,index) in detail.newsLabel" :key="index">{{item}}</div>
      </div>
      <div class="article_title">{{detail.newsTitle}}</div>
      <div class="browse">
        <div class="num"><img class="icon_eyes" v-if="imageApi" :src="imageApi+'/icon-eyes.png'" alt="">{{detail.count}}</div>
        <div class="time">{{detail.time}}</div>
      </div>
      <div class="content" v-html="detail.content"></div>
    </div>
 </section>
</template>
<script>
import {imageApi} from "../../../http/url";
export default {
  data(){
    return{
      imageApi,
      detail:{}
    }
  },
  onLoad(options){
   this.detail={}
    this.lookCounts(options)
  },
  methods:{
    lookCounts(options){
      this.$post("news/updateSalesmanNewsCount",options).then(res=>{
        const {code, data}=res
        if(code===0){
          this.getDetail(options)
        }
      })
    },
    getDetail(options){
      this.$post('/news/getSalesmanNewsInfo', options).then(res=>{
        const {code, data}=res
        if(code===0){
         data['content']= data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"')
          data['newsLabel']= data['newsLabel'].split(',').filter(Boolean);
          this.detail=data;
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail_wrap {
.article{
    padding: 0 36rpx 0 42rpx;
    .label{
      display: flex;
    }
    .item{
      height: 36rpx;
      line-height: 36rpx;
      padding: 0 20rpx;
      background: #E2E2E2;
      border-radius: 22rpx;
      font-size:24rpx;
      font-family:Source Han Sans CN;
      font-weight:400;
      color: #767676;
      margin-right: 12rpx;
    }
    .label,.article_title{
      padding-left: 20rpx;
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
      padding: 0 24rpx 0 20rpx;
      margin-bottom: 44rpx;
      .icon_eyes{
        width: 30rpx;
        height: 20rpx;
        margin-right: 10rpx;
      }
      .num,.time{
        font-size:24rpx;
        font-family:Source Han Sans CN;
        font-weight:400;
        color: #1A1A1A;
      }
    }
  }
}
</style>
