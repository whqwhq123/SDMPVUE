<template>
  <div >
    <ul class="salesGroup" v-if="listData.length > 0">
      <li class="title" v-for = "(item, index) in listData" :key="index">
        <div class="title-info">
          <div class="title-info-img">
            <img v-if="imageApi" :src="imageApi + '/header-man.png'" alt="">
          </div>
          <div class="title-info-admin">
            <p class="info-admin-name">
              <span>{{item.saleName|| '暂无姓名'}}</span>
              <span>{{item.salePhone}}</span>
            </p>
            <p class="info-admin-num">
              <span>总接待：{{item.allCount || 0}}位</span>
              <span>总成交：{{item.successCount || 0}}位</span>
            </p>
          </div>
        </div>
        <div class="title-enter" @click="checkProtrait(item)">客群画像</div>
      </li>
    </ul>
  </div>
</template>
<script>
import {fenxiang} from "../../../utils";
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {imageApi} from "../../../http/url";

export default {
  data () {
    return {
      imageApi,
      listData: [],
      userId: '',
      foursId: '',
      roleCode: '',
      pageNo: 1,
      pageSize: 10,
      listParams: {}
    }
  },
  onReachBottom () {
    this.loadMore()
  },
  onLoad (op) {
    this.pageNo = 1
    this.listData = []
    this.salesGroupInit()
    // wx.setNavigationBarTitle({
    //   title: op.serviceName
    // });
  },
  computed: {
  ...mapGetters({
    "userInfo": "userInfo",
    })
  },
  mounted() {
    // this.salesGroupInit()
  },
  onShareAppMessage: function () {
    fenxiang.title = this.userInfo.foursName;
    return fenxiang
  },
  methods: {
    ...mapActions({
      'getGroupsList': 'salesGroupModule/getGroupsList'
    }),
    async salesGroupInit () {
      wx.showLoading({
        title: '加载中...',
      })
      this.listParams.userId = this.userInfo.userId
      this.listParams.foursId = this.userInfo.foursId
      this.listParams.roleCode = this.userInfo.roleCode
      this.listParams.pageSize = this.pageSize
      this.listParams.pageNo = this.pageNo
      let res =  await this.getGroupsList(this.listParams);
      console.log('=======数据获取成功========')
      if (res.code == 0 ){
        console.log(res)
        console.log(res.data.recordList)
        this.listData = this.listData.concat(res.data.recordList);
        wx.hideLoading();
        this.pageNo++;
      }
    },
    loadMore () {
      this.salesGroupInit()
    },
    checkProtrait (item) {
      wx.navigateTo({
        url: '../../app/portrait/main?type=&serviceName=客群画像&userId=' + item.saleId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.salesGroup {
  height: 100%;
  width: 100%;
  padding: 40rpx;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
}
.salesGroup::-webkit-scrollbar {
  display: none;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40rpx;
  padding-bottom: 36rpx;
  border-bottom: 2rpx solid #ECECEC;
}
.title-info {
  display: flex;
  align-items: center;
}
.title-info-img {
  margin-right: 24rpx;
  width: 80rpx;
  height: 80rpx;
}
.title-info-img img {
  width: 100%;
  height: 100%;
}
.title-info-admin {
  display: flex;
  flex-direction: column;
}
.title-info-admin .info-admin-name {
  font-size:28rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(0,0,0,1);
  opacity:1;
  margin-bottom: 14rpx;
}
.title-info-admin .info-admin-name span:nth-of-type(2) {
  margin-left: 20rpx;
  color: #9B9B9B;
}
.title-info-admin .info-admin-num {
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(74,74,74,1);
  opacity:1;
}
.title-info-admin .info-admin-num span:nth-of-type(1) {
  margin-right: 48rpx;
}
.title-enter {
  width:144rpx;
  height:52rpx;
  line-height: 52rpx;
  border:2rpx solid rgba(245,82,78,1);
  opacity:1;
  border-radius:26rpx;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(255,68,63,1);
  text-align: center;
}
</style>
