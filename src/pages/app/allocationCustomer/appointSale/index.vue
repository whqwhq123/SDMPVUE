<template>
  <div>
    <div class="header_person">
      <img v-if="imageApi" :src="imageApi+'/gallery_manager.png'" alt class="header_img" />
      <div class="person_detail">
        <div class="phone">{{phone}}</div>
        <div class="custorm">
          客户
          <span
            class="level"
            :style="{color:'#fff',background: levelStyle[levelVal[cusLevel]]}"
          >{{levelVal[cusLevel]}}</span>
          <!-- <span class="arrive">邀约到店 今天 14:00</span> -->
          <!-- <span class="mand">A4L</span> -->
        </div>
      </div>
    </div>
    <div class="oppint_sale">
      <div class="select_input">
        <input
          type="text"
          v-model="val"
          class="input_bgc"
          placeholder-style="color:#B3B3B3;font-size:28rpx"
          placeholder="请输入销售姓名"
        />
        <img
          v-if="imageApi"
          :src="imageApi+'/search.png'"
          alt
          class="search_icon"
          @click="searchFun"
          
        />
        <span class="cancle_style" @click="cancleFun">取消</span>
      </div>
      <div class="list_sale">
        <div class="item" v-for="(item,index) in dataList" :key="index">
          <div
            class="header_img"
            style="display:flex;justify-content: space-between;width:100%; align-items: center;"
          >
            <div style="display:flex;width:50%">
              <img :src="imageApi+'/header-man.png'" alt class="header_img" />
              <div style="margin-left:42rpx;">
                <div style="font-size:28rpx;color:#1a1a1a">{{item.salesmanName}}</div>
                <div style="font-size:24rpx;color:#767676">销售顾问</div>
              </div>
            </div>
            <div class="but_appin" @click="appointSale(item.salesman)">指派销售</div>
          </div>
          <!-- <div class="sale_data">
                    <div class="list">
                        <div class="label_name">指派数</div>
                        <div class="label_num">99次</div>
                    </div>
                     <div class="list">
                        <div class="label_name">接待数</div>
                        <div class="label_num">92人</div>
                    </div>
                     <div class="list">
                        <div class="label_name">成交率</div>
                        <div class="label_num">95%</div>
                    </div>
                     <div class="list">
                        <div class="label_name">战败率</div>
                        <div class="label_num">5%</div>
                    </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { imageApi } from "../../../../http/url";
export default {
  data() {
    return {
      imageApi,
      levelStyle: {
        'H': '#ff5253',
        'A': '#FFA600',
        'C': '#B0C939',
      },
      levelVal: {
        '1': 'H',
        '2': 'A',
        '3': 'B',
        '4': 'C',
        '5': '',
        '6': ''
      },
      val: '',
      dataList: [],
      pageNo: 1,
      pageSize: 10,
      uqlId: '',
      cusLevel: "",
      phone: "",
      foursId:""
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'vi': 'vi',
    })
  },
  methods: {
    ...mapActions({
      'getSaleList': 'user/getSaleList',
      'appointSaleFun': 'user/appointSale',
      'insightCustomer': 'insight/insightCustomer',
      'getInsightInfo': 'insight/getInsightInfo',
    }),
    // 获取用户列表
    async getList() {
      let res = await this.getSaleList({ foursId: this.userInfo.foursId, targetType: this.userInfo.targetType, userName: this.val, pageNo: this.pageNo, pageSize: this.pageSize })
      if (res.code == 0 && res.data.recordList.length > 0) {
        this.dataList = this.dataList.concat(res.data.recordList)
        this.pageNo++;
      } else {
        wx.showToast({
          title: '没有更多数据',
          icon: 'none',
          duration: 1000
        })
        return
      }
    },
    searchFun() {
      this.dataList = []
      this.pageNo = 1;
      this.getList()
    },
    cancleFun() {
      this.val = ''
      this.pageNo = 1;
      this.dataList = [];
      this.getList()
    },
    async op_asle(salesman) {
      let res = await this.appointSaleFun({ uqlId: this.uqlId, salesman: salesman,showRoomId:this.userInfo.userId })
      if (res.code == 0) {
        mpvue.showToast({
            title: '分配成功',
            icon: 'success',
            duration: 800,
            mask: true
          });
        setTimeout(function(){
          wx.navigateTo({
          url: '/pages/app/allocationCustomer/customer/main'
        })
        },2000)
      }
    },
    appointSale(salesman) {
      var that = this;
      wx.showModal({
        title: '提示',
        cancelText: '取消',
        confirmText: '确认',
        confirmColor: '#FF443F',
        content: '请确认是否将此客户指派给销售，指派后不可修改',
        success(res) {
          // that.op_asle(salesman);
          if (res.confirm) {
            that.op_asle(salesman)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async insightCustomerFun(params) {
      try {
        this.loadingStatus = true;
        let res = await this.insightCustomer(params);
        if (res.code === 0) {
          this.getInsightInfos(res.data.uuid);
        } else {
          this.setInsightStatus(false);
          setTimeout(() => {
            this.loadingStatus = false;
          }, 2000)
        }
      } catch (e) {
        this.loadingStatus = false;
        console.error(e);
      }
      this.hideModal()
    },
    async getInsightInfos(uuid) {
      let res = await this.getInsightInfo({
        phone: this.phone,
        uuid: uuid,
        userId: this.userInfo.userId,
        foursId: this.foursId
      });
      if (res.code === 0) {
        clearTimeout(this.timer);
        this.setInsightStatus(true);
        this.loadingStatus = false;
      }
      if (res.code === 500) {
        clearTimeout(this.timer);
        this.loadingStatus = false;
        notice({ title: res.errMsg });
      }
      if (res.code === 2) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // this.getInsightInfos(uuid)
        }, 500)
      }
      if (res.code === 22) {
        clearTimeout(this.timer);
        this.loadingStatus = false;
        notice({ title: res.errMsg });
      }
    }
  },
  onLoad(op) {
    console.log('load', op)
    this.cusLevel = op.cusLevel;
    this.phone = op.phone;
    this.uqlId = op.uqlId;
    this.foursId=op.foursId;
    // 洞察
    this.insightCustomerFun({phone:op.phone, userId:this.userInfo.userId, foursId:op.foursId});
  },
  onShow() {
    this.pageNo = 1;
    this.dataList = [];
    this.getList();
  },
  onReachBottom() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.header_person {
  display: flex;
  background: #36384e;
  height: 204rpx;
  width: 100%;
  padding-left: 40rpx;
  box-sizing: border-box;
  .header_img {
    width: 88rpx;
    height: 88rpx;
    vertical-align: middle;
  }
  .person_detail {
    margin-left: 30rpx;
    box-sizing: border-box;
    .phone {
      font-size: 48rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .custorm {
      font-size: 30rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 11px;
      color: rgba(255, 255, 255, 1);
    }
    .level {
      display: inline-block;
      width: 33rpx;
      height: 33rpx;
      // color: #ff5253;
      // border: 2rpx solid #ff5253;
      text-align: center;
      line-height: 30rpx;
      border-radius: 6rpx;
      margin-right: 20rpx;
      box-sizing: border-box;
    }
    .arrive,
    .mand {
      padding: 0 8rpx;
      background: #6d6e80;
      border-radius: 8rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      height: 34rpx;
      color: #36384e;
    }
    .mand {
      margin-left: 20rpx;
      box-sizing: border-box;
    }
  }
}

.oppint_sale {
  width: 100%;
  padding: 48rpx 40rpx 20rpx 40rpx;
  box-sizing: border-box;

  .select_input {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input_bgc {
      width: 572rpx;
      height: 70rpx;
      background: #f2f2f2;
      opacity: 1;
      border-radius: 8px;
      color: #b3b3b3;
      padding-left: 70rpx;
      box-sizing: border-box;
      font-family: Source Han Sans CN;
    }
    .cancle_style {
      color: #333;
      font-size: 32rpx;
      font-weight: 500;
    }
    .search_icon {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      left: 20rpx;
      top: 17rpx;
    }
  }
  .list_sale {
    width: 100%;
    .item {
      margin-top: 48rpx;
      width: 100%;
      padding-bottom: 30rpx;
      border-bottom: 1px solid #e5e5e5;
      .header_img {
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
      }
      .but_appin {
        width: 140rpx;
        height: 48rpx;
        border: 2rpx solid #bb0a30;
        opacity: 1;
        border-radius: 44rpx;
        color: #ffffff;
        background: #bb0a30;
        font-size: 24rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .sale_data {
      display: flex;
      justify-content: space-between;
      margin-top: 32rpx;
      width: 100%;
      height: 61px;
      background: rgba(245, 245, 245, 1);
      opacity: 1;
      border-radius: 4px;
      padding: 24rpx 40rpx;
      box-sizing: border-box;
      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .label_name {
          color: #262626;
          font-size: 24rpx;
        }
        .label_num {
          color: #262626;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>