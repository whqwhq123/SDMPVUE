<template>
    <div class="reception_customer">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">{{indexTitle[0].name}}</span>
                 <img :src="userInfo.headImg" alt="" class="header_img" v-if="userInfo.headImg" @click='userFun'>
                 <img :src="imageApi+'/header-man.png'" alt="" class="header_img"   @click='userFun' v-else-if="imageApi">

            </div>
            <div class="title_disc">{{indexTitle[0].description}}</div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex">
            <block>
                <swiper-item class="detail_scope">
                    <div class="detail_scope">
                        <div class="slide-image">
                            <!-- <div class="gift_disc" v-if="indexTitle">{{indexTitle[0].secondTitles[0].description}}</div> -->
                            <div class="gift_title" v-if="indexTitle">{{indexTitle[0].secondTitles[0].name}}</div>
                            <div class="ar_gift">
                                <img :src="imageApi+'/gift_img.png'" alt="" class="gift_image" v-if="imageApi">
                            </div>
                            <div class="bottom_title">
                                <p class="bt_s">礼品十选一</p>
                                <p class="b_title">客户留资自动与您绑定</p>
                            </div>
                        </div>
                        <div class="bt_share" @click="shareCus()">打开二维码</div>
                        
                    </div>
                   
                </swiper-item>
                <swiper-item class="detail_scope">
                    <div class="detail_scope">
                        <div class="slide-image">
                            <!-- <div class="gift_disc">{{indexTitle[0].secondTitles[1].description}}</div> -->
                            <div class="gift_title">{{indexTitle[0].secondTitles[1].name}}</div>
                            <div class="ar_gift">
                                <img :src="imageApi+'/ar_gift.png'" alt="" v-if="imageApi">
                            </div>
                            
                        </div>
                        <div class="bt_share" @click="levelCus()">打开二维码</div>
                        
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
                item:'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
                indicatorDots: false,
                autoplay: false,
                interval: 5000,
                duration: 1000,
                activeIndex:0,
                dataList:[1,2]
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'indexTitle':'user/indexTitle'
            }),
        },
        methods: {
            ...mapActions({
                'getImageInfo':'recommendActivity/getImageInfo'

            }),
            ...mapMutations({
                'setShareParams':'user/setShareParams'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
            userFun(){
                wx.navigateTo({
                    url:'/pages/app/self/main'
                })
            },
            // 分享给客户
            shareCus(){
                let bodyParm = [this.userInfo.foursId,8, this.userInfo.userId,'','',5].join()
                let shareParams = [this.userInfo.foursId,8, this.userInfo.userId].join()
                
                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'扫我领取见面礼',
                    shareDisc:'为您准备了一份精美礼品，快扫码领取吧！',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+shareParams,
                    shareType:'salesman_4'
                })
            },
            levelCus(){
                let bodyParm = [this.userInfo.foursId,9, this.userInfo.userId,'','',6].join()
                let shareParams = [this.userInfo.foursId, 9,this.userInfo.userId].join()

                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'AR寻礼',
                    shareDisc:'听说扫描意向车型有好礼',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+shareParams,
                    shareType:'salesman_4'
                })
            }

        },
    }
</script>

<style lang="scss" scoped>
    .reception_customer{
        color: #1A1A1A;

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
                    line-height: 54rpx;
                }
                .header_img{
                    width: 72rpx;
                    height: 72rpx;
                }
            }
            .title_disc{
                margin-top:24rpx;
                margin-right: 18rpx;
                font-size:30rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:40rpx;
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
           
            .detail_scope{
                width: 670rpx;
                height: 850rpx;
                // border-radius:26rpx;
                background:rgba(255,255,255,1);
                box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
                opacity:1;
                overflow:inherit;
                
            }
            .slide-image{
                width: 670rpx;
                height: 624rpx;
                border-radius:26rpx 26rpx 0 0;
                padding-top: 26rpx;
                box-sizing: border-box;
                position: relative;
                .gift_disc{
                    font-size: 28rpx;
                    margin: 0rpx 0 20rpx 32rpx;
                    line-height: 28rpx;
                    height: 28rpx;
                }
                .gift_title{
                    font-size: 50rpx;
                    margin-left: 32rpx;
                    line-height: 50rpx;
                    font-weight: 500;
                    height: 50rpx;
                }
                .ar_gift{
                    display: flex;
                    justify-content: center;
                    position: relative;
                    img{
                        width: 604rpx;
                        height: 460rpx;
                        margin-top: 40rpx;
                    }
                    .gift_image{
                        width: 516rpx;
                        height: 480rpx;
                        position: absolute;
                        top: -20rpx;
                        left:50%;
                        margin-left: -258rpx;
                        margin-top: 4rpx;
                    }
                }
                .bottom_title{
                    width: 260rpx;
                    position: absolute;
                    text-align: center;
                    left:50%;
                    margin-left: -130rpx;
                    bottom: -15rpx;
                    .bt_s{
                        color: #262626;
                        font-size: 32rpx;
                    }   
                    .b_title{
                        color: #727272;
                        font-size: 26rpx;
                        margin-top: 8rpx;
                    }
                }

            }

            .bt_share{
                width:320rpx;
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
            transform: translateX(-30rpx);
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