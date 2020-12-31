<template>
  <section>
    <div class="group" v-if="tableData.title ? true : false">
      <div class="sale_title">
        <span class="sale_sign"></span>
        <span class="sale_sign_text">{{tableData.title}}</span>
      </div>
      <div @tap="handleMore" class="group_more">
        <span >更多></span>
      </div>
    </div>
    <div class="sale_table">
      <view class="table">
        <view class="tr bg-w">
          <block v-for="(item, index) in tableData.header" :key="index">
            <view class="th">{{item}}</view>
          </block>
        </view>
        <block v-for="(item, index) in tableData.body" :key="index">
          <view class="tr" v-if="index % 2 == 0">
            <view
              class="td"
              :class="{'first': index ==0, 'second': index==1|| index ==2}"
            >{{index+1}}</view>
            <view class="td overflow">{{item.salesManName}}</view>
            <view class="td">{{item.leaveCount}}</view>
            <view class="td">{{item.proportion}}</view>
            <view class="td look_btn" @tap="lookDetail(item)">查看</view>
          </view>
          <view class="tr bg-g" wx:else>
            <view
              class="td"
              :class="{'first': index ==0, 'second': index==1 || index ==2}"
            >{{index+1}}</view>
            <view class="td overflow">{{item.salesManName}}</view>
            <view class="td">{{item.leaveCount}}</view>
            <view class="td">{{item.proportion}}</view>
            <view class="td look_btn" @tap="lookDetail(item)">查看</view>
          </view>
        </block>
      </view>

      <view v-if="tableData.body.length===0" class="not_data">
          暂无业绩数据！
        </view>
    </div>
  </section>
</template>

<script>

let jumpUrl = {
  'xsyj': '/pages/app/salePerformanceList/main',
  'lzyj': '/pages/app/stayFilesList/main'
}
export default {
  props: ['topTable'],
  data() {
    return {
      tableData: this.topTable
    }
  },
  mounted() {
  },
  methods: {
    handleMore() {
      let { start: startTime, end: endTime } = this.tableData.time;
      wx.navigateTo({
        url: jumpUrl[this.tableData.type]+ `?startTime=${startTime}&endTime=${endTime}`
      })

    },
    lookDetail(row) {
      wx.navigateTo({
        url: `/pages/app/stayFilesLookDetail/main?foursId=${row.foursId}`
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40rpx;
  padding: 0 32rpx;
  .sale_title {
     display: flex;
     align-items: center;
    .sale_sign {
      margin-right: 20rpx;
      width: 8rpx;
      height: 32rpx;
      background: rgba(255, 68, 63, 1);
      border-radius: 4rpx;
    }
    .sale_sign_text {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
    }
  }
  .group_more {
    color: #ff443f;
    font-size: 24rpx;
  }
}

.sale_table {
  padding: 0 40rpx;
  margin-top: 26rpx;
  .not_data {
      height:100rpx;width:100%;background:#F5F5F5;color:#222222;font-size:24rpx;text-align:center;line-height:100rpx;
    }
  .table {
    border: 0px solid darkgray;
    .tr {
      display: flex;
      width: 100%;
      justify-content: center;
      height: 100rpx;
      align-items: center;
      font-size: 24rpx;
      .first {
        color: #d75335;
      }
      .second {
        color: #eca51b;
      }
      .look_btn {
        color: #ff443f;
      }
    }
    .td {
      width: 20%;
      justify-content: center;
      text-align: center;
      color: #444444;
    }
    .bg-w {
      background: snow;
    }
    .bg-g {
      background: #f5f5f5;
    }
    .th {
      width: 20%;
      justify-content: center;
      background: #38394f;
      color: #fff;
      display: flex;
      height: 88rpx;
      align-items: center;
      font-size: 24rpx;
    }
    .overflow {
      width: 20%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-align: left;
    }
  }
}
</style>