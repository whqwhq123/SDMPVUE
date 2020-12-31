<template>
    <!-- <div class='share_page' :style="{backgroundImage: 'url(' + imageApi+'/Endorsement.png' + ')'}"> -->
    <div >
        <div class='share_page share_page1' v-if="shareTitle=='代言人'" :style="{backgroundImage: 'url(' + imageApi+'/Endorsement.png' + ')'}">
             <img :src="imageApi+'/new_close.png'" alt="" @click="closeFun" class="close_icon" v-if="imageApi">
            <div class="share_disc">{{shareDisc}}</div>
            <img :src="imageUrl" alt="" class="share_img" style="margin-top:33vh;margin-bottom:0rpx">
            <div class="share_title" style="text-align:center;color:#4D5D7F;margin-bottom:188rpx">{{shareTitle}}</div>
            <div style="display:flex;justify-content: center">
                <div class="send_frind" style="width:82%;height:106rpx;border-radius:70rpx">
                <div @click="sendToC" style="display:flex;align-items:center;">
                    <img :src="imageApi+'/weChart.png'" alt="" class="close_img" v-if="imageApi">
                    <p class="t_f" style="margin-left:40rpx;font-weight:700;font-size:40rpx">发给朋友</p>
                </div>
            
               </div>
            </div>
            
        </div>
        <div v-else class='share_page'>
             <img :src="imageApi+'/new_close.png'" alt="" @click="closeFun" class="close_icon" v-if="imageApi">
            <div class="share_title">{{shareTitle}}</div>
            <div class="share_disc">{{shareDisc}}</div>
            <img :src="imageUrl" alt="" class="share_img">
            <div class="send_frind">
                <div @click="sendToC">
                    <img :src="imageApi+'/weChart.png'" alt="" class="close_img" v-if="imageApi">
                    <p class="t_f">发给朋友</p>
                </div>
            
            </div>
        </div>
        
    </div>
    
</template>

<script>
    import {imageApi} from "../../../http/url";
     import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        data(){
            return{
                imageApi,
                imageUrl:''
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'shareTitle':'user/shareTitle',
                'shareDisc':'user/shareDisc',
                'bodyParm':'user/bodyParm',
                'shareParams':'user/shareParams',
                'shareType':'user/shareType'
            }),
        },
        methods: {
            ...mapActions({
                'getImageInfo':'recommendActivity/getImageInfo'
            }),
            closeFun(){
                wx.navigateBack({
                    
                })
            },
            async showModalFun(){
                let bodyParm={
                    body: this.bodyParm,
                    type: this.shareType
                }
                let res = await this.getImageInfo(bodyParm)
                this.imageUrl = res
            },
            sendToC() {
                console.log(this.shareParams,'shareParams')
                mpvue.navigateToMiniProgram({
                    appId:'wxb531f813eaa2c2ea',
                    path:this.shareParams,
                    envVersion:'trial',
                    success(res){
                    //   console.log('跳转c端销售落地页',res, this.shareParams)
                    }
                })
            }
        },
        // onLoad(){
        //     this.showModalFun()
        // },
        onShow(){
            this.showModalFun()
        }
    }
</script>

<style lang="scss" scoped>
.share_page1 {
   background-size: 100% 100%;
        height: 100vh;
        background-color: #BB0A30;
        height: 100vh;
}
    .share_page{
        padding: 28rpx 40rpx 0 40rpx;
        box-sizing: border-box;
        .close_icon{
            width: 56rpx;
            height: 56rpx;
            float: right;
        }
        .share_title{
            color: #1A1A1A;
            font-size: 54rpx;
            font-weight: bold;
            margin-top: 28rpx;
        }
        .share_disc{
            color: #767676;
            font-size: 30rpx;
            margin-top: 30rpx;
        }
        .share_img{
            width: 306rpx;
            height: 312rpx;
            margin-left: 180rpx;
            margin-top: 282rpx;
            margin-bottom: 120rpx;
        }
        .send_frind{
            width:670rpx;
            height:160rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            border-radius:16rpx;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .close_img{
                width: 80rpx;
                height: 80rpx;
            }
            .t_f{
                color: #262626;
                font-size: 26rpx;
            }
        }
    }
</style>