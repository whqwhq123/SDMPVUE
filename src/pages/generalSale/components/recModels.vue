<template>
  <div class="know_you_cus">
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
              <div class="header_title">
                <div class="header_s_title">
                  <!-- 任务管理 -->
                  <span class="s_title">推荐车型</span>
                </div>
              </div>
              <div class="recModels">
                <div class="recModelsTop">
                  <div class="recModelsTop_left recModelsTop_flex">
                    <div class="recModelsTop_left">今日试驾</div>
                    <div class="recModelsTop_left">
                      <span class="recModelsTop_left_span">5</span>人
                    </div>
                  </div>
                  <div class="linecol"></div>
                  <div class="recModelsTop_right recModelsTop_flex">
                    <div class="recModelsTop_left">预约审核</div>
                    <div class="recModelsTop_left">
                      <span class="recModelsTop_left_span">5</span>人
                    </div>
                  </div>
                </div>
                <div class="linerow"></div>
                <div class="recModelsBut">
                  <div class="recModelsBut_left">总待试驾人数</div>
                  <div class="recModelsBut_right">20人</div>
                </div>
              </div>
              <div class="price_note">
                <div class="openShare" @click="viewAllClick">查看更多</div>
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
      
    };
  },
  methods: {
    chageIndex(val) {
      this.activeIndex = val.mp.detail.current;
    },
    // 查看全部资讯
    viewAllClick() {
        console.log(1);
      mpvue.navigateTo({
      url:'/pages/generalSale/viewallforma/main'
      })
    },
  },
  onLoad() {},
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
    width: 100%;
    .header_s_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .s_title {
        font-size: 50rpx;
        font-family: "Source Han Sans CN";
        font-weight: 500;
        line-height: 54rpx;
        color: #1a1a1a;
        padding-top: 60rpx;
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
    height: 710rpx;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 20rpx 60rpx 0px rgba(0, 0, 0, 0.08);
    opacity: 1;
    .detail_scope {
      height: 710rpx;
      border-radius: 26rpx;
      background: #fff;
      box-shadow: 0 20rpx 60rpx 0 rgba(0, 0, 0, 0.08);
      opacity: 1;
      overflow: inherit;
      flex-direction: column;
      display: flex;
      align-items: center;
      width: 100%;

      .title_dis {
        color: #444;
        font-size: 32rpx;
        display: flex;
        width: 100%;
        height: 140rpx;
        align-items: center;
        margin-left: 26rpx;
        font-weight: bold;
        font-family: "SourceHanSansCN-Medium";
        .title_span {
          font-family: "SourceHanSansCN-Medium";
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
      .recModels {
        width: 610rpx;
        height: 308rpx;
        background: #38394f;
        border-radius: 16rpx;
        position: relative;
        margin-top: 40rpx;
        display: flex;
        color: #ffffff;
        font-size: 26rpx;
        flex-direction: column;
        .recModelsTop {
          flex: 2;
          display: flex;
          justify-content: space-between;
          .recModelsTop_left {
          }
          .recModelsTop_right {
          }
        }
        .recModelsBut {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .recModelsBut_left {
            flex: 2;
            text-align: center;
          }
          .recModelsBut_right {
            flex: 2;
            text-align: center;
          }
        }
        .recModelsTop_left_span {
          width: 36rpx;
          font-size: 60rpx;
          font-family: "PingFang SC";
          font-weight: 600;
          margin-right: 15rpx;
        }
        .recModelsTop_flex {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 2;
        }
        .linerow {
          width: 100%;
          height: 2rpx;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 22%,
            #ffffff 81%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.2;
        }
        .linecol {
          width: 2rpx;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            #fff 22%,
            #fff 81%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.2;
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