<template>
  <scroll-view scroll-y style="height: 100%" @scrolltolower="bottomGetList">
    <ul class="notice-group" v-if="noticeList.length>0">
      <li class="notice-item" v-for="(notice, index) in noticeList" :key="index">
        <div class="notice-type">
          <div style="display: flex">
            <div class="notice-type-icon">
              <img v-if="imageApi" :src="imageApi + noticeTypeUrl[notice.codeType]" alt="">
            </div>
            <div class="notice-type-name">{{ notice.codeType }}</div>
          </div>
          <div class="notice-type-time">{{ notice.createTime }}</div>
        </div>
        <div class="notice-customer" v-if="notice.phone">
          <span class="notice-customer-type">客户</span>
          <span class="notice-customer-name" v-if="notice.customName">{{ notice.customName }}</span>
          <span class="notice-customer-phone" v-if="notice.phone">{{ notice.phone }}</span>
        </div>
        <div class="notice-info">
          <div :class="['notice-info-icon', colorList[notice.code]]" v-if="notice.codeType === '动向更新'"></div>
          <div class="notice-info-desc">{{ notice.message }}</div>
        </div>

        <div class="notice-info-action" v-if="notice.isSkip==1">
          <span @click="toDetail(notice)">查看详情>></span>
        </div>
      </li>
    </ul>
    <div class="img_scope" v-else>
      <img :src="imageApi+'/user_default.png'" alt="" v-if="imageApi">
      <span class="default_size">暂无通知信息</span>
    </div>
    <tab_bar :selected="1"></tab_bar>
  </scroll-view>

</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/22 15:28
   **/
  import {formatDay} from "../../../utils";
  import { imageApi } from "../../../http/url"
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import tab_bar from '../../../components/tabBar'
  export default {
    name: "notice",
    data() {
      return {
        imageApi,
        noticeTypeUrl: {
          '动向更新': '/jzxd/notice-dongxiang.png',
          '接待通知': '/jzxd/notice-jdtz.png',
          '接待提醒': '/jzxd/notice-jdtx.png'
        },
        noticeTypeName: {
          1: '动向更新',
          2: '接待通知',
          3: '接待提醒'
        },
        noticeToUrl: {
          '动向更新': '/pages/user/customerMsg/main',
          '接待通知': '/pages/user/main',
          '接待提醒': '/pages/user/customerMsg/main'
        },
        colorList:{
          '003':'bade_title',
          '004':'bade_title',
          '006':'bade_title',
          '007':'bade_title',
          '008':'bade_title',
          '005':'third_color',
          '009':'third_color',
          '010':'third_color',
          '011':'third_color',
          '001':'second_color',
          '002':'second_color',
          '012':'second_color'
        },
        pageNo: 1,
        pageSize: 5,
        total: 0,
        noticeList: [
        ]
      }
    },
    components: {
      tab_bar
    },
    computed: {
      ...mapGetters({
        'userInfo': 'userInfo'
      })
    },
    methods: {
      tuiche() {
       
      },
      ...mapActions({
        'getNoticeListReq': 'notice/getNoticeListReq'
      }),
      ...mapMutations({
        'setCurrentTab': 'setCurrentTab'
      }),
      bottomGetList () {
        if (this.noticeList.length < this.total) {
          this.pageNo++
          this.getNoticeList()
        }
      },
      async getNoticeList () {
        let res =  await this.getNoticeListReq({
          foursId: this.userInfo.foursId,
          salesman: this.userInfo.userId,
          pageNo: this.pageNo,
          pageSize:  this.pageSize
        })
        if (res.code === 0) {
          this.total = res.data.totalCount
          this.noticeList = this.noticeList.concat(res.data.recordList)
          this.noticeList=this.noticeList.map((v)=>{
              return {
                  ...v,
                  createTime:formatDay(v.time)
              }
          })
        }
      },
      toDetail (item) {
        let paramsStr = '';
        paramsStr = '?option='+ JSON.stringify({ phone: item.phone })
        mpvue.navigateTo({
          url: this.noticeToUrl[item.codeType] + paramsStr
        })
      }
    },
    mounted () {
      // this.getNoticeList()
    },
    onShow () {
      this.noticeList = []
      this.pageNo = 1
      this.total = 0
      this.getNoticeList()
    }
  }
</script>

<style scoped lang="scss">
  .notice-group{
    padding: 0 48rpx;
    padding-bottom: 136rpx;
  }
  .notice-item{
    padding-top: 42rpx;
    padding-bottom: 22rpx;
    border-bottom: 2rpx solid #F2F2F2;
  }
  .notice-type{
    display: flex;
    justify-content: space-between;
    line-height: 48rpx;
    .notice-type-icon{
      $imgSize: 48rpx;
      margin-right: 24rpx;
      img {
        display: block;
        width: $imgSize;
        height: $imgSize;
      }
    }
    .notice-type-name{
      font-size: 34rpx;
      color: #1A1A1A;
    }
    .notice-type-time{
      font-size: 24rpx;
      color: #B3B3B3;
    }
  }

  .notice-customer{
    color: #B3B3B3;
    font-size: 28rpx;
    line-height: 1;
    margin-top: 24rpx;
    .notice-customer-type{
      margin-right: 10rpx;
    }
    .notice-customer-name{
      margin-right: 10rpx;
    }
  }

  .notice-info{
    display: flex;
    margin-top: 20rpx;
    .notice-info-icon {
      $iconSize: 16rpx;
      width: $iconSize;
      height: $iconSize;
      margin-right: 14rpx;
      border-radius: $iconSize;
      margin-top: 14rpx;
    }
    .notice-info-desc {
      flex: 1;
      width: 0;
      font-size: 28rpx;
      color: #767676;
      line-height: 42rpx;
    }
  }

  .notice-info-action{
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #B3B3B3;
    text-align: right;
  }
  .bade_title{
    background-color: rgba(255,82,83,1);
  }
  .third_color{
    background: #FFA600;
  }
  .second_color{
    background: #999999;
  }
  .img_scope{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .default_size{
          font-size: 15px;
          color: #888;
      }
      img{
          width: 50.66666666666667vw;
          height: 21.58920539730135vh;
          margin-top: 6.746626686656672vh;
      }
  }
</style>
