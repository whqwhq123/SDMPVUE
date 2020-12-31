<template>
    <div class='share_page'>
        <img :src="imageApi+'/businessCard_bg.png'" alt="" class="bgImg" v-if="imageApi"/>
        <img :src="imageApi+'/new_close.png'" alt="" @click="closeFun" class="close_icon" v-if="imageApi" />
        <div class="share_title">{{ shareTitle }}</div>

        <div class="cardInfo">
            <img :src="imageApi+'/cardBg.png'" alt="" class="cardBg" v-if="imageApi"/>
            <img :src="imageUrl" alt="" class="share_img">
            <div class="userInfo">
                <div class="userName">{{ userInfo.userName }}</div>
                <div class="userSynopsis">{{ userInfo.foursName }}<span>{{ userInfo.roleName }}</span></div>
                <div class="userPhone">{{ userInfo.phone }}</div>
            </div>
        </div>

        <div class="send_frind">
            <div class="shareBtn" @click="sendToC">
                <img :src="imageApi+'/weChart.png'" alt="" class="close_img" v-if="imageApi">
                <span>发给朋友</span>
            </div>
           <div class="shareBtn keepBtn" @click="keepCard">
                <span class="t_f">保存到相册</span>
            </div>
        </div>

        <div style="position: absolute; top: -999999rpx;">
            <painter :customStyle="customStyle" :palette="imgDraw" />
        </div>
    </div>
</template>

<script>
    import {imageApi, saasApi} from "../../../http/url";
     import { mapActions, mapGetters,mapMutations } from 'vuex';
    export default {
        data(){
            return{
                imageApi,
                saasApi,
                imageUrl:'',
                imgDraw: {},
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
        onLoad(){
            this.showModalFun()
        },
        onShow(){
            this.showModalFun()
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
                    type: this.shareType,
                    isHyaline: true
                }
                let res = await this.getImageInfo(bodyParm)
                this.imageUrl = res

                // this.keepCard()
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
            },
            keepCard() {
                const that=this;
                this.imgDraw = {
                    width: '750rpx',
                    height: '1330rpx',
                    background: '#fff',
                    views: [
                    {
                        type: 'image',
                        url: that.imageApi+'/cardPoster_bg.png',
                        css: {
                            mode: 'scaleToFill',
                            top: '0rpx',
                            left: '0rpx',
                            width: '750rpx',
                            height: '1330rpx',
                        }
                    },
                    // {
                    //     type: 'image',
                    //     url: that.userInfo.logo,
                    //     css: {
                    //         mode: 'scaleToFill',
                    //         bottom: '1104rpx',
                    //         left: '94rpx',
                    //         // width: '750rpx',
                    //         // height: '1330rpx',
                    //     }
                    // },
                    {
                        type: 'image',
                        url: `${that.saasApi}weixin/qr.jpg?body=${that.bodyParm}&type=${that.shareType}&isHyaline=true`,
                        css: {
                            mode: 'scaleToFill',
                            top: '338rpx',
                            left: '222rpx',
                            width: '306rpx',
                            height: '312rpx',
                            
                        }
                    },
                    {
                        type: 'rect',
                        css: {
                            top: '952rpx',
                            left: '104rpx',
                            width: '34rpx',
                            height: '8rpx',
                            borderRadius: '50rpx',
                            color: '#BB0A30',
                        }
                    },
                    {
                        type: 'text',
                        text: that.userInfo.userName,
                        css: {
                        top: '837rpx',
                        left: '104rpx',
                        fontSize: '84rpx',
                        color: "#fff"
                        }
                    },
                    {
                        type: 'text',
                        id: 'my-text-id',
                        text: that.userInfo.foursName,
                        css: {
                            top: '1004rpx',
                            left: '104rpx',
                            fontSize: '40rpx',
                            color: "#fff",
                            maxLines: '1',
                        }
                    },
                    {
                        type: 'rect',
                        css: {
                            top: '1015rpx',
                            left:  ['120rpx', 'my-text-id', 1],
                            width: '2rpx',
                            height: '28rpx',
                            borderRadius: '50rpx',
                            color: '#4D5D7F',
                        }
                    },
                    {
                        type: 'text',
                        text: that.userInfo.roleName,
                        css: {
                            top: '1004rpx',
                            left: ['136rpx', 'my-text-id', 1],
                            fontSize: '40rpx',
                            color: "#fff"
                        }
                    },
                    {
                        type: 'text',
                        text: that.userInfo.phone,
                        css: {
                            top: '1116rpx',
                            left: '104rpx',
                            fontSize: '40rpx',
                            color: "#fff"
                        }
                    }]
                }

                let { path: __path } = mpvue.getStorageSync('createImagePath')
                mpvue.saveImageToPhotosAlbum({
                    filePath: __path,
                    success(res) {
                    mpvue.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 800,
                    mask:true
                    });
                    },
                    fail(res) {
                        if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {

                    mpvue.showModal({
                            title: '提示',
                            content: '需要您授权保存相册',
                            showCancel: false,
                            success:modalSuccess=>{
                            mpvue.openSetting({
                                success(settingdata) {
                                // console.log("settingdata", settingdata)
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    mpvue.showModal({
                                    title: '提示',
                                    content: '获取权限成功,再次点击图片即可保存',
                                    showCancel: false,
                                    })
                                } else {
                                    mpvue.showModal({
                                    title: '提示',
                                    content: '获取权限失败，将无法保存到相册哦~',
                                    showCancel: false,
                                    })
                                }
                                },
                                fail(failData) {
                                console.log("failData",failData)
                                },
                                complete(finishData) {
                                console.log("finishData", finishData)
                                }
                            })
                            }
                        })
                    }
                    }
                });
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.share_page {
  width: 100%;
  position: relative;

  .bgImg {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: absolute;
    z-index: -1;
  }

  .close_icon {
    width: 56rpx;
    height: 56rpx;
    position: absolute;
    top: 28rpx;
    right: 40rpx;
  }
  .share_title {
    color: #f7f7fa;
    font-size: 56rpx;
    font-weight: bold;
    position: relative;
    left: 0;
    top: 144rpx;
    padding-left: 97rpx;
  }

  .cardInfo {
    width: 590rpx;
    margin: 0 auto;
    position: relative;
    margin-top: 204rpx;

    .cardBg {
      width: 100%;
      height: 818rpx;
    }

    .share_img {
      width: 306rpx;
      height: 312rpx;
      position: absolute;
      left: 142rpx;
      top: 82rpx;
      z-index: 9;
    }

    .userInfo {
      width: 100%;
      text-align: center;
      font-size: 40rpx;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #4d5d7f;
      position: absolute;
      top: 478rpx;
      z-index: 9;

      .userName {
        font-size: 56rpx;
        margin-bottom: 26rpx;
      }

      .userSynopsis {
        margin-bottom: 26rpx;

        span {
          display: inline-block;
          position: relative;
          padding-left: 8px;
          box-sizing: border-box;

          &::before {
            content: "";
            display: inline-block;
            width: 2rpx;
            height: 28rpx;
            background-color: #4d5d7f;
            margin-right: 16rpx;
          }
        }
      }
    }
  }

  .send_frind {
    width: 100%;
    padding-bottom: 80rpx;

    .shareBtn {
      width: 554rpx;
      height: 106rpx;
      background: #ffffff;
      border-radius: 112rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #2e3245;
      font-size: 40rpx;
      margin: 0 auto;

      .close_img {
        width: 80rpx;
        height: 80rpx;
        margin-right: 26rpx;
      }
      .t_f {
        color: #fff;
      }
    }

    .keepBtn {
      margin-top: 48rpx;
      background: #bb0a30;
    }
  }
}
</style>
