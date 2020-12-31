<template>
    <div class="notice_tab" v-if="isClose&&saleinfo.length>0">
        <swiper :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval" :duration="duration" :circular='circular' :current='current' class="notice_car" v-if="statusClose">
            <block v-for="(item,idx) in saleinfo" :key="idx" >
                <swiper-item>
                    <div class="swiper_notice" @click="ToCusDeatil(item)">
                        <img :src="imageApi+'/jzxd/close_fff_icon.png'" alt="" @click.stop="closeFun(item)" class="close_icon">
                        <div class="item_scope">
                            <div class="dot" :style="colorList[item.code]"></div>
                            <img src="../../../../static/images/icon-h.png" alt="" style="width:30rpx;height:30rpx;margin-left:10rpx" v-if="item.cusLevel==1">
                            <img src="../../../../static/images/icon-a.png" alt="" style="width:30rpx;height:30rpx;margin-left:10rpx" v-if="item.cusLevel==2">
                            <img src="../../../../static/images/icon-b.png" alt="" style="width:30rpx;height:30rpx;margin-left:10rpx" v-if="item.cusLevel==3">
                            <img src="../../../../static/images/icon-c.png" alt="" style="width:30rpx;height:30rpx;margin-left:10rpx" v-if="item.cusLevel==4">
                            <div class="user_name" v-if='item.customName'>{{item.customName}}</div>
                            <div class="user_name" >{{item.phone||''}}</div>
                            <div class="status" v-if='item.codeType'>{{item.codeType}}</div>
                            <div class="time">{{item.createTime}}</div>
                        </div>
                        <div class="new_tread" v-if="item.message">{{item.message}}
                            <span class="seeStyle" @click.stop="seeRecommend(item)">[ 查看推荐车系 ]</span>
                        </div>
                        <!-- <div class="new_tread" v-if="item.message">{{ite}}</div> -->
                    </div>
                </swiper-item>
            </block>
        </swiper>
        <close-model :title='title' :flag='flag' @close='close'></close-model>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import {formatDay} from "../../../utils";
    import closeModel from './closeModel'
     import { mapActions, mapGetters, mapMutations } from 'vuex';
    export default {
        components: {
            closeModel,
        },
        data(){
            return {
                imageApi,
                saleinfo:[],
                indicatorDots: false,
                autoplay: true,
                interval: 5000,
                duration: 1000,
                circular:true,
                title:'是否关闭消息?',
                flag:false,
                isClose:true,
                colorList:{
                    '003':'background:rgba(255,82,83,1)',
                    '004':'background:rgba(255,82,83,1)',
                    '006':'background:rgba(255,82,83,1)',
                    '007':'background:rgba(255,82,83,1)',
                    '008':'background:rgba(255,82,83,1)',
                    '005':'background:#FFA600',
                    '009':'background:#FFA600',
                    '010':'background:#FFA600',
                    '011':'background:#FFA600',
                    '001':'background:#999999',
                    '002':'background:#999999',
                    '012':'background:#999999'
                },
                userTrajectoryId:'',
                code:'',
                current:0,
                statusClose:false,
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
                'userInfo':'userInfo'
            }),
        },
        methods: {
            ...mapMutations({
                'setCustomerPhone':'user/setCustomerPhone',
                'setreception':'user/setreception',
                'setindexTitle':'user/setindexTitle'
                
            }),
            ...mapActions({
                'messNotice':'user/messNotice',
                'closeNotice':'user/closeNotice',
                'getTitle':'user/getTitle'
            }),
            closeFun(val) {
                this.flag=true
                this.userTrajectoryId=val.id,
                this.code=val.code
            },
            close(val){
                 this.flag=false
                 if(val=='y'){
                    this.isClose=false
                    
                 }else{
                    this.isClose=true
                 }
            },

            // 消息提醒
            async getMessage(){
                console.log('zhixingle');
                let res=await this.messNotice({
                    foursId:this.userInfo.foursId,
                    salesman:this.userInfo.userId
                })
                if(res.code==0){
                    this.saleinfo=res.data.map((v)=>{
                        return {
                            ...v,
                            createTime:formatDay(Date.parse(v.createTime.replace(/-/g, '/')))
                        }
                    })
                    this.statusClose=true
                }
            },
            // 标题信息
            async getTitles(){
                let res=await this.getTitle({

                })
                if(res.code==0){
                    this.setreception(res.data[1].firstTitles);
                    this.setindexTitle(res.data[0].firstTitles);
                }
            },
            ToCusDeatil(val){
                if(this.code!='103'){
                    this.closeNotice({
                        userTrajectoryId:val.id,
                        salesmanId:this.userInfo.userId
                    })
                }
                this.setCustomerPhone(val.phone)
                if(val.code==104){
                    wx.navigateTo({
                        url:'/pages/app/quote/edit/main'
                    })  
                }else {
                    wx.navigateTo({
                        url:'/pages/generalSale/receptionCustomer/main?code='+val.code+'&userTrajectoryId'+val.id
                    })
                }
                
            },
            // 查看推荐车系
            seeRecommend(val) {
                wx.navigateTo({
                    url:'/pages/app/garden/main?userPhone='+ val.phone || ''
                })
            }
        },
        onLoad(){
            this.getMessage()
            this.isClose=true
            // this.getTitles()
        },
        onShow(){
            this.getMessage()
            this.current=0;
        }
    }
</script>

<style lang="scss" scoped>
    .notice_car{
        width: 100%;
        height:160rpx;
        background:rgba(255,250,242,1);
        .swiper_notice{
            font-size: 0;
            min-height:160rpx;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 0rpx 20rpx 0rpx 40rpx;
            position: relative;
            .item_scope{
                width: 100%;
                min-height:70rpx;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                position: relative;
            }
            .dot{
                display: inline-block;
                width:16rpx;
                height:16rpx;
                background:rgba(255,82,83,1);
                opacity:1;
                border-radius: 50%;
            }
            .user_name{
                color: #262626;
                font-size: 30rpx;
                font-weight: 500;
                margin-left: 16rpx;
                line-height: 30rpx;
            }
            .status{
                display: inline-block;
                width:100rpx;
                height:28rpx;
                background:rgba(255,82,83,1);
                opacity:1;
                border-radius:16rpx;
                color: #fff;
                font-size: 20rpx;
                text-align: center;
                line-height:28rpx;
                margin-left: 16rpx;
            }
            .time{
                color: #AAAAAA;
                font-size: 24rpx;
                margin-left: 106rpx;
                margin-right: 20rpx;
            }
            .close_icon{
                width: 54rpx;
                height: 54rpx;
                position: absolute;
                right: 20rpx;
                top: 30rpx;
                z-index:100;
            }
            .new_tread{
                font-size: 24rpx;
                color: #9A9A9A;
                margin-top: -30rpx;
                margin-left: 32rpx;
                width: 504rpx;
                display: -webkit-box;
            　　-webkit-box-orient: vertical;
            　　-webkit-line-clamp:3;
            　　overflow: hidden;
            }

            .seeStyle {
                color: #607aaf;
            }
        }
    }
</style>