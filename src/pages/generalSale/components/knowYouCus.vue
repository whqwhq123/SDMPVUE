<template>
    <div class="know_you_cus">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">{{reception[0].name}}</span>
            </div>
            <div class="title_disc">{{reception[0].description}}</div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" :current="activeIndex" next-margin="24rpx" class="swiper_scope"  @change="chageIndex">
                <block>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope">
                            <customer-tread></customer-tread>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope">
                    <div class="detail_scope">
                            <expenseLevel></expenseLevel>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope">
                            <portrayal-cus></portrayal-cus>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope">
                            <customerDetail></customerDetail>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
            <div class="dot_list">
                <div :class="[activeIndex==index?'dot_active':'dot']" v-for="(val,index) in dataList" :key="index"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import  customerTread from './customerTread'
    import  portrayalCus from './portrayalCus'
    import  expenseLevel from './expenseLevel'
    import  customerDetail from './customerDetail'
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        components: {
            customerTread,
            portrayalCus,
            expenseLevel,
            customerDetail
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'reception':'user/reception'
            })
        },
        data(){
            return {
                activeIndex:0,
                dataList:[1,2,3,4]
            }
        },
        onLoad (options) {
            if (options.current) {
                this.activeIndex = options.current
            }
            
        },
        methods: {
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .know_you_cus{
         .header_title{
            padding: 80rpx 40rpx 0 40rpx;
            box-sizing: border-box;
            .header_s_title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .s_title{
                    font-size:54rpx;
                    font-family:Source Han Sans CN;
                    font-weight:bold; 
                    color:rgba(26,26,26,1);
                }
                .header_img{
                    width: 72rpx;
                    height: 72rpx;
                }
            }
            .title_disc{
                margin-top: 40rpx;
                margin-right: 18rpx;
                font-size:28rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:48rpx;
                color:rgba(118,118,118,1);
            }
        }
        .page_detail{
            position: relative;
        }
        .swiper_scope{
            margin-top: 32rpx;
            width:100%;
            min-height: 960rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
            opacity:1;
            .detail_scope{
                width: 670rpx;
                min-height: 960rpx;
                border-radius:26rpx;
                background:rgba(255,255,255,1);
                box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
                opacity:1;
                overflow:inherit;
                
            }
        }
        .dot_list{
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            position: absolute;
            transform: translateX(-45rpx);
            bottom: 40rpx;
            left: 50%;
            .dot{
                width:12rpx;
                height:12rpx;
                background:rgba(229,229,229,1);
                opacity:1;
                border-radius:48rpx;
                display: inline-block;
                margin-right: 12rpx;
                
            }
            .dot_active{
                width:36rpx;
                height:12rpx;
                background:rgba(153,153,153,1);
                opacity:1;
                border-radius:48rpx;
                display: inline-block;
                margin-right: 12rpx;
                transition: all 0.5s linear;
            }
        }
    }
</style>