<template>
  <div class="about">
    <img v-if="imageApi" class="about-logo" :src="imageApi+'/about.png'" alt="">
    <div class="about-title">寻道SaaS</div>
    <div class="about-sub">v1.2.2</div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
export default {
  data () {
    return {
      imageApi
    }
  }
}
</script>
<style scoped>
  .about {
    font-size:32rpx;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(175,178,179,1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .about-logo {
    margin-top: 204rpx;
    width: 210rpx;
    height: 210rpx;
  }
  .about-title {
    margin-top: 10rpx;
    margin-bottom: 16rpx;
    color: #000000;
    font-size: 40rpx;
  }
</style>
