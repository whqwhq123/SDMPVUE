<template>
    <div class="help_cus">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">帮助客户选车</span>
            </div>
            <div class="title_disc"></div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
                <block>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope select_car">
                                <div class="title_dis">客户可以实时查看并与您保持联系</div>
                                <!-- <div class="line"></div> -->
                                <div class="bgc_content ">
                                    <div class="label_name">
                                        数据选车
                                    </div>
                                    <div class="s_img">
                                        <img :src="imageApi+'/data_slect_car.png'" alt="" class="select_data_img" v-if="imageApi">
                                    </div>
                                </div>
                                <div class="openShare" @click="openShareData(1)">打开二维码</div>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope select_car">
                                <div class="title_dis">将车型推荐单发给客户</div>
                                <!-- <div class="line"></div> -->
                                <div class="bgc_content">
                                    <div class="label_name">
                                        气质选车
                                    </div>
                                    <div class="car_user">
                                        <img :src="imageApi+'/xg_hx.png'" alt="" style="width:304rpx;height:290rpx" v-if="imageApi">
                                    </div>
                                    <div class="lebale label1">风度翩翩</div>
                                    <div class="lebale label2">霸气侧漏</div>
                                    <div class="lebale label3">气宇非凡</div>
                                    <div class="lebale label4">气质爆表</div>
                                    <div class="lebale label5">才貌双绝</div>
                                </div>
                                <div class="openShare" @click='openTemperament(2)'>打开二维码</div>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
             <div class="dot_list">
                <div :class="[activeIndex==index?'dot_active':'dot']" v-for="(val,index) in dataList" :key="index"></div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        data(){
            return {
                imageApi,
                activeIndex:0,
                dataList:[1,2]
                
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'customerPhone':'user/customerPhone'
            })
        },
        methods: {
            ...mapMutations({
                'setShareParams':'user/setShareParams'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
            openShareData(val){
                // let bodyUrl=encodeURI(this.userInfo.manuName)
                let bodyParm = [this.userInfo.foursId,6,this.userInfo.userId,this.userInfo.manuId,'',10].join()
                
                let shareParams = [this.userInfo.foursId, 6,this.userInfo.userId,this.userInfo.manuId].join()
                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'数据选车',
                    shareDisc:'大数据帮您选车',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+ shareParams,
                    shareType:'salesman_4'
                })
            },
            openTemperament(){
                let bodyParm = [this.userInfo.foursId,10,this.userInfo.userId,'','',11].join()
                let shareParams = [this.userInfo.foursId,10,this.userInfo.userId].join()
                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'气质选车',
                    shareDisc:'智能匹配与您气质相投的车',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+ shareParams,
                    shareType:'salesman_4'
                })
            }
            
        },
    }
</script>

<style lang="scss" scoped>
    .help_cus{
         .header_title{
            padding: 80rpx 40rpx 0 40rpx;
            box-sizing: border-box;
            .header_s_title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .s_title{
                    font-size:54rpx;
                    font-family:Source Han Sans CN;
                    font-weight:bold; 
                    color:rgba(26,26,26,1);
                }
                .header_img{
                    width: 72rpx;
                    height: 72rpx;
                }
            }
            .title_disc{
                margin-top: 40rpx;
                margin-right: 18rpx;
                font-size:28rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:48rpx;
                color:rgba(118,118,118,1);
            }
        }
        .page_detail{
            position: relative;
        }
        .swiper_scope{
            margin-top: 32rpx;
            width:100%;
            height: 850rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
            opacity:1;
            .select_car{
                padding: 30rpx;
                box-sizing: border-box;
            }
            .detail_scope{
                width: 670rpx;
                height: 850rpx;
                border-radius:26rpx;
                background:rgba(255,255,255,1);
                box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
                opacity:1;
                overflow:inherit;
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
                .bgc_content{
                    width: 594rpx;
                    height: 552rpx;
                    background-size: 100%;
                    margin: 0 8rpx;
                    box-sizing: border-box;
                    position: relative;
                    .s_img{
                        display: flex;
                        justify-content: center;
                        margin-top: 48rpx;
                    }
                    .select_data_img{
                        width:634rpx;
                        height:462rpx;
                        margin:0 auto;
                    }
                    .qizhi_car_img{
                        width: 500rpx;
                        height: 334rpx;
                        margin-top:128rpx;
                    }
                    .car_user{
                        display: flex;
                        justify-content: center;
                        margin-top: 120rpx;
                    }
                    .user_car_img{
                        width: 160rpx;
                        height:160rpx;
                        margin-right: 56rpx;
                    }
                    .lebale{
                        position: absolute;
                        color:#F8B86C;
                        font-size: 24rpx;
                    }
                    .label1{
                        top:120rpx;
                        left:243rpx
                    }
                    .label2{
                        top:263rpx;
                        right:33rpx
                    }
                    .label3{
                        top:479rpx;
                        right:101rpx
                    }
                    .label4{
                        top:479rpx;
                        left:101rpx
                    }
                    .label5{
                        top:263rpx;
                        left:33rpx
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
                    margin-top: 40rpx;
                }
                
            }
        }
        .dot_list{
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            position: absolute;
            transform: translateX(-30rpx);
            bottom: 30rpx;
            left: 50%;
            .dot{
                width:12rpx;
                height:12rpx;
                background:rgba(229,229,229,1);
                opacity:1;
                border-radius:48rpx;
                display: inline-block;
                margin-right: 12rpx;
                
            }
            .dot_active{
                width:36rpx;
                height:12rpx;
                background:rgba(153,153,153,1);
                opacity:1;
                border-radius:48rpx;
                display: inline-block;
                margin-right: 12rpx;
                transition: all 0.5s linear;
            }
        }
    }
</style>