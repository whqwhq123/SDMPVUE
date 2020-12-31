<template>
  <div class="nav-group">
    <swiper
      class="service-class-group"
      display-multiple-items="5"
    >
      <block v-for="(item, index) in list" :key="item.pagePath">
        <swiper-item @click="changeMenu(index)">
            <span class="nav-item">
              <img  :src="selected === index ? item.selectedIconPath : item.iconPath" alt="">
            </span>
            <img class="nav-notice-tip" v-if="noticeHasNew && index == 1">
        </swiper-item>
      </block>
    </swiper>

  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/31 14:54
   **/
  import {imageApi} from "../../http/url"
  import { mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    name: "index",
    props: {
      selected: String
    },
    data () {
      return {
        noticeHasNew: false
      }
    },
    computed: {
      ...mapGetters({
        'loginInfo': 'userInfo',
        'vi': 'vi'
      }),
      list () {
        return  [{
          pagePath: "/pages/index/main",
          iconPath: this.vi.all.pageBtn.tab1 || imageApi + "/tab1.png",
          selectedIconPath: this.vi.all.pageBtn.tab1Active || imageApi + "/tab1-active.png",
        }, {
          pagePath: "/pages/app/notice/main",
          iconPath: this.vi.all.pageBtn.tab5 || imageApi + "/tab5.png",
          selectedIconPath: this.vi.all.pageBtn.tab5Active || imageApi + "/tab5-active.png",
          text: ""
        }, {
          pagePath: "/pages/user/main",
          iconPath: this.vi.all.pageBtn.tab2 || imageApi + "/tab2.png",
          selectedIconPath: this.vi.all.pageBtn.tab2Active || imageApi + "/tab2-active.png",
          text: ""
        }, {
          pagePath: "/pages/app/industry/main",
          iconPath: this.vi.all.pageBtn.tab3 || imageApi + "/tab3.png",
          selectedIconPath: this.vi.all.pageBtn.tab3Active || imageApi + "/tab3-active.png",
          text: ""
        }, {
          pagePath: "/pages/app/self/main",
          iconPath: this.vi.all.pageBtn.tab4 || imageApi + "/tab4.png",
          selectedIconPath: this.vi.all.pageBtn.tab4Active || imageApi + "/tab4-active.png",
          text: ""
        }]
      }
    },
    mounted () {
      this.getNewNoticeNum()
    },
    onShow(){
      this.getNewNoticeNum()
    },
    methods: {
      ...mapActions({
        'getNewNoticeNumReq': 'getNewNoticeNumReq'
      }),
      async changeMenu(index) {
        let res=await this.getNewNoticeNum();
        // if (index === 1) {
        //   this.noticeHasNew = false
        // }else{
        //   this.noticeHasNew = true
        // }
        // this.setCurrentTab(index)
        // let title = this.toolList[this.currentTab]
        mpvue.redirectTo({
          url: this.list[index].pagePath,
        })
        mpvue.setNavigationBarTitle({
          title: title
        })
        mpvue.setNavigationBarColor({
          backgroundColor: '#ffffff',
          frontColor: "#000000"
        })
      },
      // 获取新通知数量
      async getNewNoticeNum () {
        let res =  await this.getNewNoticeNumReq({
          foursId: this.loginInfo.foursId,
          salesman: this.loginInfo.userId
        })
        if (res.data > 0) {
          this.noticeHasNew = true
        } else {
          this.noticeHasNew = false
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .nav-group
    width: 100%
    background-color: #fff;
    border-top: 2rpx solid #E5E5E5
    height: 136rpx
    line-height: 136rpx
    position: fixed
    bottom: 0
    left: 0
    z-index: 10
    .menu-action
      position: absolute
      left: 40rpx
      bottom: 0
      img
        vertical-align: middle
        width: 40rpx
        height: 40rpx
    .service-class-group
      width: 100%
      height: 136rpx
      float: right
      text-align: center
      font-size: 30rpx
      .service-class-item
        &.active
          font-size: 36rpx
  .nav-item
    img
      width: 60rpx
      height: 102rpx
      vertical-align: middle
  .nav-notice-tip
    $size: 16rpx
    position: absolute
    top: 30rpx
    left: 82rpx
    width: $size
    height: $size
    background-color: #FF5253
    border-radius: $size
    z-index: 2
</style>
