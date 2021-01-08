<template>
  <div class="dialog_content">
     <div style="width:100% ;height: 1548rpx;position: absolute;left: 0;top: 0;z-index: -1;"><img style="width: 100%; height: 100%;" v-if="imageApi" :src="imageApi+'/iconshareDialog.png'" alt class="close_img" @click="close" /></div>
      <div class="title">
      <img v-if="imageApi" :src="imageApi+'/new_close.png'" alt class="close_img" @click="close" />
    </div>
    <div class="msg">欢迎光临</div>
    <div class="code_content">
      <img class="code_img" :src="base64Img" alt />
    </div>
    <!-- @click="shareFirends" -->
    <div class="share" >
      <div class="give_friend">请进行扫码登记</div>
    </div>

  </div>
</template>

<script>
import { imageApi ,loginApi} from "../../http/url";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props:['shareProps'],
  data() {
    return {
      imageApi,
      dialogObj:{},
      base64Img:""
    }
  },
  mounted(){
  console.log(this.shareProps, '传递的参数')
  console.log(this.userInfo,'销售userInfo');

   this.getAjax()
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    close() {
      this.$emit('handleClose', false)
    },
    shareFirends(){
      this.$emit("shareFirends", true)
    },
    getAjax(){

      let token = wx.getStorageSync("token");
      let request = wx.request({
        url:
          loginApi+"saasAdmin/weixin/qr.jpg",
        data: {
          body:this.userInfo.foursId,
          type:"salesman_4"
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "GET",
        dataType: "json",
        responseType: "arraybuffer",
        success: (res) => {

            let base64 = wx.arrayBufferToBase64(res.data); 
            this.base64Img= 'data:image/jpeg;base64,' + base64　
            
        },
        fail: () => {},
        complete: () => {},
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.dialog_content {
    position: absolute;
    top: 0;
    background: #BB0A30;
    width: 100%;
    height: 1280rpx;
    z-index: 999;

  .title {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 40rpx;
    top: 28rpx;
  }
  .code_img {
 width: 100%;
  height: 100%;

  }
  .code_content {
     width: 306rpx;
    height: 312rpx;
    position: absolute;
    right: 222rpx;
    top: 275rpx;
  }
  .close_img {
    width: 64rpx;
    height: 64rpx;
    margin-bottom: 10rpx;
    // background: #000000;
    // opacity: 0.5;

  }
  .meet_gift {
    color: #1a1a1a;
    font-size: 54rpx;
    font-weight: bold;
  }
  .msg {
     color: #fcf9f9;
    font-size: 60rpx;
    position: absolute;
    left: 88rpx;
    font-weight: bold;
    top: 96rpx;

  }
  .share {
    border-radius: 16rpx;
    text-align: center;
    position: absolute;
    right: 245rpx;
    top: 660rpx;
  }
  .weChart {
    height: 80rpx;
    width: 80rpx;
    vertical-align: middle;
    margin-top: 20rpx;
  }
  .give_friend {
    font-size: 40rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>