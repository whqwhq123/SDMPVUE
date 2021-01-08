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
                  <!-- 预约试驾 -->
                  <span class="s_title">预约试驾</span>
                </div>
              </div>
              <div class="recModels">
                <div class="recModelsTop">
                  <div class="recModelsTop_left recModelsTop_flex">
                    <div class="recModelsTop_left">今日试驾</div>
                    <div class="recModelsTop_left">
                      <span class="recModelsTop_left_span">{{
                        todaCount.todayWaitCount || 0
                      }}</span
                      >人
                    </div>
                  </div>
                  <div class="linecol"></div>
                  <div class="recModelsTop_right recModelsTop_flex">
                    <div class="recModelsTop_left">预约审核</div>
                    <div class="recModelsTop_left">
                      <span class="recModelsTop_left_span">{{
                        todaCount.totalAuditCount || 0
                      }}</span
                      >人
                    </div>
                  </div>
                </div>
                <div class="linerow"></div>
                <div class="recModelsBut">
                  <div class="recModelsBut_left">总待试驾人数</div>
                  <div class="recModelsBut_right">
                    {{ todaCount.totalWaitCount || 0 }}人
                  </div>
                </div>
              </div>
              <div class="price_note">
                <div class="openShare" @click="viewAllClick">查看更多</div>
              </div>
            </div>
          </swiper-item>
          <swiper-item class="detail_scope" v-for="(item, index) in dataList"
                  :key="index">
            <div class="detail_scope">
              <div class="header_title">
                <div class="header_s_title">
                  <!-- 预约试驾 -->
                  <span class="s_title">今日待试驾</span>
                </div>
              </div>

              <div class="allpendcomList">
                <div
                  class="viewallItem"

                >
                  <div class="viewallItem_top" style="height: '226rpx'">
                    <div class="viewallItem_top_l_t viewallItem_top_l_tb">
                      <div class="viewallItem_top_l">
                        <div class="viewallItem_top_l_img">
                          <img :src="imageApi + '/header-man.png'" alt="" />
                        </div>
                        <div class="viewallItem_top_l_tit">
                          <div class="viewallItem_top_l_titp">
                            {{ item.customerName
                            }}<span class="level_icon" :style="colorObj[item.customerLevel || 4]"
                              >{{ levelval[item.customerLevel || 4] }}</span
                            >
                          </div>
                          <div>{{ item.customerPhone }}</div>
                        </div>
                      </div>
                      <div
                        class="viewallItem_top_r"
                        @click="callFun(item.customerPhone)"
                      >
                        <img
                          v-if="imageApi"
                          :src="imageApi + '/iconviewPhone.png'"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="viewallItem_top_l_b viewallItem_top_l_tb">
                      <div class="viewallItem_top_l_b_tit">
                        距离预约时间还有:
                      </div>
                      <time-con
                        v-if="item.driveTime"
                        :itemTime="item.driveTime"
                      ></time-con>

                      <div
                        class="viewallItem_top_l_b_sh"
                        @click="viewallItemClick(tabsIndex, item)"
                      >
                        结束试驾
                      </div>
                    </div>
                  </div>
                  <div class="viewallItem_but">
                    <div class="viewallItem_but_top">
                      <div class="viewallItem_but_img">
                        <img :src="item.ossUrl" alt="" />
                      </div>
                      <div class="viewallItem_but_tit">
                        <div class="viewallItem_but_tit1">
                          <div class="viewallItem_but_tit11">预约时间:</div>
                          <div class="viewallItem_but_tit12">
                            {{ item.driveTime }}
                          </div>
                        </div>
                        <div class="viewallItem_but_tit2">
                          {{ item.styleFullName }}
                        </div>
                        <div class="viewallItem_but_tit3">
                          <div class="viewallItem_but_tit31">指导价格:</div>
                          <div class="viewallItem_but_tit32">
                            {{ item.msrp }}万
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
        <!-- 弹出框组件 -->
    <show-modal
      v-if="isShow"
      :tabsIndex="tabsIndex"
      :dataItem="dataItem"
      :chengMode.sync="isShow"
    ></show-modal>
  </div>
</template>

<script>
import { imageApi,loginApi } from "../../../http/url";
import timeCon from '../viewallforma/components/timeCon.vue';
import showModal from '../viewallforma/components/showModal.vue';

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      imageApi,
      todaCount: {},
      dataList: [],
      isShow:false,
      dataItem:{},
      tabsIndex:2,
      colorObj: {
        2: "background:#FFA600",
        3: "background:#FFE131",
        4: "background:#B0C939",
        1: "background:#FF5253",
      },
      levelval: {
        1: "H",
        2: "A",
        3: "B",
        4: "C",
      },
    };
  },
  components: { timeCon,showModal },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    chageIndex(val) {
      this.activeIndex = val.mp.detail.current;
    },
    // 查看全部资讯
    viewAllClick() {
      mpvue.navigateTo({
        url: "/pages/generalSale/viewallforma/main",
      });
    },
        //电话回访
    callFun(phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: () => {},
        fail: function () {},
      });
    },
        //结束试驾
    viewallItemClick(tabsIndex, item) {
      console.log(tabsIndex,item);
      this.dataItem=item
      // console.log(this.dataItem);

      this.isShow = !this.isShow;
      // this.$forceUpdate();
    },
    //数据请求
      AjaxFun(){
    let token = wx.getStorageSync("token");
    let request = wx.request({
      url: loginApi+"salesman/test-drive/index",
      data: {
        foursId: this.userInfo.foursId,
        salesmanId: this.userInfo.userId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token,
      },
      method: "POST",
      dataType: "json",
      responseType: "text",
      success: (res) => {
        this.todaCount = res.data.data;
        // this.$set(this.dataList,0 , res.data.data.testDrives);
        console.log(res," // 弹出框的图标，不想设置图标时请给none");
        if(res.data.code==0){
           this.dataList=res.data.data.testDrives 
        }else{
                wx.showToast({
                // 弹出框的标题
                title: '数据请求错误2',
                // 弹出框的图标，不想设置图标时请给none
                icon: 'none'
            })
            return
        }
       
        // console.log(res.data.data.testDrives,"预约试驾轮播数据1");
        // console.log(this.dataList,"预约试驾轮播数据");
        // console.log(res.data.data, "sdfsdfsdf");
      },
    });
  },
  },

  onLoad() {
this.AjaxFun()
  },
  onShow() {
    this.AjaxFun()
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
  .allpendcomList {
    flex: 1;
    .viewallItem {
      // height: 426rpx;
      min-height: 426rpx;
      margin-top: 40rpx;
      .viewallItem_top {
        height: 226rpx;
        background: #f2f1f6;
        opacity: 1;
        border-radius: 16rpx 16rpx 0 0;
        display: flex;
        flex-direction: column;
        padding: 20rpx;
        .viewallItem_top_l_tb {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .viewallItem_top_l_t {
          .viewallItem_top_l {
            display: flex;
            .viewallItem_top_l_img {
              width: 96rpx;
              height: 96rpx;
              border-radius: 50rpx;
              > img {
                width: 100%;
                height: 100%;
                border-radius: 50rpx;
              }
            }
            .viewallItem_top_l_tit {
              margin-left: 24rpx;
              .viewallItem_top_l_titp {
                position: relative;
              }
            }
          }
          .viewallItem_top_r {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .viewallItem_top_l_b {
          .viewallItem_top_l_b_tit {
            font-size: 24rpx;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 11px;
            color: #9a9a9a;
            opacity: 1;
          }
          .viewallItem_top_l_b_time {
            color: #bb0a30;
            font-size: 22rpx;
          }
          .viewallItem_top_l_b_timesty {
            width: 30rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            background: #bb0a30;
            border-radius: 4rpx;
            color: #ffffff;
            display: inline-block;
          }
          .viewallItem_top_l_b_sh {
            width: 110rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            color: #ffffff;
            background: #38394f;
            opacity: 1;
            border-radius: 15px;
            font-size: 24rpx;
          }
        }
        .level_icon {
          display: inline-block;
          width: 30rpx;
          height: 30rpx;
          color: #fff;
          background: #ff5253;
          font-size: 24rpx;
          border-radius: 8rpx;
          text-align: center;
          line-height: 30rpx;
          font-weight: 500;
          margin-left: 18rpx;
          position: absolute;
          top: 8rpx;
        }
      }
      .viewallItem_but {
        min-height: 180rpx;
        background: #ffffff;
        border: 2rpx solid #f2f1f6;
        opacity: 1;
        border-radius: 0px 0px 16rpx 16rpx;

        .viewallItem_but_top {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 22rpx;
          margin-bottom: 30rpx;
          .viewallItem_but_img {
            width: 160rpx;
            height: 120rpx;
            margin-right: 60rpx;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .viewallItem_but_tit {
            width: 376rpx;
            .viewallItem_but_tit1 {
              display: flex;
              font-size: 22rpx;
              color: #1a1a1a;
              margin-bottom: 14rpx;
              .viewallItem_but_tit11 {
                flex: 1;
              }
              .viewallItem_but_tit12 {
                flex: 3;
              }
            }
            .viewallItem_but_tit2 {
              font-size: 26rpx;
              color: #1a1a1a;
              margin-bottom: 14rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .viewallItem_but_tit3 {
              display: flex;

              font-size: 22rpx;

              color: #9a9a9a;
              .viewallItem_but_tit31 {
                flex: 1;
              }
              .viewallItem_but_tit32 {
                flex: 3;
              }
            }
          }
        }

        .viewallItem_but_feedback {
          min-height: 68rpx;
          border-top: 2rpx solid #f7f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bb0a30;
          font-size: 22rpx;
          .viewallItem_but_feedback_img {
            width: 26rpx;
            height: 16rpx;
            margin-left: 16rpx;
            margin-top: -11rpx;
          }
        }
        .viewallItem_but_con {
          height: 600rpx;
          padding: 20rpx 40rpx 40rpx 40rpx;
          flex-direction: column;
          .viewallItem_but_con_img {
            width: 66rpx;
            height: 66rpx;
            margin: 0 auto;
          }
          .viewallItem_but_con_p {
            margin-top: 8rpx;
            text-align: center;
            font-size: 24rpx;
            color: #ff5e16;
          }
          .viewallItem_but_con_start {
            .viewallItem_but_con_startXing {
              display: flex;
              font-size: 24rpx;
              height: 80rpx;
              line-height: 80rpx;
              color: #767676;
              .startXing_p {
                flex: 1;
                text-align: center;
                line-height: 80rpx;
              }
              .startXing_xing {
                flex: 4;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .viewallItem_but_con_tit {
            height: 80rpx;
            font-size: 24rpx;
            color: #b3b3b3;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 30rpx;
          }
        }
        .viewallItem_but_nofee {
          height: 70rpx;
          border-top: 2rpx solid #f7f7fa;
          font-size: 22rpx;
          line-height: 70rpx;
          padding-left: 26rpx;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          .viewallItem_but_nofee_span {
            color: #1a1a1a;
          }
        }
      }
    }
  }
}
</style>