<template>
  <section class="page">
    <div class="navbar">
      <div class="nav_header">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="nav_item"
          :class="{'active':item.checked}"
          @tap="handleTab(item,index)"
        >
          {{item.checkedName ? item.checkedName :item.name}}&nbsp;&nbsp;
          <span
            :class="{'square_up': item.checked,'square_active_up': item.checked, 'square_down': !item.checked}"
          ></span>
        </view>
      </div>
    </div>

    <div class="nav_wrap" v-if="hideContent">
      <div v-if="contentType==1">
        <scroll-view
          scroll-y
          style="height: 800rpx;background:#fff;"
          bindscrolltoupper="upper"
          bindscrolltolower="lower"
          bindscroll="scroll"
        >
          <view
            v-for="(item, index) in groupData"
            :key="index"
            class="scroll-view-item"
            :class="{'active': item.checked}"
            @tap="handleCheckArea(item,index)"
          >{{item.areaName}}</view>
        </scroll-view>
      </div>
      <div v-if="contentType==2">
        <scroll-view
          scroll-y
          style="height: 800rpx;background:#fff;"
          bindscrolltoupper="upper"
          bindscrolltolower="lower"
          bindscroll="scroll"
        >
          <view
            v-for="(item, index) in province"
            :key="index"
            class="scroll-view-item"
            :class="{'active': item.checked}"
            @tap="handleCheckProvince(item,index)"
          >{{item.provinceName}}</view>
        </scroll-view>
      </div>
      <div v-if="contentType==3">
        <scroll-view
          scroll-y
          style="height: 800rpx;background:#fff;"
          bindscrolltoupper="upper"
          bindscrolltolower="lower"
          bindscroll="scroll"
        >
          <view
            v-for="(item, index) in city"
            :key="index"
            class="scroll-view-item"
            :class="{'active': item.checked}"
            @tap="handleCheckCity(item,index)"
          >{{item.cityName}}</view>
        </scroll-view>
      </div>

      <div @tap="hideCheckTab" style="height:400rpx;opacity:0;"></div>
    </div>

    <div>
      <group-table :groupTable="groupTable"></group-table>
    </div>

    <loading-view :loadingStatus="loadingStatus"></loading-view>
  </section>
</template>

<script>
import GroupTable from '../salePerformance/groupTable'
import { mapGetters } from 'vuex'
import loadingView from '../../../components/loading/loading'
import { fenxiang } from "../../../utils";
export default {
  components: {
    loadingView,
    GroupTable
  },
  data() {
    return {
      scrollTop: 100,
      hideContent: false,
      loadingStatus: false,
      tabs: [
        {
          name: "大区",
          checkedName: '',
          type: "1",
          checked: false
        },
        {
          name: "省份",
          checkedName: '',
          type: "2",
          checked: false
        },
        {
          name: "城市",
          checkedName: '',
          type: "3",
          checked: false
        }
      ],
      dateTime: {}, // 时间
      groupData: [],
      province: [],
      city: [],
      checkCondtion: [],
      page: {
        pageNo: 1,
        pageSize: 20,
        hasMoreData: false,
      },
      contentlist: [],
      groupTable: {
        title: '',
        header: ['排行', '经销商', '成交数量', '占比', '详情'],
        body: []
      },
      contentType: null

    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    }),
  },
  onLoad(option) {
    this.dateTime = option
  },
  onUnload() {
    // 清空选中数据
    this.tabs.forEach(item => {
      item.checked = false
      item.checkedName = ''
    })
    this.checkCondtion = [];
    this.groupData.body = [];
    this.hideContent = false;
  },
  mounted() {
    this.province = [];
    this.city = [];
    this.groupData = [];
    this.setInit()
    this.getAllFoursInfo(true, 1) // 获取经销商
    if (this.userInfo.targetType === 'A') {
      this.groupData = [this.userInfo]
    } else {
      this.getAreaName() // 大区
    }
    // this.getAreaName() // 大区
    //  this.getProvince() // 省
    // this.getCitys() // 城市
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh() {
    this.page.pageNo = 1
    this.getAllFoursInfo(false, 1)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.page.hasMoreData) {
      this.page.pageNo += 1
      this.getAllFoursInfo(false, this.page.pageNo)
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  methods: {
    /**
     * 获取经销商
     * isSearch  true是加筛选条件 
     * pageNo  
     */
    getAllFoursInfo(isSearch, pageNo) {
      let { manuId, type } = this.userInfo
      let params = {
        manuId: manuId,
        type: type
      }
      this.$post('/fsi/getAllFoursInfo', Object.assign(params, this.getCondtions())).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.getPerformanceList(data, isSearch, pageNo);
        }
      })
    },
    // 集团 业绩排行榜 更多
    getPerformanceList(area, isSearch, pageNo) {
      isSearch ? this.page.pageNo = 1 : ''
      let params = {
        manuId: this.userInfo.manuId,
        dateType: 3, // 时间类型 1 本月 2本年 3自定义
        redisIds: area,
        startTime: this.dateTime.startTime,
        endTime: this.dateTime.endTime,
        pageNo: pageNo || this.page.pageNo,
        pageSize: this.page.pageSize
      };
      // this.loadingStatus = true
       wx.showLoading({
            title: '加载中...',
        })
      this.$post('/salesPerformance/getPerformanceListByRedisIds', params).then(res => {
        const { code, data } = res
        if (code === 0) {
          data.recordList.forEach(item => {
            item['percent'] = this.floatToPercent(item.percent)
          })

          if (data.totalCount < this.page.pageSize) {
            this.page.hasMoreData = false
          } else {
            this.page.hasMoreData = true
          }

          if (!isSearch) {
            let oldBody = this.groupTable.body
            this.groupTable.body = oldBody.concat(data.recordList)
          } else {
            this.groupTable.body = []
            this.groupTable.body = data.recordList
          }
        }
        wx.hideLoading();
        // this.loadingStatus = false
      })
    },
    handleTab(row, index) {
      this.setInit();
      this.contentType = index + 1;
      if (index === 0) {
        this.$set(this.tabs[index], 'checked', true)
        this.province = []
        this.city = []
        this.tabs[1].checkedName = ''
        this.tabs[2].checkedName = ''
        this.hideContent = true
      } else if (index == 1 && this.province.length > 0) {
        this.$set(this.tabs[1], 'checked', true)
        this.city = []
        this.hideContent = true
      }
      else if (index == 2 && this.city.length > 0) {
        this.$set(this.tabs[2], 'checked', true)
        this.hideContent = true
      }
    },
    handleCheckArea(row, index) {
      this.setInit();
      this.$set(this.groupData[index], 'checked', true)
      this.getCondtion(index, 'area')
      this.getProvince(row.areaId) // 省
      this.getAllFoursInfo(true, null)
    },
    handleCheckProvince(row, index) {
      this.setInit();
      this.$set(this.province[index], 'checked', true)
      this.getCondtion(index, 'prv')
      this.getCitys(row.provinceCode)// 市
      this.getAllFoursInfo(true, null)
    },
    handleCheckCity(row, index) {
      this.setInit();
      this.$set(this.city[index], 'checked', true)
      this.getCondtion(index, 'cy')
      this.getAllFoursInfo(true, null)
    },
    setInit() {
      this.hideContent = false
      this.tabs.forEach(item => {
        item.checked = false
      })
      this.groupData.forEach(item => {
        item['checked'] = false
      })
      this.province.forEach(item => {
        item['checked'] = false
      })
      this.city.forEach(item => {
        item['checked'] = false
      })
    },
    getCondtion(index, str) {
      if(this.province.length===0) {
        this.checkCondtion[1] = ''
      }
      if (this.city.length===0) {
        this.checkCondtion[2] = ''
      }
      switch (str) {
        case 'area':
          this.tabs[0].checkedName = this.groupData[index].areaName
          this.checkCondtion[0] = this.groupData[index]
          break;
        case 'prv':
          this.tabs[1].checkedName = this.province[index].provinceName
          this.checkCondtion[1] = this.province[index]
          break;
        case 'cy':
          this.tabs[2].checkedName = this.city[index].cityName
          this.checkCondtion[2] = this.city[index]
        default:
          break;
      }
    },
    hideCheckTab() {
      this.hideContent = false
    },
    getCondtions() {
      const arr = this.checkCondtion;
      let areaId = '', provinceCode = '', cityCode = '';
      if (JSON.stringify(arr[0]) != '{}' && typeof (arr[0]) != 'undefined') {
        areaId = arr[0].areaId
      }
      if (JSON.stringify(arr[1]) != '{}' && typeof (arr[1]) != 'undefined') {
        provinceCode = arr[1].provinceCode
      }
      if (JSON.stringify(arr[2]) != '{}' && typeof (arr[2]) != 'undefined') {
        cityCode = arr[2].cityCode
      }
      return {
        areaId: areaId || this.userInfo.areaId,
        provinceCode: provinceCode,
        cityCode: cityCode
      }
    },
    // 大区
    getAreaName() {
      this.$post("/ma/getAreaNameByManuId", { manuId: this.userInfo.manuId }).then(res => {
        const { code, data } = res
        if (code === 0) {
          let res = data.map(item => {
            return Object.assign(item, { 'checked': false })
          })

          this.groupData = res
        }
      })
    },
    // 省
    getProvince(areaId) {
      this.$post('/fsi/getProvinceInfoByAreaId', { areaId: areaId || '', manuId: this.userInfo.manuId }).then(res => {
        const { code, data } = res
        if (code === 0) {
          let res = data.map(item => {
            return Object.assign(item, { 'checked': false })
          })
          this.province = res
        }
      })
    },
    getCitys(code) {
      let area = '';
      const condtion = this.checkCondtion
      if (condtion[0]) {
        area = condtion[0].areaId
      }
      let params = {
        areaId: area,
        manuId: this.userInfo.manuId,
        provinceCode: code || ''
      }
      this.$post("/fsi/getAreaInfoByProvinceCode", params).then(res => {
        const { code, data } = res
        if (code === 0) {
          let res = data.map(item => {
            return Object.assign(item, { 'checked': false })
          })
          this.city = res
        }
      })
    },
    floatToPercent(num) {
      var percent = Number(num * 100).toFixed(2) + "%";
      return percent;
    }
  }

}
</script>

<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  position: relative;
  .navbar,
  .nav_wrap {
    padding: 0 40rpx;
  }
  .navbar {
    background-color: #f5f5f5;
  }
  .nav_header {
    display: flex;
    justify-content: space-between;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 26rpx;
    color: #555555;
    // padding: 28rpx 0 30rpx 0;
    box-sizing: border-box;
    .nav_item {
      width: 33.3333%;
      position: relative;
    }
    .active {
      color: #ff9302;
    }
    .square_up {
      position: absolute;
      top: 40rpx;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      // border-bottom: 22rpx solid #ff9302;
      border-bottom: 10rpx solid #aaaaaa;
    }
    .square_active_up {
      border-bottom: 10rpx solid #ff9302;
    }
    .square_down {
      position: absolute;
      top: 40rpx;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      // border-top: 22rpx solid #ff9302;
      border-top: 10rpx solid #aaaaaa;
    }
  }
  .nav_wrap {
    font-size: 30rpx;
    position: absolute;
    width: 90%;
    .scroll-view-item {
      color: #555555;
      margin-top: 54rpx;
    }
    .active {
      color: #ff9302;
    }
  }

  .table {
    background: #000000;
  }
}
</style>
