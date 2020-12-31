<template>
  <div class="page_main">   
    <div class="app-authorization" v-if="wxAuthorization">
      <div class="app-authorization-box">
        <div class="app-authorization-body">绑定微信立即掌握客户动态</div>
        <div class="app-authorization-footer">
          <button class="cancel" @click="wxAuthorization = false">取消</button>
          <button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo" >一键绑定</button>
        </div>
      </div>
    </div>
    <div class="app-authorization" v-if="wxUpdataWX">
      <div class="app-authorization-box">
        <div class="app-authorization-body"> 您的手机号已绑定过其他微信号，请确认是否换绑新微信号 </div>
        <div class="app-authorization-footer">
          <button class="cancel" @click="wxUpdataWX = false">取消</button>
          <button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo" >确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fenxiang } from "../../../utils";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import {imageApi} from "../../../http/url";
  import http from '../../../http/api'
  export default {
    data () {
      return {
        imageApi,
        loadingStatus: false,
        checkedServiceClass: "dcgl",
        userInfo: null,
        status:false,

        // currentTab: 'tool',
        // toolList: {
        //   tool: '工具',
        //   client: '客户',
        //   industry: '行业',
        //   self: '我的',
        //   notice: '通知'
        // },
        wxAuthorization: false,
        wxAuthorizationInfo: {},
        wxUpdataWX: false
      };
    },

    components: {
    
    },
    computed: {
      ...mapGetters({
        'vi': 'vi',
        'loginInfo': 'userInfo'
      })
    },
    methods: {
      ...mapActions({
        'userLogin': 'userLogin'
      }),
      // ...mapMutations({
      //   'setCurrentTab': 'setCurrentTab'
      // }),
      switchServiceClass (className) {
        this.checkedServiceClass = className;
      },
      drawFun(){
        this.status=true
      },
      cancleMol(){
        this.status=false;
      },
      // 登录授权
      async wxLogin() {
        let that = this
        mpvue.login({
          success(res) {
           if (res.code) {
             that.getWxLoginInfo(res.code)
           }
          }
        })
      },
      async getWxLoginInfo(code) {
        let that = this
        let res = await http.post('weixin/getOpenId', { jsCode: code })
        if (res.code === 0) {
          this.wxAuthorizationInfo = Object.assign({}, res.data)
          if (this.loginInfo.openId) {
            // 已绑定微信
            // 绑定微信 与 当前微信账号是否一直
            if (this.wxAuthorizationInfo.openId === this.loginInfo.openId) {
              // 正常操作
            } else {
              // 不一致提示是否更换微信号
              that.wxUpdataWX = true
            }
          } else {
            // 未绑定微信
            that.wxAuthorization = true
          }
        }
      },
      async getUserInfo (e) {
        console.log(e)
        let { encryptedData, iv } = e.mp.detail
        this.wxAuthorizationInfo = Object.assign(this.wxAuthorizationInfo, {
          encryptedData,
          iv,
          type: 'unionId'
        })
        console.log(this.wxAuthorizationInfo)
        this.getUserInfoReq(this.wxAuthorizationInfo)
      },
      async getUserInfoReq (params) {
        let res = await http.post('weixin/decrypt', params)
        if (res.code === 0) {
          this.wxAuthorizationInfo.unionId = res.data.unionId
          this.wxAuthorization = false
          this.wxUpdataWX = false
          this.saveOpenIdAndUnionId()
        }
      },
      // 绑定关系
      async saveOpenIdAndUnionId () {
        let { unionId, openId } = this.wxAuthorizationInfo
        let res = await http.post('saas/saveUserSaleOpenInfo', {
          userId: this.loginInfo.userId,
          unionId,
          openId
        })
        if (res.code === 0) {
          this.wxAuthorization = false
          this.wxUpdataWX = false
          this.userLogin()
        }
      },

      // // 获取新通知数量
      // async getNewNoticeNum () {
      //   let res =  await this.getNewNoticeNumReq({
      //     foursId: this.loginInfo.foursId,
      //     salesman: this.loginInfo.userId
      //   })
      //   if (res.data !== 0) {
      //     this.noticeHasNew = true
      //   } else {
      //     this.noticeHasNew = false
      //   }
      // }
    },
    onShareAppMessage: function () {
      fenxiang.title = this.loginInfo.foursName
      return fenxiang
    },
    onLoad(op){
        this.wxLogin()
      console.log(op)
    },
    onHide(){
      // this.checkedServiceClass="dcgl";
      //  console.log('start1');
    },
    onShow() {
      let op = this.$root.$mp.page.options
      this.status = false
      if (op.activeIndex) {
        this.checkedServiceClass=op.activeIndex
      }
      if (op.page){
        this.switchServiceClass(op.page)
      }
      if(op.params){
        this.checkedServiceClass="dcgl";
      }
      this.wxLogin()
      // 如果默认：则进行登陆验证，和工具的验证。如果有初始值：则直接进行跳转
      // if (op.tab) {
      //   this.changeMenu(op.tab)
      // } else {
      //   this.wxLogin()
      //   this.changeMenu('tool')
      // }
      //  console.log('start2');
    }
  };
</script>
<style>
.page_main{
    position: fixed;
    top:0;
    left: 0;
    background-color: #767676;
}
  .right_scope{
    position: fixed;
    width:60%;
    height: 100%;
    background:rgba(0,0,0,0.8);
    z-index: 10;
    left: 42%;
  }
  /* .nav-item {
    width: 60rpx;
    height: 102rpx;
  } */
  .nav-item img {
    width: 60rpx;
    height: 102rpx;
  }
  .app-authorization{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    top:0;
    left:0
  }
  .app-authorization-box{
    width: 490rpx;
    padding: 48rpx;
    margin: 0 auto;
    background: #fff;
    border-radius: 16rpx;
  }
  .app-authorization-footer{
    display: flex;
    justify-content: space-around;
  }
  .app-authorization-footer button{
    width: 180rpx;
    line-height: 70rpx;
    height: 70rpx;
    font-size: 28rpx;
  }
  .app-authorization-body{
    font-size: 28rpx;
    color: #767676;
    line-height: 40rpx;
    margin-bottom: 24rpx;
  }
  .app-authorization-footer .confirm{
    background-color: #BB0A30;
    color: #fff;
    border:1px solid #BB0A30;
  }
  .app-authorization-footer .cancel{
    background-color: #FFF;
    border:1px solid #BB0A30;
    color:#BB0A30
  }
</style>

