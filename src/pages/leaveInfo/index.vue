<template>
    <div class="page">
      <div class="mask-layer" v-if="maskStatus" @click="hideModal"></div>
      <div class="drawer" v-if="maskStatus" :animation='animationData'>
        <div class="drawer-close" @click="hideModal">
          <img v-if="imageApi" :src="imageApi+'/close2.png'" alt="">
        </div>
        <div class="drawer-content">
          <div class="code-content">
            <div class="code-desc">
              {{ codeDesc }}
            </div>
            <div class="code-image">
              <img :src="drawerCode" alt="">
            </div>
          </div>
        </div>
      </div>
      <loadingView :loadingStatus="loadingStatus"></loadingView>
    </div>
</template>

<script>
  /**
   * @author yuhongru
   * @data 2019/5/8 22:01
   **/
  import { mapGetters, mapActions } from 'vuex'
  import loadingView from '../../components/loading/loading'
  import {imageApi} from "../../http/url";
  export default {
    name: "index",
    data () {
      return {
        imageApi,
        loadingStatus: false,
        serviceCode: 'lzgl',
        serviceCurrent: 0,
        maskStatus: false,
        drawerCode: null,
        codeDesc: ''
      }
    },
    props: {
      capitalIndex: {
        type: Number
      }
    },
    computed: {
      ...mapGetters({
        'userInfo': 'userInfo',
        'serviceList': 'insight/serviceList'
      })
    },
    components: {
      loadingView
    },
    async mounted () {
      this.loadingStatus = true;
      let res = await this.getServiceList({
        groupCode: this.serviceCode, // 分类code
        roleId: this.userInfo.roleId // 	用户角色ID
      });
      this.loadingStatus = false;
      // 通过父组件的index值，调起当前对象的应用
      let index = this.capitalIndex
      this.showModal(this.serviceList[index])
    },
    methods: {
      checkedService (e) {
        let current = e.mp.detail.current;
        let source = e.mp.detail.source;
        if (source !== 'touch') return;
        this.serviceCurrent = current;
      },
      clickService (index) {
        this.serviceCurrent = index;
      },
      async showModal (service) {
        this.maskStatus = true;
        try {
          let codeRes = await this.$post('saas/selectStrategyModelByCode',{
            code: service.serviceCode
          });
          if (codeRes.code === 0){
            this.codeDesc = codeRes.data.modelDetail
          } else {
            this.codeDesc = ''
          }
        } catch (e) {
          console.error(e)
        }
        let res = await this.getSmallCode({
          body: [this.userInfo.foursId, this.userInfo.userId].join(), // 门店ID， 登录人ID userInfo
          type: service.serviceCode // 1见面礼 2ar扫车
        });
        this.drawerCode = res
      },
      hideModal () {
        this.maskStatus = false
        this.$emit('closeCapital')
      },

      ...mapActions({
        'getServiceList': 'insight/getServiceList',
        'getSmallCode': 'leaveInfo/getSmallCode'
      })
    },
    async onShow() {
      this.loadingStatus = true;
      this.getServiceList({
        groupCode: this.serviceCode, // 分类code
        roleId: this.userInfo.roleId // 	用户角色ID
      });
      this.loadingStatus = false
    }
  };
</script>

<style scoped lang="sass">
  .page
    display: flex
    flex: 1
    flex-flow: column
  .card-container
    flex: 1
    margin-top: 50rpx
    height: 810rpx
    .card-item
      box-sizing: border-box
      opacity: 0.6
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
          font-weight: bold
          font-size: 48rpx
          color: #333
        .card-desc
          margin-top: 6rpx
          font-size: 24rpx
          color: #aaa
        .card-img
          text-align: center
          margin-top: 16rpx
          img
            height: 500rpx
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
    white-space: nowrap
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
            vertical-align: middle
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
      top: -2rpx
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
    opacity: 0.8
  .drawer
    position: fixed
    z-index: 9999
    width: 670rpx
    top: 180rpx
    left: 0
    right: 0
    margin: 0 auto
    background-color: #fff
    .drawer-close
      position: absolute
      left: 0
      right: 0
      margin: 0 auto
      bottom: -120rpx
      $closeSize: 80rpx
      width: $closeSize
      height: $closeSize
      img
        width: 100%
        height: 100%

    .code-content
      .code-desc
        width: 412rpx
        font-size: 48rpx
        line-height: 52rpx
        margin: 0 auto
        margin-top: 72rpx
        margin-bottom: 72rpx
        color: #555
        text-align: center
      .code-image
        $codeImageSize: 400rpx
        text-align: center
        margin-bottom: 80rpx
        img
          width: $codeImageSize
          height: $codeImageSize

    .code-share
      .code-share-channel
        display: flex
        height: 204rpx
        background-color: #F5F5F5
        .code-share-item
          $btnImgSize: 80rpx
          display: flex
          flex-flow: column
          justify-content: center
          align-items: center
          width: 50%
          text-align: center
          img
            vertical-align: middle
            width: $btnImgSize
            height: $btnImgSize
          .code-share-text
            font-size: 26rpx
            margin-top: 10rpx
            color: #333
</style>
