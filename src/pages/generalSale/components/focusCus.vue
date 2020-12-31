<template>
    <div class="focus_cus">
        <div class="header">
            <div class="title">{{indexTitle[1].name}}</div>
            <div class="disc">{{indexTitle[1].description}}</div>
        </div>
        <div class="card_list" v-if='dataList.length>0'>
            <div class="item" v-for="(item ,index) in dataList" :key="index" @click="checkoutCus(item)">
                <img :src="imageApi+'/header-man.png'" alt="" class="header_img" v-if="imageApi">
                <!-- <img :src="imageApi+'/f_c.png'" alt="" class="header_img" v-if="imageApi"> -->
                <div class="item_detail">
                    <div class="user_mesg">
                        <span class="user_name" v-if="item.name">{{item.name}}</span>
                        <span class="user_phone">{{item.phone}}</span>
                        <img src="../../../../static/images/Group-h.png" alt="" style="width:30rpx;height:30rpx;vertical-align: middle;margin-left:10rpx" v-if="item.cusLevel==1">
                        <img src="../../../../static/images/Group-a.png" alt="" style="width:30rpx;height:30rpx;vertical-align: middle;margin-left:10rpx" v-if="item.cusLevel==2">
                        <img src="../../../../static/images/Group-b.png" alt="" style="width:30rpx;height:30rpx;vertical-align: middle;margin-left:10rpx" v-if="item.cusLevel==3">
                        <img src="../../../../static/images/Group-c.png" alt="" style="width:30rpx;height:30rpx;vertical-align: middle;margin-left:10rpx" v-if="item.cusLevel==4">
                        <span class="user_status" :style="colorObj[item.trajectoryType]" v-if="item.trajectoryType"><span class="bdge" :style="circleBgc[item.trajectoryType]"></span>{{item.trajectoryType}}</span>
                    </div>
                    <div class="time">{{item.lastTime}}</div>
                </div>
            </div>
            <div class="but_check" @click="checkCus">查看全部客户</div>
        </div>
        <div class="card_list" v-else>
            <img :src="imageApi+'/default_cus_list.png'" alt="" class='defalut_image' v-if="imageApi">
            <div class="cus_disc">您的客户列表空空如也</div>
            <div class="text_find">快去添加客户吧！</div>
            <div class="but_check add_customer" @click="addCus">添加客户</div>
        </div>
        
    </div>
</template>

<script>
    import {formatDay} from "../../../utils";
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        data(){
            return{
                imageApi,
                dataList:[],
                colorObj:{
                    '正在接待':"color:#FF5253;",
                    '有新动向':"color:#FFA600;"
                },
                circleBgc:{
                    '正在接待':'background:#FF5253',
                    '有新动向':'background:#FFA600'
                },
                levelObj:{
                    '1':'H',
                    '2':'A',
                    '3':'B',
                    '4':'C',
                }
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
                'setCustomerPhone':'user/setCustomerPhone'
            }),
            ...mapActions({
                'getFocusCus':'user/getFocusCus'
            }),
            // 获取客户列表
            async getList(){
                let res =await this.getFocusCus({
                    salesman:this.userInfo.userId,
                    foursId:this.userInfo.foursId
                });
                if(res.code==0){
                    this.dataList=res.data.map((v)=>{
                        return {
                            ...v,
                            lastTime:formatDay(Date.parse(v.lastTime.replace(/-/g, '/')))
                        }
                    })
                }
            },
            // 查看全部客户
            checkCus() {
                
                wx.navigateTo({
                    url:'/pages/user/main'
                })
            },
            //跳转客户接待页面
            checkoutCus(val){
                this.setCustomerPhone(val.phone)
                wx.navigateTo({
                    url:'/pages/generalSale/receptionCustomer/main'
                })
            },
            addCus(){
                wx.navigateTo({
                    url:'/pages/user/addData/main'
                })
            }
        },
        onLoad(){
            this.getList()
        },
        onShow(){
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .focus_cus{
        margin-top: 90rpx;
        .header{
            .title{
                margin-left: 40rpx;
                font-size:54rpx;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:rgba(26,26,26,1);
                opacity:1; 
                line-height: 54rpx;
            }
            .disc{
                font-size:28rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:48rpx;
                color:rgba(118,118,118,1);
                margin: 32rpx 58rpx 0 40rpx;
            }
        }
        .card_list{
            width:670rpx;
            height:840rpx;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx rgba(0,0,0,0.08);
            opacity:1; 
            border-radius: 26rpx;
            padding: 0 40rpx;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 32rpx;
            .item{
                width: 100%;
                height:160rpx;
                padding-top: 56rpx;
                box-sizing: border-box;
                display: flex;
                
                
                .header_img{
                    width: 80rpx;
                    height:80rpx;
                }
                .item_detail{
                    margin-left: 30rpx;
                    width: 500rpx;
                    border-bottom: 1px solid rgba(242,241,246,1);
                    .user_mesg{
                        line-height: 30rpx;
                        position: relative;
                        .user_name{
                            font-size: 30rpx;
                            color: #262626;
                            font-family:Source Han Sans CN;
                            margin-right: 16rpx;
                        }
                        .user_phone{
                            font-size: 30rpx;
                            color: #262626;
                            font-family:Source Han Sans CN;
                            
                        }
                        .user_status{
                            font-size: 28rpx;
                            margin-left: 80rpx;
                            position: absolute;
                            top: 24rpx;
                            right: 0;
                        }
                        .bdge{
                            display: inline-block;
                            width: 12rpx;
                            height: 12rpx;
                            border-radius: 50%;
                            margin-right: 20rpx;
                            vertical-align: middle;

                        }
                    }
                    .time{
                        color: #AAAAAA;
                        font-size: 24rpx;
                        margin-top: 16rpx;
                    }

                }
            }
            .defalut_image{
                width: 350rpx;
                height: 240rpx;
                margin: 160rpx 0 0 120rpx;
            }
            .cus_disc{
                color: #727272;
                font-size: 36rpx;
                text-align: center;
                font-weight: 500;
                margin-top: 64rpx;
            }
            .text_find{
                color: #727272;
                font-size: 28rpx;
                text-align: center;
                margin-top: 10rpx;
            }
            .but_check{
                width:320rpx;
                height:80rpx;
                // background:rgba(247,247,250,1);
                border:1px solid rgba(187,10,48,1);
                opacity:1;
                border-radius:48rpx;
                margin: 0 auto;
                margin-top: 50rpx;
                color: rgba(187,10,48,1);
                font-size: 32rpx;
                line-height:90rpx;
                text-align: center;
            }
            .add_customer{
                margin-top: 120rpx;
            }
        }
       
    }
</style>