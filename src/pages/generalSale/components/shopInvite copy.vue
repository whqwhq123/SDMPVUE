<template>
  <div >
    <swiper class="swiper_scope" @change="chageIndex">
      <swiper-item class="swiper-item">
        <div class="card">
          <div class="sub-tit">集客留资 潜客互动</div>
          <div class="tit">到店邀请函</div>
          <div
            class="banner-image"
            :style="{backgroundImage:'url(https://saas-prod-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd/shop_invitation_share_def.png)'}"
          ></div>
          <div class="banner-title">显示三十字以内的标题显示三十字 以内的标题显示三十字以内的标题</div>
          <div class="action">
            <button class="share-btn" @click="toCMiniPro">分享</button>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <div class="dot_list">
      <div
        :class="[activeIndex==index?'dot_active':'dot']"
        v-for="(val,index) in dataList"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [1, 2]
    };
  },
  methods: {
    toCMiniPro() {
      wx.navigateToMiniProgram({
        appId: "wxb531f813eaa2c2ea",
        path: "page/index/index?id=123",
        extraData: {
          foo: "bar"
        },
        envVersion: "develop",
        success(res) {
          // 打开成功
        }
      });
    }
  }
};
</script>

<style scoped>
.swiper_scope {
  height: 1032rpx;
}
.swiper-item {
  box-sizing: border-box;
  padding: 54rpx 40rpx;
}
.card {
  padding: 32rpx 30rpx 48rpx 30rpx;
  border-radius:26rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 20rpx 60rpx 0px rgba(0,0,0,0.08);
}
.sub-tit {
  font-size: 28rpx;
  color: #444;
  line-height: 1;
  margin-bottom: 20rpx;
}
.tit {
  font-size: 50rpx;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 48rpx;
}
.banner-image {
  width: 500rpx;
  display: block;
  margin: 0 auto;
  height: 400rpx;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.banner-title {
  margin-top: 24rpx;
  margin-bottom: 74rpx;
  font-size: 32rpx;
  color: #333;
  line-height: 44rpx;
}
.share-btn {
  width: 320rpx;
  height: 80rpx;
  font-size: 30rpx;
  background-color: #fff;
  border: 2rpx solid #bb0a30;
  color: #bb0a30;
  border-radius: 80rpx;
}
</style>
<style lang="scss" scoped>
.dot_list {
  display: flex;
  justify-content: center;
  margin-top: 40rpx;
  position: absolute;
  transform: translateX(-45rpx);
  bottom: 40rpx;
  left: 50%;
  .dot {
    width: 12rpx;
    height: 12rpx;
    background: rgba(229, 229, 229, 1);
    opacity: 1;
    border-radius: 48rpx;
    display: inline-block;
    margin-right: 12rpx;
  }
  .dot_active {
    width: 36rpx;
    height: 12rpx;
    background: rgba(153, 153, 153, 1);
    opacity: 1;
    border-radius: 48rpx;
    display: inline-block;
    margin-right: 12rpx;
    transition: all 0.5s linear;
  }
}
</style>

