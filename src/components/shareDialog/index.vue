<template>
  <div class="dialog_content">
    <div class="title">
      <div class="meet_gift">{{shareProps.defaulTtitle}}</div>
      <img v-if="imageApi" :src="imageApi+'/new_close.png'" alt class="close_img" @click="close" />
    </div>
    <div class="msg">{{shareProps.title}}</div>
    <div class="code_content">
      <img class="code_img" :src="shareProps.codeImgUrl" alt />
    </div>
    <div class="share" @click="shareFirends">
      <img v-if="imageApi" :src="imageApi+'/weChart.png'" alt class="weChart" />
      <div class="give_friend">发给朋友</div>
    </div>
  </div>
</template>

<script>
import { imageApi } from "../../http/url";
export default {
  props:['shareProps'],
  data() {
    return {
      imageApi,
      dialogObj:{}
    }
  },
  mounted(){
  console.log(this.shareProps, '传递的参数')
  },
  methods: {
    close() {
      this.$emit('handleClose', false)
    },
    shareFirends(){
      this.$emit("shareFirends", true)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog_content {
  position: fixed;
  top: 0;
  background: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 999;
  padding: 60rpx 40rpx;
  box-sizing: border-box;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .code_img {
    width: 306rpx;
    height: 312rpx;
    vertical-align: middle;
    margin-top: 120rpx;
  }
  .code_content {
    text-align: center;
  }
  .close_img {
    width: 64rpx;
    height: 64rpx;
    margin-bottom: 10rpx;
    // background: #000000;
    // opacity: 0.5;
    border-radius: 50%;
  }
  .meet_gift {
    color: #1a1a1a;
    font-size: 54rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
  }
  .msg {
    color: #767676;
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-top: 40rpx;
  }
  .share {
    width: 670rpx;
    height: 160rpx;
    background: rgba(247, 247, 250, 1);
    border-radius: 16rpx;
    text-align: center;
    // line-height: 160rpx;
    margin-top: 120rpx;
  }
  .weChart {
    height: 80rpx;
    width: 80rpx;
    vertical-align: middle;
    margin-top: 20rpx;
  }
  .give_friend {
    font-size: 26rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
}
</style>