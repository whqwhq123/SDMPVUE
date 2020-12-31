<template>
  <div>
    <view class="scan-view">
      <div class="tab">
        <div class="tab1" @click="flag">
          <img src="/static/images/Write.png" alt="" v-if="show" />
          <img src="/static/images/exchangeBg.png" alt="" v-else />
          <p :class="show == true ? 'tab_font' : 'hui'">扫码核销</p>
        </div>
        <div class="tab2" @click="flagInput">
          <img src="/static/images/exchange.png" alt="" v-if="show" />
          <img src="/static/images/WriteBg.png" alt="" v-else />
          <p :class="show == false ? 'tab_font' : 'hui'">输入兑换码</p>
        </div>
      </div>
      <view class="scan-border" v-if="show">
        <div class="saoma">扫码核销</div>
        <camera
          class="scan-camera"
          mode="scanCode"
          @scancode="scancode"
          @error="cameraError"
          frame-size="large"
        >
          <cover-image
            class="cover-corner cover-left-top"
            src="/static/images/kuang.png"
          ></cover-image>
          <cover-view
            class="scan-animation"
            :animation="animation"
          ></cover-view>
        </camera>
        <!-- 这里可以处理其他内容 -->
        <div class="description">仅支持优惠券核销，礼品券请手动输入兑换码</div>
        <!-- <div @click="saoma">确定</div> -->
      </view>
      <view class="scan-border" v-else>
        <div class="exchangeCode">
          <input
            class="weui-input"
            auto-focus
            placeholder="请输入兑换码"
            v-model="Exchange"
          />
          <div class="queding" @click="determine">确定</div>
        </div>
      </view>
    </view>
  </div>
</template>

<script>
import http from "../../../http/api";
// 移动动画
let animation = wx.createAnimation({});
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {
      animation: "",
      show: true,
      Exchange: "",
      scaned: 0,
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  created() {
    this.donghua();
    this.scaned = 0;
  },

  mounted() {},

  methods: {
    //  saoma() {
    //     var that=this
    //     wx.scanCode({
    //         onlyFromCamera: false,// 只允许从相机扫码
    //         success(res) {
    //             console.log(res)
    //             http.post(res.result).then(res1=>{

    //               if(res1.code==0) {
    //                  console.log(res1.data)
    //                 wx.navigateTo({
    //                     url: '../Confirm/main?giftLis='+JSON.stringify(res1.data),
    //                     success: function(res){
    //                         // success
    //                     },
    //                     fail: function() {
    //                         // fail
    //                     }
    //                 })
    //             }
    //             })

    //         }
    //     })
    // },

    ...mapActions({
      verification: "verification",
      getquanDetal: "getquanDetal",
    }),
    async determine() {
      if (this.Exchange == "") {
      } else {
        let bodyParm = {
          couponCode: this.Exchange,
        };
        let res = await this.getquanDetal(bodyParm);
        if (res.code == 0) {
          wx.navigateTo({
            url: "../Confirm/main?giftLis=" + JSON.stringify(res.data),
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
          });
        } else {
          wx.showToast({
            title: res.errMsg,
          });
        }
        this.Exchange = "";
      }
    },
    donghua() {
      var that = this;
      // 控制向上还是向下移动
      let m = true;

      setInterval(
        function () {
          if (m) {
            animation.translateY(250).step({ duration: 3000 });
            m = !m;
          } else {
            animation.translateY(-10).step({ duration: 3000 });
            m = !m;
          }
          that.animation = animation.export();
        }.bind(this),
        3000
      );
    },
    scancode(e) {
      // 校验扫描结果，并处理
      let scaned = this.scaned;
      if (!scaned) {
        this.scaned = !0;
        if (e.target.result) {
          http.post(e.target.result).then((res) => {
            console.log(res);
            if (res.code == 0) {
              mpvue.navigateTo({
                url:
                  "/pages/generalSale/Confirm/main?giftLis=" +
                  JSON.stringify(res.data),
                success: function (res1) {
                  this.scaned = 0;
                },
              });
            }
          });
        }
      }
    },
    flag() {
      this.show = true;
    },
    flagInput() {
      this.show = false;
    },
    cameraError(e) {
      // wx.authorize({
      //     scope: 'scope.camera',
      //     success: (res) => {
      //         console.log('已经授权过了', res);
      //     }, fail: (err) => {
      //         console.log('没权限', err);
      //     }
      // })
      let that = this;
      wx.showModal({
        title: "提示",
        content: `尚未获取相机权限，点击顶部“【...】-【设置】”开启授权`,
        success(res) {
          if (res.confirm) {
            that.flagInput();
            // console.log('用户点击确定')
          }
        },
      });
    },
  },
  onShow() {
    this.scaned = 0;
    this.Exchange = "";
  },
  onReady: function (res) {
    if (wx.createCameraContext()) {
      //   this.cameraContext = wx.createCameraContext("myCamera");
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
.exchangeCode {
  width: 100%;
  height: 380rpx;
  background-color: #fafafa;
  border-radius: 8rpx;
  padding: 76rpx 44rpx;
  box-sizing: border-box;
  margin-top: 206rpx;
  input {
    width: 100%;
    height: 84rpx;
    border: 1px solid #e5e5e5;
    border-radius: 8rpx;
  }
  .queding {
    width: 100%;
    height: 84rpx;
    border: 1px solid #bb0a30;
    text-align: center;
    line-height: 84rpx;
    color: #bb0a30;
    border-radius: 42rpx;
    margin-top: 60rpx;
  }
}
.tab_font {
  font-size: 32rpx;
  color: #bb0a30;
}
.hui {
  color: #999999;
  font-size: 32rpx;
}
.tab {
  width: 90%;
  overflow: hidden;
  margin-top: 70rpx;
  .tab1 {
    position: relative;
    width: 44%;
    height: 100rpx;
    float: left;
    img {
      width: 52rpx;
      height: 52rpx;
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
    }
    p {
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
    }
  }
  .tab2 {
    float: right;
    width: 48%;
    position: relative;
    height: 100rpx;
    img {
      width: 52rpx;
      height: 52rpx;
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
    }
    p {
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
    }
  }
}
.description {
  position: absolute;
  top: 80%;
  color: #aaaaaa;
}
.Manual {
  width: 90%;
  height: 84rpx;
  background: #414045;
  font-size: 36rpx;
  color: #ffffff;
  text-align: center;
  line-height: 84rpx;
  border-radius: 42rpx;
  position: absolute;
  bottom: 15%;
}
.saoma {
  font-size: 40rpx;
  color: #262626;
  position: absolute;
  top: 31%;
}
.scan-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: fixed;
  align-items: center;
  justify-content: space-around;
}

.scan-border {
  width: 90%;
  height: 90%;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scan-camera {
  width: 460rpx;
  height: 460rpx;
  border-radius: 6rpx;
  margin: 30rpx;
  position: absolute;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
}

.cover-corner {
  width: 460rpx;
  height: 460rpx;
  position: absolute;
}

.scan-animation {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  width: 480rpx;
  height: 8rpx;
  background-color: #fa4a3b;
  border-radius: 50%;
}
</style>