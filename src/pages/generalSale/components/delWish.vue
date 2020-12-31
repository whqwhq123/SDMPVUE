<template>
    <div class="help_cus">
        <div class="header_title">
            <div class="header_s_title">
                <span class="s_title">交易促成 </span>
            </div>
            <div class="title_disc"></div>
        </div>
        <div class="page_detail">
            <swiper previous-margin="40rpx" next-margin="24rpx" class="swiper_scope" @change="chageIndex" :style="{'height':heightSwiper?'1200rpx':'850rpx'}">
                <block>
                    <swiper-item class="detail_scope" v-if="status" item-id="1">
                        <div class="detail_scope select_car">
                                <div class="title_dis"> </div>
                            
                                <div class="bgc_content">
                                    <div class="label_name">
                                        攒津贴 抵车款
                                    </div>
                                    <div class="j_t_ing">
                                        <img :src="imageApi+'/j_t_img.png'" alt="" class="jintie_bg" v-if="imageApi">
                                        <div class="text_disc">客户未领取 赶快分享吧</div>
                                    </div>
                                </div>
                                <div class="openShare" @click="openShare">打开二维码</div>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope" v-if="!status" item-id="1">
                        <div class="detail_scope select_car">
                            <extraAdvantage :carAllowances='carAllowances'></extraAdvantage>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope" item-id="2">
                        <div class="detail_scope select_car" style="height:100%">
                            <couPon @fromChild="getChild" :youhui='youhui'></couPon>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope" item-id="3">
                        <div class="detail_scope select_car" style="height:100%">
                            <giftsReceived @fromChild1="getChild_gift" :giftList='giftList'></giftsReceived>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope" item-id="4">
                        <div class="detail_scope select_car">
                            <activeRecommed></activeRecommed>
                        </div>
                    </swiper-item>
                    <swiper-item class="detail_scope" item-id="5">
                        <div class="detail_scope select_car">
                            <div class="slide-image">
                                <div class="gift_disc">{{indexTitle[0].secondTitles[1].description}}</div>
                                <div class="gift_title">{{indexTitle[0].secondTitles[1].name}}</div>
                                <div class="ar_gift">
                                    <img :src="imageApi+'/ar_gift.png'" alt="" v-if="imageApi">
                                </div>
                                
                            </div>
                            <div class="openShare" @click="levelCus()">打开二维码</div>
                        </div>
                    
                    </swiper-item>
                </block>
            </swiper>
            <div class="dot_list">
                <div :class="[activeIndex==index?'dot_active':'dot']" v-for="(val,index) in dataList" :key="index"></div>
            </div>
        </div>
        <dialogScan v-if='scanStatus'  :carAllowances='carAllowances' @changeStatus='changeStatus'></dialogScan>
    </div>
</template>

<script>
    import dialogScan from './dialogScan'
    import activeRecommed from './activeRecommed'
    import extraAdvantage from './extraAdvantage'
    import couPon from "./coupon"
    import giftsReceived from "./GiftsReceived"
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    export default {
        components: {
            activeRecommed, 
            extraAdvantage,
            dialogScan,
            couPon,
            giftsReceived
        },
        data(){
            return {
                imageApi,
                carAllowances:{},
                status:false,
                activeIndex:0,
                dataList:[1,2,3,4,5],
                heightSwiper:'',
                flag:'',
                flag_gift:'',
                youhui:[],
                giftList:[],
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'customerPhone':'user/customerPhone',
                'scanStatus':'user/scanStatus',
                'indexTitle':'user/indexTitle',
            }),
        },
        methods: {
            getChild(v) {
              this.heightSwiper=v
              this.flag=v
            },
            getChild_gift(v) {
              this.heightSwiper=v
              this.flag_gift=v
            },
            ...mapActions({
                'carAllowance':'user/carAllowance1',
                'Coupons':'Coupons'
            }),
            ...mapMutations({
                'setShareParams':'user/setShareParams',
                'setscanStatus':'user/setscanStatus'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
                if(val.mp.detail.currentItemId=='1') {
                    this.heightSwiper=false
                }else if(val.mp.detail.currentItemId=='2') {
                    this.heightSwiper=this.flag
                }else if(val.mp.detail.currentItemId=='3') {
                    this.heightSwiper=this.flag_gift
                }else if(val.mp.detail.currentItemId=='4') {
                     this.heightSwiper=false
                }else {
                     this.heightSwiper=false
                }
            },
            openFun(){
                this.status=true
            },
            closeFun(){
                this.status=false
            },
            changeStatus(){
                this.status=true
            },
            // 获取津贴信息
            async getcarAllowance(){
                console.log('status------');
                let res=await this.carAllowance({
                    foursId:this.userInfo.foursId,
                    phone:this.customerPhone
                })
                if(res.code==0){
                    this.carAllowances=res.data
                    if(res.data){
                         this.status=false
                    }else{
                         this.status=true
                    }
                   
                }else if(res.code==2){
                    this.status=true 
                }

            },
            openShare(){
                let bodyParm = [this.userInfo.foursId, 7,this.customerPhone,3,'',7].join()
                let shareParams = [this.userInfo.foursId,7, this.customerPhone,3].join()

                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'攒津贴 抵车款',
                    shareDisc:'客户未领取 赶快分享吧',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+shareParams,
                    shareType:'salesman_4'
                })
            },
            levelCus(){
                let bodyParm = [this.userInfo.foursId, 9,this.userInfo.userId,'','',6].join()
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
        onLoad(){
            this.getcarAllowance();
            this.Coupons({phone:this.customerPhone,type:'1'}).then(res=>{
                console.log(res)
            })
        },
        onShow(){
            this.getcarAllowance();
            this.Coupons({phone:this.customerPhone,type:'1'}).then(res=>{
                if(res.code==0) {
                   this.youhui=res.data
                }
            })
            this.Coupons({phone:this.customerPhone,type:'2'}).then(res=>{
                if(res.code==0) {
                   this.giftList=res.data
                }
            })
        },
        onUnload(){
            this.setscanStatus(false);
            this.Coupons({phone:this.customerPhone,type:'1'}).then(res=>{
                if(res.code==0) {
                   this.youhui=res.data
                }
            })
            this.Coupons({phone:this.customerPhone,type:'2'}).then(res=>{
                if(res.code==0) {
                   this.giftList=res.data
                }
            })
        }
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
            // height: 850rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
            opacity:1;
            .select_car{
                padding: 30rpx;
                box-sizing: border-box;
            }
            .ar_data{

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
                    .j_t_ing{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: absolute;
                        top:65rpx;
                        left:-6rpx;
                        .jintie_bg{
                            width: 526rpx;
                            height: 506rpx;
                        }
                        .text_disc{
                            color: #262626;
                            font-size: 32rpx;
                            position: absolute;
                            bottom: -2rpx;
                        }
                    }
                }
                .gift_disc{
                    font-size: 28rpx;
                    margin: 0rpx 0 20rpx 0rpx;
                    line-height: 28rpx;
                }
                .gift_title{
                    font-size: 50rpx;
                    // margin-left: 32rpx;
                    line-height: 50rpx;
                    font-weight: 500;
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
                    margin-top: 50rpx;
                }
                
            }
        }
        .dot_list{
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            position: absolute;
            transform: translateX(-35rpx);
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