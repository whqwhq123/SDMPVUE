<template>
    <div class="page">
      <!--客户操作-->
      <div class="user-group">
        <div class="user-action" v-if="!userInfo">
          <div class="user-add" @click="openDrawer">
            <img  class="icon-add" :src="imageApi+'/icon-add.png'" alt="" v-if="imageApi">
            <span>添加客户</span>
          </div>
        </div>
        <div class="user-info" v-else @click="openDrawer">
          <div class="user-header">
            <img  :src="imageApi+'/header-peo.png'" alt="">
          </div>
          <div class="user-name">{{ userInfo.name || '' }}</div>
          <div class="user-phone">{{ userInfo.phone }}</div>
          <div class="user-icon">
            <!--<img src="/static/images/user-right-icon.png" alt="">-->
            <div class="user-btn"><span>洞察新客户</span><img  :src="imageApi+'/user-right-icon.png'" alt=""></div>
          </div>
        </div>
      </div>
      <!--中间卡片-->
      <swiper
        class="card-container"
        previous-margin="20rpx"
        next-margin="20rpx"
        @change="checkedService"
        :current="serviceCurrent"
      >
        <block v-for="(service, index) in serviceList" :key="service.serviceCode">
          <swiper-item :class="[serviceCurrent === index ? 'active' : '', 'card-item']">
            <div class="card-content" v-if="!insightStatus || service.serviceCode === 'cxjd'">
            <!--<div class="card-content" v-if="false">-->
              <div>
                <div class="card-title"><span>{{ service.serviceName }}</span></div>
                <div class="card-desc">{{ service.mpDescriptionA }}</div>
              </div>
              <div class="card-img">
                <img :src="service.mpPic" background-size="cover" alt="">
              </div>
              <div class="card-action">
                <a hover-class="none"
                   v-if="service.serviceCode === 'cxjd' || service.serviceCode === 'mp_bzl' || service.serviceCode === 'mp_ldcx' || service.serviceCode === 'mp_zscjj'"
                   :href="serviceHref[service.serviceCode]">
                  <button >查看</button>
                </a>
                <button v-else @click="openDrawer">添加客户</button>
              </div>
            </div>

            <div class="card-cus-content" v-else>
              <div class="card-content">
                <img  class="card-bg" :src="imageApi+'/card-bg.png'" alt="">
                <div>
                  <div class="card-title card-zindex">{{ service.serviceName }}<span v-if="service.serviceCode === 'xghx' && xghx">-{{ xghx.level }}</span></div>
                  <div class="card-desc card-zindex">{{ service.mpDescriptionA }}</div>
                </div>
                <div class="card-service-content card-zindex" >
                  <!--消费水平内容-->
                  <div class="card-xfsp-content" v-if="service.serviceCode === 'xfsp'">
                    <div class="card-text-group">
                      <div class="card-text" v-for="(item, i) in xfsp.array" v-if="i < 5" >
                        <img  :src="imageApi+'/level_'+ (i + 1) +'.png'" v-if="xfsp.wealth >= item.min && xfsp.wealth < item.max">
                        <span :class="[xfsp.wealth >= item.min && xfsp.wealth < item.max ? 'active' : '']">{{ item.value }}</span>
                      </div>
                    </div>
                    <div class="card-img-line">
                      <img  :src="imageApi+'/line-1.png'" alt="">
                    </div>
                    <div class="card-num-group">
                      <div class="card-num first">{{ xfsp.min }}</div>
                      <div class="card-num" v-for="(item, i) in xfsp.array" v-if="i < xfsp.array.length - 1 && i < 5">{{ item.max }}</div>
                      <div class="card-num last">{{ xfsp.max }}</div>
                    </div>
                  </div>
                  <!--成交意愿内容-->
                  <div class="card-xfsp-content" v-if="service.serviceCode === 'cjyy'">
                    <div class="card-text-group">
                      <div class="card-text" v-for="(item, i) in cjyy.array" v-if="i < 4" >
                        <img  :src="imageApi+'/level_'+ (i + 2) +'.png'" alt="" v-if="cjyy.score >= item.min && cjyy.score < item.max">
                        <span :class="[cjyy.score >= item.min && cjyy.score < item.max ? 'active' : '']">{{ item.value }}</span>
                      </div>
                    </div>
                    <div class="card-img-line">
                      <img  :src="imageApi+'/line-2.png'" alt="">
                    </div>
                    <div class="card-num-group">
                      <div class="card-num first">{{ cjyy.min }}</div>
                      <div class="card-num" v-for="(item, i) in cjyy.array" v-if="i < cjyy.array.length - 1 && i < 4">{{ item.max }}</div>
                      <div class="card-num last">{{ cjyy.max }}</div>
                    </div>
                  </div>
                  <!--意向车型内容-->
                  <div class="card-yxcx-content" v-if="service.serviceCode === 'yxcx'">
                    <span>
                      {{ yxcx ? yxcx.carName : '' }}
                    </span>
                  </div>
                  <!--性格画像-->
                  <div class="card-xghx-content" v-if="service.serviceCode === 'xghx'">
                    <div class="card-tag tag-1">{{ xghx ? xghx.xghx[0] : '' }}</div>
                    <div class="card-tag tag-2">{{ xghx ? xghx.xghx[1] : '' }}</div>
                    <div class="card-tag tag-3">{{ xghx ? xghx.xghx[2] : '' }}</div>
                    <div class="card-tag tag-4"></div>
                    <div class="card-tag tag-5"></div>
                    <div class="card-tag tag-6"></div>
                    <div class="card-tag tag-7"></div>
                  </div>
                </div>
              </div>
              <div class="card-action card-zindex">
                <a hover-class="none" :href="serviceHref[service.serviceCode]"><button>解读详情</button></a>
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>
      <!--底部服务导航-->
      <scroll-view
        :scroll-x="scrollX"
        class="service-container"
        :current="serviceCurrent"
      >
        <!--icon-btm.png-->
        <block v-for="(service, index) in serviceList"  :key="service.serviceCode">
          <div :class="['service-item', index === serviceCurrent ? 'active' : '']" @click="clickService(index)">
            <div class="service-content">
              <div class="service-icon">
                <img :src="service.mpIcon" background-size="cover" alt="">
              </div>
              <div class="service-name">
                <span>{{ service.serviceName }}</span>
              </div>
            </div>
          </div>
        </block>
      </scroll-view>

      <div class="mask-layer" v-if="bottomDrawerStatus" @click="hideModal"></div>
      <!--<div class="drawer"  :animation='animationData'>-->
      <div class="drawer" v-if="bottomDrawerStatus">
        <!--<div class="drawer-close" @click="hideModal">-->
          <!--<img src="/static/images/icon-close.png" alt="">-->
        <!--</div>-->
        <!--用户查询-->
        <div class="add_data_scope">
          <img  :src="imageApi+'/close3.png'" alt="" class="close_icon" @click="hideModal">
          <input type="number" v-model="searchPhone" placeholder="请输入客户手机号" class="input_text" placeholder-style="color:#aaa;font-size:36rpx;" :focus='true' maxlength="11">
          <button class="submit" @click="searchData">洞察</button>
        </div>
        <!--<div class="add-cus-container">-->
          <!--<div class="search-input-group">-->
            <!--&lt;!&ndash;<img class="icon-search" src="/static/images/icon-search.png" alt="">&ndash;&gt;-->
            <!--<input v-model="searchPhone" type="number" placeholder="请输入客户手机号" maxlength='11' placeholder-style="color:#aaa;font-size:18px;">-->
            <!--&lt;!&ndash;<button class="search-button" @click="searchData">查询</button>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
          <!--<scroll-view-->
            <!--scroll-y-->
            <!--@scrolltolower="getList"-->
            <!--class="search-list-group"-->
            <!--v-if="searchStatus"-->
          <!--&gt;-->
            <!--<ul class="search-list-content">-->
              <!--<li class="search-list-item" v-for="user in phoneLikeCusList" :key="user.phone" @click="checkedCus(user)">-->
                <!--<div class="cus-header">-->
                  <!--<img src="/static/images/header-peo.png" alt="">-->
                  <!--<div :class="['cus-level', level[user.cusLevel]]">{{ level[user.cusLevel] || '' }}</div>-->
                <!--</div>-->
                <!--<div class="cus-info">-->
                  <!--<div class="cus-name">{{ user.name || '未知' }}</div>-->
                  <!--<div class="cus-phone">-->
                    <!--<span class="cus-phone-red">{{ user.showPhone[0] || '' }}</span>-->
                    <!--<span>{{ user.showPhone[1] || '' }}</span>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<div class="cus-time">-->
                    <!--{{ user.time }}-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</scroll-view>-->
          <!--<scroll-view  v-else-->
                        <!--class="search-list-group">-->
            <!--<div class="search-list-title">最近查询</div>-->
            <!--<ul class="search-list-content">-->
              <!--<li class="search-list-item" v-for="user in userList" :key="user.name" @click="checkedCus(user)">-->
                <!--<div class="cus-header">-->
                  <!--<img src="/static/images/header-peo.png" alt="">-->
                  <!--<div :class="['cus-level', level[user.cusLevel]]">{{ level[user.cusLevel] || '' }}</div>-->
                <!--</div>-->
                <!--<div class="cus-info">-->
                  <!--<div class="cus-name">{{ user.name || '未知' }}</div>-->
                  <!--<div class="cus-phone">{{ user.phone || ''}}</div>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<div class="cus-time">-->
                    <!--{{user.time}}-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</scroll-view>-->
      </div>
      <loadingView :loadingStatus="loadingStatus"></loadingView>
    </div>
</template>

<script>
  /**
   * @author yuhongru
   * @data 2019/5/8 16:18
   **/
  import { notice } from "../../utils/notice";
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import {formatDay} from "../../utils";
  import loadingView from '../../components/loading/loading'
  import {imageApi} from "../../http/url";
  export default {
    name: "index",
    data () {
      return {
        imageApi,
        formatDay,
        loadingStatus: false,
        pageNo: 0,
        isSizeInsufficient: 0,
        level: {
          1: 'H',
          2: 'A',
          3: 'B',
          4: 'C'
        },
        serviceCode: 'dcgl',
        scrollX: true,
        serviceCurrent: 0,
        serviceHref: {
          xfsp: '/pages/app/consumptionLevel/main',
          cjyy: '/pages/app/dealWish/main',
          yxcx: '/pages/app/intentionCar/main',
          xghx: '/pages/app/characterAnalysis/main',
          cxjd: '/pages/app/readCar/carChart/main',
          mp_bzl: '/pages/app/maintainRatio/main',
          mp_ldcx: '/pages/app/pastCar/main',
          mp_zscjj: '/pages/app/successPrice/main'
        },
        bottomDrawerStatus: false,
        animationData: null,
        searchPhone: '',
        searchStatus: false,
        timer: null
      }
    },
    watch: {
      searchPhone (newVal, oldVal) {
        if (!/^[0-9]/.test(newVal) && newVal !== '') {
          notice({ title: '请输入数字' });
          return
        }
        if (newVal.length > 6) {
          // this.pageNo = 0;
          // this.isSizeInsufficient = 0;
          // this.getList();
          if (newVal.length > 10) {
           if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(newVal)){
             notice({ title: '请输入正确的手机号' });
             return
           }
            this.pageNo = 0;
            // this.createUserFun()
          }
        } else {
          this.searchStatus = false
        }
      },
    },
    components: {
      loadingView
    },

    async mounted () {
      this.bottomDrawerStatus=false;
      this.loadingStatus = true;
      let res = await this.getServiceList({
        groupCode: this.serviceCode, // 分类code
        roleId: this.loginInfo.roleId // 	用户角色ID
      });
      this.loadingStatus = false;
      if (this.userInfo) {
        // this.insightCustomerFun()
      }
    },
    computed: {
      ...mapGetters({
        'phoneLikeCusList': 'insight/phoneLikeCusList',
        'serviceList': 'insight/serviceList',
        'userList': 'insight/userList',
        'loginInfo': 'userInfo',
        'xfsp': 'insight/xfsp',
        'xghx': 'insight/xghx',
        'cjyy': 'insight/cjyy',
        'yxcx': 'insight/yxcx',
        'userInfo': 'insight/checkedCusInfo',
        'insightStatus': 'insight/insightStatus'
      })
    },
    methods: {
      ...mapActions({
        'getServiceList': 'insight/getServiceList',
        'getInsightInfo': 'insight/getInsightInfo',
        'getSearchCusLog': 'insight/getSearchCusLog',
        'insightCustomer': 'insight/insightCustomer',
        'getPhoneLikeCusList': 'insight/getPhoneLikeCusList',
        'checkoutUser': 'user/checkoutUser',
        'createUser': 'user/createUser',
      }),
      ...mapMutations({
        'setCheckedCusInfo': 'insight/setCheckedCusInfo',
        'setInsightStatus': 'insight/setInsightStatus'
      }),
      searchData(){
        if (!/^[0-9]/.test(this.searchPhone) && this.searchPhone !== '') {
          notice({ title: '请输入数字' });
          return
        }
        if (this.searchPhone.length < 11) {
          notice({ title: '请输入正确的手机号' });
          return
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.searchPhone)){
          notice({ title: '手机号格式不正确' });
          return
        }
        this.createUserFun()
      },
      async createUserFun () {
        let check = await this.checkoutUser({
          foursId: this.loginInfo.foursId,
          customerPhone:this.searchPhone
        });
        if(check.data == null) {
          let res = await this.createUser({
              phone: this.searchPhone,
              brandId: this.loginInfo.manuId,
              foursId: this.loginInfo.foursId,
              name: '',
              cusLevel: '4',
              inCount: 1
            });
          if (res.code === 0) {
            //直接洞察
            this.checkedCus({
              phone: this.searchPhone
            });
          }
        } else {
          this.checkedCus({
            phone: this.searchPhone
          });
        }
        //关闭弹框
        this.hideModal();
      },
      async getList () {
        if (this.isSizeInsufficient === 0){
          this.pageNo += 1;
        }
        let res = await this.getPhoneLikeCusList({
          params: {
            foursId: this.loginInfo.foursId,
            phone: this.searchPhone,
            pageNo: this.pageNo,
            pageSize: 6,
          },
          status: this.isSizeInsufficient
        });
        if (res > 0) {
          this.searchStatus = true
        } else {
          this.searchStatus = false
        }
        this.isSizeInsufficient = res;
      },
      checkedService (e) {
        let current = e.mp.detail.current;
        let source = e.mp.detail.source;
        if (source !== 'touch') return;
        this.serviceCurrent = current;
      },
      clickService (index) {
        this.serviceCurrent = index;
      },
      openDrawer (e) {
        // let animation = wx.createAnimation({ duration:500, timingFunction:'linear'});
        // // 将该变量赋值给当前动画
        // // 先在y轴偏移，然后用step()完成一个动画
        // animation.translateY(-500).step();
        // this.animationData = animation.export();

        this.bottomDrawerStatus = true;
        this.getSearchCusLog({
          foursId: this.loginInfo.foursId,
          count: 4
        });
      },
      hideModal (e){
        // let animation = wx.createAnimation({ duration:300, timingFunction:'linear'});
        // animation.translateY(0).step();
        // this.animationData = animation.export();
        this.searchPhone = '';
        this.bottomDrawerStatus=false
      },
      async checkedCus (user) {
        this.setCheckedCusInfo(user);
        this.insightCustomerFun()
      },
      async insightCustomerFun () {
        try {
          this.loadingStatus = true;
          let res = await this.insightCustomer({
            phone: this.userInfo.phone,
            userId: this.loginInfo.userId,
            foursId: this.loginInfo.foursId,
          });
          if (res.code === 0) {
            this.getInsightInfos(res.data.uuid);
          } else {
            this.setInsightStatus(false);
            setTimeout(()=>{
              this.loadingStatus = false;
            },2000)
          }
        } catch (e) {
          this.loadingStatus = false;
          console.error(e);
        }
        this.hideModal()
      },
      async getInsightInfos (uuid) {
        let res = await this.getInsightInfo({
          phone: this.userInfo.phone,
          uuid: uuid,
          userId: this.loginInfo.userId,
          foursId: this.loginInfo.foursId
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
          },500)
        }
        if (res.code === 22) {
          clearTimeout(this.timer);
          this.loadingStatus = false;
          notice({ title: res.errMsg });
        }
      }
    },
    onLoad(op){
      if (op.option) {
        var userInfo=JSON.parse(op.option);
        this.checkedCus(userInfo);
      }
    },
    onHide() {
      this.bottomDrawerStatus = false;
      this.hideModal()
      this.loadingStatus = true;
    },
    async onShow() {
      this.bottomDrawerStatus=false;
      this.loadingStatus = true;
      let res = await this.getServiceList({
        groupCode: this.serviceCode, // 分类code
        roleId: this.loginInfo.roleId // 	用户角色ID
      });
      let that = this;
      setTimeout(() => {
        that.loadingStatus = false
      },500);
    }
  };
</script>

<style scoped lang="sass">
  .page
    height: 100%
    display: flex
    flex: 1
    flex-flow: column
    background: #222
  img
    vertical-align: middle
  .user-group
    $userGroupHeight: 160rpx
    height: $userGroupHeight
    padding: 0 40rpx
    .user-action
      .user-add
        $addIconSize: 36rpx
        line-height: $userGroupHeight
        img
          width: $addIconSize
          height: $addIconSize
        span
          font-size: 30rpx
          color: #ececec
    .user-info
      height: 100%
      display: flex
      color: #fff
      align-items: center
      position: relative
      .user-header
        img
          $headerSize: 72rpx
          width: $headerSize
          height: $headerSize
          border-radius: $headerSize
      .user-name
        font-size: 30rpx
        margin: 0 20rpx
      .user-phone
        font-size: 30rpx
      .user-icon
        position: absolute
        right: 0
        .user-btn
          color: #DABE83
          font-size: 30rpx
        img
          width: 40rpx
          height: 40rpx

  .card-container
    flex: 1
    height: 716rpx
    .card-item
      box-sizing: border-box
      opacity: 0.8
      .card-content
        position: relative
        display: flex
        flex-flow: column
        justify-content: space-around
        box-sizing: border-box
        background-color: #fff
        margin: 0 10rpx
        padding: 40rpx
        height: 100%
        transform: scale(1, 0.95)
      .card-title
        font-size: 48rpx
        color: #333
        font-weight: bold
      .card-desc
        font-size: 24rpx
        color: #aaa
      .card-img
        margin-top: 16rpx
        img
          height: 416rpx
          width: 570rpx
      .card-action
        $height: 80rpx
        text-align: center
        button
          width: 280rpx
          height: $height
          line-height: $height
          border: none
          background-color: #FF443F
          color: #fff
          border-radius: 50rpx
          margin-top: 14rpx
          font-size: 36rpx
    .card-item.active
      opacity: 1
      .card-content
        transform: scale(1)
  .card-container .card-item
    .card-cus-content
      height: 100%
      display: flex
      flex-flow: column
      transform: scale(1, 0.95)
      .card-content
        overflow: hidden
        position: relative
        transform: scale(1) !important
        background-color: #F2F3F5
        .card-bg
          position: absolute
          z-index: 1
          top: 0
          left: 0
          width: 100%
          height: 100%
        .card-zindex
          position: relative
          z-index: 2
      .card-action
        margin: 0 10rpx
        padding: 5vh 0
        background-color: #fff
        button
          margin-top: 0
      .card-service-content
        height: 388rpx
  .card-container .card-item.active
    .card-cus-content
      transform: scale(1)

  .service-container
    display: flex
    align-items: center
    white-space: nowrap
    /*height: 240rpx*/
    .service-item
      position: relative
      display: inline-block
      width: 20%
      opacity: 0.6
      .service-content
        padding-top: 3.5vh
        padding-bottom: 3.5vh
        .service-icon
          $iconHeight: 124rpx
          height: $iconHeight
          line-height: $iconHeight
          text-align: center
          $imgSize: 72rpx
          img
            width: $imgSize
            height: $imgSize

        .service-name
          font-size: 30rpx
          color: #fff
          text-align: center
    .service-item:after
      display: block
      content: ''
      position: absolute
      top: -4rpx
      width: 0
      height: 0
      left: 50%
      opacity: 0
      margin-left: -20rpx
      border: 20rpx solid #fff
      border-left: 20rpx solid transparent
      border-right: 20rpx solid transparent
      border-bottom: 20rpx solid transparent
      transition: opacity 0.5s
    .service-item.active
      opacity: 1
      &:after
        opacity: 1
      .service-icon
        $imgActSize: 96rpx
        img
          width: $imgActSize
          height: $imgActSize


  .mask-layer
    position: fixed
    z-index: 999
    width: 100%
    height: 100%
    top: 0
    left: 0
    background-color: #000
    opacity: 0
  .drawer
    width: 100vw
    height: 100vh
    overflow-x: hidden
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,.5)
    display: flex
    // justify-content: center;
    align-items: center
    flex-direction: column
    z-index: 10000
    .drawer-close
      position: absolute
      right: 20rpx
      top: -60rpx
      $closeSize: 30rpx
      width: $closeSize
      height: $closeSize
      img
        width: 100%
        height: 100%
  .add-cus-container
    max-height: 100%
    height: 100%
    overflow: hidden
    padding-top: 40rpx
    background-color: #fff
    .search-input-group
      $height: 136rpx
      position: relative
      padding: 40rpx 0
      box-sizing: border-box
      height: $height
      line-height: $height
      border-bottom: 2rpx solid #666
      .search-button
        width: 160rpx
        height: 68rpx
        background-color: #FF443F
        font-size: 36rpx
        color: #fff
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        top: 26rpx
        right: 41rpx
        z-index: 100
      input
        width: 60%
        font-size: 52rpx
        padding-left: 45rpx
        /*color: #FF443F */
        /*text-shadow: 0px 0px 0px #ccc */
        /*-webkit-text-fill-color: #222*/
      .icon-search
        position: absolute
        left: 14rpx
        top: 50%
        margin-top: -20rpx
        $iconSize: 40rpx
        width: $iconSize
        height: $iconSize

  .search-list-group
    box-sizing: border-box
    padding: 0 40rpx
    height: calc(100% - 120px)
    padding-top: 72rpx
    .search-list-title
      font-size: 30rpx
      line-height: 48rpx
      color: #888
      border-bottom: 2rpx solid #ECECEC

  .search-list-item
    display: flex
    border-bottom: 2rpx solid #ececec
    .cus-header
      position: relative
      margin-top: 40rpx
      margin-right: 24rpx
      height: 92rpx
      img
        $imgSize: 72rpx
        width: $imgSize
        height: $imgSize
      .cus-level
        $tagSize: 30rpx
        position: absolute
        top: 40rpx
        left: 50rpx
        width: $tagSize
        height: $tagSize
        line-height: $tagSize
        font-size: 20rpx
        text-align: center
        border-radius: 8rpx
        color: #fff
        &.H
          background-color: #FF5253
        &.A
          background-color: #ECA51B
        &.C
          background-color: #B0C939
        &.B
          background-color: #FFE131
    .cus-info
      flex: 1
      padding-top: 40rpx
      padding-bottom: 24rpx
      .cus-name
        font-size: 24rpx
        color: #888
      .cus-phone
        font-size: 30rpx
        color: #555
        .cus-phone-red
          color: #ff443f
    .cus-time
      width: 120rpx
      color: #ccc
      text-align: right
      font-size: 24rpx
      line-height: 132rpx


  /*卡片应用详情*/
  .card-service-content
    display: flex
    justify-content: center
    align-items: center
  .card-xfsp-content
    width: 100%
    .card-text-group
      display: flex
      .card-text
        position: relative
        flex: 1
        font-size: 28rpx
        color: #555555
        height: 60rpx
        line-height: 50rpx
        text-align: center
        margin-bottom: 16rpx
        img
          position: absolute
          width: 92rpx
          height: 60rpx
          left: 0
          right: 0
          margin: 0 auto
          z-index: 1
        span
          position: relative
          z-index: 10
          &.active
            font-size: 30rpx
            font-weight: bold
    .card-img-line
      img
        display: block
        width: 100%
        height: 32rpx
    .card-num-group
      display: flex
      margin-top: 12rpx
      line-height: 30rpx
      .card-num
        flex: 1
        font-size: 26rpx
        color: #C7C7C7
        text-align: center
        &.first
          flex: 0.5
          text-align: left
        &.last
          flex: 0.5
          text-align: right
    .xfsp-value-content
      width: 150rpx
      margin-right: 40rpx
      .xfsp-value
        text-align: center
        font-size: 92rpx
        line-height: 1
        font-weight: bold
      .xfsp-tag
        width: 110rpx
        margin: 0 auto
        text-align: center
        font-size: 26rpx
        padding: 0 10rpx
        line-height: 32rpx
        border-radius: 17rpx
        background-color: #DABE83
  .xfsp-text-content
    font-size: 30rpx
    line-height: 54rpx
    color: #333
    padding-left: 40rpx
    span
      font-weight: bold
  .card-cjyy-content
    display: flex
    width: 100%
    .cjyy-value-content
      width: 150rpx
      margin-right: 40rpx
      .cjyy-value
        text-align: center
        span
          font-size: 48rpx
        .num
          font-weight: bold
          font-size: 88rpx
      .cjyy-progress
        width: 150rpx
        border-radius: 8rpx
        overflow: hidden
  .division
    width: 3rpx
    background: linear-gradient(rgba(70, 59, 39, 0), rgba(70, 59, 39, 1), rgba(70, 59, 39, 1), rgba(70, 59, 39, 0))

  .cjyy-text-content
    display: flex
    flex-flow: column
    justify-content: center
    font-size: 30rpx
    line-height: 54rpx
    color: #333
    padding-left: 40rpx
  .card-yxcx-content

    font-size: 48rpx
    color: #333
    font-weight: bold
  .card-xghx-content
    position: relative
    width: 100%
    height: 100%

    .card-tag
      border-radius: 100%
      text-align: center
      position: absolute
      font-size: 30rpx
      display: flex
      flex-flow: column
      justify-content: center
      align-items: center
      background-color: rgba(227,177,71,0.5)
    .tag-1
      $size: 172rpx
      width: $size
      height: $size
      left: 0
      top: 80rpx
    .tag-2
      $size: 260rpx
      width: $size
      height: $size
      font-size: 48rpx
      left: 144rpx
      top: 54rpx
    .tag-3
      $size: 172rpx
      width: $size
      height: $size
      left: 392rpx
      top: 80rpx
    .tag-4
      $size: 32rpx
      width: $size
      height: $size
      left: 406rpx
      top: 24rpx
    .tag-5
      $size: 60rpx
      width: $size
      height: $size
      left: 392rpx
      top: 80rpx
    .tag-6
      $size: 60rpx
      width: $size
      height: $size
      left: -54rpx
      top: 240rpx
    .tag-7
      $size: 40rpx
      width: $size
      height: $size
      left: 564rpx
      top: 220rpx
</style>
<style scoped lang="scss">
  .add_data_scope{
      width:610rpx;
      height: 414rpx;
      border-radius:8rpx;
      margin-top: 280rpx;
      padding: 0 5.3333vw;
      background: #fff;
      position: relative;
      .close_icon{
          width: 35rpx;
          height: 35rpx;
          position: absolute;
          right: 40rpx;
          top: 40rpx;
      }
      .input_text{
        border-bottom:1px solid rgba(170,170,170,1);
        text-align: center;
        margin-top: 150rpx;
        padding-bottom: 40rpx;
        font-size: 36rpx;
      }
      .submit{
          width:320rpx;
          height:68rpx;
          background:rgba(255,68,63,1);
          opacity:1;
          border-radius:50rpx;
          margin-top: 56rpx;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  }
</style>
