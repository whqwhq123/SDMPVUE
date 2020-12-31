<template>
  <div>
     <div class="youhui">
         <p>
             已领取的优惠券
             <span class="hexiao" @click="quickly">立即核销</span>
        </p>
              <div class="giftImg giftImg1" v-for="(item,index) in showList" :key="index">
                    <img src="/static/images/yhbg.png" alt="">
                    <div class="twoThound">
                        {{item.denomination}}<span>￥</span>
                    </div>
                    <div class="giftImg_right">
                        <p>{{item.couponName}}</p>
                        <p>{{item.expireTime}}前有效</p>
                        <p>仅限 {{item.foursName}}  使用</p>
                    </div>
                </div>
         
         <div class="shouqi" @click="zhankai" v-if="showList.length>3">
             <p>^</p>
             <p>{{word}}</p>
         </div>
     </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
  export default {
    name:'',
    props:['youhui'],
    data () {
      return {
        // list:[{},{},{},{}],
        Exhibition:3,
        showAll:false
      };
    },

    components: {},

    computed: {
        showList:function(){
            if(this.showAll == false){   //不显示全部数据               
                var showList = [];　　　　　//空数组　　　　　　　　　　
                if(this.youhui.length > 3){　　　//只显示5条　　　　
                    for(var i=0;i<3;i++){
                        showList.push(this.youhui[i]); //将数组的前5条存放到showList数组中
                    }
                }else{
                    showList = this.youhui  //个数足够显示，不需要在截取
                }
                return showList;　　　　　　　　　　　　　　　　
            }else{  //显示全部数据
                return this.youhui;
            }
        },
        word:function(){ //点击显示部分
            if(this.showAll == false){　　　　　　　　　　　
                return '展开'
            }else{
                return '收起'
            }
        }
    },

    beforeMount() {},

    

    mounted() {
        
    },

    methods: {
        ...mapActions({
                'Coupons':'Coupons'
            }),
        zhankai() {
            this.showAll=!this.showAll
           this.$emit('fromChild', this.showAll)
        },
        quickly() {
            wx.navigateTo({
                url: '../code/main',
                success: function(res){
                    // success
                },
                fail: function() {
                    // fail
                }
            })
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .youhui {
        width: 100%;
        p {
          font-size: 50rpx;
          color: #1A1A1A;
          font-weight: 500;
          margin-bottom: 72rpx;
          .hexiao {
              width: 116rpx;
              height:40rpx;
              background-color: #BB0A30;
              display: inline-block;
              color: #FFFFFF;
              text-align: center;
              line-height: 40rpx;
              font-size: 24rpx;
              border-radius: 30rpx;
              float:right;
              cursor: pointer;
          }
        }
        .giftImg {
            width: 100%;
            height:176rpx;
            overflow: hidden;
            border: 1px solid #F2F1F6;
            position: relative;
            margin-bottom: 8rpx;
            img {
                 float: left;
                 margin-right: 20rpx;
                  width: 236rpx;
                height: 100%;
            }
            .twoThound {
              position: absolute;
              top:50%;
              transform: translateY(-50%);
              left: 28rpx;
              font-size: 64rpx;
              color:#FFFFFF;
              span {
                  font-size: 40rpx;
                  float: right;
              }
          }
          .giftImg_right {
              p:nth-child(1) {
                  font-size: 30rpx;
                  color:#000000;
                  font-weight: 400;
                  margin-bottom: 10rpx;
                  margin-top: 10rpx;
              }
              p:nth-child(2) {
                  color:#999999;
                  font-size: 24rpx;
                  margin-bottom: 10rpx;
              }
              p:nth-child(3) {
                   color:#999999;
                  font-size: 24rpx;
                  margin-bottom: 0px;
              }
          }
        }
        .shouqi {
            width:100%;
            position: relative;
            p:nth-child(1) {
                font-size: 34rpx;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
            p:nth-child(2) {
                font-size: 30rpx;
                color: #767676;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 26rpx;
            }
        }
    }
</style>