<template>
    <div class="user_main">
        <div class="top_serach">
            <div :class="[flag?'default':'changeWidth']">
                <!-- <navigator url="./search/main">
                    <img v-if="imageApi" :src="imageApi+'/search.png'" alt="" class="search_icon" @click="searchFun">
                </navigator> -->
                <img v-if="imageApi" :src="imageApi+'/search.png'" alt="" class="search_icon" @click="searchFun">
                <input type="number" class="search" v-model="search" placeholder="请输入客户手机号" placeholder-style="color:#aaa;font-size:13px;" maxlength="11" @focus="changeStyle" >
                <img :src="imageApi+'/close.png'" alt="" class="close_icon" @click="clearFun" v-if="imageApi">
                <span class="cache" @click="cancle" v-if="!flag">
                    取消
                </span>
            </div>
            <div class="left_add" @click="addData" v-if="flag">
                <!-- <img src="../../../static/images/add.png" alt="" class="add_icon">
                <span>添加数据</span> -->
                    <!-- <button  class="add_data" >
                    +洞察客户
                    </button> -->
                <span class="add_customer"><span class="add_icon_plus">+</span>添加客户</span>
            </div>
            <!-- <dialogAdd @close='closeFun' v-if="Closeflag"></dialogAdd> -->
        </div>
        <div>
        <div :class="[statsu?'navbar':'default_nav']">
            <block v-for="(item,index) in tabs" :key="index">
                <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick" v-if="statsu">
                    <div class="navbar_title">{{item.name}}</div>
                </div>
            </block>
            
            <div class="navbar_slider" :class="navbarSliderClass"></div>
            </div>
            <div class="select_up" v-if="activeIndex==0">
                <span class="order_">排序</span>
                <div class='select_box'>
                    <div class='select' @click='selectTap'>
                        <span  class='select_text'>{{selectData[index]}}</span>
                        <img   :class="['select_img',selectShow&&'select_img_rotate']" src='../../../static/images/trangle.png'  background-size="contain" />
                    </div>
                    <div class='option_box' v-show="selectShow">
                        <span class='option' v-for='(item,index) in selectData' :key='index'  @click='optionTap(index)'>{{item}}</span>
                    </div>
                </div>
            </div>
            <swiper :class="[statsu?'content':'contnt_main']" :duration="50"  @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish" v-if="listsData.length>0">
                <swiper-item  v-for="(item,index) in tabs" :key="index">
                    <scroll-view
                        scroll-y
                        style="height:82vh;"
                        @scrolltolower="pullData"
                    >
                    <div :class="[statsu?'list_scope':'list_conten_scop','list_content']">
                        <div class="list" v-for="(item,ind) in listsData" :key="ind" @click="lookDetail(item)">
                            <div class="user_info">
                                <div class="user_icon">
                                    <img :src="imageApi+'/header-man.png'" alt="" class="header_img">
                                    <img v-if="item.proxyStatus == 1" :src="imageApi+'/jzxd/spokesman-customer.png'" alt="" class="spokesman_img">
                                </div>
                                <div class="user_detail_msg">
                                    <div style="display:flex;align-items: center;">
                                        <span style="display:block;min-width:260rpx" v-if="item.name">
                                             <span class="user_name">{{item.name}}</span>
                                            <span class="phone_num">
                                                <span :class="[search.length > 5 ? 'phone_num_red' : '']">{{item.showPhone[0] ||''}}</span>
                                                <span>{{item.showPhone[1]||''}}</span>
                                            </span>
                                        </span>
                                         <span style="display:block;width:180rpx" v-else>
                                            <span class="phone_num">
                                                <span :class="[search.length > 5 ? 'phone_num_red' : '']">{{item.showPhone[0] ||''}}</span>
                                                <span>{{item.showPhone[1]||''}}</span>
                                            </span>
                                        </span>
                                        <span :class="['badge' ,levlColor[item.cusLevel]]" v-if='levelVal[item.cusLevel]'>{{levelVal[item.cusLevel]}}</span>
                                        <span class="upadte_time">{{item.createTime}}</span>
                                    </div>
                                    <div style="display:flex;align-items: center;margin:14rpx 0;">
                                        <div class="label" v-if="item.createSource=='邀约到店' && item.appointmentTime">
                                            <span>{{item.createSource}}  </span>
                                            <span>预计#{{item.tT}}</span>
                                            <span>{{item.sT}}#到店</span>
                                        </div>
                                        <div class="label liuZi" v-if="item.createSource=='小程序留资'">
                                            <span>{{item.createSource}}  </span>
                                        </div>
                                        <div class="car_series" v-if='item.carType'>
                                            {{item.carType}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right_time" v-if="colorList[item.code]">
                                <span :class="colorList[item.code]"></span>{{item.message}}
                            </div>
                        </div>
                    </div>
            </scroll-view>
            </swiper-item>
            </swiper>
            <div class="img_scope" v-else>
                <img :src="imageApi+'/user_default.png'" alt="" v-if="imageApi">
                <span class="default_size">暂无客户信息</span>
            </div>
        </div>
      <!-- <tab_bar :selected="2"></tab_bar> -->
    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    import {formatDay} from "../../utils";
    import {fenxiang} from "../../utils";
    import {formateTtime} from "../../utils";
    import {formateSTime} from "../../utils";
    import {formateTS} from "../../utils";
    import dialogAdd from './addData/index';
    import {imageApi} from "../../http/url";
    import tab_bar from '../../components/tabBar'
    export default {
        components:{
          dialogAdd,
          tab_bar
        },
        data(){
            return{
                imageApi,
                search:'',
                tabs: [
                    {
                        name: "跟进中",
                        type: "3",
                        checked: true
                    },
                    {
                        name: "已战败",
                        type: "2",
                        checked: true
                    },
                    {
                        name: "已成交",
                        type: "1",
                        checked: true
                    }
                ],
                activeIndex: 0,
                currentTab: 0,
                winWidth: 0,
                winHeight: 0,
                dataList:[],
                flag:true,
                statsu:true,
                tradeStatus:'3',
                defalutName:'',
                pageNo:0,
                pageSize:10,
                listsData:[],
                taotal:null,
                Closeflag:false,
                levlColor:{
                    '1':'badge_h',
                    '2':'badge_a',
                    '3':'badge_b',
                    '4':'badge_c',
                    '5':'badge_i',
                    '6':'badge_l'
                },
                levelVal:{
                    '1':'H',
                    '2':'A',
                    '3':'B',
                    '4':'C',
                    '5':'',
                    '6':''
                },
                colorList:{
                    '007':'bade_title',
                    '009':'bade_title',
                    '022':'bade_title',
                    // '007':'bade_title',
                    // '008':'bade_title',
                    '005':'bade_label_l3',
                    '008':'bade_label_l3',
                    '010':'bade_label_l3',
                    '011':'bade_label_l3',
                    '020':'bade_label_l3',
                    '021':'bade_label_l3',
                    '001':'',
                    '002':'',
                    '003':'',
                    '004':'',
                    '006':'',
                    '012':'',
                    '013':'',
                    '014':'',
                    '015':'',
                    '016':'',
                    '017':'',
                    '018':'',
                    '019':'',

                },
                selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
                selectData: ['意向最高','最新动态时间','最新接待'],//下拉列表的数据
                index:2,//选择的下拉列表下标
            }
        },
        computed: {
            navbarSliderClass() {
            if (this.activeIndex == 0) {
                return "navbar_slider_0";
            }
            if (this.activeIndex == 1) {
                return "navbar_slider_1";
            }
            if (this.activeIndex == 2) {
                return "navbar_slider_2";
            }
            if (this.activeIndex == 3) {
                return "navbar_slider_3";
            }
            },
            contentHeight() {
            return this.winHeight + "px";
            },
            time(){
                return new Date().getTime()
            },
            ...mapGetters({
                'userInfo':'userInfo',
                'vi': 'vi',
            })
        },
        watch:{
            search(v){
                if(v.length>5){
                    this.searchData();
                }
            }
        },
        methods: {
            ...mapMutations({
                'getCarList':'user/getCarList',
                'setCustomerPhone':'user/setCustomerPhone'

            }),
            ...mapActions({
                'getUserList':'user/getUserList',
                'getCarSeries':'user/getCarSeries',


            }),
            // 点击下拉显示框
            selectTap() {
                this.selectShow=!this.selectShow
            },
            optionTap(index){
                this.index=index;
                this.pageNo=0;
                // this.Closeflag=false;
                this.dataList=[];
                this.listsData=[]
                this.getList();
                this.selectShow=!this.selectShow
            },
            closeFun(){
                this.Closeflag=false;
            },
            async getCar(){
                let res=await this.getCarSeries({manuId: this.userInfo.manuId,foursId:this.userInfo.foursId,pageNum:1,numPerPage:1000});
                this.getCarList(res.data)

            },

            //获取用户信息
            async getList() {
                let res=  await this.getUserList({foursId:this.userInfo.foursId,salesman:this.userInfo.userId,phone:this.search,tradeStatus:this.tradeStatus,pageNo:++this.pageNo,pageSize:this.pageSize,sort:this.index+1});
                this.taotal=res.data.totalCount;
                if (res.data.recordList.length==0){
                    // wx.showToast({

                    //     title: '暂无更多数据',
                    //     icon: 'none',
                    // })
                return;
                }
                var newList =this.dataList.concat(res.data.recordList);
                this.dataList=newList;
                this.listsData=newList.map((v=>{
                    return {
                        ...v,
                        createTime:formateTS(v.createTime),
                        tT:formateTtime(v.appointmentTime),
                        sT:formateSTime(v.appointmentTime)
                    }
                }))
                console.log()
            },
            async searchData() {
                let res=  await this.getUserList({foursId:this.userInfo.foursId,salesman:this.userInfo.userId,phone:this.search,tradeStatus:this.tradeStatus,pageNo:1,pageSize:100,sort:this.index+1});
                this.listsData=res.data.recordList;
                this.listsData=this.listsData.map((v=>{
                    return {
                        ...v,
                        createTime:formateTS(v.createTime),
                        tT:formateTtime(v.appointmentTime),
                        sT:formateSTime(v.appointmentTime)
                    }
                }))
                // this.taotal=res.data.recordList.length;
                // if (res.data.recordList.length==0){
                //     // wx.showToast({
                //     //     title: '暂无更多数据',
                //     //     icon: 'none',
                //     // })
                // return;
                // }
                // var newList =this.dataList.concat(res.data.recordList);
                // this.dataList=newList;
                // this.listsData=newList.map((v=>{
                //     return {
                //         ...v,
                //         updateTime:formatDay(v.updateTime)
                //     }
                // }))
            },
            searchFun(){
                // wx.navigateTo({
                //     url: '../user/search/main?'+this.search
                // })
                this.searchData ();
            },
            // 上拉获取信息
            pullData(){
                if(this.taotal==this.dataList.length){
                    wx.showToast({
                        title: '暂无更多数据',
                        icon: 'none',
                    })
                    return ;
                }
                this.getList();
            },
            changeStyle(){
                this.flag=false;
                this.statsu=false;
                // this.pageNo=0;
                // this.dataList=[];
                // this.listsData=[];
            },
            cancle(){
                this.flag=true;
                this.statsu=true;
                this.pageNo=0;
                this.search='';
                this.dataList=[];
                this.listsData=[];
                // console.log(this.phone);
                this.getList()
            },
            clearFun(){
                this.search='';
                this.getList()
            },
            addData(){
                wx.navigateTo({
                    url:'../user/addData/main'
                })
                // this.Closeflag=true
            },
            tabClick(e) {
                this.activeIndex = e.currentTarget.id;
                this.currentTab =this.activeIndex;
                this.pageNo=0;
                this.dataList=[];
                this.listsData=[];
                if(this.activeIndex==0){
                    this.tradeStatus='3'
                }else{
                    this.tradeStatus=this.tabs[this.activeIndex].type
                }
                this.getList()
            },
            swiperChange(e) {
                this.currentTab = e.mp.detail.current;
                this.activeIndex = this.currentTab;
                this.pageNo=0;
                this.dataList=[];
                this.listsData=[];
                if(this.activeIndex==0){
                    this.tradeStatus='3'
                }else{
                    this.tradeStatus=this.tabs[this.activeIndex].type
                }
                 this.getList()

            },
            onAnimationfinish() {
            },
            lookDetail(val){
                this.setCustomerPhone(val.phone)
                wx.navigateTo({
                    url:'/pages/generalSale/receptionCustomer/main'
                })
            }
        },
        onPageScroll: function (e) { // 获取滚动条当前位置
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onShow(){
            this.pageNo=0;
            this.Closeflag=false;
            this.dataList=[];
            this.listsData=[]
            this.getList();
        },
        onLoad() {
            var res = wx.getSystemInfoSync();
            this.winWidth = res.windowWidth;
            this.winHeight = res.windowHeight;
            this.activeIndex=0;
            this.pageNo=0;
            this.Closeflag=false;
            this.dataList=[];
            this.listsData=[];
            // console.log(this.Closeflag);
            // this.getList();
            this.getCar()
        },
        
        onPullDownRefresh(){
        }
    }
</script>

<style lang="scss" scoped>
    // page{
    //     overflow-y: hidden;
    // }
    .user_main{
        background: #fff;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        overflow-x: hidden;
        .content{
            height: 82vh;
            // overflow-y: scroll;
        }
        .contnt_main{
            height: 82vh;
        }
        .select_up{
            width: 100%;
            height: 60rpx;
            background-color: #eee;
            text-align: right;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            .order_{
                color: #333;
                font-size: 12px;
                // margin-right: 60rpx;
                position: absolute;
                right: 235rpx;

            }
            .select_box{
            width:45%;
            height:70%;
            border-radius: 14rpx;
            position: relative;
            }
            .select_box .select{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: 8rpx;
            display: flex;
            align-items: center;
            padding: 0 10rpx;
            }
            .select_box .select .select_text{
            font-size: 26rpx;
            color: #333;
            line-height: 28rpx;
            flex: 1;
            margin-right: 40rpx;
            }
            .select_box .select .select_img{
            width: 24rpx;
            height: 24rpx;
            position: absolute;
            right: 210rpx;
            display: block;
            transition:transform 0.3s;
            }
            .select_box .select .select_img_rotate{
            transform:rotate(180deg); 
            }
            .select_box .option_box{
            z-index: 1000000;
            position: absolute;
            top: calc(100% - 1px);
            width: 100%;
            box-sizing: border-box;
            height: 166rpx;
            overflow-y: auto;
            background: #fff;
            transition: height 0.3s;
            border-left:1px solid #efefef;
            border-right:1px solid #efefef;
            }
            .select_box .option_box .option{
            display: block;
            line-height: 30rpx; 
            font-size: 26rpx;
            border-top: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
            padding: 10rpx;
            text-align: left;
            }
        }
        .img_scope{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .default_size{
                font-size: 15px;
                color: #888;
            }
            img{
                width: 50.66666666666667vw;
                height: 21.58920539730135vh;
                margin-top: 6.746626686656672vh;
            }
        }
        .top_serach{
            padding: 1.7991vh 5.33333vw 0 5.33333vw;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // box-sizing: border-box;
            .changeWidth{
                width: 90%;
                position: relative;
                .close_icon{
                position: absolute;
                left:90%;
                top:16rpx ;
                width: 5.33333vw;
                height:5.33333vw ;
                z-index: 9;
            }
            }
            .default{
                width:480rpx;
                position: relative;
                .close_icon{
                    position: absolute;
                    left:88%;
                    top: 16rpx;
                    width: 5.33333vw;
                    height:5.33333vw ;
                    z-index: 9;
                }
            }
            .search_icon{
                position: absolute;
                left: 1.866666vw;
                top:16rpx ;
                width: 5.33333vw;
                height:5.33333vw ;

            }

            .close_icon_search{
                position: absolute;
                right: 16.5vw;
                top:2.6vh ;
                width: 5.33333vw;
                height:5.33333vw ;
                z-index: 9;
            }
            .cache{
                position: absolute;
                top:16rpx ;
                right: -5.2vh;
                font-size: 13px;
                color: #888;
            }
            .left_add   {
                color: #333;
                font-size: 15px;
            }
            .add_icon{
                width: 5.33333vw;
                height:5.33333vw ;
                vertical-align: bottom;
            }
            .add_icon_plus{
                color: #333;
                font-size: 42rpx;
            }
            .add_data{
                width:102px;
                height:5.0974vh;
                background:#FF443F;
                opacity:1;
                border-radius:25px;
                color: #fff;
                font-size: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                outline-style: none;
            }
            .add_customer{
                color: #333;
                font-size: 32rpx;
            }
            .search{
                width:100%;
                height:70rpx;
                background:rgba(242,242,242,1);
                border-radius:8rpx;
                padding-left: 8.866666vw;
                padding-right: 8.866666vw;
                box-sizing: border-box;
                font-size: 13px;
                color: #333;
            }
        }
        .list_conten_scop{
            padding: 0 5.333333vw;
            // overflow-y: scroll;
            height: 82vh;
        }
        .list_scope{
             padding: 0 5.333333vw;
            // overflow-y: scroll;
            height: 82vh;
        }
        .list_content{
            // padding: 0 5.333333vw;
            // // overflow-y: scroll;
            // height: 72vh;
            .list{
                min-height: 148rpx;
                border-bottom: 1px solid #ECECEC;
                // display: flex;
                // justify-content: space-between;
                // align-items: center;
                font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(204,204,204,1);
                padding: 40rpx 0 20rpx 0;
                box-sizing: border-box;
                 position: relative;
                .right_time{
                   display:-webkit-box;
                    -webkit-line-clamp:1;
                    -webkit-box-orient:vertical;
                    overflow:hidden;
                    color: #999;
                }
                .bade_label_l1{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                    background:rgba(255,82,83,1);
                    border-radius:50%;
                    opacity:1;
                    margin-right: 8rpx;
                    color: #999;
                }
                .bade_label_l2{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                     background:#999999;
                    border-radius:50%;
                    opacity:1;
                    margin-right: 8rpx;
                    color: #999;
                }
                .bade_label_l3{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                     background:#FFA600;
                    border-radius:50%;
                    opacity:1;
                    margin-right: 8rpx;
                    color: #999;
                }
                .user_info{
                    display: flex;
                    .user_icon{
                        width: 9.6vw;
                        height: 9.6vw;
                        border-radius: 50%;
                        background: #ccc;
                        position: relative;
                        // position: relative;
                        .header_img{
                            width: 100%;
                            height: 100%;
                        }
                        .spokesman_img{
                          position: absolute;
                          bottom: -8rpx;
                          left: 6rpx;
                          width: 60rpx;
                          height: 24rpx;
                        }
                    }
                    .user_detail_msg{
                        display: flex;
                        flex-direction: column;
                        margin-left: 40rpx;
                        .user_name{
                            font-size: 28rpx;
                            color: #1A1A1A;
                            margin-right: 16rpx;
                        }
                        .phone_num{
                            font-size: 28rpx;
                            color: #1A1A1A;

                        }
                        .phone_num_red{
                          color: #FF443F;
                        }
                        .upadte_time{
                            position: absolute;
                            right: 0;
                            top: 40rpx;
                            color: #B3B3B3;
                        }
                        .badge{
                            // position: absolute;
                            display: inline-block;
                            width: 30rpx;
                            height: 30rpx;
                            border-radius: 4px;
                            margin-left: 10rpx;
                            color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .badge_h{
                            // background: #FF5253;
                            border: 1px solid #FF5253;
                            color: #FF5253;
                        }
                        .badge_c{
                            // background: #B0C939;
                            border: 1px solid  #B0C939;
                            color:  #B0C939;
                        }
                        .badge_b{
                            border: 1px solid   #FFE131;
                            color:   #FFE131;
                            // background: #FFE131;
                        }
                        .badge_a{
                            border: 1px solid   #FFA600;
                            color:   #FFA600;
                            // background: #FFA600;
                        }
                        .badge_l{
                            background: #AAAAAA;
                        }
                        .badge_i{
                            background: #FFA678;
                        }
                    }
                    .label{
                        width: 385rpx;
                        background:rgba(242,242,242,1);
                        border-radius:8rpx;
                        color: #767676;
                        display: flex;
                        padding: 4rpx 6rpx;
                        font-size: 24rpx;
                        justify-content: space-between;
                         margin-right: 15rpx;
                    }
                    .liuZi{
                         width: 125rpx;
                    }
                    .car_series{
                        color: #767676;
                        font-size: 24rpx;
                        padding: 4rpx 6rpx;
                        // margin-left: 15rpx;
                        background:rgba(242,242,242,1);
                        border-radius:8rpx;
                    }
                }
            }
            .list:nth-last-child(1){
                margin-bottom: 50px;
            }
        }
        // .content {
        //     box-sizing: border-box;
        //     -webkit-overflow-scrolling: touch;
        // }

        .swiper-item {
            height: 100%;
            text-align: center;
        }

        .navbar {
            display: flex;
            width: 100%;
            background-color: #fff;
            color: #aaa;
            border-bottom: 1rpx solid #ccc;
            justify-content: space-between;
            padding: 0 5.3333vw;
            box-sizing: border-box;
            margin-top: 9.0666667vw;
        }
        .default_nav{
            display: flex;
            width: 100%;
            background-color: #fff;
            color: #aaa;
            // border-bottom: 1rpx solid #ccc;
            justify-content: space-between;
            padding: 0 5.3333vw;
            box-sizing: border-box;
            margin-top: 2.0666667vw;
        }

        .navbar_item {
            position: relative;
            display: block;
            font-size: 0;

        }

        .navbar_item  {
            color: #aaa;
            font-size: 15px;
        }
        .navbar_item_on{
            color: #333;
            font-size: 15px;
            padding: 0 5px;
            border-bottom: 2px solid rgba(85,85,85,1);
        }

        .navbar_title {
            // color: #aaa;
            font-weight: 500;
            display: inline-block;
            font-size: 15px;
            max-width: 8em;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }

        .navbar_slider {
            position: absolute;
            content: " ";
            left: 0;
            bottom: 0;
            width: 6em;
            height: 3px;
            background-color: white;
            -webkit-transition: -webkit-transform 0.1s;
            transition: -webkit-transform 0.1s;
            transition: transform 0.1s;
            transition: transform 0.1s, -webkit-transform 0.1s;
        }

        .navbar_slider_0 {
            left: 29rpx;
            transform: translateX(0);
        }

        .navbar_slider_1 {
            left: 29rpx;
            transform: translateX(250rpx);
        }

        .navbar_slider_2 {
            left: 29rpx;
            transform: translateX(500rpx);
        }
        .navbar_slider_3{
            left: 29rpx;
            transform: translateX(725rpx);
        }
        .controls {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            position: fixed;
            z-index: 8888;
            top: 80;
            height: 50px;
            width: 100%;
            background-color: #298de5;
        }

    }
</style>
