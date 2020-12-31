<template>
  <div class="poster_banner">
        
    <div style="position: absolute; top: -999999rpx;">
      <painter :customStyle="customStyle" :palette="imgDraw" />
    </div>
    <div class="poster_content">
      <img class="poster_img" mode="widthFix" :src="posterData.poster" alt="">
      <img class="data_icon" v-if="imageApi" :src="imageApi+'/785@2x.png'" alt="">
      <div class="week">{{posters.weekday}}</div>
      <div class="data_time">{{posters.year}}</div>
      <div class="today">{{posters.today}}</div>

      <div class="userName">{{ userInfo.userName }}</div>
      <div class="foursName">{{ userInfo.foursName }}</div>
      <img class="code_img" :src="codeImg" alt="">
    </div>

    <!-- <div class="save_image" @tap="drawCanvas" :style="{background:getColor.bgColor,color:getColor.color}">
      <img class="icon_save" v-if="imageApi" :src="imageApi+'/icon-save.png'" alt />
      <div class="make_photo">生成美图</div>
    </div> -->

    <div class="shareBox">
      <div class="postersBox">
        <img class="posterThumbnail" v-for="(item,index) in posterArr" :key="index" :src="item.thumbnail" alt="" @click="selectPoster(index)"/>
      </div>

      <div class="shareBtnBox">
        <div class="shareBtn" @click="sendToC">
          <img :src="imageApi+'/weChart.png'" alt="" class="close_img" v-if="imageApi">
          <span>发给朋友</span>
        </div>
        <div class="shareBtn keepBtn" @click="drawCanvas">
            <span class="t_f">保存到相册</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapMutations,mapActions } from 'vuex'
 import {saasApi,imageApi} from "../../../http/url";
export default {
  data(){
    return{
      imageApi,
      // setWindowHg:'',
      posterData:{},
      imgDraw: {},
      posters:{},
      posterArr: []
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'vi':'vi'
    }),
    
     codeImg() {
      return saasApi + 'weixin/qr.jpg?body=' + [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join() + '&type=salesman_4'
    },
    getColor(){
        return this.vi.all.pageBtn
    }
  },
  onLoad(options){
    this.posterData={};
    this.imgDraw={};
    this.posters={};
    this.getPosterData();
    let d=new Date();
    var y= d.getFullYear();
    var m=d.getMonth()+1;
    var day=d.getDate();
    var h=d.getHours()
    var week = d.getDay();
    var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    let year=y+'年'+(m<10?'0'+m+'月':m+'月');
    let today=day<10? '0'+day:day;
    this.posters={'weekday':weekday[week],'year':year,'today':today};

    // const that=this;
    //  wx.getSystemInfo({
    //     success (res) {
    //       that.setWindowHg=res.windowHeight*2+'rpx'
    //     }
    //   })
  },
  methods:{
    ...mapMutations({
        'setShareParams':'user/setShareParams'
    }),
    // 分享朋友
    sendToC() {
      let bodyParm = [this.userInfo.foursId, 2, this.userInfo.userId, "", "", 2].join()
      let shareParams = [this.userInfo.foursId, 13, this.userInfo.userId, this.posterData.thumbnail].join()
      this.setShareParams({
          shareTitle:'海报',
          shareDisc:'',
          bodyParm:bodyParm,
          shareParams:'/pages/sell/index?scene='+ shareParams,
          shareType:'salesman_4'
      })

      // console.log(this.shareParams,'shareParams')
      console.log('/pages/sell/index?scene='+ shareParams)
      mpvue.navigateToMiniProgram({
          appId:'wxb531f813eaa2c2ea',
          path: '/pages/sell/index?scene='+ shareParams,
          envVersion:'trial',
          success(res){
          //   console.log('跳转c端销售落地页',res, this.shareParams)
          }
      })
    },
    // 画图
    drawCanvas(){
      const that=this;
      mpvue.showLoading({
        title: '绘制中...',
      })
      this.imgDraw = {
        width: '750rpx',
        height: '1330rpx',
        background: '#fff',
        views: [
          {
            type: 'image',
            url: that.posterData.poster,
            css: {
              mode: 'scaleToFill',
              top: '0rpx',
              left: '0rpx',
              width: '750rpx',
              height: '1330rpx'
            }
          },
          {
            type: 'image',
            url: that.codeImg,
            css: {
              bottom: '174rpx',
              right: '28rpx',
              width: '140rpx',
              height: '140rpx',
              borderRadius: '70rpx',
            }
          },
          {
            type: 'image',
            url: that.imageApi+'/785@2x.png',
            css: {
              mode: 'scaleToFill',
              top: '38rpx',
              left: '22rpx',
              width: '136rpx',
              height: '98rpx'
            }
          },
          {
            type: 'text',
            text: that.posters.weekday,
            css: {
              top: '26rpx',
              left: '58rpx',
              fontSize: '20rpx',
              color: "#fff"
            }
          },
          {
            type: 'text',
            text: that.posters.year,
            css: {
              top: '120rpx',
              left: '34rpx',
              fontSize: '20rpx',
              color: "#fff"
            }
          },
          {
            type: 'text',
            text: that.posters.today,
            css: {
              top: '60rpx',
              left: '64rpx',
              fontSize: '44rpx',
              color: "#fff"
            }
          },
          {
              type: 'text',
              text: that.userInfo.userName,
              css: {
                bottom: '244rpx',
                right: '182rpx',
                fontSize: '40rpx',
                color: "#F7F7FA",
                maxLines: '1',
              }
          },
          {
              type: 'text',
              id: 'my-text-id',
              text: that.userInfo.foursName,
              css: {
                  bottom: '208rpx',
                  right: '182rpx',
                  fontSize: '24rpx',
                  color: "#F7F7FA",
                  maxLines: '1',
              }
          },
        ]
      }

      setTimeout(()=>{
        let { path: __path } = mpvue.getStorageSync('createImagePath')
        console.log(__path)
        wx.hideLoading()
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
      }, 3000)
    },
    getPosterData(){
      this.$post('/poster/queryPosterByBrandNew', {relationBrand:this.userInfo.manuId}).then(res=>{
        const { code, data }=res
        if(code === 0){
          this.posterArr = data
          this.posterData = (data && data.length > 0) ? data[0] : {};
        }
      })
    },
    selectPoster(idx) {
      this.posterData = this.posterArr[idx]
    }
  }
}
</script>

<style lang="scss" scoped>
.poster_content {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // margin-bottom: 83px;

  .poster_img {
    width: 100%;
    // object-fit: scale-down;
    vertical-align: middle;
  }
  .data_icon {
    position: absolute;
    top: 38rpx;
    left: 22rpx;
    width: 136rpx;
    height: 98rpx;
    vertical-align: middle;
  }
  .week {
    position: absolute;
    top: 26rpx;
    left: 58rpx;
    font-size: 20rpx;
    color: #fff;
  }
  .data_time {
    position: absolute;
    top: 120rpx;
    left: 34rpx;
    font-size: 20rpx;
    color: #fff;
  }
  .today {
    position: absolute;
    top: 60rpx;
    left: 64rpx;
    font-size: 44rpx;
    color: #fff;
  }

  .userName {
    font-size: 40rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #f7f7fa;
    opacity: 1;
    position: fixed;
    // bottom: 244rpx;
    bottom: 352rpx;
    // top: 1104rpx;
    right: 182rpx;
  }

  .foursName {
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #f7f7fa;
    opacity: 1;
    position: fixed;
    // bottom: 208rpx;
    bottom: 316rpx;
    // top: 1156rpx;
    right: 182rpx;
  }

  .code_img {
    position: fixed;
    // bottom: 174rpx;
    bottom: 284rpx;
    // top: 1072rpx;
    right: 28rpx;
    width: 140rpx;
    height: 140rpx;
    border-radius: 70rpx;
  }
}

.shareBox {
  width: 100%;
  height: 252rpx;
  background: #fff;
  border-radius: 30rpx 30rpx 0 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;

  .postersBox {
    width: 100%;
    height: 164rpx;
    padding: 38rpx 0 28rpx 18rpx;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    .posterThumbnail {
      width: 148rpx;
      height: 98rpx;
      margin-right: 6rpx;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .shareBtnBox {
    width: 100%;
    box-sizing: border-box;
    display: flex;

    .shareBtn {
      flex: 1;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #00b354;
      font-size: 28rpx;
      position: relative;

      .close_img {
        width: 60rpx;
        height: 60rpx;
        margin-right: 10rpx;
      }
      .t_f {
        color: #bb0a30;
      }
    }

    .keepBtn::before {
      content: "";
      display: block;
      width: 2rpx;
      height: 38rpx;
      background: #b9b9b9;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
    }
  }
}
</style>
