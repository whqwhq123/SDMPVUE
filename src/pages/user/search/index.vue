<template>
    <div class="search_scope">
        <div class="add_data" >
            <span class="create_custom">搜索结果</span>
            <span class="cancle" @click="cancle">取消</span>
        </div>
        <scroll-view
            scroll-y
            style="height:98vh;"
            @scrolltolower="getList"
        >
            <div class="list_content">
                <input type="number" class="search" />
                <div class="list" v-for="(item,ind) in dataList" :key="ind" @click="lookDetail(item)">
                    <div class="user_info">
                        <div class="user_icon">
                            <img :src="imageApi+'/header-man.png'" alt="" class="header_img">
                            <img v-if="item.proxyStatus == 1" :src="imageApi+'/jzxd/spokesman-customer.png'" alt="" class="spokesman_img">
                            <span class="badge badge_h" v-if="item.cusLevel=='H'">{{item.type}}</span>
                            <span class="badge badge_b" v-if="item.cusLevel=='B'">{{item.type}}</span>
                            <span class="badge badge_c" v-if="item.cusLevel=='C'">{{item.type}}</span>
                            <span class="badge badge_a" v-if="item.cusLevel=='A'">{{item.type}}</span>
                        </div>
                        <div class="user_detail_msg">
                            <span class="user_name">{{item.name||'未知'}}</span>
                            <span class="phone_num">{{item.phone||''}}</span>
                        </div>
                    </div>
                    <div class="right_time">
                        {{item.time}}
                    </div>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {formatDay} from "../../../utils";
import {fenxiang} from "../../../utils";
import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
                dataList:[],
                search:'',
                pageNo:0,
                pageSize:10
            }

        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo'
            })
        },
        methods: {
            ...mapActions({
                'getUserList':'user/getUserList'
            }),
            //获取用户信息
            async getList() {
                let res=  await this.getUserList({foursId:this.userInfo.foursId,phone:this.search,tradeStatus:this.tradeStatus,pageNo:++this.pageNo,pageSize:this.pageSize,sort:3});
                if (res.data.recordList.length==0){
                    wx.showToast({
                        title: '暂无更多数据',
                        icon: 'none',
                    })
                    }
                var newList = this.dataList.concat(res.data.recordList);
                this.dataList=newList.map((v=>{
                    return {
                        ...v,
                        updateTime:formatDay(v.updateTime)
                    }
                }))
            },
            cancle(){
                wx.redirectTo({
                    url: '../../user/main'
                })
            },
            lookDetail(val){
                wx.navigateTo({
                     url:'../customerMsg/main?option='+JSON.stringify(val)
                })
            }
        },
        onLoad(op) {
            this.search=op.phone;
            this.getList()
        },
        onPullDownRefresh(){
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        }
    }
</script>

<style lang="scss" scoped>
    .add_data{
        width: 100%;
        height:8.09595vh;
        background: #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5.33333vw 1.49925vh 5.33333vw;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        z-index: 10;
        .create_custom{
            font-size: 24px;
            color: #fff;
        }
        .cancle{
            color: #aaa;
            font-size: 15px;
        }

    }
    .search_scope{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .top_serach{
            padding: 1.7991vh 5.33333vw 0 5.33333vw;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // box-sizing: border-box;
            .search_icon{
                position: absolute;
                left: 6.866666vw;
                top:3vh ;
                width: 5.33333vw;
                height:5.33333vw ;

            }
            .close_icon{
                position: absolute;
                left: 58.5vw;
                top:3vh ;
                width: 5.33333vw;
                height:5.33333vw ;
                z-index: 10000;
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
            .add_data{
                width:102px;
                height:5.0974vh;
                background:rgba(255,68,63,1);
                opacity:1;
                border-radius:25px;
                color: #fff;
                font-size: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                outline-style: none;
            }

        }
        .list_content{
            height: 90%;
            padding: 0 5.333333vw;
            margin-top: 8.0974vh;
            .search{
                width:80vw;
                height:5.0974vh;
                background:rgba(245,245,245,1);
                border-radius:5.33333vw;
                padding-left: 8.866666vw;
                box-sizing: border-box;
                font-size: 13px;
                color: #333;
            }
            .list{
                height: 10.494752vh;
                border-bottom: 1px solid #ECECEC;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size:12px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(204,204,204,1);
                .user_info{
                    display: flex;
                    .user_icon{
                        width: 9.6vw;
                        height: 9.6vw;
                        border-radius: 50%;
                        background: #ccc;
                        position: relative;
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
                        .badge{
                            position: absolute;
                            display: inline-block;
                            width: 4vw;
                            height: 4vw;
                            border-radius: 4px;
                            right: 0;
                            bottom: 0;
                            color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .badge_h{
                            background: #FF5253;
                        }
                        .badge_c{
                            background: #B0C939;
                        }
                        .badge_b{
                            background: #FFE131;
                        }
                        .badge_a{
                            background: #FFA600;
                        }
                    }
                    .user_detail_msg{
                        display: flex;
                        flex-direction: column;
                        margin-left: 3.2vw;
                        .user_name{
                            font-size: 13px;
                            color: #888;
                        }
                        .phone_num{
                            font-size: 16px;
                            color: #555;
                        }
                    }
                }
            }
        }
        .content {
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
        }

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
