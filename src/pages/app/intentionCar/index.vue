<template>
    <!--意愿车型-->
  <div class="page">
    <div>
      <div class="card-xfsp-content">
        <!-- <img class="card-content-bg" :src="imageApi + '/appBg1.png'" alt=""> -->
        <div class="card-content">
         {{ yxcx.carName }}
        </div>
        <div class="explain-btn" @click="showModal">
          <img :src="imageApi + '/explain.png'" alt="">
        </div>
      </div>
    </div>
    <div class="car-content">
      <div class="car-content-item">
        <div class="item-title">卖点</div>
        <div class="item-tag-group">
          <div class="item-tag-item" v-for="tag in yxcx.shopping" :key="tag">{{ tag }}</div>
        </div>
      </div>
      <div>
        <div class="item-title compete-car">关键因素</div>
        <div class="item-list-group">
          <div class="item-list-item" v-for="item in yxcx.jiedu" :key="item.name">{{ item.description }}</div>
        </div>
      </div>
      <div>
        <div class="item-title compete-car">竞品车型</div>
        <div class="item-car-group">
          <div class="item-car-item" v-for="(items, index) in yxcx.competive" :key="items.carName">
            <div class="item-car-name">{{ items.carName }}</div>
            <div class="item-tag-group" >
              <div class="item-tag-item" v-for="(sx, num) in items.disadvantage" :key="sx">{{ sx }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--弹框-->
    <div class="mask-layer" v-if="maskStatus" @click="hideModal"></div>
    <div class="drawer" v-show="maskStatus" :animation='animationData'>

      <div class="drawer-content">
        <div class="drawer-close" @click="hideModal">
          <img :src="imageApi + '/close3.png'" alt="">
        </div>
        <div class="drawer-title">
          <!-- <div class="explain-btn">
            <img :src="imageApi + '/explain.png'" alt="">
          </div> -->
          <span>意向车型说明</span>
        </div>
        <div class="drawer-desc">
          {{ yxcx.hide.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @data 2019/5/9 14:26
   **/
  import {fenxiang} from "../../../utils";
  import { mapGetters } from 'vuex'
  import loadingView from '../../../components/loading/loading'
  import {imageApi} from "../../../http/url";

  export default {
    name: "index",
    data () {
      return {
        imageApi,
        animationData: null,
        maskStatus: false,
        loadingStatus: false,
      }
    },
    computed: {
      ...mapGetters({
        'yxcx': 'insight/yxcx',
        'userInfo': 'userInfo'
      })
    },
    components: {
      loadingView
    },
    methods: {
      showModal (e){
        this.maskStatus = true
        var animation = wx.createAnimation({
          duration:1000,
          timingFunction:'linear'
        })
        animation.opacity(1).step();
        this.animationData = animation.export();
      },
      hideModal (e){
        var animation = wx.createAnimation({
          duration:300,
          timingFunction:'linear'
        });
        animation.opacity(0).step();
        this.animationData = animation.export();
        this.maskStatus=false
      }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.userInfo.foursName;
      return fenxiang
    }
  };
</script>

<style scoped lang="sass">
  .page
    background-color: #fff
    min-height: 100%
    padding-top: 1rpx
    .card-xfsp-content
      display: flex
      position: relative
      width: 670rpx
      margin: 0 auto
      margin-top: 30rpx
      box-sizing: border-box
      padding: 44rpx 82rpx 44rpx 40rpx
      background-color: #F7F7FA
      border-radius: 32rpx;
      // background: linear-gradient(90deg,rgba(227,203,147,1) 0%,rgba(195,156,90,1) 100%)
      .card-content-bg
        position: absolute
        z-index: 1
        left: 0
        top: 0
        width: 100%
        height: 100%
      .card-content
        position: relative
        z-index: 2
        font-size: 40rpx
        color: #1A1A1A
        font-weight: 500
        line-height: 56rpx;
      .division
        position: relative
        z-index: 2
        width: 3rpx
        background: linear-gradient(rgba(70, 59, 39, 0), rgba(70, 59, 39, 1), rgba(70, 59, 39, 1), rgba(70, 59, 39, 0))
      .explain-btn
        position: absolute
        z-index: 2
        top: 8rpx
        right: 12rpx
        line-height: 34rpx
        $size: 34rpx
        width: $size
        height: $size
        img
          vertical-align: middle
          width: 100%
          height: 100%
</style>
<style scoped lang="sass">
  .car-content
    width: 670rpx
    flex: 1
    background-color: #fff
    margin: 0 auto
    margin-top: 40rpx
    // padding: 0 40rpx
    padding-bottom: 40rpx
    box-sizing: border-box
    .car-content-item
      padding-top: 1rpx
    .item-title
      color: #1A1A1A
      font-weight: 500
      font-size: 32rpx
      margin-top: 8rpx
      margin-bottom: 16rpx
    .compete-car
      margin-top: 56rpx
    .item-tag-group
      overflow: hidden
      margin-right: -20rpx
      // margin-bottom: 56rpx
      .item-tag-item
        float: left
        font-size: 26rpx
        margin-top: 24rpx
        margin-right: 20rpx
        color: #767676
        padding: 8rpx 10rpx
        // background-color: #ececec
        border-radius: 4rpx
        border: 1px solid rgba(179,179,179,1)
    .item-car-name
      margin-top: 40rpx
      font-size: 26rpx
      line-height: 1
      color: #767676
      font-weight: 500
    .item-list-group
      .item-list-item
        position: relative
        font-size: 28rpx
        color: #767676
        line-height: 36rpx
        margin-top: 32rpx
        // padding-left: 26rpx
        // &::after
        //   position: absolute
        //   content: ''
        //   $size: 6rpx
        //   width: $size
        //   height: $size
        //   background-color: #ccc
        //   top: 50%
        //   margin-top: -3rpx
        //   left: 0
</style>
<style scoped lang="sass">
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
    opacity: 0
    position: fixed
    z-index: 9999
    width: 100%
    top: 50%
    margin-top: -118rpx
    .drawer-close
      position: absolute
      right: 12rpx
      top: 6rpx
      $closeSize: 30rpx
      width: $closeSize
      height: $closeSize
      img
        width: 100%
        height: 100%
    .drawer-content
      position: relative
      width: 490rpx
      height: 300rpx
      box-sizing: border-box
      padding: 60rpx 50rpx 60rpx 48rpx
      margin: 0 auto
      border-radius: 16rpx;
      background-color: #fff
      .explain-btn
        display: inline-block
        position: relative
        z-index: 2
        top: 0
        right: 0
        margin-right: 16rpx
        $size: 34rpx
        width: $size
        height: $size
        img
          vertical-align: middle
          width: 100%
          height: 100%
      .drawer-title
        color: #1A1A1A
        font-size: 32rpx
        vertical-align: middle
        font-weight: 500
      .drawer-desc
        margin-top: 36rpx
        font-size: 28rpx
        color: #767676
        line-height: 40rpx
</style>
