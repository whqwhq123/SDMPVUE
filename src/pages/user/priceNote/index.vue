<template>
    <div class="rec_car" >
        <!-- <div class="title_dis">{{reception[1].secondTitles[3].description}}</div> -->
        <div class="label_name">
            已提供的报价单
        </div>
        <div class="line"></div>
        <div class="car_lis" v-if="priceData.length">
            <div class="price_list" v-for="(item,index) in priceData" :key="item.carQuotationId">
                <div class="car_name_date">
                    <span class="car_full_name">{{item.carTypeName}}</span>
                    <span class="car_date">{{item.createTime}}</span>
                </div>
                <div class="price_yh">
                    <span class="m_icon">¥</span>
                    <span class="p_num">{{item.guidePrice}}</span>
                    <span class="yh_p">优惠{{item.favorablePrice}}</span>
                </div>
            </div>
        </div>
        <div v-else class="none_price_note"> 暂无报价单</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {formatDay} from "../../../utils";
    export default {
        props:{
            // priceData:null
        },
        data(){
            return {
                dataList:[1,2,3],
                priceData:[]
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'reception':'user/reception',
                'customerPhone':'user/customerPhone',
            }),
        },
        methods: {
            ...mapActions({
                'getPriceNotce':'user/getPriceNotce'
            }),
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
            },
            openShare(){
                wx.navigateTo({
                    url:'/pages/app/quote/edit/main'
                })
            }
        },
        onLoad(){
            this.priceData=[]
            this.getPrice()
        },
    }
</script>

<style lang="scss" scoped>
    .rec_car{
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
            margin-top: 30rpx;
        }
        .car_lis{
            padding: 0 18rpx;
            box-sizing: border-box;
            .price_list{
                min-height: 170rpx;
                border-top: 2rpx solid rgba(247,247,250,1);
                // padding-bottom: 30rpx;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .car_name_date{
                    display: flex;
                    justify-content: space-between;
                    // margin-top: 40rpx;
                    .car_full_name{
                        display: inline-block;
                        width: 400rpx;
                        color: #444444;
                        font-size: 28rpx;
                    }
                    .car_date{
                        color: #AAAAAA;
                        font-size: 24rpx;
                    }
                }
                .price_yh{
                    margin-top: 10rpx;
                    display: flex;
                    align-items: center;
                    
                    .m_icon{
                        color: #262626;
                        font-size: 28rpx;
                        margin-right: 4rpx;
                        display: block;
                        margin-top: 10rpx;
                    }
                    .p_num{
                        color: #262626;
                        font-size: 40rpx;
                        font-weight: 500;
                        line-height: 40rpx;
                        margin-right: 12rpx;
                    }
                    .yh_p{
                        display: inline-block;
                        padding: 4rpx 10rpx;
                        border-radius: 48rpx;
                        font-size: 24rpx;
                        color: #fff;
                        background:linear-gradient(270deg,rgba(187,10,48,1) 0%,rgba(250,77,80,1) 100%);
                        vertical-align: middle;
                    }
                }
            }
        }
        .none_price_note{
            font-size: 24rpx;
            color: #1A1A1A;
            text-align: center;
            padding-top: 100rpx;
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
            margin-top: 40rpx;
        }
    }
</style>