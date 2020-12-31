<template>
  <section class="poster_wrap">
    <div class="poster_content" :style="{'height':windowHg}">
      <div class="userinfo">
        <img class="header" :src="headerImg" alt />
        <div class="info_detail" :style="{backgroundColor: vi.cards.info.bgColor, color: vi.cards.info.color}">
          <div class="user_name">{{userInfo.userName}}</div>
          <div class="fours">{{userInfo.manuName + ' | ' + userInfo.roleName}}</div>
          <div class="tel">{{formatPhone}}</div>
        </div>
      </div>
      <div class="shopinfo">
        <img class="localtion" v-if="imageApi" :src="imageApi + '/icon-localtion.png'" alt="">
        <div class="shop_name">{{userInfo.foursName}}</div>
        <div class="address">{{userInfo.foursAddress}}</div>
      </div>
      <div class="code_img">
        <img class="image" :src="codeImg" alt="">
      </div>
    </div>
    <div class="save_image">
      <div class="icon_share" :style="{background:getColor.bgColor,color:getColor.color}">
        <div @tap="saveImg">
          <img class="icon_save" v-if="imageApi" :src="imageApi+'/icon-save.png'" alt />
          <div class="make_photo">生成美图</div>
        </div>
        <div @tap="shareFirends">
          <img class="icon_save" v-if="imageApi" :src="imageApi+'/icon-wechart.png'" alt />
          <div class="make_photo">分享好友</div>
        </div>
      </div>
    </div>
    <div style="position: absolute; top: -999999rpx">
        <painter :customStyle="customStyle" :palette="imgDraw" />
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { saasApi, imageApi } from "../../../http/url";
export default {
  data() {
    return {
      imageApi,
      saasApi,
      imgDraw: {},
      posterData:'',
      windowHg:""
    }
  },
  computed: {
     ...mapGetters({
       'vi': 'vi',
       'userInfo': 'userInfo'
     }),
     getColor(){
        return this.vi.all.pageBtn
      },
     codeImg() {
       return saasApi + 'weixin/qr.jpg?body=' + [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join() + '&type=salesman_4'
     },
    headerImg() {
      return  this.userInfo.headImg|| imageApi + '/default-person.png'
    },
    formatPhone(){
      if(this.userInfo.wxNum){
        return this.userInfo.wxNum
      }else{
        let phone= String(this.userInfo.phone), formatPhone='';
        return phone.slice(0,3)+'-'+phone.slice(3,7) + ' ' +  phone.slice(-4);
      }

    }
  },
  mounted() {
    this.imgDraw = {};
     const that=this;
      mpvue.getSystemInfo({
        success (res) {
          that.windowHg=res.windowHeight*2+'rpx'
        }
      })
      this.getUserInFo();
  },
  methods: {
    ...mapActions({
      'getSmallCode': 'leaveInfo/getSmallCode',
      "userLogin":'userLogin'
    }),
    onImgOK(e) {
      console.log(e)
    },
    async getUserInFo(){
      let loginStatus = await this.userLogin();
      if(loginStatus){
        this.drawCanvas();
      }
    },
    drawCanvas() {
       const that = this;
      this.imgDraw = {
        width: '750rpx',
        height: that.windowHg,
        background: '#fff',
        views: [
          {
            type: "rect",
            css: {
              top: '20rpx',
              left: '130rpx',
              color: '#1A1A1A',
              width: '660rpx',
              height: '220rpx',
              borderRadius: '32rpx'
            }
          },
          {
            type: 'image',
            url: that.headerImg,
            css: {
              top: '36rpx',
              left: '16rpx',
              width: '188rpx',
              height: '188rpx',
              borderRadius:"188rpx"
            }
          },
          {
            type: 'text',
            text: that.userInfo.userName,
            css: {
              top: '54rpx',
              left: '260rpx',
              fontSize: '48rpx',
              color: "#fff"
            }
          },
          {
            type: 'text',
            text: that.userInfo.manuName + ' | ' + that.userInfo.roleName,
            css: {
              top: '134rpx',
              left: '260rpx',
              fontSize: '30rpx',
              color: "#d1d1d1"
            }
          },
          {
            type: 'text',
            text: that.formatPhone,
            css: {
              top: '196rpx',
              left: '260rpx',
              fontSize: '26rpx',
              color: "#d1d1d1"
            }
          },
          {
            type: 'text',
            text: that.userInfo.foursName,
            css: {
              top: '304rpx',
              left: '302rpx',
              fontSize: '24rpx',
              color: "#767676"
            }
          },
          {
            type: 'image',
            url: imageApi + '/icon-localtion.png',
            css: {
              top: '275rpx',
              left: '260rpx',
              width: '26rpx',
              height: '168rpx'
            }
          },
          {
            type: 'image',
            url: that.codeImg,
            css: {
              top: '646rpx',
              left: '236rpx',
              width: '278rpx',
              height: '278rpx'
            }
          }
        ]
      }

      // 地址多行分两行
      let address = that.userInfo.foursAddress;
      let itemStart = {
        type: 'text',
        text: address,
        css: {
          top: '372rpx',
          left: '302rpx',
          fontSize: '24rpx',
          color: "#767676"
        }
      }
      if (address.length > 16) {
        let itemEnd = {
          type: 'text',
          text: address.substr(16),
          css: {
            top: '404rpx',
            left: '302rpx',
            fontSize: '24rpx',
            color: "#767676"
          }
        }
        itemStart.text = address.substr(0, 16)
        this.imgDraw.views.push(itemStart);
        this.imgDraw.views.push(itemEnd);
      } else {
        this.imgDraw.views.push(itemStart);
      }
    },
    saveImg(){
      let { path: __path } = mpvue.getStorageSync('createImagePath')
      mpvue.saveImageToPhotosAlbum({
        filePath: __path,
        success(res) {
          mpvue.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 800,
            mask: true
          });

        },
        fail(res) {
          mpvue.showToast({
            title: '保存失败',
            icon: 'fail',
            duration: 800,
            mask: true
          });

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
    },
    /**
   * 跳转留资小程序
   * @param scene  4S店 类型 销售ID 报价单ID
   * */
    shareFirends() {
      const that = this;
      let params = [that.userInfo.foursId, 2, that.userInfo.userId].join()
      mpvue.navigateToMiniProgram({
        appId: 'wxb531f813eaa2c2ea',
        path: '/pages/sell/index?scene=' + params,
        // envVersion: 'trial',
        success(res) {
          console.log('跳转c端销售落地页', res, params)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.poster_content {
  width: 100%;
  overflow: hidden;
}
.poster_content {
   position: relative;
  .userinfo {
    .header {
      width: 188rpx;
      height: 188rpx;
      vertical-align: middle;
      position: absolute;
      top: 36rpx;
      left: 16rpx;
      z-index: 1000;
      border-radius: 50%;
    }
  }
  .info_detail {
    width: 660rpx;
    height: 220rpx;
    border-radius: 32rpx;
    background: #1a1a1a;
    position: absolute;
    top: 20rpx;
    left: 130rpx;
    box-sizing: border-box;
    .user_name {
      position: absolute;
      top: 34rpx;
      left: 150rpx;
      font-size: 48rpx;
    }
    .fours{
      position: absolute;
      top: 114rpx;
      left: 150rpx;
      font-size: 30rpx;
      opacity: 0.8;
    }
    .tel{
      position: absolute;
      top: 174rpx;
      left: 150rpx;
      font-size: 26rpx;
      opacity: 0.5;
    }
  }
  .shopinfo {
    position: absolute;
    width: 100%;
    top: 275rpx;
    left: 266rpx;
    font-size: 24rpx;
    color: #767676;
    .localtion{
      width: 26rpx;
      height: 168rpx;
    }
    .shop_name{
      position: absolute;
      left: 40rpx;
      top: 25rpx;
    }
    .address{
      position: absolute;
      left: 40rpx;
      top: 96rpx;
      width: 384rpx;
    }
  }
  .code_img{
    position: absolute;
    top: 620rpx;
    left: 236rpx;
    height: 278rpx;
    width: 278rpx;
    .image{
      height: 278rpx;
      width: 278rpx;
    }
  }
}
</style>

<style scoped>
.poster_wrap .save_image {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.poster_wrap .icon_share {
  height: 140rpx;
  padding: 20rpx 0;
  background: #1a1a1a;
  opacity: 0.6;
  display: flex;
  justify-content: space-around;
  text-align: center;
  box-sizing: border-box;
}
.poster_wrap .icon_save {
  width: 60rpx;
  height: 60rpx;
  vertical-align: middle;
}
.poster_wrap .make_photo {
  font-size: 24rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #fff;
  opacity: 0.8;
  margin-top: 16rpx;
}
</style>
