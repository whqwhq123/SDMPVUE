<template>
    <div class="car_stye">
        <div class="car_brand">
            <span class="car_brand_name">{{carBrand.makeName}}</span>
            <img :src="carBrand.ossUrl" alt="" class="brand_img">
        </div>
        <div class="car_style">
            <div class="car_style_item" v-for="(item,index) in carStyle" :key="index">
                <!-- <div class="car_group">{{index}}</div> -->
                <!--  v-for="(val,idx) in item" :key="idx" -->
                <div class="list_item" @click="handlerCarSeries(item)">
                    <span class="car_style_name">{{item.carName}}</span>
                    <span class="car_style_price">{{item.msrp?item.msrp+'万':'暂无报价'}}</span>
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
                carStyle:{}
            }
        },
        computed:{
            ...mapGetters({
                'carBrand':'user/carBrand'
            })
        },
        methods:{
            ...mapMutations({
                'setCarStyle':'user/setCarStyle'
            }),
            ...mapActions({
                'getCarStyle':'user/getCarStyle'
            }),
            async getCarSeries(){
                let res=await this.getCarStyle({makeId:this.carBrand.makeId})
                if(res.code==0){
                    this.carStyle=res.data;
                }
            },
            handlerCarSeries(val){
                this.setCarStyle(val)
                // wx.navigateTo({
                //     url:'/pages/app/needCollect/main?flag=true'
                // })
                wx.navigateBack({
                    delta: 2,
                })


            }
        },
        onShow(){
            this.getCarSeries()
        }
    }
</script>

<style lang="scss" scoped>
    .car_stye{
        padding: 64rpx 40rpx 0 40rpx;
        height: 100%;
        overflow-y: scroll;
        .car_brand{
            display: flex;
            align-items: center;
            .car_brand_name{
                color: #343434;
                font-size: 40rpx;
                // margin-top:64rpx;
                margin-right: 20rpx;
            }
        }
        .car_group{
            color: #222222;
            font-size: 28rpx;
            margin: 50rpx 0 50rpx 0;
        }
        .list_item{
            margin-left: 56rpx;
            display: flex;
            justify-content: space-between;
            margin-bottom: 60rpx;
            .car_style_name{
                color: #222222;
                font-size: 28rpx;
            }
            .car_style_price{
                 color: #222222;
                font-size: 28rpx;
            }
            .car_style_price:hover{
                color: #BB0A30;
                font-size: 28rpx;
            }
            
        }
        .brand_img{
            width:56rpx;
            height: 56rpx;
        }
    }
</style>