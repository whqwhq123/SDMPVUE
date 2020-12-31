<template>
    <div class="modal_drawer">
        <div class="left"  :animation='animationData'>
            <div class="list">
                <div class="left_user">
                     <img v-if="imageApi" :src="imageApi+'/header-man.png'" alt="" class="header_img">
                </div>
                <div class="right_info">
                    <span class="user_name">{{userInfo.userName}}</span>
                    <span class="user_job">销售顾问</span>
                </div>
            </div>
            <!-- <div class="list user_list">
                <img src="../../../static/images/card.png" alt="">
                <div class="right_info">
                    <span class="user_name_car">我的名片</span>

                </div>
            </div> -->
            <div class="list user_list" @click="changeStatus">

                <img v-if="imageApi" :src="imageApi+'/quard.png'" alt=""  >
                <div class="right_info">
                    <span class="user_name_car">扫码核销</span>
                </div>
            </div>
            <div class="list user_list">
               <img v-if="imageApi" :src="imageApi+'/pass.png'" alt="">
                <div class="right_info">
                    <span class="user_name_car" @click="setPass">修改密码</span>

                </div>
            </div>
            <div class="footer" @click="logout">
                <img v-if="imageApi" :src="imageApi+'/logut.png'" alt="">
                <span class="user_name_car">退出</span>
            </div>
        </div>
        <div class="right"  v-if='flag'>

        </div>
        <div class="scan" v-if='isScan'>

            <div class="scan_scope">
                <div class="close_scope">
                    <img v-if="imageApi" :src="imageApi+'/closde.png'" alt="" class="close" @click="cancle">
                </div>

                <div class="left_scan" @click="scanFun">
                    <img v-if="imageApi" :src="imageApi+'/scan.png'" alt="">
                    <span class="scan_title">扫码核销</span>
                </div>
                <div class="right_scan" @click="figuerFun">
                     <img v-if="imageApi" :src="imageApi+'/figuer.png'" alt="">
                     <span class="scan_title">手动核销</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {loginApi,api,getCodeApi,saasApi} from '../../http/url.js';
import {fenxiang} from "../../utils";
import {imageApi} from "../../http/url";
    export default {
        data(){
            return{
                imageApi,
                numPhone: null,
                animationData:null,
                flag:true,
                isScan:false
            }
        },
        props:{
            status:null
        },
        watch:{
            status(v){
                this.flag=v;
            }
        },
        computed:{
            ...mapGetters({
                'userInfo':'userInfo'
            })
        },
        methods: {
            ...mapActions({
                'scanMsg':'user/scanMsg',
            }),
            ...mapMutations({
                'setScanRes': 'writeOff/setScanRes',
                'resetStore': 'resetStore'
            }),
            demo(){
            },
            openDrawer (e) {
                var animation  = wx.createAnimation({
                // 动画持续时间
                duration:500,
                // 定义动画效果，当前是匀速
                timingFunction:'linear'
                })
                // 将该变量赋值给当前动画
                // that.animation = animation
                // 先在y轴偏移，然后用step()完成一个动画
                animation.translateX('42.66666666666667vw').step();

                this.animationData = animation.export();
                this.flag = true;
                setTimeout(function(){
                animation.translateX(0).step();
                this.animationData = animation.export()
                },200);
            },
            hideModal (e){
                var animation = wx.createAnimation({
                duration:300,
                timingFunction:'linear'
                })
                // that.animation = animation
                animation.translateY(0).step();
                this.animationData = animation.export();
                this.flag=false
                // setTimeout(function () {
                //   animation.translateY(460).step();
                //   this.animationData = animation.export();
                //
                // }, 200)
            },
            changeStatus(){
                this.isScan=true;
            },
            cancle(){
                this.isScan=false;
            },
            logout() {
                this.resetStore();
                wx.reLaunch({
                    url: '../login/main'
                });
                // let pages = getCurrentPages();
            },
            setPass(){
                 wx.navigateTo({
                    url: '../setPasword/main?id='+this.userInfo.phone
                })
            },
            figuerFun(){
                wx.navigateTo({
                    url: '../scan/main'
                })
            },
            async getScan(result){
                let scanRes= await this.scanMsg({url:result});
                if(scanRes.code === 0){
                    this.setScanRes(scanRes.data);
                    wx.navigateTo({
                        url: '../scan/scanInfo/main'
                    })
                }
            },
            scanFun(){
                var _this = this;
                // 允许从相机和相册扫码
                wx.scanCode({
                    success: (res) => {
                        var result = res.result;
                        this.getScan(result);
                    }
                })
            }
        },

        onShareAppMessage: function () {
          fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onLoad(){
        }
    }
</script>

<style lang="scss" scoped>
    .modal_drawer{
        position: fixed;
        // width: 100vw;
        // height: 100vh;
        // top: 0;
        // display: flex;
        z-index: 1000;

        .left{
            width: 42.66666666666667vw;
            height: 100vh;
            background: #222;
            padding-bottom: 5.3333vw;
            // display: flex;
            box-sizing: border-box;
            position: relative;
            // left: -42.66666666666667vw ;
        }
        .right{
            flex: 1;
            height: 100vh;
            background:rgba(0,0,0,0.7);

        }
        .list{
            display: flex;
            margin-bottom: 5vh;
            padding-top: 1.333vw;
        }
        .user_list{
            align-items: center;
            img{
                 width: 5.33333vw;
                height: 5.33333vw;
                margin-left: 7.466666666666668vw;
                margin-right: 5.866666666666666vw;
            }

        }
        .left_user{
            width: 9.6vw;
            height: 9.6vw;
            border-radius: 50%;
            background: #ccc;
            margin-left: 5.3333vw;
            margin-right: 3.733333333333334vw;
             position: relative;
             margin-top: 2vh;
            .header_img{
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
        .right_info{
            display: flex;
            flex-direction: column;


            .user_name{
                color: #ECECEC;
                font-size: 15px;
            }
            .user_name_car{
                color: #ECECEC;
                font-size: 13px;
            }
            .user_job{
                display: inline-block;
                width: 13.866666666666665vw;
                height: 2.0989505247376314vh;
                border-radius: 1.4992503748125936vh;
                background: #FF443F;
                color: #fff;
                font-size: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

            }
        }
        .footer{
            width: 42.66666666666667vw;
           height: 10.494752623688155vh;
           background: #333333;
           position: fixed;
           bottom: 0 ;
           display: flex;
           align-items: center;
           .user_name_car{
                color: #ECECEC;
                font-size: 13px;
            }
           img{
               width: 4.266666666666667vw;
               height: 4.266666666666667vw;
               margin-left: 8vw;
               margin-right: 6.4vw;
           }
        }
        .scan{
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,.7);
            position: fixed;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000000000000000;
            .close{
                width: 3.333vw;
                height: 3.333vw;
                position: absolute;
                right: 2vh;
                top: 2vh;
            }
            .close_scope{
                width: 8.333vw;
                height: 8.333vw;
                position: absolute;
                right: 0vh;
                top: 0vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .scan_scope{
                width:72vw;
                height:28.18590704647676vh;
                background:rgba(255,255,255,1);
                opacity:1;
                border-radius:8px;
                position: fixed;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 9.6vw;
                box-sizing: border-box;
                top: 30%;
                left: 0;
                right: 0;
                margin: 0 auto;
                z-index: 100000;
            }
            .left_scan,.right_scan{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 21.066666666666666vw;
                    height: 21.066666666666666vw;
                }
                .scan_title{
                    font-size: 14px;
                    color: #3E4A6D;
                    margin-top: 2vh;
                }

            }
        }
    }
</style>
