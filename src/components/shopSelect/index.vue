<template>
    <div :class="['',!areaStatus?'position':'shop_list',]">
        <div class="tabs">
            <span :class="[activeIndex===index?'trang':'list_tab']" @click="areaFun(index)" v-for="(item,index) in label" :key="index">{{item}}</span>
        </div>
        <div class="select_scop" v-if='!areaStatus'>
            <div class="select_scope">
                <div class="item item_all" v-if="activeIndex===0">
                    全部
                </div>
                <div :class="[index===areaIndex?'active':'','item']" v-for="(item,index) in areaData" :key="index" @click="getProvince(item,index)">
                    {{item.areaName}}
                </div>
            </div>
            <div class="select_scope" v-if="activeIndex==1">
                <div class="item item_all">
                    全部
                </div>
                <div :class="[index===provincendex?'active':'','item']" v-for="(item,index) in provinceData" :key="index" @click="getCity(item,index)">
                    {{item.provinceName}}
                </div>
            </div>
            <div class="select_scope" v-if="activeIndex===2">
                <div class="item item_all">
                    全部
                </div>
                <div :class="[index===cityIndex?'active':'','item']" v-for="(item,index) in citiesData" :key="index" @click="getdetail(item,index)">
                    {{item.cityName}}
                </div>
            </div>
            <div class="modal" @click="cancleMol">

            </div>
        </div>
        <div class="list_content">
            <div class="list_item" v-for="item in data">
                <p class="grop_name">北京亚奥之星汽车服务有限公司</p>
                <p class="grop_adress">北京市昌平区北京北辰亚运村汽车交易市场中心3-13-2号</p>
            </div>
        </div>
        <div class="footer_scope" @click="getAll">
            选择全部
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:10,
                areaStatus:true,
                activeIndex:null,
                label:['大区','省份','城市'],
                area:'',
                areaIndex:null,
                areaData:[
                    {
                        "areaId":1,
                        "areaName":"华北大区",
                        "areaDesc":"华北大区",
                        "manuId":58,  
                    }
                ],
                province:'',
                provincendex:null,
                provinceData:[
                    {
                        "provinceCode":"010",
                        "provinceName":"北京",
                    }
                ],
                city:'',
                cityIndex:null,
                citiesData:[
                    {
                         "cityCode":"504",
                        "cityName":"丰台区",
                    }
                ],
                detail:''
            }
        },
        methods: {
            areaFun(index) {
                this.activeIndex=index;
                this.areaStatus=false;
                this.areaIndex=null;
                this.provincendex=null;
                this.cityIndex=null;
            },
            //取消modal
            cancleMol(){
                this.areaStatus=true
            },
            // 获取大区
            getAll(){
                
            },
            getProvince(item,index){
                this.province=item.areaId;
                this.areaIndex=index;
                this.activeIndex=1
            },
            getCity(item,index){
                this.city=item.provinceCode;
                this.provincendex=index
                this.activeIndex=2
            },
            getdetail(item,index){
                this.cityIndex=index;
                this.detail=item.cityCode;
            }
        },
        onReachBottom () {
            console.log(111)
            this.data=this.data*2
        },
    }
</script>

<style lang="scss" scoped>
    .position{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .shop_list{
        width: 100%;
        height: 100%;
        position: relative;
        // overflow-y: scroll;
    }   
        .select_scop{
            height: 80%;
            width: 100%;
            position: absolute;
            margin-top: 88rpx;
            .item_all{
                margin-top: 26rpx;
            }
            .item{
                padding: 0 40rpx;
                color: #555;
                font-size: 30rpx;
                margin-bottom: 54rpx;
            }
            .active{
                color: #FF9302;
            }
        }
        .tabs{
            width:100%;
            height:88rpx;
            padding: 0 40rpx;
            box-sizing: border-box;
            background:rgba(245,245,245,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            z-index: 10;
            top: 0;
            .list_tab{
                display: inline-block;
                height: 100%;
                line-height: 88rpx;
                width: 100rpx;
                color: #555;
                font-size: 26rpx;
                position: relative;
                margin-right: 40rpx
            }
            .list_tab::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 10rpx;
                border-style: solid;
                border-color:#aaa transparent transparent transparent;
                margin-left: 10rpx;
                vertical-align: middle;
                position: absolute;
                top: 38rpx;
            }
            .trang{
                display: inline-block;
                height: 100%;
                line-height: 88rpx;
                width: 100rpx;
                color: #FF9302;
                font-size: 26rpx;
                position: relative;
                margin-right: 40rpx
            }
            .trang::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 10rpx;
                border-style: solid;
                border-color: transparent transparent #FF9302 transparent;
                margin-left: 10rpx;
                position: absolute;
                top: 30rpx;

                
            }
        }
        .list_content{
            width: 100%;
            height:100%;
            // overflow-y: scroll;
            // background: palevioletred;
            margin-top: 88rpx; 
            .list_item{
                width: 100%;
                height: 126rpx;
                padding: 28rpx 40rpx;
                box-sizing: border-box;
                border-bottom: 1px solid #ececec;
                .grop_name{
                    color: #555;
                    font-size: 30rpx;
                }
                .grop_adress{
                    color: #aaa;
                    font-size: 24rpx;
                }
            }
        }
        .select_scop{
            .select_scope{
                position: fixed;
                height:800rpx;
                width:100%;
                background: #fff;
                z-index: 5;
            }
            .modal{
                width: 100%;
                height: 100%;
                background:rgba(0,0,0,0.6);
                position: fixed;
                top: 0;
                left: 0;
                overflow: hidden;
            }
        }
        .footer_scope{
            height: 88rpx;
            width: 100%;
            background: #ccc;
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 88rpx;
        }
</style>