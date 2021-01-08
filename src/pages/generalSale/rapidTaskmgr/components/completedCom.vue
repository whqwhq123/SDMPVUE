<template>
  <div class="allpendcom">
    <div class="allpendcomBox">
      <div
        :class="[{ atv: item.isShow }, 'tabs']"
        v-for="(item, index) in tabs"
        @click="avtTabsFun(item, index)"
        :key="item"
      >
        {{ item.title }}
        <span :class="{ line: item.isShow }"></span>
        <div class="tipsDiv" v-if="item.tips === 0 ? false : true">
          <span class="tips">{{ item.tips }}</span>
        </div>
      </div>
    </div>
    <div class="allpendcomList">
      <template v-if="dataList.lenght">
        <div class="allpendcomList_list" v-for="list in dataList" :key="list">
          <div class="list_title">
            <div class="list_title_tit">
              {{ list.title }}
              <div class="fangkuai"></div>
            </div>
            <div class="list_title_star">
              到店后<span class="list_title_starsp">{{ list.ruleConfig }}</span
              >天未成交客户
            </div>
          </div>
          <div class="list_all">
            <div class="list_all_yes">
              <div class="list_icon">
                <img :src="imageApi + '/iconUser.png'" alt="" />
              </div>
              姓名:
            </div>
            <div class="list_all_sty">{{ list.userName }}</div>
          </div>
          <div class="list_all">
            <div class="list_all_yes">
              <div class="list_icon">
                <img :src="imageApi + '/iconPhone.png'" alt="" />
              </div>
              电话:
            </div>
            <div class="list_all_sty">{{ list.userPhone }}</div>
          </div>
          <div class="list_all">
            <div class="list_all_yes">
              <div class="list_icon">
                <img :src="imageApi + '/iconVehicle.png'" alt="" />
              </div>
              意向车型:
            </div>
            <div class="list_all_sty">{{ list.intentModel }}</div>
          </div>

          <div class="list_buttom">
            <p>跟进方式： {{followType?"打电话":""}}</p>
            <p>任务备注： 态度诚恳，注意措辞</p>
            <p>上次到店时间： {{ list.lastTime }}</p>
            <p>上次通话时间：{{ list.lastCallTime || "" }}</p>
            <p>任务类型： {{list.taskName}}</p>
          </div>
          <div class="list_yes_icon">
            <img :src="imageApi + '/yes.png'" alt="" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="allpendcomList_No_img">
          <img v-if="imageApi" :src="imageApi + '/iconNoContent.png'" alt="" />
        </div>
        <div class="allpendcomList_No_tit">您当前未有待处理的任务</div>
      </template>
    </div>
  </div>
</template>

<script>
import { imageApi } from "../../../../http/url";
export default {
  props: {
    dataListArr: {
      type: Object,
    },
  },
  data() {
    return {
      imageApi,
      tabs: [
        {
          title: "全部任务",
          type: 1,
          isShow: true,
          tips: 0,
        },
        {
          title: "到店回访",
          type: 2,
          isShow: false,
          tips: 0,
        },
        {
          title: "试驾回访",
          type: 3,
          isShow: false,
          tips: 0,
        },
        {
          title: "优惠通知",
          type: 4,
          isShow: false,
          tips: 0,
        },
      ],
      dataList: [],
    };
  },
  watch: {
    dataListArr(ne) {
      this.dataList = ne;
      console.log(ne);
    },
  },
  methods: {
    //tab切换
    avtTabsFun(item, index) {
      // console.log(item,index);
      console.log(index);
      this.$emit("avtTabsFun", index + 1);
      if (index + 1 === item.type) {
        console.log("点击了");
        this.tabs = this.tabs.map((v, i) => {
          if (v.type != index + 1) {
            v.isShow = false;
          } else {
            v.isShow = true;
          }
          return v;
        });
      }
      //   this.AjaxFun(item);
    },
    //数据请求
    AjaxFun(item) {
      let request = wx.request({
        url: "http://localhost:9999/api.rapidTaskmgr",
        data: {},
        header: { "content-type": "application/json" },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
        },
        fail: () => {},
        complete: () => {},
      });

      if (item) {
        console.log(item.title);
      } else {
        console.log("全部任务");
      }
    },
  },
  onLoad() {
    console.log("onLoad");
    // this.AjaxFun();
  },
  onShow() {
    console.log("onShow");
  },
};
</script>

<style lang="scss" scoped>
.allpendcom {
  height: 100%;
  display: flex;
  flex: 12;
  flex-direction: column;
  .allpendcomBox {
    display: flex;
    width: 100%;
    height: 72rpx;
    align-items: center;
    position: relative;
    margin-top: 48rpx;
    .tabs {
      flex: 1;
      text-align: center;
      line-height: 76rpx;
      color: #9a9a9a;
      font-size: 28rpx;
      position: relative;
      .line {
        width: 72rpx;
        height: 6rpx;
        position: absolute;
        bottom: -3rpx;
        display: block;
        border-radius: 4rpx;
        margin-left: 55rpx;
        background: linear-gradient(297deg, #bb0a30 0%, #ff6826 100%);
      }
      .tipsDiv {
        width: 28rpx;
        height: 28rpx;
        line-height: 25rpx;
        text-align: center;
        background: #bb0a30;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        .tips {
          width: 12rpx;
          height: 24rpx;
          font-size: 24rpx !important;
          color: #ffffff;
          font-weight: 400;
          right: 9rpx;
          position: absolute;
        }
      }
    }
    .tabs.atv {
      color: #262626;
      font-size: 36rpx;
      font-family: "Source Han Sans CN";
      font-weight: 600;
    }
  }
  .allpendcomList {
    height: 100%;
    width: 100%;
    .allpendcomList_list {
      margin-top: 6rpx;
      height: 441rpx;
      background-color: #ffffff;
      padding: 52rpx 40rpx 26rpx 40rpx;
      margin-bottom: 14rpx;
      position: relative;
      .list_title {
        display: flex;
        margin-bottom: 30rpx;
        .list_title_tit {
          flex: 1;

          font-size: 32rpx;
          font-family: "Source Han Sans CN";
          font-weight: 600;
          color: #1a1a1a;

          .fangkuai {
            width: 8rpx;
            height: 18rpx;
            background: #bb0a30;
            position: absolute;
            top: 60rpx;
            left: 0;
          }
        }
        .list_title_star {
          flex: 3;
          font-size: 24rpx;
          font-family: "Source Han Sans CN";
          font-weight: 500;

          color: #767676;
          display: table-cell;
          display: flex;
          align-items: flex-end;
          .list_title_starsp {
            color: #bb0a30;
          }
        }
      }
      .list_youhui {
        height: 140rpx;
        margin: 15rpx 0 20rpx 0;
        position: relative;
        .list_youhui_img {
          height: 140rpx;
        }
        .list_youhui_img > img {
          height: 100%;
          width: 100%;
        }
        .list_youhui_tit {
          position: absolute;
          right: 0;
          top: 0;
          width: 455rpx;
          font-size: 24rpx;
          color: #ffffff;
          padding: 10rpx;
          .list_youhui_tit_time {
          }
          .list_youhui_tit_span {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            height: 60rpx;
            margin-top: 15rpx;
          }
        }
      }
      .list_all {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        .list_all_yes {
          flex: 1;
          display: flex;
          color: #767676;
          font-size: 24rpx;

          .list_icon {
            width: 30rpx;
            height: 30rpx;
            margin-right: 12rpx;
          }
          .list_icon > img {
            width: 100%;
            height: 100%;
          }
        }
        .list_all_sty {
          flex: 3;
          color: #1a1a1a;
          font-size: 28rpx;
        }
      }
      .list_allone {
        .list_all_box {
          display: flex;
          .list_all_yes {
            flex: 1;
            display: flex;
            color: #767676;
            font-size: 24rpx;

            .list_icon {
              width: 30rpx;
              height: 30rpx;
              margin-right: 12rpx;
            }
            .list_icon > img {
              width: 100%;
              height: 100%;
            }
          }

          .list_all_sty {
            flex: 2;
            color: #1a1a1a;
            font-size: 28rpx;
          }
        }
        .list_all_sty_span {
          height: 60rpx;
          font-size: 24rpx;
          font-family: Source Han Sans CN;
          font-weight: 300;
          line-height: 60rpx;
          color: #b3b3b3;
          margin-left: 40rpx;
        }
      }
      .list_buttom {
        height: 150rpx;
        color: #9a9a9a;
        font-size: 24rpx;
      }
      .list_yes_icon {
        width: 166rpx;
        height: 176rpx;
        position: absolute;
        right: 0;
        top: 60rpx;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .allpendcomList_No_img {
      width: 582rpx;
      height: 396rpx;
      margin: 0 auto;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .allpendcomList_No_tit {
      text-align: center;
      color: #9a9a9a;
      margin-top: 26rpx;
    }
  }
}
</style>