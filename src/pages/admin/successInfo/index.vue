<template>
  <div class="info-wrap">
    <div class="info">
      <img v-if="imageApi" class="info-logo" :src="imageApi+'/success.png'" alt="">
      <div class="info-title">操作成功</div>
      <div class="info-sub">{{info}}</div>
      <div class="info-cancel" @click="cancelInfo">立即返回</div>
    </div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
export default {
  props: {
    infoParam: {
      type: String
    }
  },
  data () {
    return {
      imageApi,
      timeObj: null,
      timeInfo: '',
      currentTime: 3
    }
  },
  computed: {
    info () {
      return this.timeInfo
    }
  },
  mounted() {
    this.timeInfo = this.infoParam.split('{{{time}}}')[0] + this.currentTime + this.infoParam.split('{{{time}}}')[1]
    this.timeObj = null;
    this.timeObj = setInterval(()=>{
      this.currentTime--
      this.timeInfo = this.infoParam.split('{{{time}}}')[0] + this.currentTime + this.infoParam.split('{{{time}}}')[1]
      if (this.currentTime < 1) {
        clearInterval(this.timeObj)
        this.$emit('cancel')
        return false
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timeObj)
  },
  methods: {
    cancelInfo () {
      this.$emit('cancel')
    }
  },
}
</script>
<style scoped>
  .info-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background: #fff;
    z-index: 1000;
  }
  .info {
    font-size:32rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(175,178,179,1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info-logo {
    margin-top: 180rpx;
    width: 212rpx;
    height: 212rpx;
  }
  .info-title {
    margin-top: 60rpx;
    color: #000000;
    font-size: 40rpx;
  }
  .info-sub {
    margin-top: 60rpx;
    font-size:24rpx;
    color:rgba(179,179,179,1);
  }
  .info-cancel {
    margin-top: 60rpx;
    font-size:28rpx;
    color:rgba(16,174,255,1);
  }
</style>
