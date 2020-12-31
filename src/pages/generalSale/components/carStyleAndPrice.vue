<template>
    <div class="car_style_price">
        <div class="header">
            <div class="title">推荐车型及报价</div>
            <div class="disc">动向信息根据客户行为数</div>
        </div>
        <div class="card_car_lis">
            <div class="recommed_customer">将车型推荐单发给客户</div>
            <div class="recommed_car">推荐车型</div>
            <div class="car_list">
                <div class="car" v-for="(item,index) in dataList" :key="index">
                    <span class="car_name">奥迪</span>
                    <span class="recommed" @click="recommedFun">推荐</span>
                </div>
            </div>
            <div class="bt_share" @click="checkoutAllCar">查看全部车型</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dataList:[1,1,1,1]
            }
        },
        methods: {
            checkoutAllCar() {
                wx.navigateTo({
                    url:'/pages/user/main'
                })
            },
            recommedFun(){
                wx.navigateTo({
                    url:'/pages/app/needCollect/main'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .car_style_price{
        margin-top: 100rpx;
        .header{
            .title{
                margin-left: 40rpx;
                font-size:54rpx;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:rgba(26,26,26,1);
                opacity:1; 
                line-height:54rpx;
            }
            .disc{
                font-size:28rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:48rpx;
                color:rgba(118,118,118,1);
                margin: 24rpx 58rpx 0 40rpx;
            }
        }
        .card_car_lis{
            width:670rpx;
            height:840rpx;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx rgba(0,0,0,0.16);
            opacity:1;
            border-radius:26rpx;
            margin: 0 auto;
            margin-top: 32rpx;
            padding: 30rpx 30rpx 0 30rpx;
            box-sizing: border-box;
            .recommed_customer{
                color: #999999;
                font-size: 28rpx;
            }
            .recommed_car{
                color: #1A1A1A;
                font-size: 50rpx;
                margin-top: 10rpx;
                margin-bottom: 36rpx;
            }
            .car_list{
                border-top: 2px solid #F7F7FA;
                padding-top: 60rpx;
                box-sizing: border-box;
                .car{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    line-height: 36rpx;
                    margin-bottom: 78rpx;
                    padding: 0 18rpx;
                    box-sizing: border-box;
                    .car_name{
                        color: #222222;
                        font-size: 36rpx;
                    }
                    .recommed{
                        color: #BB0A30;
                        font-size: 30rpx;
                    }
                }
            }
            .bt_share{
                width:610rpx;
                height:88rpx;
                // background:rgba(247,247,250,1);
                border:1px solid rgba(187,10,48,1);
                opacity:1;
                border-radius:48rpx;
                margin: 0 auto;
                margin-top: 40rpx;
                color: rgba(187,10,48,1);
                font-size: 32rpx;
                line-height: 94rpx;
                text-align: center;
            }
        }

    }
</style>