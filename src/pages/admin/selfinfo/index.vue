<template>
  <div class="selfinfo">
    <div class="selfino-item">
      <div class="selfino-item-left">
        <span class="item-left-icon1" v-if="imageApi">
          <img :src="imageApi+'/selfinfo-icon1.png'" alt="">
        </span>
        <span class="item-left-name">头像</span>
      </div>
      <div class="selfino-item-right" @click="uploadPortrait">
        <span class="item-left-icon2">
          <img :src="headImg" alt="">
        </span>
        <span class="item-left-icon3" v-if="imageApi" >
          <img :src="imageApi+'/self-icon8.png'" alt="">
        </span>
      </div>
    </div>
    <div class="selfino-line"></div>
    <div class="selfino-item">
      <div class="selfino-item-left">
        <span class="item-left-icon1" v-if="imageApi">
          <img :src="imageApi+'/selfinfo-icon2.png'" alt="">
        </span>
        <span class="item-left-name">微信号</span>
      </div>
      <div class="selfino-item-right">
        <span class="item-right-name" v-if="userInfo"  @click="turnToName">{{wxuserName}}</span>
        <span class="item-left-icon3" v-if="imageApi" @click="turnToName">
          <img :src="imageApi+'/self-icon8.png'" alt="">
        </span>
      </div>
    </div>
    <div class="selfino-line"></div>
  </div>
</template>
<script>
import {imageApi, saasApi} from '../../../http/url'
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      imageApi,
      imgInfo: ''
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'token': 'login/token'
    }),
    headImg(){
      return this.userInfo.headImg || imageApi + '/default-person.png'
    },
    wxuserName(){
      return this.userInfo.wxNum || this.userInfo.phone
    }
  },
  methods: {
    ...mapActions({
      'getWeixinName': 'adminModule/getWeixinName',
      'userLogin': 'userLogin'
    }),
    uploadPortrait () {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          const tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: saasApi+ 'file/fileUpload',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
              'Authorization': that.token
            },
            formData: {
              'user': 'test'
            },
            success (res){
              const data = res.data
              let newData = JSON.parse(data)
              if (newData.code == 0) {
                that.imgInfo = newData.data
                that.submit()
              }
            }
          })
        }
      })
    },
    async submit () {
      let that = this;
      let params = {
        headImg: that.imgInfo
      }
      let res = await this.getWeixinName(params)
      if (res) {
        let buffRes = await this.userLogin()
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 1000
        })
      }
    },
    turnToName () {
      wx.navigateTo({
        url: '/pages/admin/weixinName/main'
      })
    }
  }
}
</script>
<style scoped>
  .selfinfo {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .selfino-line {
    margin-left: 84rpx;
    margin-right: 52rpx;
    height: 2rpx;
    background: #F2F2F2;
  }
  .selfino-item {
    padding: 0 68rpx;
    margin: 24rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selfino-item .selfino-item-left {
    display: flex;
    align-items: center;
  }
  .selfino-item .selfino-item-left .item-left-icon1 {
    width: 48rpx;
    height: 48rpx;
  }
  .selfino-item .selfino-item-left .item-left-icon1 img{
    width: 48rpx;
    height: 48rpx;
  }
  .selfino-item .selfino-item-left .item-left-name {
    margin-left: 20rpx;
    font-size: 32rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(26,26,26,1);
  }

  .selfino-item .selfino-item-right {
    display: flex;
    align-items: center;
  }
  .selfino-item .selfino-item-right .item-left-icon2 {
    width: 106rpx;
    height: 106rpx;
    border-radius: 53rpx;
    object-fit: cover;
  }
  .selfino-item .selfino-item-right .item-left-icon2 img {
    width: 106rpx;
    height: 106rpx;
    border-radius: 53rpx;
  }
  .selfino-item .selfino-item-right .item-left-icon3 {
    width: 16rpx;
    display: flex;
    align-items: center;
    margin-left: 34rpx;
  }
  .selfino-item .selfino-item-right .item-left-icon3 img {
    width: 16rpx;
    height: 28rpx;
  }
  .selfino-item .selfino-item-right .item-right-name {
    font-size:26rpx;
    font-family:Source Han Sans CN;
    color:rgba(179,179,179,1);
  }
</style>
