<template>
    <div class="cus_detail">
        <div class="title_dis">{{reception[0].secondTitles[3].description}}</div>
        <div class="label_name">
            {{reception[0].secondTitles[3].name}}
        </div>
        <div class="line"></div>
        <div class="cus_mess">
            <div class="list">
                <span class="title_name">意向级别</span>
                <div class="text_disc">{{levelObj[customerInfo.cusLevel]}}</div>
            </div>
            <div class="list">
                <span class="title_name">意向车型</span>
                <div class="text_disc car_type">
                    {{customerInfo.carType||''}}
                    <div>{{customerInfo.carModel||''}}</div>
                    </div>
            </div>
            <div class="list">
                <span class="title_name">交易方式</span>
                <div class="text_disc" v-if="customerInfo.payMode">{{payModel[customerInfo.payMode]}}</div>
            </div>
            <div class="list">
                <span class="title_name">活动参与</span>
                <div class="text_disc">{{customerInfo.participationRecord||''}}</div>
            </div>
            <div class="load_more" >
                <div class="but_more" @click="unscramble">
                    解读详情
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    
    export default {
        data(){
            return{
                levelObj:{
                    '1':'H',
                    '2':'A',
                    '3':'B',
                    '4':'C'
                },
                payModel:{
                    '1':'全款',
                    '2':'贷款'
                }
            }
        },
        computed: {
            ...mapGetters({
                'customerInfo':'user/customerInfo',
                'reception':'user/reception'
            }),
        },
       
        methods: {
            unscramble() {
               wx.navigateTo({
                    url:'/pages/user/customerMsg/main'
                }) 
            }
        },
    }
</script>

<style lang="scss" scoped>
    .cus_detail{
        padding: 30rpx;
        box-sizing: border-box;
        .label_name{
            color: #1A1A1A;
            font-size: 50rpx;
            font-weight: 500;
            line-height: 50rpx;
        }
        .title_dis{
            color:#444;
            font-size: 28rpx;
            margin-bottom: 18rpx;
            line-height: 35rpx;
        }
        .line{
            width: 100%;
            height:4rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            margin-top: 30rpx;
            margin-bottom: 54rpx;
        }
        .cus_mess{
            padding: 10rpx;
            box-sizing: border-box;
            .list{
                display: flex;
                line-height: 28rpx;
                align-items: center;
                margin-bottom: 68rpx;
            }
            .title_name{
                font-size: 28rpx;
                color: #444;
                margin-right: 48rpx;
            }
            .text_disc{
                width: 326rpx;
                word-break: break-all;
                color: #1A1A1A;
                font-size: 28rpx;
                line-height: 36rpx;
                font-weight: 500;
            }
            .car_type{
                
            }
            .load_more{
                width: 100%;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40rpx;
                .but_more{
                    width:320rpx;
                    height:80rpx;
                    border:1px solid rgba(187,10,48,1);
                    opacity:1;
                    border-radius:44rpx;
                    color:  rgba(187,10,48,1);
                    font-size: 30rpx;
                    text-align: center;
                    line-height: 84rpx
                }
            }
        }
    }
</style>