<template>
    <div class="scan_info">
        <div class="scan_titl">卡券详情</div>
        <div class="car_detail">
            <span class="car_name">
                {{lists.couponName}}
            </span>
            <div class="car_image">
                <img :src="imageApi+'/shop.png'" alt="" class="shop">
                <span class="car_shop">{{lists.foursName}}</span>
            </div>
        </div>
        <div class="info_list">
            <div class="list">
                <span class="list_title">兑换码</span>
                <span class="list_info">
                    {{lists.couponCode}}
                </span>
            </div>
            <div class="list">
                <span class="list_title">领礼人手机号</span>
                <span class="list_info">
                    {{lists.holder}}
                </span>
            </div>
            <div class="list border_none">
                <span class="list_title">有效时间</span>
                <span class="list_info">
                    {{lists.expireEndTime}}
                </span>
            </div>
            <div class="induction">
                <div class="line_title">
                    <img :src="imageApi+'/induction.png'" alt="">
                    <span class="use_info">使用说明</span>
                </div>
                <div class="config_info ql-editor">
                  <wxParse noData="" :content="lists.remark" />
                </div>
            </div>

        </div>
        <button class="footer_but" @click="exchangeFun">允许兑换</button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {loginApi,api,getCodeApi,saasApi} from '../../../http/url.js';
    import {fenxiang} from "../../../utils";
    import wxParse from 'mpvue-wxparse'
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
                lists:{}
            }
        },
        computed:{
            ...mapGetters({
                'userInfo':'userInfo',
                'scanRes': 'writeOff/scanRes'
            })
        },
      components: {
        wxParse
      },
        mounted () {
            this.lists = this.scanRes;
            this.lists.holder.replace( this.lists.holder.substr(3, 4), '****')
        },
        methods: {
            ...mapActions({
                'conversion':'user/conversion'
            }),
            async comverdionCode(){
                let res = await this.conversion({url: saasApi + 'fscp/checkOutCoupon',data:{couponCode:this.lists.couponCode}})
                if(res.code!=0){
                    wx.redirectTo({
                        url: "../exchange/main"
                    });
                }
            },
            exchangeFun() {
              let that = this;
                wx.showModal({
                    title: '提示',
                    cancelText:'取消',
                    confirmText:'确认',
                    cancelColor:'#899BC1',
                    confirmColor:'#3E4A6D',
                    content: '请确认是否同意客户领取此奖品',
                    success(res) {
                        if (res.confirm) {
                          that.comverdionCode()
                        } else if (res.cancel) {
                        }
                    }
                })
            }
        },
        onShareAppMessage() {
          fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onLoad(res){
          // let obj = JSON.parse(res.option);
          // obj.holder.replace(obj.holder.substr(3, 4), '****')
          // this.lists = JSON.parse(res.option);
        }
    }
</script>

<style lang="scss" scoped>
    @import url("~mpvue-wxparse/src/wxParse.css");
    @import "../../../assets/quill.snow.css";
    .ql-editor{
      padding: 0
    }
    .scan_info{
        width: 100%;
        overflow: hidden;
        background: #F7F9FB;
        .scan_titl{
            width: 100%;
            height: 5.397301349325337vh;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #2D2C31;
        }
        .car_detail{
            width: 100%;
            height: 14.24287856071964vh;
            display: flex;
            flex-direction: column;
            // justify-items: center;
            // align-items: center;
            padding-left: 7.466666666666668vw;
            padding-top: 3.1484257871064467vh;
            box-sizing: border-box;
            background: #fff;
            margin-bottom: 2.548725637181409vh;
            .car_name{
                color: #3E4A6D;
                font-size: 18px;
                font-weight:700;
            }
            .car_image{
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 1.1484257871064467vh;
            }
            .car_shop{
                color: #3E4A6D;
                font-size: 14px;

            }
            .shop{
                width: 5.333vw;
                height: 5.333vw;
                margin-right: 1vh;
            }
        }
        .info_list{
            width: 100%;
            background: #fff;
            padding: 0 40rpx;
            padding-bottom: 100rpx;
            box-sizing: border-box;
            .list{
                height: 7.496251874062969vh;
                border-bottom: 1px solid #E5E5E5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .list_title{
                    font-size: 16px;
                    color: #9097A7;
                }
                .list_info{
                    font-size: 16px;
                    color: #3E4A6D;
                }
            }
            .border_none{
                border: 0;
            }
            .induction{
                width: 100%;
                background: #A0A7B6;
                margin-top: 1.4992503748125936vh;
                .line_title{
                    display: flex;
                    align-items: center;
                     padding-top: 1.3493253373313343vh;
                    img{
                        width: 6.933333333333333vw;
                        height: 6.933333333333333vw;
                        margin-left: 2.666666666666667vw;
                        margin-right: 2.6vh;

                    }
                    .use_info{
                        font-size: 14px;
                        color: #fff;
                    }

                }
                .config_info{
                    font-size: 14px;
                    color: #fff;
                    padding: 40rpx;
                }
            }

        }
        .footer_but{
            width:100%;
            height: 100rpx;
            background:rgba(62,74,109,1);
            opacity:1;
            position: fixed;
            bottom: 0;
            border-radius: 0;
            color: #fff;
        }
    }
</style>
