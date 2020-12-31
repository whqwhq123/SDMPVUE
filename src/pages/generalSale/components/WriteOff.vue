<template>
    <div class="writeoff">
        <ul>
            <li @click="Scan">
                <!-- <p class="li1">优惠券、礼品核销</p> -->
                <p class="hexiao">核销助手</p>
                <div style="width:100%;display:flex;justify-content: center;">
                     <img src="/static/images/assistant.png" >
                </div>
            </li>
            <li @click="shareCus">
                <!-- <p class="li1">快发朋友圈吧</p> -->
                <p class="hexiao">分享名片</p>
                <div style="width:100%;position:relative;margin-top:53rpx">
                    <img :src="userInfo.headImg" alt="" class="user_icon" v-if="userInfo.headImg">
                     <img src="https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/f_c.png" v-else>
                     <p class="name">{{userInfo.userName}}</p>
                     <p class="tel">{{userInfo.phone}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        props:{},
        data(){
            return {
                
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo'
            })
        },
        methods: {
            ...mapMutations({
                'setShareParams':'user/setShareParams'
            }),
           Scan() {
               mpvue.navigateTo({
                    url: '/pages/generalSale/code/main'
                })
           },
           shareCus() {
               let bodyParm = [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join()
                let shareParams = [this.userInfo.foursId, 2, this.userInfo.userId].join()
                console.log('shareParams',shareParams)
                
                this.setShareParams({
                    shareTitle:'名片',
                    shareDisc:'',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene=' + shareParams,
                    shareType:'salesman_4'
                })
               wx.navigateTo({
                    url:'/pages/generalSale/shareCards/main'
                })
           }

        },
    }
</script>

<style lang="scss" scoped>
   .writeoff {
       width:100%;
       margin-top: 40rpx;
       margin-bottom: 100rpx;
       padding: 20rpx 0;
       box-sizing: border-box;
       ul {
           list-style: none;
           overflow: hidden;
           padding: 0 40rpx;
           box-sizing: border-box;
           box-shadow: 0 20rpx 60rpx 0 rgba(0, 0, 0, 0.08);
           li {
               height: 400rpx;
               width: 47%;
               box-shadow: 0 20rpx 60rpx 0 rgba(0, 0, 0, 0.08);
               border-radius: 26rpx;
           }
           li:nth-child(1) {
               float: left;
               padding: 26rpx 30rpx 27rpx 15rpx;
               box-sizing: border-box;
               .li1 {
                   font-size: 28rpx;
                   font-weight: 400;
                   color:#444444;
               }
               .hexiao {
                   font-size: 50rpx;
                   font-weight: 700;
                   color: #1A1A1A;
                   margin-top: 20rpx;
                   margin-bottom: 48rpx;
                   letter-spacing: 8rpx;
               }
               img {
                   width: 174rpx;
                   height: 174rpx;
               }
           }
           li:nth-child(2) {
               float: right;
               padding: 26rpx 30rpx 27rpx 15rpx;
               box-sizing: border-box;
               .li1 {
                   font-size: 28rpx;
                   font-weight: 400;
                   color:#444444;
               }
               .hexiao {
                   font-size: 50rpx;
                   font-weight: 700;
                   color: #1A1A1A;
                   margin-top: 20rpx;
                   margin-bottom: 20rpx;
                   letter-spacing: 8rpx;
               }
               img {
                   width: 96rpx;
                   height: 96rpx;
                    position: absolute;
                   left: 50%;
                   transform: translateX(-50%);
               }
               .name {
                   font-size: 32rpx;
                   font-weight: bold;
                   colo: #262626;
                   opacity: .9;
                    position: absolute;
                   left: 50%;
                   transform: translateX(-50%);
                   top: 112rpx;
               }
               .tel {
                   font-size: 24rpx;
                   color: #444444;
                   opacity: .85;
                    position: absolute;
                   left: 50%;
                   transform: translateX(-50%);
                   top: 171rpx;
               }
           }
       }
   }

</style>