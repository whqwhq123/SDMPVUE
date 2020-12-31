<template>
    <div :class="['',!areaStatus?'position':'shop_list',]">
        <div class="tabs">
            <span :class="[activeIndex===index?'trang':'list_tab']" @click="areaFun(index)" v-for="(item,index) in label" :key="index">{{item}}</span>
        </div>
        <div class="select_scop" v-if='!areaStatus'>
            <div class="select_scope">
                <div class="item item_all" v-if="activeIndex===0" @click="getlistsAll">
                    全部
                </div>
                <div :class="[index===areaIndex?'active':'','item']" v-for="(item,index) in areaData" :key="index" @click="getProvince(item,index)">
                    {{item.areaName}}
                </div>
            </div>
            <div class="select_scope" v-if="activeIndex==1" >
                <div class="item item_all" @click="getlistsAll">
                    全部
                </div>
                <div :class="[index===provincendex?'active':'','item']" v-for="(item,index) in provinceData" :key="index" @click="getCity(item,index)">
                    {{item.provinceName}}
                </div>
            </div>
            <div class="select_scope" v-if="activeIndex===2" >
                <div class="item item_all" @click="getlistsAll">
                    全部
                </div>
                <div :class="[index===cityIndex?'active':'','item']" v-for="(item,index) in citiesData" :key="index" @click="getdetail(item,index)" v-if='item'>
                    {{item.cityName}}
                </div>
            </div>
            <div class="modal" @click="cancleMol">

            </div>
        </div>
        <div class="list_content">
            <div class="list_item" v-for="(item,index) in dataList" @click="checkDetail(item)" :key="index">
                 <p class="grop_name">{{item.foursName}}</p>
                <p class="grop_adress">{{item.foursAddress||'--'}}</p>
            </div>
        </div>
        <div class="footer_scope" @click="getAll">
            选择全部
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    import http from "../../../../http/api";
    import {saasApi,api} from '../../../../http/url.js';
    export default {
        data(){
            return{
                dataList:[],
                areaStatus:true,
                activeIndex:null,
                label:['大区','省份','城市'],
                area:'',
                areaIndex:null,
                areaData:[],
                province:'',
                provincendex:null,
                provinceData:[

                ],
                city:'',
                cityIndex:null,
                citiesData:[

                ],
                detail:'',
                labelName:'全部经销商',
                pageNo:1,
                // userInfo:{
                //     manuId:9
                // },
                total:null
            }
        },
        computed:{
            ...mapGetters({
                'areaInfo':'areaInfo',
                'userInfo':'userInfo'
            })
        },
        methods: {
            ...mapMutations({
                'changeSelect': 'changeSelect'
            }),
            areaFun(index) {
                if(index==0){
                    this.activeIndex=0;
                    this.areaStatus=false;
                    this.province=''
                    this.city=''
                    this.detail=''
                    this.labelName='全部经销商'
                }
            },
            //取消modal
            cancleMol(){
                this.areaStatus=true;
                this.activeIndex=null;
                this.areaIndex=null;
                this.provincendex=null;
                this.cityIndex=null;
            },
            checkDetail(item){
                this.changeSelect({
                    redis:null,
                    item:item,
                    foursId:item.foursId,
                    type:'one',
                    labelName:item.foursName

                })
                wx.navigateBack()
            },
            getAll(){
                this.getAllRedis();
                wx.navigateBack();
            },
            getProvince(item,index){
                this.province=item.areaId;
                this.areaIndex=index;
                this.activeIndex=1;
                this.labelName=item.areaName;
                this.getPriData(item.areaId)
            },
            getCity(item,index){
                this.city=item.provinceCode;
                this.provincendex=index;
                this.labelName=item.provinceName;
                this.activeIndex=2
                this.getcityData(item.provinceCode)
            },
            getdetail(item,index){
                this.cityIndex=index;
                this.detail=item.cityCode;
                this.labelName=item.cityName;
                this.getlistsAll();
                this.cancleMol();
            },
            getlistsAll(){
                this.pageNo=1;
                this.dataList=[];
                this.getlists();
            },
            //获取数据列表
            async getlists(){
                wx.showLoading({
                    title: '加载中...',
                })
                const res = await http.post(api + 'fsi/getFoursInfoByManuOrAreaOrProvinceCode',{
                    pageNo:this.pageNo,
                    pageSize:10,
                    manuId:this.userInfo.manuId,
                    areaId:this.province||this.userInfo.areaId,
                    provinceCode:this.city,
                    cityCode:this.detail,
                });
                this.dataList=res.data.recordList.concat(this.dataList);
                this.total=res.data.totalCount;
                if(res.code==0){
                    wx.hideLoading();
                    this.pageNo++;
                }else{

                }
                this.cancleMol()
            },
            // 获取所有大区
            async getAreaData(){
                const res = await http.post(api + 'ma/getAreaNameByManuId',{manuId:this.userInfo.manuId});
                this.areaData=res.data;
            },
            // 获取所有省
            async getPriData(id){
                const res = await http.post(api + 'fsi/getProvinceInfoByAreaId',{manuId:this.userInfo.manuId,areaId:id});
                this.provinceData=res.data;
            },
            // 获取所有市
            async getcityData(id){
                const res = await http.post(api + 'fsi/getAreaInfoByProvinceCode',{manuId:this.userInfo.manuId,areaId:this.province,provinceCode:id});
                this.citiesData=res.data;
            },
            //选择全部
            async getAllRedis(){
                const res = await http.post(api + 'fsi/getAllFoursInfo',{
                    manuId:this.userInfo.manuId,
                    areaId:this.province,
                    provinceCode:this.city,
                    cityCode:this.detail,
                    type:1
                });
                console.log(this.activeIndex);
                this.changeSelect({
                    redis:res.data,
                    item:null,
                    foursId:null,
                    type:'all',
                    labelName:this.labelName

                })
            },
        },
        onShow(){
            this.cancleMol();
            this.province=''
            this.city=''
            this.detail=''
        },
        onHide(){

        },
        onLoad(){
            this.province='';
            this.city='';
            this.detail='';
            this.pageNo=1;
            this.dataList=[];
            this.labelName='全部经销商'
            if(this.userInfo.targetType=='A'){
              this.areaData=[this.userInfo]
            }else{
              this.getAreaData();
            }
            this.getlists();

            this.getAllRedis();
        },
        onReachBottom () {
            if(this.total<=this.dataList.length){
                wx.showToast({
                    title: '暂无数据',
                    icon: 'none',
                    duration: 1000
                })
                return
            }
            this.getlists();
        },
    }
</script>

<style lang="scss" scoped>
    .position{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 88rpx;
        box-sizing: border-box;
    }
    .shop_list{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 88rpx;
        box-sizing: border-box;
        // overflow-y: scroll;
    }
        .select_scop{
            height: 80%;
            width: 100%;
            position: absolute;
            // margin-top: 88rpx;
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
            // margin-top: 88rpx;
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
            .list_item:nth-last-child(1){
                // margin-bottom: 88rpx;
                height: 200rpx;
                border: 0;
            }
        }
        .select_scop{
            .select_scope{
                position: fixed;
                height:800rpx;
                width:100%;
                background: #fff;
                z-index: 5;
                overflow-y: scroll;

            }
            .modal{
                width: 100%;
                height: 100%;
                background:rgba(0,0,0,0.6);
                position: fixed;
                top: 0;
                left: 0;
                overflow: hidden;
                z-index: 4;
            }
            .list_mes{
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
        .footer_scope{
            height: 88rpx;
            width: 100%;
            background: #222;
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
</style>
