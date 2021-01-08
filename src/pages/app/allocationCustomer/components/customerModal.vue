<template>
  <div class="myModal">
    <div class="myModalBox">
      <div class="clone" @click="$emit('update:chengMode', false)">
        <img v-if="imageApi" :src="imageApi + '/icongb.png'" alt="" />
      </div>
      <div class="myModalBox_hander">完善到访登录表</div>
      <div class="myModalBox_concat">
        <div class="myModalBox_concat_con">
          <div class="myModalBox_concat_con_tit">
            <label for="mingzi" class="myModalBox_concat_con_tit_all"
              >姓名<span
                class="myModalBox_concat_con_tit_allxing"
                v-if="!getConfig.receiveName"
                >*</span
              ></label
            >
            <input
              type="text"
              class="inputAll"
              id="mingzi"
              name="mingzi"
              max="11"
              v-model="nameVal"
            />
          </div>
          <div class="myModalBox_concat_con_tit">
            <label for="shoujihao" class="myModalBox_concat_con_tit_all"
              >手机号<span
                class="myModalBox_concat_con_tit_allxing"
                v-if="!getConfig.receiveName"
                >*</span
              ></label
            >
            <input
              type="number"
              class="inputAll"
              id="shoujihao"
              name="shoujihao"
              min="1"
              max="11"
              v-model="phoneVal"
            />
          </div>
          <div class="myModalBox_concat_con_tit">
            <label for="mingzi" class="myModalBox_concat_con_tit_all"
              >性别<span
                class="myModalBox_concat_con_tit_allxing"
                v-if="!getConfig.receiveSex"
                >*</span
              ></label
            >
            <div class="inputAll" style="border-bottom: none">
              <div class="inputAllche">
                <div
                  :class="
                    isChecked
                      ? 'myModalBox_concat_radioitem'
                      : 'myModalBox_concat_radioitem atv'
                  "
                  @click="isCheckedFun(true)"
                >
                  <i :class="!isChecked ? 'radiosty' : 'radiosty atv'"></i>
                  <label>男</label>
                </div>
                <div
                  :class="
                    isChecked
                      ? 'myModalBox_concat_radioitem'
                      : 'myModalBox_concat_radioitem atv'
                  "
                  @click="isCheckedFun(false)"
                >
                  <i :class="isChecked ? 'radiosty' : 'radiosty atv'"></i>
                  <label>女</label>
                </div>
              </div>
            </div>
          </div>
          <div class="myModalBox_concat_con_tit">
            <label for="nianing" class="myModalBox_concat_con_tit_all"
              >年龄</label
            >

            <input
              type="number"
              class="inputAll"
              id="nianing"
              name="nianing"
              max="11"
              v-model="olaVal"
            />
          </div>
          <div class="myModalBox_concat_con_tit">
            <label for="daofang" class="myModalBox_concat_con_tit_all"
              >到访人数<span
                class="myModalBox_concat_con_tit_allxing"
                v-if="!getConfig.receiveArriveCount"
                >*</span
              ></label
            >
            <input
              type="number"
              class="inputAll"
              id="daofang"
              name="daofang"
              max="11"
              v-model="dfVal"
            />
          </div>
        </div>
      </div>
      <div class="myModalBox_fouter">
        <div
          class="myModalBox_fouter_cancel myModalBox_fouter_but"
          @click="$emit('update:chengMode', false)"
        >
          取消
        </div>
        <div
          class="myModalBox_fouter_submit myModalBox_fouter_but"
          @click="submitFun"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { imageApi,loginApi } from "../../../../http/url";
export default {
  name: "commonModal",
  props: {
    showModal: {
      default: false,
      type: Boolean,
    },
    tabsIndex: {
      type: Number,
    },
    dataItem: {
      type: Object,
    },
    rowData: {
      type: Object,
    },
  },
  data() {
    return {
      isChecked: true,
      istagtitle: true,
      isChecked: true,
      textareaTit: "",
      nameVal: "",
      phoneVal: "",
      olaVal: "",
      dfVal: "",
      getConfig: {},
    };
  },
  watch: {
    dataItem(ne) {
      this.dataItem = ne;

      if (ne.sex == "男") {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      this.nameVal = ne.name;
      this.phoneVal = ne.phone;
      this.olaVal = ne.age;
      this.dfVal = ne.arriveCount;
      this.getConfigFun(ne.foursId);
      console.log(ne, "监听父组件传过来的参数");
    },
    rowData(ne) {
      this.rowData = ne;
    },
  },
  created() {},
  mounted() {},
  methods: {
    //tagtitleHander
    tagtitleHander() {
      this.istagtitle = !this.istagtitle;
    },
    //是否必填
    // receiveName 接待姓名必填 0-否 1-是
    // receiveSex 接待性别必填 0-否 1-是
    // receiveAge 接待姓名必填 0-否 1-是
    // receiveArriveCount 接待到访人数必填 0-否 1-是

    getConfigFun(foursId) {
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url: loginApi+"salesman/foursArriveInfo/getConfig",
        data: {
          foursId,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          this.getConfig = res.data;
          console.log(res);
        },
        fail: () => {},
        complete: () => {},
      });
    },
    //选择性别
    isCheckedFun(bol) {
      this.isChecked = bol;
      console.log(this.isChecked);
    },
    //点击 确定
    submitFun() {
      var reg = /^\d+$/;
      var pho = /^1[345678]\d{9}$/;

      if (!pho.test(this.phoneVal)) {
        // wx.showToast({
        //   title: "正确填写手机号",
        // });
        return;
      }
      if (this.olaVal && this.dfVal) {
        if (!reg.test(this.olaVal) && !reg.test(this.dfVal)) {
          // 验证通过
          wx.showToast({
            title: "必须是数字",
          });
          return;
        }
      } else {
        wx.showToast({
          title: "请填写",
        });
        return;
      }

      let data = {
        id: this.dataItem.id,
        name: this.nameVal,
        phone: this.phoneVal,
        sex: this.isChecked ? "男" : "女",
        age: this.olaVal,
        arriveCount: this.dfVal,
      };
      this.AjaxFun(data);
      // this.$emit("update:chengMode", false);
    },
    //数据请求
    AjaxFun(data) {
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url:
          loginApi+"salesman/foursArriveInfo/updateFoursArriveInfo",
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          if (res.data.code == 0) {
            wx.navigateTo({
              url:
                "/pages/app/allocationCustomer/appointSale/main?uqlId=" +
                this.rowData.uqlId +
                "&phone=" +
                this.rowData.phone +
                "&cusLevel=" +
                this.rowData.cusLevel +
                "&foursId=" +
                this.rowData.foursId,
            }); 
            this.$emit("update:chengMode", false);
          }
        },
        fail: () => {},
        complete: () => {},
      });
    },
  },
  onLoad() {},
};
</script>
 
<style lang="scss" scoped>
.myModal {
  height: 100%;
  width: 710rpx;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow: hidden;
  z-index: 9999;
  top: 0;
  padding: 20rpx;
  .myModalBox {
    width: 610rpx;
    min-height: 646rpx;
    background: #ffffff;
    opacity: 1;
    border-radius: 16rpx;
    padding: 20rpx 40rpx 20rpx 40rpx;
    position: relative;
    .myModalBox_hander {
      font-size: 48rpx;
      color: #444444;
      text-align: center;
      margin-top: 20rpx;
    }
    .myModalBox_concat {
      padding-bottom: 130rpx;
      height: 100%;
      .myModalBox_concat_con {
        min-height: 200rpx;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
        border-radius: 16rpx;
        padding: 34rpx 22rpx 0 22rpx;
        .myModalBox_concat_con_tit {
          position: relative;
          display: flex;
          margin-bottom: 64rpx;
          .myModalBox_concat_con_tit_all {
            flex: 2;
            text-align: end;
            color: #767676;
            .myModalBox_concat_con_tit_allxing {
              color: #ff5253;
            }
          }
          .inputAll {
            flex: 5;
            border-bottom: 1rpx solid #e6e4e4;
            margin-left: 20rpx;
            .inputAllche {
              display: flex;
            }
            .myModalBox_concat_radioitem {
              width: 166rpx;
              color: #767676;
              opacity: 1;
              font-size: 28rpx;
              display: flex;
              justify-content: center;
              position: relative;
              margin-right: 20rpx;
              padding-top: 4rpx;
              &.atv {
              }
              .inputradio {
                opacity: 0;
              }
              .radiosty {
                left: 20rpx;
                width: 24rpx;
                height: 24rpx;
                border-radius: 50%;
                background: #faf9f9;
                border: 2rpx solid #ff5253;
                position: absolute;
                background-clip: content-box;
                padding: 4rpx;
                &.atv {
                  background: #ff5253;
                  border: 2rpx solid #ff5253;
                  background-clip: content-box;
                  padding: 4rpx;
                }
              }
            }
          }
        }
      }
    }
    .myModalBox_concat_title {
      position: relative;
      margin-top: 28rpx;
      margin-bottom: 36rpx;
      color: #9a9a9a;
      font-size: 24rpx;
      .textarea {
        border-radius: 16rpx;
        min-height: 160rpx;
        border: 2rpx solid #e3e3e3;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
      }
      .tagtitle {
        position: relative;
        .tagtitleradio {
          opacity: 0;
        }
        .tagtitleradiosty {
          position: absolute;
          left: 10rpx;
          top: 4rpx;
          width: 24rpx;
          height: 24rpx;
          border-radius: 50%;
          background: #ffffff;
          border: 2rpx solid #e3e3e3;
          position: absolute;
          background-clip: content-box;
          padding: 4rpx;
          &.atv {
            background: url("https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/iconavtBut.png")
              no-repeat center center;
          }
        }
      }
    }
  }

  .myModalBox_fouter {
    height: 84rpx;
    display: flex;
    width: 610rpx;
    justify-content: space-around;
    position: absolute;
    bottom: 60rpx;
    .myModalBox_fouter_but {
      width: 240rpx;
      height: 84rpx;
      line-height: 84rpx;
      text-align: center;
      border-radius: 8rpx;
    }
    .myModalBox_fouter_cancel {
      background: #e5e5e5;
      color: #727272;
    }
    .myModalBox_fouter_submit {
      background: #38394f;
      color: #ffffff;
    }
  }
  .clone {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    margin: 0 auto;
    right: 10rpx;
    top: 10rpx;
    > img {
      width: 20rpx;
      height: 20rpx;
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
    top: 4rpx;
  }
}
</style>
