<template>
    <div class="know_you_cus">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">{{indexTitle[3].name}}</span>
            </div>
            <div class="title_disc">{{indexTitle[3].description}}</div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
                <block>
                    <!-- <swiper-item class="detail_scope">
                        <div class="detail_scope">
                            <carOfCard v-if="carInfo" :carInfo='carInfo'></carOfCard>
                        <recommed-car v-else></recommed-car>
                        
                        </div>
                    </swiper-item> -->
                    <swiper-item class="detail_scope">
                    <div class="detail_scope">
                        
                        <priceNote v-if="priceData.length>0" :priceData='priceData'></priceNote>
                        <price-monad v-else></price-monad>
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
    import recommedCar from './recommedCar';
    import priceMonad from './priceMonad';
    import carOfCard from './carOfCard';
    import priceNote from './priceNote';
    import { mapActions, mapGetters } from 'vuex';
    import {formatDay} from "../../../utils";
    export default {
        components: {
            recommedCar,
            priceMonad,
            carOfCard,
            priceNote
        },
        data(){
            return {
                carInfo:null,
                priceData:[],
                activeIndex:0,
                dataList:[1,2,]
            }
        },
        computed: {
            ...mapGetters({
                'customerPhone':'user/customerPhone',
                'userInfo':'userInfo',
                'indexTitle':'user/indexTitle'
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
                // console.log('baojiadan')
                let res=await this.getPriceNotce({
                    customPhone:this.customerPhone,
                    foursId:this.userInfo.foursId,
                    salesmanId:this.userInfo.userId
                })
                if(res.code==0&&res.data){
                    this.priceData=res.data.map((v)=>{
                        return {
                            ...v,
                            createTime:formatDay(Date.parse(v.createTime.replace(/-/g, '/')))
                        }
                    })
                    console.log('baojiadan',this.priceData)
                }
            }
        },
        onLoad(){
            this.priceData=[]
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
        .page_detail{
            position: relative;
        }
        .dot_list{
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            position: absolute;
            transform: translateX(-35rpx);
            bottom: 30rpx;
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