<template>
  <div class="weixin">
    <div class="weixin-gap"></div>
    <div class="weixin-name">
      <div class="input">
        <input type="text" placeholder="请输入微信号" v-model="weixinName">
      </div>
      <div class="close" v-if="imageApi">
        <img :src="imageApi+'/weixin-close.png'" alt="" @click="turnToSelfinfo">
      </div>
    </div>
    <div class="weixin-submit" @click="submitWeixinName">保存</div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      imageApi,
      weixinName: ''
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    })
  },
  mounted() {
    this.weixinName = this.userInfo.wxNum
  },
  methods: {
    ...mapActions({
      'getWeixinName': 'adminModule/getWeixinName',
      'userLogin': 'userLogin'
    }),
    async submitWeixinName () {
      if (!this.weixinName) {
        wx.showToast({
          title: '微信号不能为空',
          icon: 'none',
          duration: 1000
        })
        retur
      }
      let params = {
        wxNum: this.weixinName
      }
      let res = await this.getWeixinName(params)
      if (res.code == 0) {
        let res = await this.userLogin()
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 1000
        })
      }
    },
    turnToSelfinfo () {
      this.weixinName = ''
      // wx.navigateBack()
    }
  }
}
</script>
<style scoped>
.weixin {
  height: 100%;
  width: 100%;
  background: #F2F2F2;
}
.weixin .weixin-gap {
  height: 10rpx;
  width: 100%;
  background: #F2F2F2;
}
.weixin .weixin-name {
  box-sizing: border-box;
  width: 100%;
  height: 120rpx;
  display: flex;
  align-items: center;
  background: #fff;
}
.weixin .weixin-name .name {
  font-size:36rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.weixin .weixin-name .input {
  flex: 1;
}
.weixin .weixin-name .input input {
  font-size: 24rpx;
  color: #B3B3B3;
}
.weixin .weixin-name .line {
  height:40rpx;
  width: 4rpx;
  background: rgba(187,10,48,1);
  margin: 0 10rpx;
}
.weixin .weixin-name .close {
  width: 32rpx;
  height: 32rpx;
}
.weixin .weixin-name .close img {
  width: 32rpx;
  height: 32rpx;
}
.weixin-name {
  width: 100%;
  height: 120rpx;
  padding: 0 20rpx;
}
.weixin-submit {
  position: fixed;
  bottom: 120rpx;
  left: 50%;
  transform: translateX(-50%);
  width:630rpx;
  height:84rpx;
  text-align: center;
  line-height: 84rpx;
  background:rgba(26,26,26,1);
  border-radius:40rpx;
  font-size:36rpx;
  font-family:Source Han Sans CN;
  color:rgba(255,255,255,1);
}
</style>
