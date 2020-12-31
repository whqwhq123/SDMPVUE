<template>
  <div class="self">
    <div class="self-top"></div>
    <div class="self-area1">
      <div class="area1-left">
        <img v-if ="userInfo.headImg" :src="userInfo.headImg" alt="">
        <img v-else-if='!userInfo.headImg&&imageApi' :src="imageApi + '/default-person.png'" alt="">
      </div>
      <div class="area1-right">
        <div class="area1-right-dash">
          <img v-if="imageApi" :src="imageApi+'/self-icon0.png'" alt="">
        </div>
        <ul class="area1-right-box">
          <li>
            <span class="area1-right-pot1 area1-right-pot"><i></i></span>
            <span class="area1-right-title1">{{userInfo.userName}}</span>
          </li>
          <li>
            <span class="area1-right-pot2 area1-right-pot"><i></i></span>
            <span class="area1-right-title2">{{userInfo.roleName}}</span>
          </li>
          <li>
            <span class="area1-right-pot3 area1-right-pot"><i></i></span>
            <span class="area1-right-title3">{{userInfo.phone}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="self-area2">
      <ul class="self-area2-box">
        <li>
          <div @click="myShare">
              <span class="area2-box-img"><img v-if="imageApi" :src="imageApi+'/self-icon2.png'" alt=""></span>
            <p>
              <span class="slef-area2-title">我的名片</span>
              <span class="slef-area2-sub">可以分享给好友</span>
            </p>
          </div>
        </li>
        <li>
          <div @click="turnToSelfinfo">
            <span class="area2-box-img"><img v-if="imageApi" :src="imageApi+'/self-icon3.png'" alt=""></span>
            <p>
              <span class="slef-area2-title">个人信息</span>
            </p>
          </div>
        </li>
        <li class="area2-li-top">
          <div @click="turnToPassword">
            <span class="area2-box-img"><img v-if="imageApi" :src="imageApi+'/self-icon4.png'" alt=""></span>
            <p>
              <span class="slef-area2-title">修改密码</span>
            </p>
          </div>
        </li>
        <li class="area2-li-top" @click="turnToAdvise">
          <div>
              <span class="area2-box-img" ><img v-if="imageApi" :src="imageApi+'/self-icon5.png'" alt=""></span>
            <p>
              <span class="slef-area2-title">意见反馈</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="self-area3">
      <div class="self-area3-top" @click="turnToAbout">
        <p class="area3-title">
          <img v-if="imageApi" :src="imageApi+'/self-icon6.png'" alt="">
          <span class="area3-title-sub">关于我们</span>
        </p>
        <img class="area3-enter" v-if="imageApi" :src="imageApi+'/self-icon8.png'" alt="">
      </div>
      <div class="self-area3-middle"></div>
      <div class="self-area3-top" @click="signOut">
        <p class="area3-title">
          <img v-if="imageApi" :src="imageApi+'/self-icon7.png'" alt="">
          <span class="area3-title-sub">退出登录</span>
        </p>
        <img class="area3-enter" v-if="imageApi" :src="imageApi+'/self-icon8.png'" alt="">
      </div>
    </div>
    <!-- <tab_bar :selected="4"></tab_bar> -->
    <div class="but_user"></div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
import { mapMutations, mapGetters } from 'vuex';
import tab_bar from '../../../components/tabBar'
export default {
  data () {
    return {
      imageApi,
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    })
  },
  components: {
    tab_bar
  },
  mounted() {
    console.log(this.userInfo)
  },
  methods: {
    ...mapMutations({
        'resetStore': 'resetStore'
    }),
    myShare(){
       mpvue.navigateTo({
          url: '/pages/app/myShare/main'
      })
    },
    turnToSelfinfo () {
      mpvue.navigateTo({
          url: '/pages/admin/selfinfo/main'
      })
    },
    turnToPassword () {
      mpvue.navigateTo({
          url: '/pages/admin/password/main'
      })
    },
    turnToAdvise () {
      mpvue.navigateTo({
          url: '/pages/admin/advise/main'
      })
    },
    turnToAbout () {
      mpvue.navigateTo({
          url: '/pages/admin/about/main'
      })
    },
    signOut () {
      this.resetStore();
      wx.reLaunch({
          url: '/pages/login/main'
      });

    }
  },
}
</script>
<style scoped>
.self-top {
  height: 10rpx;
  width: 100%;
  background: #F2F2F2;
}
.self {
  height: 100%;
  background: #F2F2F2;
}
/* 区域一样式 */
.self-area1 {
  width: 100%;
  height: 408rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.self-area1 .area1-left {
  width: 354rpx;
  height: 354rpx;
  margin-right: 20rpx;
}
.self-area1 .area1-left img {
  width: 354rpx;
  height: 354rpx;
}

.area1-right {
  position: relative;
  flex: 1;
  height: 354rpx;
}
.area1-right .area1-right-box {
  position:absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
.area1-right .area1-right-box li {
  margin-bottom: 40rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.area1-right .area1-right-dash {
  position: absolute;
  top: 27rpx;
  left: 20rpx;
  width: 4rpx;
}
.area1-right .area1-right-dash img {
  width: 4rpx;
  height: 320rpx;
}
.area1-right .area1-right-box li .area1-right-pot {
  display: flex;
  justify-content: center;
  align-items: center;
}
.area1-right-pot1 {
  margin-right: 20rpx;
  display: block;
  width: 40rpx;
  height: 40rpx;
}
.area1-right-pot1 i{
  display: block;
  width: 14rpx;
  height: 14rpx;
  background: #1A1A1A;
  border-radius: 7rpx;
}
.area1-right-title1 {
  font-size:40rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.area1-right-pot2 {
  margin-right: 20rpx;
  display: block;
  width: 40rpx;
  height: 40rpx;
}
.area1-right-pot2 i{
  display: block;
  width: 8rpx;
  height: 8rpx;
  background: #BB0A30;
  border-radius: 4rpx;
}
.area1-right-title2 {
  font-size:30rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.area1-right-pot3 {
  margin-right: 20rpx;
  display: block;
  width: 40rpx;
  height: 40rpx;
}
.area1-right-pot3 i{
  display: block;
  width: 8rpx;
  height: 8rpx;
  background: #BB0A30;
  border-radius: 4rpx;
}
.area1-right-title3 {
  font-size:30rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(118,118,118,1);
}
/* 区域二样式 */
.self-area2 {
  margin-top: 20rpx;
}
.self-area2 .self-area2-box {
  display: flex;
  flex-wrap: wrap;
  padding: 40rpx 0;
  box-sizing: border-box;
  background: #fff;
}
.self-area2 .self-area2-box li {
  box-sizing: border-box;
  width: 50%;
  padding-left: 120rpx;
}
.self-area2 .self-area2-box li .area2-box-img img {
  width: 44rpx;
  height: 44rpx;
}
.self-area2 .self-area2-box li p {
  display: flex;
  flex-direction: column;
}
.self-area2 .self-area2-box li p .slef-area2-title {
  display: block;
  font-size:28rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
}
.self-area2 .self-area2-box li p .slef-area2-sub {
  display: block;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(118,118,118,1);
}
.area2-li-top {
  margin-top: 50rpx;
}
/* 区域三样式 */
.self-area3 {
  box-sizing: border-box;
  margin-top: 20rpx;
  padding: 0 70rpx;
  height: 228rpx;
  width: 100%;
  background: #fff;
}
.self-area3 .self-area3-top {
  height: 113rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 52rpx;
}
.self-area3 .self-area3-top p {
  display: flex;
  align-items: center;
}
.self-area3 .self-area3-top .area3-title img {
  width: 44rpx;
  height: 44rpx;
  margin-right: 34rpx;
}
.self-area3 .self-area3-top .area3-title span {
  font-size:26rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(26,26,26,1);
}
.self-area3 .self-area3-middle {
  width: 100%;
  height: 2rpx;
  background: #F2F2F2;
}
.self-area3 .self-area3-top .area3-enter {
  width: 16rpx;
  height: 28rpx;
}
.but_user{
  width: 100%;
  height: 140rpx;
  background-color: #fff;
  margin-top:22rpx; 
}
</style>


