<template>
  <div>
    <div class="content">
         
         <div class="giftImg giftImg1" v-if="listdata.couponType=='1'">
              <img src="/static/images/yhbg.png" alt="">
              <div class="twoThound">
                  {{listdata.denomination}}<span>￥</span>
              </div>
              <div class="giftImg_desc">
                   <p class="gift_name">{{listdata.couponName}}</p>
                   <p class="gift_desc">{{listdata.expireEndTime}}前有效</p>
                   <p class="gift_desc">仅限 {{listdata.foursName}}使用</p>
              </div>
         </div>
         <div class="giftImg" v-else>
              <img :src="listdata.giftImg" alt="">
              <div class="giftImg_desc">
                   <p class="gift_name">{{listdata.giftName}}</p>
                   <p class="gift_desc">{{listdata.intro}}</p>
                   <p class="gift_desc">仅限 {{listdata.foursName}}使用</p>
              </div>
         </div>
         <div class="division"></div>
         <!-- 注意事项 -->
         <h2>注意事项</h2>
         <ul class="present">
             <li>
                 <p class="present_fir" v-if="listdata.couponType=='1'">券有效期</p>
                 <p class="present_fir" v-else>礼品简介</p>
                 <p class="present_two" v-if="listdata.couponType=='1'">{{listdata.expireEndTime}}前有效</p>
                 <p class="present_two" v-else>{{listdata.intro}}</p>
             </li>
             <li>
                 <p class="present_fir">使用限制</p>
                 <p class="present_two">仅限 {{listdata.foursName}}使用</p>
             </li>
             <li>
                 <p class="present_fir">兑换码</p>
                 <p class="present_two">{{listdata.couponCode}}</p>
             </li>
         </ul>
         <!-- 是否核销 -->
         <div class="whether">
              <div class="whether_fir">
                 是否核销 <span class="tel" v-if="listdata.couponType=='1'">{{listdata.holder}}</span><span class="tel" v-else>{{listdata.userPhone}}</span> 的&nbsp;<sapn class="type">{{listdata.couponType=='1'?'优惠券':'礼品'}}</sapn>
              </div>
              <div class="whether_bot" @click="quHe">确认核销</div>
         </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters,mapMutations } from 'vuex';
  export default {
    name:'',
    props:[''],
    data () {
      return {
        listdata:{}
      };
    },

    components: {},

    onLoad:function(option) {
      this.listdata=JSON.parse(option.giftLis)
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        ...mapActions({
                'verification':'verification'
            }),
            async quHe() {
                let bodyParm={
                    couponCode: this.listdata.couponCode
                }
                let res=await this.verification(bodyParm)
                if(res.code==0) {
                    wx.showToast({
                    title: '已核销成功',
                    icon: 'success',
                    duration: 2000
                    })
                }
            }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .content {
        width: 100%;
        height: 100vh;
        padding: 104rpx 40rpx 0rpx 40rpx;
        box-sizing: border-box;
        .giftImg {
            width: 100%;
            height:176rpx;
            padding: 26rpx 0 26rpx 20rpx;
            box-sizing: border-box;
            overflow: hidden;
            border: 1px solid #F2F1F6;
            img {
                width: 124rpx;
                height:124rpx;
                 float: left;
                 margin-right: 32rpx;
            }
            .giftImg_desc {
                float: left;
                .gift_name {
                    font-size: 30rpx;
                    color: #EB0C24;
                    font-weight: 500;
                    margin-bottom: 16rpx;
                }
                .gift_desc {
                    font-size: 24rpx;
                    color: #A2A2A2;
                    margin-bottom: 10rpx;
                }
            }
        }
        .giftImg1 {
          padding: 0px;
          position: relative;
          img {
              width: 236rpx;
              height: 100%;
          }
          .giftImg_desc {
              margin-top: 20rpx;
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
         }
        .division {
            width: 100%;
            height:2rpx;
            background-color: #E5E5E5;
            margin-top: 80rpx;
            margin-bottom: 80rpx;
        }
        h2 {
            font-size: 36rpx;
            color: #262626;
            font-weight: bold;
            margin-bottom: 60rpx;
        }
        .present {
            width: 100%;
            list-style: none;
            li {
                width: 100%;
                margin-bottom: 60rpx;
                .present_fir {
                    font-size: 32rpx;
                    color: #262626;
                    margin-bottom: 20rpx;
                }
                .present_two {
                    font-size: 32rpx;
                    color: #999999;
                }
            }
        }
        .whether {
            width: 100%;
            margin-top: 154rpx;
            margin-bottom: 30rpx;
            .whether_fir {
                width: 100%;
                height: 38rpx;
                text-align: center;
                color: #262626;
                .tel {
                    font-weight: bold;
                }
                .type {
                    font-weight: bold;
                    color: #BB0A30;
                }
            }
            .whether_bot {
                width: 100%;
                height: 84rpx;
                background-color: #BB0A30;
                text-align: center;
                line-height: 84rpx;
                color: #FFFFFF;
                font-size: 36rpx;
                margin-top: 44rpx;
                border-radius: 42rpx;
            }
        }
    }
</style>