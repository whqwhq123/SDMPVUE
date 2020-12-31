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
     <top-table :topTable="topTable"></top-table>
    </div>
    <loading-view :loadingStatus="loadingStatus"></loading-view>
  </section>
</template>

<script>
import TopTable from '../stayFiles/table'
import { mapGetters } from 'vuex'
import loadingView from '../../../components/loading/loading'
import {fenxiang} from "../../../utils";
export default {
  components: {
    loadingView,
    TopTable
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
      groupData: [],
      province: [],
      city: [],
      checkCondtion: [], // 大区 省 城市 选中的数据
      topTable: {
        title: '',
        header: ['排行', '经销商', '留资数量', '占比', '详情'],
        body: []
      },
      dateTime: {},
      contentType:null
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    }),
    condition() {
      let { userId, roleCode,targetType } = this.userInfo
      let foursId = ''
      if(targetType ==='A' || targetType==='M') { // 集团

      } else {
         foursId =this.userInfo.foursId
      }
      return {
        userId: userId,
        roleCode: roleCode,
        foursId: foursId,
      }
    },
    // contentType() {
    //   let res = this.tabs.filter(item => {
    //     return item.checked === true
    //   })
    //   if (res.length > 0) {
    //     return res[0].type
    //   } else {
    //     return ''
    //   }
    // }
  },
  onUnload() {
    this.tabs.forEach(item=>{
      item.checked = false
      item.checkedName = ''
    })
    this.checkCondtion = [];
    this.groupData.body = [];
    this.hideContent = false;
  },
  mounted(){
    this.province=[];
    this.city=[];
    this.groupData=[];
    this.setInit();
    this.getAllFoursInfo() // 获取经销商
    if(this.userInfo.targetType==='A') {
      this.groupData = [this.userInfo]
    } else {
      this.getAreaName() // 大区
    }
    
    // this.getProvince() // 省
    // this.getCitys() // 城市
  },
  onShow(){
  },
  onHide(){
  },
  onLoad(option) {
    this.dateTime = option
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  methods: {
    // 获取经销商
    getAllFoursInfo(){
      let {manuId,  type} = this.userInfo
      let params = {
        manuId :manuId,
        type: type
      }
      
      this.$post('/fsi/getAllFoursInfo', Object.assign(params, this.getCondtions())).then(res=>{
        const {code, data} = res
        if(code===0) {
          this.stayFileTable(data);
        }
      })
    },
    stayFileTable(area){
      let params = Object.assign(this.condition, {roleKey: area,
      startTime: this.dateTime.startTime,
      endTime: this.dateTime.endTime});
      // this.loadingStatus = true
      wx.showLoading({
            title: '加载中...',
        })
      this.$post('/liuzi/getLeaveInformationData', params).then(res=>{
        const {code, data} = res
        if(code===0) {
           let totalLeavelCount = data.totalLeavelCount
          data.leaveInfos.forEach(item => {
            item['proportion'] = this.getPercent(item.leaveCount, totalLeavelCount)
          })
          this.topTable.body = data.leaveInfos
        }
        // this.loadingStatus = false
        wx.hideLoading();
      })
    },
    handleTab(row, index) {
      this.setInit();
      this.contentType=index+1;
      if(index===0) {
        this.$set(this.tabs[index], 'checked', true)
         this.province = []
         this.city = []
         this.tabs[1].checkedName = ''
         this.tabs[2].checkedName = ''
         this.hideContent = true
      }else if(index==1&&this.province.length>0){
         this.$set(this.tabs[1], 'checked', true)
          this.city = []
          this.hideContent = true
      }
      else if(index==2&&this.city.length>0){
         this.$set(this.tabs[2], 'checked', true)
         this.hideContent = true
      }
      
    },
    // 大区
    handleCheckArea(row, index) {
      this.setInit()
      this.$set(this.groupData[index], 'checked', true)
      this.getCondtion(index, 'area')
      this.getProvince(row.areaId) // 省
      this.getAllFoursInfo()
    },
    // 省
    handleCheckProvince(row, index) {
      this.setInit()
      this.$set(this.province[index], 'checked', true)
      this.getCondtion(index, 'prv')
      this.getCitys(row.provinceCode)// 市
      this.getAllFoursInfo()
    },
    handleCheckCity(row, index) {
      this.setInit()
      this.$set(this.city[index], 'checked', true)
      this.getCondtion(index, 'cy')
      this.getAllFoursInfo()
    },
    setInit(){
      this.hideContent = false
      this.tabs.forEach(item => {
        item.checked = false
      })
      this.city.forEach(item => {
        item['checked'] = false
      })
      this.province.forEach(item => {
        item['checked'] = false
      })
      this.groupData.forEach(item => {
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
     hideCheckTab(){
      this.hideContent = false
    },
     // 大区
    getAreaName(){
      this.$post("/ma/getAreaNameByManuId", {manuId: this.userInfo.manuId}).then(res=>{
        const {code, data} = res
        if(code===0) {
          let res = data.map(item=>{
           return Object.assign(item, {'checked': false })
          })

          this.groupData = res
        }
      })
    },
    // 省
    getProvince(areaId){
      this.$post('/fsi/getProvinceInfoByAreaId', {areaId: areaId|| '', manuId: this.userInfo.manuId}).then(res=>{
       const {code, data} = res
       if(code ===0) {
         let res = data.map(item=>{
           return Object.assign(item, {'checked': false})
         })
         this.province = res
       }
      })
    },
    getCitys(code){
      let area = '';
      const condtion = this.checkCondtion
      if(condtion[0]) {
          area = condtion[0].areaId
      }
      let params = {
        areaId: area,
        manuId: this.userInfo.manuId,
        provinceCode: code || ''
      }
      this.$post("/fsi/getAreaInfoByProvinceCode", params).then(res=>{
        const {code, data} = res
        if(code===0) {
          let res= data.map(item=>{
            return Object.assign(item, {'checked': false})
          })
          this.city = res
        }
      })
    },
    getCondtions(){
      const  arr = this.checkCondtion;
      let areaId = '', provinceCode='',cityCode = '';
      if(JSON.stringify(arr[0])!= '{}' && typeof(arr[0]) !='undefined') {
        areaId = arr[0].areaId
      }
      if(JSON.stringify(arr[1])!= '{}' && typeof(arr[1]) !='undefined') {
         provinceCode = arr[1].provinceCode
      }
      if(JSON.stringify(arr[2])!= '{}' && typeof(arr[2]) !='undefined') {
        cityCode = arr[2].cityCode
      }
      return {
        areaId: areaId || this.userInfo.areaId,
        provinceCode: provinceCode,
        cityCode: cityCode
      }
    },
    //  求百分比
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "--";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
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
