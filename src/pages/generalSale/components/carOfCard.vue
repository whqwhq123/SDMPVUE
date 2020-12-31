<template>
    <div class="price_note">
        <div class="title_dis">{{reception[1].secondTitles[2].description}}</div>
        <div class="label_name">
            {{reception[1].secondTitles[2].name}}
        </div>
        <div class="line"></div>
        <div class="img_price">
             <img :src="carInfo.ossUrl" alt="" class="image_bgc">
        </div>
        <div class="car_p_name">{{carInfo.carModelName}} </div>
        <div class="car_dis">{{carInfo.carTypeName}}</div>
        <div class="openShare" @click="recommedCar">推荐其他车型</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        props:{
            carInfo:null
        },
        data(){
            return{

            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'reception':'user/reception'
            }),
        },
        methods: {
            recommedCar() {
                mpvue.navigateTo({
                    url: '/pages/selectCar/car/main?flag=true'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .price_note{
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
        }
        .img_price{
           display: flex;
           justify-content: center;
           margin-top: 74rpx;
           .image_bgc{
               width:580rpx;
               height: 250rpx;
           }
           
        }
        .car_p_name{
            color: #262626;
            font-size: 48rpx;
            line-height: 48rpx;
            margin-left: 70rpx;
            font-weight: 500;
            margin-top: 34rpx;
            margin-bottom: 16rpx;
        }
        .car_dis{
            color: #444;
            font-size: 36rpx;
            line-height: 36rpx;
            margin-left: 70rpx;
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
            margin-top: 35rpx;
        }
    }
</style>