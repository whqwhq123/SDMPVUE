<template>
  <div class="know_you_cus">
    <div class="header_title">
      <div class="header_s_title">
        <!-- 任务管理 -->
        <span class="s_title">任务管理</span>
      </div>
      <!-- <div class="title_disc">动向信息根据客户行为数</div> -->
    </div>
    <div class="page_detail">
      <swiper
        previous-margin="40rpx"
        next-margin="24rpx"
        class="swiper_scope"
        @change="chageIndex"
      >
        <block>
          <swiper-item class="detail_scope">
            <div class="detail_scope">
              <div class="title_dis">
                您当前有<span class="title_span">89</span>个待处理的任务
              </div>
              <div class="price_note">
                <!-- <div class="line"></div> -->
                <div class="img_price">
                  <!-- <cover-image
                    :src="imageApi + '/price_img.png'"
                    v-if="imageApi"
                  ></cover-image> -->
                  <cover-image
                    src="../rapidTaskmgr/image/rapidTaskmgr.png"

                  ></cover-image>
                </div>
                <div class="openShare" @click="taskClick">立即处理</div>
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import { imageApi } from "../../../http/url";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      carInfo: null,
      priceData: [],
      activeIndex: 0,
      imageApi,
    };
  },
  methods: {

    chageIndex(val) {
      this.activeIndex = val.mp.detail.current;
    },
    // 立即处理跳转
    taskClick(){
        mpvue.navigateTo({
        url:'/pages/generalSale/rapidTaskmgr/main'
        })
    },

  },
  onLoad() {

  },
  onShow() {
    // this.getCarInfo();
  },
};
</script>

<style lang="scss" scoped>
.know_you_cus {
  margin-bottom: 60rpx;
  margin-top: 100rpx;
  .header_title {
    padding: 0rpx 40rpx 0 40rpx;
    box-sizing: border-box;
    .header_s_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .s_title {
        font-size: 54rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(26, 26, 26, 1);
        line-height: 54rpx;
      }
      .header_img {
        width: 72rpx;
        height: 72rpx;
      }
    }
    .title_disc {
    }
  }
  .page_detail {
    position: relative;
  }
  .swiper_scope {
    margin-top: 32rpx;
    width: 100%;
    height: 754rpx;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 20rpx 60rpx 0px rgba(0, 0, 0, 0.08);
    opacity: 1;
    .detail_scope {
      width: 670rpx;
      height: 754rpx;
      border-radius: 26rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 20rpx 60rpx 0px rgba(0, 0, 0, 0.08);
      opacity: 1;
      overflow: inherit;

      .title_dis {
        color: #444;
        font-size: 32rpx;
        display: flex;
        width: 100%;
        height: 140rpx;
        align-items: center;
        margin-left: 26rpx;
        font-weight: bold;
        font-family:'SourceHanSansCN-Medium';   
        .title_span {
          font-family:'SourceHanSansCN-Medium'; 
          font-size: 50rpx;
          color: #bb0a30;
          margin-bottom: 1rpx;
        }
      }
      .price_note {
        padding: 0rpx 30rpx 30rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        .line {
          width: 100%;
          height: 4rpx;
          background: rgba(247, 247, 250, 1);
          opacity: 1;
        }
        .img_price {
          width: 490rpx;
          height: 322rpx;
          margin-top: 80rpx;
        }
        .openShare {
          width: 320rpx;
          height: 80rpx;
          border: 2rpx solid #bb0a30;
          opacity: 1;
          border-radius: 48rpx;
          color: #bb0a30;
          font-size: 30rpx;
          position: absolute;
          line-height: 80rpx;
          text-align: center;
          bottom: 60rpx;
        }
      }
    }
  }
  .dot_list {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;
    position: absolute;
    transform: translateX(-30rpx);
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
}
</style>