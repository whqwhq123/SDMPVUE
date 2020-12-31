<template>
    <div class="rec_car" >
        <div class="title_dis">{{indexTitle[3].secondTitles[0].description}}</div>
        <div class="label_name">
            {{indexTitle[3].secondTitles[0].name}}
        </div>
        <div class="line"></div>
        <div class="car_lis">
            <div class="list_item" v-for="(item,index) in dataCarList" :key="index" v-if='index<4'>
                <span class="car_name">{{item.carName}}</span>
                <span class="t_j"  @click="recCar(item)">推荐</span>
            </div>
             <div class="openShare" @click='checkoutAllCar'>查看全部车型</div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        data(){
            return {
                dataCarList:[],
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'indexTitle':'user/indexTitle'
            }),
        },
        methods: {
            ...mapMutations({
                'setCarModel': 'selectCar/setCarModel',
            }),
            ...mapActions({
                'getCarModel': 'user/getCarModel',
            }),
            checkoutAllCar(){
                mpvue.navigateTo({
                    url: '/pages/selectCar/car/main?flag=true'
                })
            },
            recCar(val){
                this.setCarModel(val)
                mpvue.navigateTo({
                    url: '/pages/generalSale/carStyleList/main?modelId='+val.getCarNameId+'&modeName='+val.carName
                })
            },
            // 获取在售车系
            async getCarList(){
                console.log('获取在售车系列表')
                let res=await this.getCarModel({
                    foursId:this.userInfo.foursId,
                    maunId:this.userInfo.maunId
                })
                
                if(res.code==0){
                    this.dataCarList=res.data;
                    console.log('获取在售车系列表',this.dataCarList)
                }
            }
        },
        onShow(){
            this.getCarList();
        },
        onLoad(){
            this.getCarList();
        }
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
            width: 100%;
            height:4rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            margin-top: 30rpx;
        }
        .car_lis{
            padding: 0 18rpx;
            padding-top: 60rpx;
            box-sizing: border-box;
            .list_item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 78rpx;
                .car_name{
                    color: #444;
                    font-size: 36rpx;
                    line-height: 36rpx;
                }
                .t_j{
                    color: #BB0A30;
                    font-size: 30rpx;
                }
            }
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
            // margin-top: 40rpx;
        }
    }
</style>