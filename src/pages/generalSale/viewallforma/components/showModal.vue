<template>
  <div class="myModal">
    <div class="myModalBox">
      <div class="clone" @click="$emit('update:chengMode', false)">
        <img v-if="imageApi" :src="imageApi + '/iconchahao.png'" alt="" />
      </div>
      <div class="myModalBox_hander">
        {{ tabsIndex == 1 ? "试驾审核" : "本次试驾结果" }}
        <setTime></setTime>
      </div>
      <div class="myModalBox_concat">
        <div class="myModalBox_concat_con">
          <div class="myModalBox_concat_con_tit">
            客户: {{ dataItem.customerName }} | {{ dataItem.appointPhone }}
            <span class="level_icon" :style="colorObj[4]">{{
              levelval[4]
            }}</span>
          </div>
          <div class="myModalBox_concat_con_tit">
            <div v-if="!isinptTime">     
              预约时间: {{ isinpttit==''?dataItem.driveTime:isinpttit }}         
            </div>
            <div  v-if="isinptTime" style="display: flex;position: relative;">
              预约时间: <input @blur="AjaxFunTime()" type="text" v-model="isinpttit" :value="dataItem.driveTime">
            </div>
            <img  @click="inptTimeFun" style="width: 13px;height: 13px;position: absolute;z-index: 999;top: 9rpx;right: 127rpx;" src="https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/icongert.png" alt="">     
          </div>
          <div class="myModalBox_concat_con_tit">
            {{ dataItem.styleFullName }}
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
            <label for="cheyes1"> {{tabsIndex == 1?"同意试驾":"已试驾"}}</label>
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
            <label for="cheyes2">{{tabsIndex == 1?"拒绝试驾":"未试驾"}}</label>
          </div>
        </div>
        <div class="myModalBox_concat_title">
          <div class="textarea" v-if="!isChecked">
            <textarea
              style="height: 160rpx; padding: 20rpx"
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
              v-if="tabsIndex == 2"
            ></i>
            <input
              v-if="tabsIndex == 2"
              type="radio"
              :checked="!isChecked"
              @click="istagtitle = !istagtitle"
              name="radio3"
              id="cheyes3"
              class="tagtitleradio"
            />
            <label for="cheyes3">{{
              tabsIndex == 2
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
          
          {{ tabsIndex == 2 ? "结束试驾" : "确定" }}
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { imageApi,loginApi } from "../../../../http/url";
// import setTimes from "./setTime";
export default {
  name: 'commonModal',
  props: {
    showModal: {
      default: false,
      type: Boolean
    },
    tabsIndex:{
      type:Number
    },
    dataItem:{
      type:Object
    }

  },
  data () {
    return {
      isChecked:true,
      istagtitle:true,
      isinptTime:false,//控制修改时间input的显示
      isinpttit:'',//修改日期的内容
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
  watch: {
    dataItem(ne){
      this.dataItem=ne
      console.log(ne,"监听父组件传过来的参数");
    }
  },
  created () {
   
  },
  mounted() {
   
  },
  // components: { setTimes },
  methods: {
    //点击修改试驾
    inptTimeFun(){
      this.isinptTime=!this.isinptTime

  

    // this.AjaxFunTime()

    },



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
    let driveStatustit=""
      if(this.tabsIndex==1){
        if(this.isChecked){
          driveStatustit=2
        }else{
          driveStatustit=3
        }
      }else if(this.tabsIndex==2){
        if(this.isChecked){
            driveStatustit=6
        }else{
          if(this.textareaTit){
            driveStatustit=5
          }else{
            driveStatustit=4
          }
        }
      }
      if(!this.isChecked){
        if(typeof this.textareaTit == "undefined" || this.textareaTit == null || this.textareaTit == ""){
            wx.showToast({
              // 弹出框的标题
              title: '填写拒绝理由',
              // 弹出框的图标，不想设置图标时请给none
              icon: 'none'
            })
           return

        }

      }


    let obj={
      driveId:this.dataItem.driveId,
      comment:this.textareaTit,
      driveStatus:driveStatustit

    }

    console.log(" 请求数据",obj);
    this.AjaxFun(obj)
    this.$forceUpdate();
    this.$emit('update:chengMode', false)

  },
  //数据请求修改时间
    AjaxFunTime(){
      if (this.isinpttit!='') {
        let driveTime=this.isinpttit.replace(/-/g,"/");
        let token = wx.getStorageSync("token");
        let request = wx.request({
          url: loginApi+"salesman/test-drive/update/driveTime",
          data:{
            driveId:this.dataItem.driveId,
            driveTime
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: token,
          },
          method: "POST",
          dataType: "json",
          responseType: "text",
          success: (res) => {
            console.log(res);
              if(res.code==0){
                this.$parent.AjaxFun(this.tabsIndex)
                
              }
            
            
          },
          fail: () => {},
          complete: () => {},
        });
      }
   
    },
      //数据请求
    AjaxFun(data) {
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url: loginApi+"salesman/test-drive/update/status",
        data:data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          console.log(res);
          
            this.$parent.AjaxFun(this.tabsIndex)
          
        },
        fail: () => {},
        complete: () => {},
      });
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
}
</style>
