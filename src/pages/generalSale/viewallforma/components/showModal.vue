<template>
  <div class="myModal">
    <div class="myModalBox">
      <div class="clone" @click="$emit('update:chengMode', false)">
        <img src="../image/iconchahao.png" alt="" />
      </div>
      <div class="myModalBox_hander">试驾审核</div>
      <div class="myModalBox_concat">
        <div class="myModalBox_concat_con">
          <div class="myModalBox_concat_con_tit">
            客户: 张国庆 | 1324553444
            <span class="level_icon" :style="colorObj[4]">{{
              levelval[4]
            }}</span>
          </div>
          <div class="myModalBox_concat_con_tit">
            预约时间: 2020-09-20 15:30：00
          </div>
          <div class="myModalBox_concat_con_tit">
            试驾车型: 试驾车型：奥迪A6 2020款 1.8T 自动 豪华型
          </div>
        </div>
        <div class="myModalBox_concat_radio">
          <div
            :class="
              isChecked
                ? 'myModalBox_concat_radioitem atv'
                : 'myModalBox_concat_radioitem'
            "
            @click="isCheckedFun"
          >
            <i :class="isChecked ? 'radiosty atv' : 'radiosty'"></i>
            <input
              type="radio"
              :checked="isChecked"
              name="radio1"
              id="cheyes1"
              class="inputradio"
            />
            <label for="cheyes1"> 同意试驾</label>
          </div>
          <div
            :class="
              isChecked
                ? 'myModalBox_concat_radioitem'
                : 'myModalBox_concat_radioitem atv'
            "
            @click="isCheckedFun"
          >
            <i :class="isChecked ? 'radiosty' : 'radiosty atv'"></i>
            <input
              type="radio"
              :checked="!isChecked"
              name="radio1"
              id="cheyes2"
              class="inputradio"
            />
            <label for="cheyes2">拒绝试驾</label>
          </div>
        </div>
        <div class="myModalBox_concat_title">
          <div class="textarea" v-if="!isChecked">
            <textarea
              name="text"
              v-model="textareaTit"
              id=""
              autofocus
              placeholder="请输入拒绝理由"
            ></textarea>
          </div>
          <div class="tagtitle">
            <i
              :class="istagtitle ? 'tagtitleradiosty  atv' : 'tagtitleradiosty'"
              v-if="tabsIndex"
            ></i>
            <input
              v-if="tabsIndex"
              type="radio"
              :checked="!isChecked"
              @click="istagtitle = !istagtitle"
              name="radio3"
              id="cheyes3"
              class="tagtitleradio"
            />
            <label for="cheyes3">{{
              tabsIndex
                ? "结束后，将邀请客户填写试驾反馈"
                : "提醒：同意试驾后，将通知客户已预约成功"
            }}</label>
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
          {{ tabsIndex ? "结束试驾" : "确定" }}
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'commonModal',
  props: {
    showModal: {
      default: false,
      type: Boolean
    },
    tabsIndex:{
      type:Number
    }

  },
  data () {
    return {
      isChecked:true,
      istagtitle:true,
      textareaTit:"",
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
    }
  },
  created () {
   
  },
  mounted() {
   
  },
  methods: {
    
    //同意试驾拒绝试驾
    isCheckedFun(){
      this.isChecked=!this.isChecked
      console.log(this.isChecked);
    },
    //tagtitleHander
    tagtitleHander(){
      this.istagtitle=!this.istagtitle
    },
  //点击 确定或者结束试驾
  submitFun(){
    //数据根据tabsIndex 是待审核0和待试驾1  请求不同的接口
    console.log(" 请求数据");
    this.$emit('update:chengMode', false)

  },
  
  },
  onLoad(){
   
  }
}
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
        height: 200rpx;
        background: #f2f1f6;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
        border-radius: 16rpx;
        padding: 34rpx 22rpx 0 22rpx;
        .myModalBox_concat_con_tit {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          color: #1a1a1a;
          font-size: 28rpx;
          margin-bottom: 22rpx;
          position: relative;
        }
      }
      .myModalBox_concat_radio {
        display: flex;
        .myModalBox_concat_radioitem {
          width: 200rpx;
          height: 60rpx;
          border: 1px solid #e3e3e3;
          color: #767676;
          opacity: 1;
          border-radius: 30rpx;
          font-size: 28rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-right: 20rpx;
          &.atv {
            border: 2rpx solid #597ef7;
            color: #597ef7;
          }
          .inputradio {
            opacity: 0;
          }
          .radiosty {
            left: 20rpx;
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            background: #ffffff;
            border: 2rpx solid #e3e3e3;
            position: absolute;
            background-clip: content-box;
            padding: 4rpx;
            &.atv {
              background: #597ef7;
              border: 2rpx solid #597ef7;
              background-clip: content-box;
              padding: 4rpx;
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
          height: 160rpx;
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
              background: #597ef7;
              border: 2rpx solid #597ef7;
              background-clip: content-box;
              padding: 4rpx;
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
}
</style>
