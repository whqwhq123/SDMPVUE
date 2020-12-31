<template>
    <div class="know_you_cus">
        <div class="header_title">
            <div class="header_s_title">
                <!-- 推荐车型及报价 -->
                <span class="s_title">推荐车型报价</span>
            </div>
            <div class="title_disc">动向信息根据客户行为数</div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
                <block>
                    <!-- <swiper-item class="detail_scope"> -->
                        <!-- <div class="detail_scope"> -->
                            <!-- <carOfCard v-if="carInfo" :carInfo='carInfo'></carOfCard> -->
                        <!-- <recommed-car></recommed-car> -->
                        
                        <!-- </div>
                    </swiper-item> -->
                    <swiper-item class="detail_scope">
                    <div class="detail_scope">
                        <price-monad></price-monad>
                        <!-- <priceNote></priceNote> -->
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
    // import recommedCar from './recommedCar';
    import priceMonad from './priceMonad';
    import carOfCard from './carOfCard';
    import priceNote from './priceNote';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        components: {
            // recommedCar,
            priceMonad,
            carOfCard,
            priceNote
        },
        data(){
            return {
                carInfo:null,
                priceData:[],
                dataList:[1,2],
                activeIndex:0,
            }
        },
        computed: {
            ...mapGetters({
                'customerPhone':'user/customerPhone',
                'userInfo':'userInfo'
            })
        },
        methods: {
            ...mapActions({
                'getRecommedCar':'user/getRecommedCar',
                'getPriceNotce':'user/getPriceNotce'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
            // 获取已选车型信息
            async getCarInfo(){
                console.log('cacacaca')
                let res=await this.getRecommedCar({
                    customPhone:this.customerPhone,
                    manuId:this.userInfo.manuId,
                    foursId:this.userInfo.foursId
                });
                if(res.code==0){
                    this.carInfo=res.data;
                }
            },
            // 获取报价单
            async getPrice(){
                console.log('baojiadan')
                let res=await this.getPriceNotce({
                    customPhone:this.customerPhone,
                    foursId:this.userInfo.foursId,
                    salesmanId:this.userInfo.userId
                })
                if(res.code==0){
                    this.priceData=res.data;
                }
                console.log('baojiadan',res)
            }
        },
        onLoad(){
            this.getCarInfo();
            this.getPrice()
        },
        onShow(){
            // this.getCarInfo();
        }
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
                    line-height: 54rpx;
                }
                .header_img{
                    width: 72rpx;
                    height: 72rpx;
                }
            }
            .title_disc{
                margin-top: 24rpx;
                margin-right: 18rpx;
                font-size:28rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:35rpx;
                color:rgba(118,118,118,1);
            }
        }
        .page_detail{
            position: relative;
        }
        .swiper_scope{
            margin-top: 32rpx;
            width:100%;
            height: 900rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
            opacity:1;
            .detail_scope{
                width: 670rpx;
                height: 900rpx;
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
            transform: translateX(-30rpx);
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