<template>
    <div class='share_page'>
        <img :src="imageApi+'/new_close.png'" alt="" @click="closeFun" class="close_icon" v-if="imageApi">
        <div class="share_title">{{shareTitle || '活动名称'}}</div>

        <div 
            :style="'background-image: url(' + imageUrl + ')'"
        alt="" class="share_img"></div>
        <div class="send_frind">
            <div class="share-btn" style="margin-right: 132rpx;" @click="sendToC">
                <img :src="imageApi+'/weChart.png'" alt="" class="close_img" v-if="imageApi">
                <p class="t_f">分享至微信好友</p>
            </div>
            <div class="share-btn" @click="creatImageStatus = true">
                <img :src="imageApi+'/jzxd/share-friend.png'" alt="" class="close_img" v-if="imageApi">
                <p class="t_f">分享至朋友圈</p>
            </div>
        </div>
        <painter style="position: fixed; top: -10000rpx;width: 612rpx;margin: 0 auto" :customStyle="'width: 612rpx;margin: 0 auto;'" @imgOK="onImgOK" bind:imgErr="onImgErr" :palette="template" />

        <div class="mark-model" v-if="creatImageStatus" @click.stop="creatImageStatus = false">
            <img style="width: 612rpx;margin: 0 auto;display:block;" :src="createdImg" alt="">
            <div class="model-tip">
                保存图片到本地，再分享至朋友圈
            </div>
            <div class="model-action">
                <button class="save-btn" @click="saveImage">保存图片</button>
            </div>
        </div>

        <div class="app-authorization" v-if="wxAuthorization" @click.stop="wxAuthorization = false">
            <div class="app-authorization-box" @click.stop="() => {}">
            <div class="app-authorization-body">保存图片到相册需要您的授权</div>
            <div class="app-authorization-footer">
                <button @click="wxAuthorization = false" class="cancel">取消</button>
                <button open-type="openSetting" class="confirm" @opensetting="setImageAuthorization">确认</button>
            </div>
            </div>

        </div>
    </div>
</template>

<script>
// painter: '../painter/painter'
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    import { base64src } from '../../../utils/base64ToSrc.js'
    export default {
        data(){
            return{
                imageApi,
                imageUrl:'',
                creatImageStatus: false,
                createdImg: '',

                wxAuthorization: false,

                options: null,
                template: null
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
                wx.navigateBack()
            },
            async templates () {
                let src = await base64src(this.imageUrl)
                this.template = {
                    width: '612rpx',
                    height: '535rpx',
                    background: '#fff',
                    views: [
                        {
                            type: 'image',
                            url: this.shareDisc || 'https://saas-prod-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd/shop_invitation_share_def.png',
                            css: {
                                width: '612rpx',
                                height: '385.152rpx',
                                top: '0rpx',
                                color: '#525252',
                            }
                        },
                        {
                            type: 'image',
                            url: src,
                            css: {
                                width: '124rpx',
                                height: '124rpx',
                                top: '236rpx',
                                left: '462rpx',
                                color: '#525252',
                            }
                        },
                        {
                            type: 'text',
                            text: this.shareTitle,
                            css: {
                                width: '550rpx',
                                maxLines: '3',
                                top: '417.152rpx',
                                left: '36rpx',
                                lineHeight: '48rpx',
                                color: '#333',
                                fontSize: '36rpx'
                            }
                        },
                    ]
                }
            },
            async showModalFun(){
                let bodyParm={
                    body: [this.userInfo.foursId, 12,this.userInfo.userId, this.options.id, 12, 13].join(),
                    type: 'salesman_4'
                }
                let res = await this.getImageInfo(bodyParm)
                this.imageUrl = res
                this.templates()
            },
            sendToC() {
                let shareParams = [this.userInfo.foursId, 12,this.userInfo.userId, this.options.id].join()
                console.log('/pages/sell/index?scene=' + shareParams)
                mpvue.navigateToMiniProgram({
                    appId:'wxb531f813eaa2c2ea',
                    path: '/pages/sell/index?scene=' + shareParams,
                    envVersion:'trial',
                    success(res){
                      console.log('跳转c端销售落地页',res, this.shareParams)
                    }
                })
            },
            onImgOK(e) {
                //e.detail.path
                this.createdImg = e.mp.detail.path;
                console.log('onImgOK', e);
            },
            setImageAuthorization (res) {
                this.wxAuthorization = false
            },
            saveImage() {
                let that = this;
                console.log('生成图片路径', this.createdImg);
                wx.saveImageToPhotosAlbum({
                    filePath: this.createdImg,
                    success(res) {
                        wx.showToast({ title: '已保存到相册' });
                        that.creatImageStatus = false
                    },
                    fail(res) {
                    if (
                        res.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' ||
                        res.errMsg === 'saveImageToPhotosAlbum:fail auth deny' ||
                        res.errMsg === 'saveImageToPhotosAlbum:fail authorize no response'
                    ) {
                        that.wxAuthorization = true
                    }
                        console.error(res);
                    }
                });
            },
        },
        onLoad(options){
            this.options = options
            console.log(this.options)
            this.showModalFun()
        },
        onShow(){
            this.showModalFun()
            this.creatImageStatus = false
        },
        onHide() {
            
        }
    }
</script>

<style lang="scss" scoped>
    .share_page{
        padding: 28rpx 40rpx 0 40rpx;
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
            margin: 120rpx auto 120rpx auto;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .send_frind{
            width:670rpx;
            height:160rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            border-radius:16rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .share-btn{
                text-align: center
            }
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

    .mark-model{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        background-color: rgba( 0, 0, 0, 0.8)
    }
    .model-tip{
        width: 612rpx;
        font-size: 26rpx;
        line-height: 1;
        margin: 0 auto;
        margin-top: 24rpx;
        color: #fff;
    }
    .model-action {
        margin-top: 44rpx;
    }
    .save-btn{
        width:630rpx;
        height:84rpx;
        background:rgba(187,10,48,1);
        font-size: 32rpx;
        line-height: 84rpx;
        color: #fff;
        border-radius:40rpx;
    }
    .app-authorization{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
  .app-authorization-box{
    position: relative;
    width: 490rpx;
    padding: 48rpx;
    margin: 0 auto;
    background: #fff;
    border-radius: 16rpx;
  }
  .app-authorization-big-close{
    position: absolute;
    width: 64rpx;
    height: 64rpx;
    bottom: -112rpx;
    left: 50%;
    margin-left: -32rpx;
  }
  .app-authorization-footer{
    display: flex;
    justify-content: space-around;
  }
  .app-authorization-footer button{
    width: 180rpx;
    line-height: 70rpx;
    height: 70rpx;
    font-size: 28rpx;
  }
  .app-authorization-footer .confirm{
    background-color: #1A1A1A;
    color: #fff;
    border:1px solid rgba(26,26,26,1);
  }
  .app-authorization-footer .cancel{
    background-color: #FFF;
    border:1px solid rgba(26,26,26,1);
  }
  .app-authorization-body{
    font-size: 28rpx;
    color: #767676;
    line-height: 40rpx;
    margin-bottom: 24rpx;

  }
  .app-authorization-body img {
    display: block;
    width: 300rpx;
    height: 300rpx;
    margin: 0 auto;
  }
</style>