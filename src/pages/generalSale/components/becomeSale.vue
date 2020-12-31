<template>
    <div class="become_sale">
        <div class="header">
            <div class="title">{{indexTitle[2].name}}</div>
            <div class="disc">{{indexTitle[2].description}}</div>
        </div>

        <div class="information">
            <div class="deadert_img" >
                <div class="title_s"> 
                    行业资讯
                </div>
            </div>
            <swiper style="height:660rpx" @change="chageIndex" :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval" :duration="duration" :circular='circular' >
                <block v-for="(item,index) in dataList" :key="index">
                    <swiper-item style="height:660rpx">
                        <div class="detail_msg">
                            <div class="label">
                                <span class="label_item" v-for="(label, i) in item.newsLabel" :key="i">{{label}}</span>
                            </div>
                            <div class="msg_title">{{item.newsTitle}}</div>
                            <div class="view_data">
                                <div class="view_d">
                                    <img class="icon_eyes" v-if="imageApi" :src="imageApi+'/icon-eyes.png'" alt="">
                                    <span class="count">{{item.count}}</span>
                                </div>
                                <span class="v_time">{{item.time}}</span>
                            </div>
                            <div class="dis_content">{{item.brief}}<span class='check_detai' @click="checkoutDeatil(item)"> 查看详情> </span></div>
                            <div class="img_lis">
                                <img :src="img" alt="" class="info_img" v-for="(img,is) in item.pic" :key="img">
                                <!-- <img src="" alt="" class="info_img" v-if="item.pic.length==2"> -->
                            </div>
                        </div> 
                        
                    </swiper-item>
                </block>
            </swiper>
            <div class="dot_list">
                <div :class="[activeIndex==index?'dot_active':'dot']" v-for="(val,index) in dataList" :key="index"></div>
            </div>
            <div class="bt_share" @click="checkoutMore">查看更多</div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return {
                imageApi,
                img:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                dataList:[1,2],
                activeIndex:0,
                indicatorDots: false,
                autoplay: true,
                interval: 5000,
                duration: 1000,
                circular:true,
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
                'getIndustry':'user/getIndustry'
            }),
            chageIndex(val){
                this.activeIndex=val.mp.detail.current;
            },
            // 获取资讯
            async getMsg(){
                let params={
                    pageNo:1,
                    pageSize:5,
                    relationBrand:this.userInfo.manuId,
                    brandId:this.userInfo.manuId
                }
                
                let res=await this.getIndustry(params)
                const {code,data}=res
                if(code==0){
                    data.forEach(item => {
                        item['pic']= item['pic'].split(',').filter(Boolean);
                        item['brief']= item['brief'].substr(0,70);
                        if (typeof item['newsLabel'] === 'string') {
                        item['newsLabel'] = item['newsLabel'].split(',').filter(Boolean);
                        }
                    });
                    this.dataList=data;
                }
            },
            checkoutDeatil(row){
                mpvue.navigateTo({
                    url: '/pages/app/tradeDetail/main?id='+row.id+'&brandId='+this.userInfo.manuId
                })
            },
            // 查看详情
            checkoutMore(){
                wx.navigateTo({
                    url:'/pages/app/industry/main'
                })
            }
        },
        onLoad(){
            this.getMsg()
        }
    }
</script>

<style lang="scss" scoped>
    .become_sale{
        margin-top: 90rpx;
        font-family:Source Han Sans CN;
        .header{
            .title{
                margin-left: 40rpx;
                font-size:54rpx;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:rgba(26,26,26,1);
                opacity:1; 
                line-height:54rpx;
            }
            .disc{
                font-size:30rpx;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:40rpx;
                color:rgba(118,118,118,1);
                margin: 24rpx 58rpx 0 40rpx;
            }
        }
        .information{
            width: 670rpx;
            height:980rpx;
            background:rgba(255,255,255,1);
            box-shadow:0px 20rpx 60rpx rgba(0,0,0,0.08);
            opacity:1;
            border-radius:26rpx;
            margin: 0 auto;
            margin-top: 30rpx;
            .deadert_img{
                width: 100%;
                // height: 232rpx;
                border-radius:26rpx 26rpx 0 0;
                padding-top: 24rpx;
                box-sizing: border-box;
                .title_s{
                    width:324rpx;
                    height:70rpx;
                    background:linear-gradient(90deg,rgba(26,26,26,1) 0%,rgba(102,102,102,0) 100%);
                    opacity:1; 
                    color: #fff;
                    padding-left: 32rpx;
                    box-sizing: border-box;
                    line-height: 70rpx;
                    font-size: 40rpx;
                }
            }
            .detail_msg{
                padding: 30rpx 22rpx 52rpx 30rpx;
                box-sizing: border-box;
                .label{
                    margin-bottom: 28rpx;
                    .label_item{
                        font-size: 24rpx;
                        color: #999999;
                        padding: 4rpx 8rpx;
                        background-color:#F0F0F0;
                        margin-right: 12rpx;
                        border-radius: 4rpx;

                    }
                }
                .msg_title{
                    font-size:40rpx;
                    font-family:Source Han Sans CN;
                    font-weight:500;
                    line-height:54rpx;
                    color:rgba(34,34,34,1);
                    margin-right: 28rpx;
                    // min-height: 88rpx;
                }
                .view_data{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 40rpx;
                    .view_d{
                        .icon_eyes{
                            width: 30rpx;
                            height: 20rpx;
                        }
                        .count{
                            font-size: 24rpx;
                            color: #767676;
                            vertical-align: middle;
                            margin-left: 10rpx;
                        }
                    }
                    .v_time{
                        font-size: 24rpx;
                        color: #767676;
                    }
                }
                .dis_content{
                    font-size:28rpx;
                    color:#707070;
                    text-indent: 30rpx;
                    margin-top: 40rpx;
                    height: 146rpx;
                    .check_detai{
                       color: #BB0A30;
                       text-decoration: #BB0A30; 
                    }
                }
                .img_lis{
                    margin-top:32rpx;
                    display: flex;
                    justify-content: space-between;
                    .info_img{
                        width:194rpx;
                        height: 120rpx;
                        border-radius: 8rpx;
                    }
                }
                
            }
            .dot_list{
                display: flex;
                justify-content: center;
                margin-top: 40rpx;
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
    }
</style>