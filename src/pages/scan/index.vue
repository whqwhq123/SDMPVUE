<template>
    <div class="scan">
        <div class="scan_title">核销码</div>
        <input type="text" placeholder="手动输入核销码" class="figuer_scan" v-model="scanNum"/>
        <img :src="imageApi+'/circle.png'" alt="" class="close" @click="clean">
        <button class="check_scan" @click="exchange">允许兑换</button>
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
                scanNum:'',
                imageApi

            }
        },
        computed: {
          ...mapGetters({
            'userInfo': 'userInfo'
          })
        },
        methods: {
            ...mapActions({
                'scanMsg':'user/scanMsg'
            }),
            ...mapMutations({
                'setScanRes': 'writeOff/setScanRes'
            }),
            clean() {

                this.scanNum = '';
            },
            async exchange(){
                if(!this.scanNum){
                    wx.showToast({
                        title: '核销码不能为空',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                let scanRes= await this.scanMsg({url:saasApi + 'fscp/getCouponInfoByCode',data:{couponCode:this.scanNum}});

                if(scanRes.code==0){
                  this.setScanRes(scanRes.data);
                  this.scanNum = '';
                    wx.navigateTo({
                        url: './scanInfo/main'
                    });
                }

            }
        },
        onLoad(op){
            // this.option=op.option;
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
    }
</script>

<style lang="scss" scoped>
    .scan{

        height: 100vh;
        width: 100%;
        background: #F7F9FB;
        box-sizing: border-box;
        position: relative;
        .scan_title{
            width: 100%;
            height: 5.397301349325337vh;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #2D2C31;
             margin-bottom: 5.3333vw;
        }
        .figuer_scan{
            width: 100%;
            height: 8.395802098950526vh;
            background: #fff;
            padding-left: 7.199999999999999vw;
            box-sizing: border-box;

        }
        .check_scan{
            width:90.66666666666666vw;
            height:6.746626686656672vh;
            background:rgba(62,74,109,1);
            opacity:1;
            border-radius:25px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 4.497751124437781vh;
        }
        .close{
            width: 5.3333vw;
            height: 5.3333vw;
            position: absolute;
            top: 11.6vh;
            left: 90%;
            z-index: 10000;
        }
    }
</style>
