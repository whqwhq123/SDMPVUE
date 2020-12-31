<template>
  <div class="page" >
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
          <div class="card-content">
            <!--<div class="card-content" v-if="false">-->
            <div>
              <div class="card-title"><span>{{ service.serviceName }}</span></div>
              <div class="card-desc">{{ service.mpDescriptionA }}</div>
            </div>
            <div class="card-img">
              <img  :src="service.mpPic" background-size="cover" alt="">
            </div>
            <div class="card-action">
              <a hover-class="none"
                 :href="serviceHref[service.serviceCode]">
                <button >查看</button>
              </a>
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
    <loadingView :loadingStatus="loadingStatus"></loadingView>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import loadingView from '../../components/loading/loading'
  import {imageApi} from "../../http/url";
  export default {
    name: "index",
    data () {
      return {
        imageApi,
        loadingStatus: false,
        serviceCode: 'gtgl',
        scrollX: true,
        serviceCurrent: 0,
        serviceHref: {
          cxjd: '/pages/app/readCar/carChart/main',
          mp_bzl: '/pages/app/maintainRatio/main',
          mp_ldcx: '/pages/app/pastCar/main',
          mp_zscjj: '/pages/app/successPrice/main'
        },
      }
    },
    components: {
      loadingView
    },
    computed: {
      ...mapGetters({
        'serviceList': 'insight/serviceList',
        'loginInfo': 'userInfo'
      })
    },
    async mounted () {
      // this.loadingStatus = true;
      let res = await this.getServiceList({
        groupCode: this.serviceCode, // 分类code
        roleId: this.loginInfo.roleId // 	用户角色ID
      });
      // this.loadingStatus = false
    },
    methods: {
      ...mapActions({
        'getServiceList': 'insight/getServiceList'
      }),
      checkedService (e) {
        let current = e.mp.detail.current;
        let source = e.mp.detail.source;
        if (source !== 'touch') return;
        this.serviceCurrent = current;
      },
      clickService (index) {
        this.serviceCurrent = index;
      },
    }
  };
</script>

<style scoped lang="sass">
  .page
    display: flex
    flex: 1
    flex-flow: column
    img
      vertical-align: middle
    .card-container
      flex: 1
      height: 716rpx
      margin-top: 50rpx
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

</style>
