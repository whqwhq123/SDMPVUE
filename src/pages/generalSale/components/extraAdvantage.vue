<template>
    <div class="active_recommed">
        <div class="s_post">客户购车交易后兑换</div>
        <div class="active_name">客户已领津贴</div>
        <div class="line"></div>
        <div class="active_image">
           <div class="price">
               <img :src="imageApi+'/jintie.png'" alt="" class="jin_tie" v-if="imageApi">
               <span class="num">{{carAllowances.amount}}</span>
               <span class="money_icon">元</span>
               <p class="date_line" v-if="carAllowances.dateType==1">剩余有效期：长期有效</p>
               <p class="date_line" v-else>剩余有效期：
                   <span v-if="carAllowances.dayType==0">小于1天</span>
                   <span v-if="carAllowances.dayType==1 && carAllowances.expireDay >= 0">{{carAllowances.expireDay}}天</span>
                   <span v-if="carAllowances.expireDay < 0">已过期</span>
                </p>
               <div class="active_slogn">客户购车交易后兑换</div>
           </div>
        </div>
        <div class="openShare" @click='activeFun'>核销</div>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
       
        props:{
            
            carAllowances:null,

        },
        data(){
            return {
                imageApi,
            }
        },
        methods: {
            ...mapMutations({
                'setscanStatus':'user/setscanStatus'
            }),
            activeFun() {
                this.setscanStatus(true)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .active_recommed{
        box-sizing: border-box;
        .s_post{
            color:#444444;
            font-size: 28rpx;
            line-height: 28rpx;
            margin-bottom: 20rpx;
        }
        .active_name{
            color: #1A1A1A;
            font-size: 50rpx;
            line-height: 50rpx;
        }
        .line{
            width:100%;
            height:2rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            margin-top: 30rpx;
        }
        .active_image{
            margin: 0 auto;
            margin-top: 76rpx;
            width:590rpx;
            height:300rpx;
            // border:2rpx dashed rgba(237,213,193,1);
            opacity:1;
            border-radius:24rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .price{
               color: #BB0A30;
               font-size: 100rpx;
               line-height: 100rpx;
               font-weight: 500; 
               position: relative;
               .jin_tie{
                   width: 610rpx;
                   height: 320rpx;
               }
               .num{
                    position: absolute;
                    color: #fff;
                    font-size: 70rpx;
                    font-family:PingFang SC;
                    font-weight:600;
                    line-height:124rpx;
                    display: inline-block;
                    height: 124rpx;
                    top: 96rpx;
                    right: 226rpx;
               }
               .money_icon{
                    position: absolute;
                    color: #fff;
                    font-size: 36rpx;
                    line-height: 36rpx;
                    font-weight: 500;
                    top:158rpx;
                    left: 412rpx;
                }
                .date_line{
                    position: absolute;
                    color:#fff;
                    font-size: 24rpx;
                    line-height: 24rpx;
                    margin-left: 20rpx;
                    margin-top: 12rpx;
                    top:40rpx;
                    left:46rpx;
                }
                .active_slogn{
                    position: absolute;
                    color:#fff;
                    opacity:0.85;
                    font-size: 24rpx;
                    line-height: 24rpx;
                    margin-top: 22rpx;
                    text-align: center;
                    bottom:26rpx;
                    right:32rpx;
                }
            }
            
            
           
        }
        
        .active_make{
            font-size: 28rpx;
            color: #727272;
            margin-top: 12rpx;
        }
        .openShare{
            width:320rpx;
            height:80rpx;
            border:2rpx solid rgba(187,10,48,1);
            opacity:1;
            border-radius:48rpx;
            color: rgba(187,10,48,1);
            font-size: 30rpx;
            line-height: 80rpx;
            text-align: center;
            margin: 0 auto;
            margin-top: 80rpx;
        }
    }
</style>