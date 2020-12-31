<template>
    <div class='car_style_main'>
        <div class="car_title">{{modeName}}</div>
        <div class="car_lists">
            <div class="list"  v-for="(val,key) in dataList" :key="key">
                <div class="list_year">{{key}}</div>
                <div class="car_info" v-for="(item,index) in val" :key="index" @click='getCarInfo(item)'>
                    <p class="car_full_name">{{item.styleFullName}}</p>
                    <div class="car_price">
                        <span class="intruct_P">指导价</span>
                        <span class="price_num">{{item.msrp}}万</span> 
                    </div>
                    <div class="line" v-if="index!=dataList.length-1"></div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations,mapGetters } from 'vuex'
    export default {
        data(){
            return {
                dataList:[],
                modelId:'',
                modeName:''
            }
        },
        methods: {
            ...mapMutations({
                'setCar': 'selectCar/setCar',
            }),
            ...mapActions({
                'getCarModel': 'selectCar/getCarModel',
            }),
            // 获取车系列表
            async getCarList(modelId){
                let res =await this.getCarModel({
                    modelId: this.modelId
                })
                if(res.code==0){
                    this.dataList=res.data
                }
            },
            getCarInfo(val){
                this.setCar(val)
                wx.navigateTo({
                    url:'/pages/app/needCollect/main'
                })
            }
        },
        onLoad(op){
            this.modelId= op.modelId,
            this.modeName=op.modeName
            // this.getCarList()
        },
        onShow(){
            this.getCarList()
        }
    }
</script>

<style lang="scss" scoped>
    .car_style_main{
        .car_title{
            color:#1A1A1A;
            font-size: 40rpx;
            margin: 28rpx 0 32rpx 40rpx;
        }
        .car_lists{
            .list{
                .list_year{
                    height:56rpx;
                    background:rgba(247,247,250,1);
                    padding-left: 40rpx;
                    font-size: 26rpx;
                    color: #1A1A1A;
                    line-height: 56rpx;
                    font-weight: 500
                }
                .car_info{
                    padding: 28rpx  40rpx 0rpx 40rpx ;
                    min-height: 120rpx;
                    box-sizing: border-box;
                }
                .line{
                    width:100%;
                    height:0px;
                    border:2rpx solid rgba(242,241,246,1);
                }
                .car_price{
                    line-height: 24rpx;
                    margin-top: 6rpx;
                    margin-bottom:22rpx;
                    .intruct_P{
                        color: #767676;
                        font-size: 24rpx;
                        margin-right: 30rpx;
                    }
                    .price_num{
                        color: #BB0A30;
                        font-size: 24rpx;
                    }
                }
                .car_full_name{
                    color: #262626;
                    font-size: 30rpx;
                    font-weight: 500;
                    line-height: 40rpx;
                }
            }
        }
    }
</style>