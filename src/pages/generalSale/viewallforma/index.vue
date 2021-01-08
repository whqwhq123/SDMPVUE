<template>
  <div>
    <scroll-view scroll-y style="height: 98vh" @scrolltolower="pullData">
      <div class="allpendcom">
        <div class="allpendcomBox">
          <div
            :class="[{ atv: item.isShow }, 'tabs']"
            v-for="(item, index) in tabs"
            @click="avtTabsFun(item, index + 1)"
            :key="item"
          >
            {{ item.title }}
            <span :class="{ line: item.isShow }"></span>
            <div class="tipsDiv" v-if="item.tips === 0 ? false : true">
              <span :class="item.tips>9?'tips1':'tips'">{{ item.tips }}</span>
            </div>
          </div>
        </div>
        <div class="linerow"></div>
        <template v-if="dataList.length">
        <div class="allpendcomList">
          <div
            class="viewallItem"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div
              class="viewallItem_top"
              :style="{ height: tabsIndex != 3 ? '226rpx' : '80rpx' }"
            >
              <div class="viewallItem_top_l_t viewallItem_top_l_tb">
                <div class="viewallItem_top_l">
                  <div class="viewallItem_top_l_img">
                    <img :src="item.customerHeadImg?item.customerHeadImg:imageApi+'/header-man.png'" alt="" />
                  </div>
                  <div class="viewallItem_top_l_tit">
                    <div class="viewallItem_top_l_titp">
                      {{ item.customerName
                      }}<span class="level_icon" :style="colorObj[item.customerLevel ||4]">{{
                        levelval[item.customerLevel|| 4] 
                      }}</span>
                    </div>
                    <div>{{ item.appointPhone }}</div>
                  </div>
                </div>
                <div
                  class="viewallItem_top_r"
                  @click="callFun(item.appointPhone)"
                >
                  <img v-if="imageApi" :src="imageApi + '/iconviewPhone.png'"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="viewallItem_top_l_b viewallItem_top_l_tb"
                v-if="tabsIndex != 3"
              >
               
                <div class="viewallItem_top_l_b_tit">距离预约时间还有:</div>
                <time-con v-if="item.driveTime" :itemTime="item.driveTime"></time-con>

              
                <div
                  class="viewallItem_top_l_b_sh"
                  @click="viewallItemClick(tabsIndex,item)"
                >
                  {{ tabsIndex==1 ? "审核" : "结束试驾" }}
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
                    <div class="viewallItem_but_tit32">{{ item.msrp?item.msrp+"万" : "暂无价格"}}</div>
                  </div>
                </div>
              </div>
              <div class="feedback" v-if="tabsIndex == 3">
                <div v-if="item.driveStatus==5">
                  <!-- JSON.stringify(item.comment) == '{}' -->
                   <feedback-con :feedbackData="item.driveFeedback" :comment="item.comment"></feedback-con>
                </div>
                <div v-else>
                  <div class="viewallItem_but_nofee" v-if="item.comment!=''">
                    <span class="viewallItem_but_nofee_span">
                      拒绝驾驶理由:
                    </span>
                    {{item.comment}}
                </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        </template>
        <template v-else>
        <div class="allpendcomList_No_img">
          <img v-if="imageApi" :src="imageApi + '/iconNoContent.png'" alt="" />
        </div>
        <div class="allpendcomList_No_tit">您当前未有任务</div>
        <setTime></setTime>
        </template>



      </div>
    </scroll-view>

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
import statrXing from "./components/statrXing.vue";
import showModal from "./components/showModal.vue";
import timeCon from "./components/timeCon.vue";
import feedbackCon from "./components/feedbackCon.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    dataListArr: {
      type: Object,
    },
  },
  components: { statrXing, showModal,timeCon,feedbackCon },
  data() {
    return {
      imageApi,
      isShow: false,
      dataItem:{},// 当前点击内容的数据
      tabs: [
        {
          title: "待审核",
          type: 1,
          isShow: true,
          tips: 0,
        },
        {
          title: "待试驾",
          type: 2,
          isShow: false,
          tips: 0,
        },
        {
          title: "已结束",
          type: 3,
          isShow: false,
          tips: 0,
        },
      ],
      startXings: [
        {
          id: 1,
          title: "外观",
        },
        { id: 2, title: "内饰" },
        { id: 3, title: "性能" },
        { id: 4, title: "舒适度" },
        { id: 5, title: "实用性" },
      ],
      tabsIndex: 1,
      dataList: [],
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
      isfankui: false,
      isfj: true, //模拟拒绝和反馈有无
      pageNum:1,
      pageSize:5
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    dataListArr(ne) {
      this.dataList = ne;

    },
    tabsIndex(ne){

      this.tabsIndex=ne
    },
    dataList(ne){
      this.dataList=ne
    }
  },
  mounted () {

  },
  methods: {
    //tab切换
    avtTabsFun(item, index) {
      // console.log(item,index);
      // console.log(index);
      this.tabsIndex = index;
      this.$emit("avtTabsFun", index);
      if (index === item.type) {
        console.log("点击了tab然后初始化上拉加载列表数据");
        this.pageNum=1
        this.pageSize=5
        this.dataList=[]
        this.tabs = this.tabs.map((v, i) => {
          if (v.type != index) {
            v.isShow = false;
          } else {
            v.isShow = true;
          }
          return v;
        });
        // this.$nextTick(()=>{
        //   this.istime=true
        //   console.log("this.$nextTick");
        // })
        if(index==3){
          index='3,4,5,6'
        }
        this.AjaxFun(index);
      }
        // this.AjaxFun(item);
    },
    //点击审核或者结束试驾
    viewallItemClick(tabsIndex, item) {
      console.log(tabsIndex,item);
      this.dataItem=item
      // console.log(this.dataItem);
      this.dataList=[]
      this.isShow = !this.isShow;
      // this.$forceUpdate();
    },

    //电话回访
    callFun(phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: () => {},
        fail: function () {},
      });
    },
    // 上拉获取信息
    pullData() {
      console.log("到达底部触发",this.tabsIndex);
      this.AjaxFun(this.tabsIndex,this.pageNum)
    },
    //数据请求
    AjaxFun(driveStatus = 1,pageNum=1) {
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url: loginApi+"salesman/test-drive/manager",
        data: {
          foursId: this.userInfo.foursId,
          salesmanId: this.userInfo.userId,
          pageNum:pageNum+1,
          pageSize: 5,
          driveStatus,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          console.log(res,"shujuqingqiu");
          if (res.data.code==0) {
              if(res.data.data.list.length){
              this.dataList=[...this.dataList,...res.data.data.list]
              this.tabs=this.tabs.map((v)=>{  
                if(v.type==this.tabsIndex){
                    v.tips=this.dataList.length
                }         
                  
                return v
              })
              this.pageNum=pageNum+1
            }else{
            wx.showToast({
                // 弹出框的标题
                title: '没有更多数据了',
                // 弹出框的图标，不想设置图标时请给none
                icon: 'none'
            })
            // this.pageNum=pageNum
            return
            }


          }else{
            wx.showToast({
                // 弹出框的标题
                title: '数据请求错误',
                // 弹出框的图标，不想设置图标时请给none
                icon: 'none'
            })
            this.pageNum=pageNum
            return
          }


        },
        fail: () => {},
        complete: () => {},
      });
    },
  },

  onLoad() {
    console.log("onLoad初始化数据")
    console.log(this.tabsIndex);
    this.tabsIndex=1
    this.pageNum=1
    this.pageSize=5
            this.tabs = this.tabs.map((v, i) => {
          if (v.type != this.tabsIndex) {
            v.isShow = false;
          } else {
            v.isShow = true;
          }
          return v;
        });
    this.dataList=[]
    this.AjaxFun();
  },
  onShow() {
      this.tabsIndex=1
    this.pageNum=1
    this.pageSize=5
    this.dataList=[]
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
  padding: 40rpx;
  position: relative;
  .allpendcomBox {
    display: flex;
    width: 100%;
    height: 72rpx;
    align-items: center;
    position: relative;
    .tabs {
      text-align: center;
      line-height: 76rpx;
      color: #9a9a9a;
      font-size: 32rpx;
      position: relative;
      margin-right: 70rpx;
      .line {
        width: 100rpx;
        height: 6rpx;
        position: absolute;
        bottom: -3rpx;
        display: block;
        border-radius: 4rpx;
        background: #555555;
      }
      .tipsDiv {
        width: 28rpx;
        height: 28rpx;
        line-height: 25rpx;
        text-align: center;
        background: #ff5253;
        border-radius: 50%;
        position: absolute;
        top: 12px;
        right: -16px;
        .tips {
          width: 12rpx;
          height: 24rpx;
          font-size: 24rpx !important;
          color: #ffffff;
          font-weight: 400;
          right: 10rpx;
          position: absolute;
        }
        .tips1{
          width: 12rpx;
          height: 24rpx;
          font-size: 22rpx !important;
          color: #ffffff;
          font-weight: 400;
          top: 2rpx;
          right: 18rpx;
          position: absolute;
        }
      }
    }
    .tabs.atv {
      color: #262626;
      font-size: 32rpx;
      font-family: "Source Han Sans CN";
      font-weight: 600;
    }
  }
  .linerow {
    position: absolute;
    width: 100%;
    height: 2rpx;
    background: #f7f7fa;
    left: 0;
    top: 117rpx;
    opacity: 1;
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