<template>
    <div class="reception_customer">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">{{indexTitle[4].name}}</span>
            </div>
            <div class="title_disc">{{indexTitle[4].description}}</div>
        </div>
       <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
                <block>
                    <swiper-item class="detail_scope">
                        <div class="detail_scope" >
                            <div class="effect_label">{{indexTitle[4].secondTitles[0].description}}</div>
                            <div class="slide-image effect_cus">
                            <div class="car_proxy">{{indexTitle[4].secondTitles[0].name}}</div>
                            <div class="post_img_scop">
                                <img :src="imageApi+'/car_owner_proxy.png'" alt="" class='car_proxy_image' v-if="imageApi">
                            </div>
                            <div class="join_data">
                                <div class="s_d">
                                    <span class="num">{{proxyPersonCount}}</span>
                                    <span class="join_name">代言车主</span>
                                </div>
                                    <div class="s_d">
                                    <span class="num">{{participantsCount}}</span>
                                    <span class="join_name">转介绍</span>
                                </div>
                                    <div class="s_d">
                                    <p class="num">{{purchaseCount}}</p>
                                    <p class="join_name">成交</p>
                                </div>
                            </div>
                            </div>
                            <div class="bt_share" @click="invitation">邀请代言人</div>
                        </div>
                    
                    </swiper-item>
                    <!-- <swiper-item class="detail_scope">
                        <div class="detail_scope" >
                            <div class="effect_label">{{indexTitle[4].secondTitles[1].description}}</div>
                            <div class="slide-image effect_cus">
                            <div class="car_proxy">{{indexTitle[4].secondTitles[1].name}}</div>
                            <div class="post_img_scop" >
                                <img :src="postInfo.thumbnail" alt="" class="poster_img">
                            </div>
                            
                            </div>
                            <div class="bt_share" @click="sharePoster">分享海报</div>
                        </div>
                    </swiper-item> -->
                    <swiper-item class="detail_scope">
                        <div class="detail_scope" > 
                            <div class="effect_label">{{indexTitle[4].secondTitles[2].description}}</div>
                            <div class="slide-image effect_cus">
                            <div class="car_proxy">{{indexTitle[4].secondTitles[2].name}}</div>
                            <div class="line"></div>
                            <div class="share_scope">
                                <img :src="userInfo.logo" alt="" class='car_logo'>
                                <div class="user_info">
                                    <img :src="userInfo.headImg" alt="" class="user_icon" v-if="userInfo.headImg">
                                    <div v-else>
                                        <img :src="imageApi+'/f_c.png'" alt="" class="user_icon" v-if="imageApi">
                                    </div>
                                    
                                    <div>
                                        <p class="user_name">{{userInfo.userName}}</p>
                                        <p class="user_role">销售顾问</p>
                                    </div>
                                </div>
                                <div class="address">{{userInfo.foursAddress}}</div>
                            </div>
                            
                            </div>
                            <div class="bt_share" @click="shareCus">分享名片</div>
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
        props:{},
        data(){
            return {
                imageApi,
                proxyPersonCount:'',
                participantsCount:'',
                purchaseCount:'',
                activityId:'',
                postInfo:{},
                dataList:[1,2],
                activeIndex:0,
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'indexTitle':'user/indexTitle'
            })
        },
        methods: {
            ...mapActions({
                'getImageInfo':'recommendActivity/getImageInfo',
                'getSpokesmanInfoReq': 'spokesman/getSpokesmanInfoReq',
                'getPosterInfo':'user/getPosterInfo'
            }),
            ...mapMutations({
                'setShareParams':'user/setShareParams'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
            async getSpokesmanInfo () {
                let res = await this.getSpokesmanInfoReq({
                    foursId: this.userInfo.foursId,
                    salesmanId: this.userInfo.userId
                })
                if (res.code === 0) {
                    this.proxyPersonCount = res.data.proxyPersonCount
                    this.participantsCount = res.data.participantsCount
                    this.purchaseCount = res.data.purchaseCount
                    this.activityId = res.data.activityId || 0
                }
            },
            // 获取海报信息
            async getPoster(){
                let res=await this.getPosterInfo({
                    relationBrand:this.userInfo.manuId
                })
                
                if(res.code==0){
                    this.postInfo=res.data
                    // console.log(this.postInfo.poster+"1111111")
                }
            },
            // 邀请代言人
            invitation(){
                let bodyParm = [this.userInfo.foursId,'',this.userInfo.userId,this.userInfo.phone,this.activityId,9].join()
                let shareParams = [this.userInfo.foursId, 3, this.userInfo.userId, this.userInfo.phone, this.activityId].join()

                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'代言人',
                    shareDisc:'',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+ shareParams,
                    shareType:'salesman_4'
                })
            },
            // 分享海报
            sharePoster(){
                // let bodyParm = [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join()
                // let shareParams = [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join()

                wx.navigateTo({
                    url:'/pages/app/todayPoster/main'
                })
                // this.setShareParams({
                //     shareTitle:'海报',
                //     shareDisc:'',
                //     bodyParm:bodyParm,
                //     shareParams:'/pages/sell/index?scene='+ shareParams,
                //     shareType:'salesman_4'
                // })
            },

            //分享名片
            shareCus(){
                let bodyParm = [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join()
                let shareParams = [this.userInfo.foursId, 2, this.userInfo.userId].join()
                console.log('shareParams',shareParams)
                
                this.setShareParams({
                    shareTitle:'名片',
                    shareDisc:'',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene=' + shareParams,
                    shareType:'salesman_4'
                })
                wx.navigateTo({
                    url:'/pages/generalSale/shareCards/main'
                })
                
            }

        },
        onLoad(){
            this.getPoster();
            this.getSpokesmanInfo();
        },
        onShow(){
            this.getPoster();
            this.getSpokesmanInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .reception_customer{
        .header_title{
            padding: 50rpx 40rpx 0 40rpx;
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
            margin-top: 52rpx;
            width:100%;
            height: 880rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
            opacity:1;
           
            .detail_scope{
                width: 670rpx;
                height: 880rpx;
                border-radius:26rpx;
                background:rgba(255,255,255,1);
                box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
                opacity:1;
                overflow:inherit;
                .effect_label{
                    color: #1A1A1A;
                    font-size: 28rpx;
                    padding-top: 26rpx;
                    margin-left: 32rpx;
                    line-height: 28rpx;
                    box-sizing:  border-box;
                }
                .car_proxy{
                    color: #1A1A1A;
                    font-size: 50rpx;
                    font-weight: 500;
                    margin-top: 20rpx;
                    line-height: 50rpx;
                }
                .post_img_scop{
                    margin-top: 28rpx;
                    display: flex;
                    justify-content: center;
                    .poster_img{
                        width: 626rpx;
                        height: 372rpx;
                    }
                    .car_proxy_image{
                        width: 402rpx;
                        height: 372rpx;
                        margin-top: 60rpx;
                    }
                }
                
                
                
            }
            .effect_cus{
                padding: 0 34rpx;
                box-sizing: border-box;
                position: relative;
                .join_data{
                    position: absolute;
                    left: 0;
                    bottom: 20rpx;
                    width: 100%;
                    padding: 0 84rpx;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    .s_d{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .join_name{
                        color: #727272;
                        font-size: 24rpx;
                    }
                    .num{
                        color: #1A1A1A;
                        font-size: 32rpx;
                    }
                }
                .line{
                    width:100%;
                    height:2rpx;
                    background:rgba(247,247,250,1);
                    opacity:1;
                    margin-top: 30rpx;
                    margin-bottom: 68rpx;
                }
                .share_scope{
                    width:610rpx;
                    height:320rpx;
                    background:rgba(247,247,250,1);
                    opacity:1;
                    border-radius:24rpx;
                    margin:0 auto;
                    padding: 24rpx 28rpx 24rpx 0;
                    box-sizing: border-box;
                    position: relative;
                    .car_logo{
                        width:88rpx;
                        height:88rpx;
                        border-radius: 50%;
                        float: right;
                    }
                    .user_info{
                        display: flex;
                        align-items: center;
                        margin-left: 40rpx;
                        margin-top: 88rpx;
                    }
                    .user_icon{
                        width:88rpx;
                        height:88rpx;
                        border-radius: 50%;
                        margin-right: 16rpx;
                    }
                    .user_name{
                        color:#262626;
                        font-size: 32rpx;
                        font-weight: bold;
                    }
                    .user_role{
                        color: #444444;
                        font-size: 24rpx;
                    }
                    .address{
                        color: #444444;
                        font-size: 24rpx;
                        position: absolute;
                        bottom: 24rpx;
                        right: 28rpx;
                    }
                }
            }
            .slide-image{
                width: 670rpx;
                height: 552rpx;

            }
            .bt_share{
                width:360rpx;
                height:80rpx;
                // background:rgba(247,247,250,1);
                border:1px solid rgba(187,10,48,1);
                opacity:1;
                border-radius:48rpx;
                margin: 0 auto;
                margin-top: 40rpx;
                color: rgba(187,10,48,1);
                font-size: 32rpx;
                line-height: 80rpx;
                text-align: center;
            }
        }
        .dot_list{
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            position: absolute;
            transform: translateX(-45rpx);
            bottom: 40rpx;
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