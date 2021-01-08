<template>
  <div class="user_main">
    <div class="top_serach">
      <div :class="[flag ? 'default' : 'changeWidth']">
        <navigator url="./search/main">
          <img
            v-if="imageApi"
            :src="imageApi + '/search.png'"
            alt
            class="search_icon"
            @click="searchFun"
          />
        </navigator>
        <input
          type="number"
          class="search"
          v-model="search"
          placeholder="请输入客户手机号"
          placeholder-style="color:#aaa;font-size:13px;"
          maxlength="11"
          @focus="changeStyle"
        />
        <img
          v-if="imageApi"
          :src="imageApi + '/close.png'"
          alt
          class="close_icon"
          @click="clearFun"
        />
        <span class="cache" @click="cancle" v-if="!flag">取消</span>
      </div>
      <div class="left_add" @click="addData" v-if="flag">
        <!-- <img src="../../../static/images/add.png" alt="" class="add_icon">
        <span>添加数据</span>-->
        <!-- <button  class="add_data" >
                    +洞察客户
        </button>-->
        <span class="add_customer">
          <span class="add_icon_plus">+</span>添加客户
        </span>
      </div>
      <!-- <dialogAdd @close='closeFun' v-if="Closeflag"></dialogAdd> -->
    </div>
    <div>
      <div :class="[statsu ? 'navbar' : 'default_nav']">
        <div class="tabs_content">
          <block v-for="(item, index) in tabs" :key="index">
            <div
              :id="index"
              :class="{ navbar_item_on: activeIndex == index }"
              class="navbar_item"
              @click="tabClick"
              v-if="statsu"
            >
              <div class="navbar_title">{{ item.name }}</div>
            </div>
          </block>
        </div>
        <div style="margin-bottom: 14rpx">
          <img
            class="erweima"
            v-if="imageApi"
            :src="imageApi + '/erweima.png'"
            alt
            style="width: 48rpx; height: 48rpx; vertical-align: middle"
            @click="openDialog"
          />
        </div>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
      <swiper
        :class="[statsu ? 'content' : 'contnt_main']"
        :duration="50"
        @change="swiperChange"
        :current="currentTab"
        @animationfinish="onAnimationfinish"
        v-if="listsData.length > 0"
      >
        <swiper-item v-for="(item, index) in tabs" :key="index">
          <scroll-view scroll-y style="height: 82vh" @scrolltolower="pullData">
            <div
              :class="[
                statsu ? 'list_scope' : 'list_conten_scop',
                'list_content',
              ]"
            >
              <div
                class="list"
                v-for="(item, ind) in listsData"
                :key="ind"
                @click="lookDetail(item)"
              >
                <div class="user_info">
                  <div class="user_icon">
                    <img
                      :src="imageApi + '/header-man.png'"
                      alt
                      class="header_img"
                    />
                    <img
                      v-if="item.proxyStatus == 1"
                      :src="imageApi + '/jzxd/spokesman-customer.png'"
                      alt
                      class="spokesman_img"
                    />
                  </div>
                  <div class="user_detail_msg">
                    <div style="display: flex; align-items: center">
                      <span
                        style="display: block; min-width: 260rpx"
                        v-if="item.name"
                      >
                        <span class="user_name">{{ item.name }}</span>
                        <span class="phone_num">
                          <span
                            :class="[search.length > 5 ? 'phone_num_red' : '']"
                            >{{ item.showPhone[0] || "" }}</span
                          >
                          <span>{{ item.showPhone[1] || "" }}</span>
                        </span>
                      </span>
                      <span style="display: block; width: 180rpx" v-else>
                        <span class="phone_num">
                          <span
                            :class="[search.length > 5 ? 'phone_num_red' : '']"
                            >{{ item.showPhone[0] || "" }}</span
                          >
                          <span>{{ item.showPhone[1] || "" }}</span>
                        </span>
                      </span>
                      <span
                        :class="['badge', levlColor[item.cusLevel]]"
                        v-if="levelVal[item.cusLevel]"
                        >{{ levelVal[item.cusLevel] }}</span
                      >
                      <span class="upadte_time" v-if="index == 0">{{
                        item.createTime
                      }}</span>
                    </div>
                    <div style="display: flex;=align-items: center;=margin: 14rpx 0;=justify-content: space-between;">
                      <div style="display: flex;flex:1;">
                        <div
                          class="label"
                          v-if="item.createSource == '邀约到店' && item.appointmentTime">
                          <span>{{ item.createSource }}</span>
                          <span>{{ item.tT }}</span>
                          <span>{{ item.sT }}</span>
                        </div>
                        <div
                          class="label liuZi"
                          v-if="item.createSource == '小程序留资'"
                        >
                          <span>{{ item.createSource }}</span>
                        </div>
                        <div class="car_series" v-if="item.carType">
                          {{ item.carType }}
                        </div>
                      </div>

                      <div
                        v-if="index == 0"
                        :class="[
                          activeIndex == 1 ? 'default_avtive' : '',
                          'fenpei_sell',
                        ]"
                        @click="appointSale(item)"
                      >
                        分配销售
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right_time" v-if="index == 1">
                  <div class="line_sale">
                    <span class="sale_name">销售顾问</span>
                    <span class="sale_name">接待时间</span>
                  </div>
                  <div class="line_sale">
                    <span class="sale_full">{{ item.salesmanName || "" }}</span>
                    <span class="sale_name">{{ item.createTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
      <div class="img_scope" v-else>
        <img :src="imageApi + '/user_default.png'" alt />
        <span class="default_size">暂无客户信息</span>
      </div>
    </div>

    <!-- 分享 -->
    <!-- <tab_bar :selected="2"></tab_bar> -->
    <share-dialog
      :shareProps="shareProps"
      @handleClose="handleClose"
      @shareFirends="shareFirends"
      v-if="closeDialog"
    />
    <!-- 弹出框 -->
    <customer-modal
      v-if="isShow"
      :rowData="rowData"
      :tabsIndex="tabsIndex"
      :dataItem="dataItem"
      :chengMode.sync="isShow"
    ></customer-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { formatDay } from "../../../../utils";
import { fenxiang } from "../../../../utils";
import { formateTtime } from "../../../../utils";
import { formateSTime } from "../../../../utils";
import { formateTS } from "../../../../utils";
// import dialogAdd from './addData/index';
import { imageApi,loginApi } from "../../../../http/url";
// import tab_bar from '../../components/tabBar'
import customerModal from "../components/customerModal";

import ShareDialog from "../../../../components/shareDialog";
export default {
  components: {
    ShareDialog,
    customerModal,
    //   dialogAdd,
    //   tab_bar
  },
  data() {
    return {
      imageApi,
      search: "",
      isShow: false,
      tabs: [
        {
          name: "待分配",
          type: "3",
          checked: true,
        },
        {
          name: "已分配",
          type: "2",
          checked: true,
        },
      ],
      activeIndex: 0,
      currentTab: 0,
      winWidth: 0,
      winHeight: 0,
      dataList: [],
      flag: true,
      statsu: true,
      tradeStatus: "3",
      defalutName: "",
      // ----未分配
      pageNo: 0,
      pageSize: 10,
      listsData: [],
      taotal: null,
      rowData: {},
      // 已分配
      alreadyPageNo: 0,
      alreadyPageSize: 10,
      alreadyListsData: [],
      alreadyTaotal: null,
      // -----
      Closeflag: false,
      closeDialog: false,
      levlColor: {
        1: "badge_h",
        2: "badge_a",
        3: "badge_b",
        4: "badge_c",
        5: "badge_i",
        6: "badge_l",
      },
      levelVal: {
        1: "H",
        2: "A",
        3: "B",
        4: "C",
        5: "",
        6: "",
      },
      colorList: {
        "003": "bade_title",
        "004": "bade_title",
        "006": "bade_title",
        "007": "bade_title",
        "008": "bade_title",
        "005": "bade_label_l3",
        "009": "bade_label_l3",
        "010": "bade_label_l3",
        "011": "bade_label_l3",
        "001": "",
        "002": "",
        "012": "",
      },
      imageUrl: "",
      dataItem: {},
      shareProps: {
        defaulTtitle: "见面礼",
        title: "将您的专属二维码或链接发给您的客户",
        codeImgUrl: "",
      },
      sharePropsItem:{}
    };
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
      if (this.activeIndex == 2) {
        return "navbar_slider_2";
      }
      if (this.activeIndex == 3) {
        return "navbar_slider_3";
      }
    },
    contentHeight() {
      return this.winHeight + "px";
    },
    time() {
      return new Date().getTime();
    },
    ...mapGetters({
      userInfo: "userInfo",
      vi: "vi",
    }),
  },
  watch: {
    search(v) {
      if (v.length > 5) {
        this.searchData();
      }
    },
  },
  methods: {
    ...mapMutations({
      getCarList: "user/getCarList",
    }),
    ...mapActions({
      getUserList: "user/getSaleOpList",
      getCarSeries: "user/getCarSeries",
      getImageInfo: "recommendActivity/getImageInfo",
      getAlreadyList: "user/getAlreadyList",
    }),
    handleClose(value) {
      console.log("21345665432", value);
      this.closeDialog = value;
    },
    /**
     * 跳转留资小程序
     * @param scene  4S店 类型 销售ID 报价单ID
     * */
    shareFirends(value) {
      const that = this;
      // 直接跳转到c端见面礼
      // foursId ,   type 1 // 报价单， 2 // 名片 3 // 活动， salesmanId // 销售ID   activityId // 活动Id
      // let params = [this.userInfo.foursId, 3, this.userInfo.userId].join()
      let params = [that.userInfo.foursId, 11].join();
      mpvue.navigateToMiniProgram({
        appId: "wxb531f813eaa2c2ea",
        path: "/pages/sell/index?scene=" + params,
        // envVersion: 'trial',
        success(res) {
          console.log("跳转c端销售落地页", res);
        },
      });
    },
    async openDialog() {
      let bodyParm = [this.userInfo.foursId, 11, "", "", "", 5].join();
      let params = {
        body: bodyParm,
        type: "salesman_4",
      };
      let res = await this.getImageInfo(params);
      this.shareProps = {
        ...this.shareProps,
        codeImgUrl: res,
      };
      this.imageUrl = res;
      this.closeDialog = true;
    },
    async getCar() {
      let res = await this.getCarSeries({
        manuId: this.userInfo.manuId,
        foursId: this.userInfo.foursId,
        pageNum: 1,
        numPerPage: 1000,
      });
      this.getCarList(res.data);
    },

    //获取用户信息
    async getList() {
      let res = await this.getUserList({
        foursId: this.userInfo.foursId,
        phone: this.search,
        tradeStatus: this.tradeStatus,
        pageNo: ++this.pageNo,
        pageSize: this.pageSize,
      });
      this.taotal = res.data.totalCount;
      if (res.data.recordList.length == 0) {
        // wx.showToast({
        //     title: '暂无更多数据',
        //     icon: 'none',
        // })
        return;
      }
      var newList = this.dataList.concat(res.data.recordList);
      this.dataList = newList;
      this.listsData = newList.map((v) => {
        return {
          ...v,
          createTime: formateTS(v.createTime),
          tT: formateTtime(v.appointmentTime),
          sT: formateSTime(v.appointmentTime),
        };
      });
      console.log();
    },
    async searchData() {
      if (this.currentTab == 0) {
        // 待分配
        let res = await this.getUserList({
          foursId: this.userInfo.foursId,
          salesman: this.userInfo.userId,
          phone: this.search,
          tradeStatus: this.tradeStatus,
          pageNo: 1,
          pageSize: 100,
        });
        this.listsData = res.data.recordList;
        this.listsData = this.listsData.map((v) => {
          return {
            ...v,
            createTime: formateTS(v.createTime),
            tT: formateTtime(v.appointmentTime),
            sT: formateSTime(v.appointmentTime),
          };
        });
      } else {
        // 已分配
        const result = await this.getAlreadyList({
          foursId: this.userInfo.foursId,
          phone: this.search,
          pageNo: 1,
          pageSize: 100,
        });

        this.listsData = res.data.recordList;
        this.listsData = this.listsData.map((v) => {
          return {
            ...v,
            createTime: formateTS(v.createTime),
            tT: formateTtime(v.appointmentTime),
            sT: formateSTime(v.appointmentTime),
          };
        });
      }
    },
    searchFun() {
      // wx.navigateTo({
      //     url: '../user/search/main?'+this.search
      // })
      this.searchData();
    },
    // 上拉获取信息
    pullData() {
      if (this.taotal == this.dataList.length) {
        wx.showToast({
          title: "暂无更多数据",
          icon: "none",
        });
        return;
      }
      if (this.currentTab == 0) {
        this.getList();
      } else {
        this.getAlreadyDistributionList();
      }
    },
    changeStyle() {
      this.flag = false;
      this.statsu = false;
      // this.pageNo=0;
      // this.dataList=[];
      // this.listsData=[];
    },
    cancle() {
      this.flag = true;
      this.statsu = true;
      this.pageNo = 0;
      this.alreadyPageNo = 0;
      this.search = "";
      this.dataList = [];
      this.listsData = [];
      // console.log(this.phone);
      this.getList();
    },
    clearFun() {
      this.search = "";
      this.getList();
    },
    addData() {
      console.log("aa");
      wx.navigateTo({
        url: "/pages/user/addData/main",
      });
      // this.Closeflag=true
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
      this.pageNo = 0;
      this.alreadyPageNo = 0;
      this.dataList = [];
      this.listsData = [];
      if (this.activeIndex == 0) {
        // 待分配
        this.tradeStatus = "3";
        this.getList();
      } else {
        // 已分配
        this.tradeStatus = this.tabs[this.activeIndex].type;
        this.getAlreadyDistributionList();
      }
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;

      this.activeIndex = this.currentTab;
      this.pageNo = 0;
      this.alreadyPageNo = 0;
      this.dataList = [];
      this.listsData = [];
      if (this.activeIndex == 0) {
        this.tradeStatus = "3";
        this.getList();
      } else {
        this.tradeStatus = this.tabs[this.activeIndex].type;
        this.getAlreadyDistributionList();
      }
    },
    onAnimationfinish() {},
    lookDetail(val) {
      // wx.navigateTo({
      //     url:'../user/customerMsg/main?option='+JSON.stringify(val)
      // })
    },
    appointSale(row) {
      this.isShow = true;
      console.log(row);
      this.rowData = row;
      // wx.navigateTo({
      //   url: '/pages/app/allocationCustomer/appointSale/main?uqlId=' + row.uqlId+'&phone='+row.phone+'&cusLevel='+row.cusLevel+'&foursId='+row.foursId
      // })
      this.getFoursArriveInfoByPhoneFun({
        phone: row.phone,
        foursId: row.foursId,
      });
    },

    //请求根据手机号获取接待信息
    getFoursArriveInfoByPhoneFun(data) {
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url:
          loginApi+"salesman/foursArriveInfo/getFoursArriveInfoByPhone",
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
            this.dataItem = res.data.data;
            console.log(res.data.data);
          }
        },
        fail: () => {},
        complete: () => {},
      });
    },

    async getAlreadyDistributionList() {
      let params = {
        foursId: this.userInfo.foursId,
        phone: "",
        pageNo: ++this.alreadyPageNo,
        pageSize: this.alreadyPageSize,
      };
      const res = await this.getAlreadyList(params);
      console.log(res);
      const { code, data } = res;
      if (code === 0) {
        this.taotal = res.data.totalCount;
        if (res.data.recordList.length == 0) {
          // wx.showToast({
          //     title: '暂无更多数据',
          //     icon: 'none',
          // })
          return;
        }
        var newList = this.dataList.concat(res.data.recordList);
        this.dataList = newList;
        this.listsData = newList.map((v) => {
          return {
            ...v,
            // createTime: formateTS(v.createTime),
            tT: formateTtime(v.appointmentTime),
            sT: formateSTime(v.appointmentTime),
          };
        });
      }
    },
  },
  onPageScroll: function (e) {
    // 获取滚动条当前位置
  },
  onShareAppMessage() {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang;
  },
  onShow() {
    this.pageNo = 0;
    this.Closeflag = false;
    this.dataList = [];
    this.listsData = [];
    this.getList();
  },
  onLoad() {
    var res = wx.getSystemInfoSync();
    this.winWidth = res.windowWidth;
    this.winHeight = res.windowHeight;
    this.activeIndex = 0;
    this.pageNo = 0;
    this.Closeflag = false;
    this.dataList = [];
    this.listsData = [];
    this.getCar();
  },

  onPullDownRefresh() {},
};
</script>

<style lang="scss" scoped>
// page{
//     overflow-y: hidden;
// }
.user_main {
  background: #fff;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  overflow-x: hidden;
  .content {
    height: 82vh;
    // overflow-y: scroll;
  }
  .contnt_main {
    height: 82vh;
  }
  .img_scope {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .default_size {
      font-size: 15px;
      color: #888;
    }
    img {
      width: 50.66666666666667vw;
      height: 21.58920539730135vh;
      margin-top: 6.746626686656672vh;
    }
  }
  .top_serach {
    padding: 1.7991vh 5.33333vw 0 5.33333vw;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // box-sizing: border-box;
    .changeWidth {
      width: 90%;
      position: relative;
      .close_icon {
        position: absolute;
        left: 90%;
        top: 16rpx;
        width: 5.33333vw;
        height: 5.33333vw;
        z-index: 9;
      }
    }
    .default {
      width: 480rpx;
      position: relative;
      .close_icon {
        position: absolute;
        left: 88%;
        top: 16rpx;
        width: 5.33333vw;
        height: 5.33333vw;
        z-index: 9;
      }
    }
    .search_icon {
      position: absolute;
      left: 1.866666vw;
      top: 16rpx;
      width: 5.33333vw;
      height: 5.33333vw;
    }

    .close_icon_search {
      position: absolute;
      right: 16.5vw;
      top: 2.6vh;
      width: 5.33333vw;
      height: 5.33333vw;
      z-index: 9;
    }
    .cache {
      position: absolute;
      top: 16rpx;
      right: -5.2vh;
      font-size: 13px;
      color: #888;
    }
    .left_add {
      color: #333;
      font-size: 15px;
    }
    .add_icon {
      width: 5.33333vw;
      height: 5.33333vw;
      vertical-align: bottom;
    }
    .add_icon_plus {
      color: #333;
      font-size: 42rpx;
    }
    .add_data {
      width: 102px;
      height: 5.0974vh;
      background: #ff443f;
      opacity: 1;
      border-radius: 25px;
      color: #fff;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline-style: none;
    }
    .add_customer {
      color: #333;
      font-size: 32rpx;
    }
    .search {
      width: 100%;
      height: 70rpx;
      background: rgba(242, 242, 242, 1);
      border-radius: 8rpx;
      padding-left: 8.866666vw;
      padding-right: 8.866666vw;
      box-sizing: border-box;
      font-size: 13px;
      color: #333;
    }
  }
  .list_conten_scop {
    padding: 0 5.333333vw;
    // overflow-y: scroll;
    height: 82vh;
  }
  .list_scope {
    padding: 0 5.333333vw;
    // overflow-y: scroll;
    height: 72vh;
  }
  .list_content {
    // padding: 0 5.333333vw;
    // // overflow-y: scroll;
    // height: 72vh;
    .list {
      min-height: 148rpx;
      border-bottom: 1px solid #ececec;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      padding: 40rpx 0 20rpx 0;
      box-sizing: border-box;
      position: relative;
      .right_time {
        margin-top: 40rpx;
        width: 100%;
        height: 114rpx;
        background: rgba(245, 245, 245, 1);
        opacity: 1;
        border-radius: 4px;
        padding: 20rpx;
        box-sizing: border-box;
        .line_sale {
          display: flex;
          justify-content: space-between;
          .sale_name {
            color: #767676;
            font-size: 24rpx;
          }
          .sale_full {
            color: #1a1a1a;
            font-size: 28rpx;
          }
        }
      }
      .bade_label_l1 {
        display: inline-block;
        width: 16rpx;
        height: 16rpx;
        background: rgba(255, 82, 83, 1);
        border-radius: 50%;
        opacity: 1;
        margin-right: 8rpx;
        color: #999;
      }
      .bade_label_l2 {
        display: inline-block;
        width: 16rpx;
        height: 16rpx;
        background: #999999;
        border-radius: 50%;
        opacity: 1;
        margin-right: 8rpx;
        color: #999;
      }
      .bade_label_l3 {
        display: inline-block;
        width: 16rpx;
        height: 16rpx;
        background: #ffa600;
        border-radius: 50%;
        opacity: 1;
        margin-right: 8rpx;
        color: #999;
      }
      .user_info {
        display: flex;
        .user_icon {
          width: 9.6vw;
          height: 9.6vw;
          border-radius: 50%;
          background: #ccc;
          position: relative;
          // position: relative;
          .header_img {
            width: 9.6vw;
            height: 9.6vw;
          }
          .spokesman_img {
            position: absolute;
            bottom: -8rpx;
            left: 6rpx;
            width: 60rpx;
            height: 24rpx;
          }
        }
        .user_detail_msg {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-left: 40rpx;
          .user_name {
            font-size: 28rpx;
            color: #1a1a1a;
            margin-right: 16rpx;
          }
          .phone_num {
            font-size: 28rpx;
            color: #1a1a1a;
          }
          .phone_num_red {
            color: #ff443f;
          }
          .upadte_time {
            position: absolute;
            right: 0;
            top: 40rpx;
            color: #b3b3b3;
          }
          .badge {
            // position: absolute;
            display: inline-block;
            width: 30rpx;
            height: 30rpx;
            border-radius: 4px;
            margin-left: 10rpx;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .badge_h {
            // background: #FF5253;
            border: 1px solid #ff5253;
            color: #ff5253;
          }
          .badge_c {
            // background: #B0C939;
            border: 1px solid #b0c939;
            color: #b0c939;
          }
          .badge_b {
            border: 1px solid #ffe131;
            color: #ffe131;
            // background: #FFE131;
          }
          .badge_a {
            border: 1px solid #ffa600;
            color: #ffa600;
            // background: #FFA600;
          }
          .badge_l {
            background: #aaaaaa;
          }
          .badge_i {
            background: #ffa678;
          }
        }
        .label {
          width: 240rpx;
          background: rgba(242, 242, 242, 1);
          border-radius: 8rpx;
          color: #767676;
          display: flex;
          padding: 4rpx 6rpx;
          font-size: 24rpx;
          justify-content: space-between;
          margin-right: 15rpx;
        }
        .liuZi {
          width: 125rpx;
        }
        .car_series {
          color: #767676;
          font-size: 24rpx;
          padding: 4rpx 6rpx;
          // margin-left: 15rpx;
          background: rgba(242, 242, 242, 1);
          border-radius: 8rpx;
        }
        .fenpei_sell {
          width: 140rpx;
          height: 48rpx;
          border: 2rpx solid #bb0a30;
          opacity: 1;
          border-radius: 44rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24rpx;
          color: #ffffff;
          background: #bb0a30;
          float: right;
        }
        .default_avtive {
          margin-top: -40rpx;
        }
      }
    }
    .list:nth-last-child(1) {
      margin-bottom: 50px;
    }
  }
  // .content {
  //     box-sizing: border-box;
  //     -webkit-overflow-scrolling: touch;
  // }

  .swiper-item {
    height: 100%;
    text-align: center;
  }

  .navbar {
    display: flex;
    width: 100%;
    background-color: #fff;
    color: #aaa;
    border-bottom: 1rpx solid #ccc;
    justify-content: space-between;
    padding: 0 5.3333vw;
    box-sizing: border-box;
    margin-top: 9.0666667vw;
  }
  .default_nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    color: #aaa;
    // border-bottom: 1rpx solid #ccc;
    justify-content: space-between;
    padding: 0 5.3333vw;
    box-sizing: border-box;
    margin-top: 2.0666667vw;
  }
  .tabs_content {
    display: flex;
  }

  .navbar_item {
    position: relative;
    display: block;
    font-size: 0;
    margin-right: 70rpx;
  }

  .navbar_item {
    color: #aaa;
    font-size: 15px;
  }
  .navbar_item_on {
    color: #333;
    font-size: 15px;
    padding: 0 5px;
    border-bottom: 2px solid rgba(85, 85, 85, 1);
  }

  .navbar_title {
    // color: #aaa;
    font-weight: 500;
    display: inline-block;
    font-size: 15px;
    max-width: 8em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .navbar_slider {
    position: absolute;
    content: " ";
    left: 0;
    bottom: 0;
    width: 6em;
    height: 3px;
    background-color: white;
    -webkit-transition: -webkit-transform 0.1s;
    transition: -webkit-transform 0.1s;
    transition: transform 0.1s;
    transition: transform 0.1s, -webkit-transform 0.1s;
  }

  .navbar_slider_0 {
    left: 29rpx;
    transform: translateX(0);
  }

  .navbar_slider_1 {
    left: 29rpx;
    transform: translateX(250rpx);
  }

  .navbar_slider_2 {
    left: 29rpx;
    transform: translateX(500rpx);
  }
  .navbar_slider_3 {
    left: 29rpx;
    transform: translateX(725rpx);
  }
  .controls {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 8888;
    top: 80;
    height: 50px;
    width: 100%;
    background-color: #298de5;
  }
}
</style>
