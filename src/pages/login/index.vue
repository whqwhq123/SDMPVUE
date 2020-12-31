<template>
  <div class="login">
    <div class="login_logo">
      <img v-if="imageApi" :src="imageApi+'/logo.png'" alt="">
    </div>
    <div class="login_input">
      <div class="user_name">
        <img v-if="imageApi" :src="imageApi+'/phone_user.png'" alt="">
        <input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="color:#aaa;font-size:13px;"
               maxlength='11'>
      </div>
      <div class="password" v-if='flag'>
        <img v-if="imageApi" :src="imageApi+'/password.png'" alt="">
        <input type="password" v-model="password" placeholder="请输入密码" placeholder-style="color:#aaa;font-size:13px;">
        <img v-if="imageApi" :src="imageApi+'/eyes.png'" alt="" class="eyses" @click="openFun">
        <span class="forget_pass" @click="forgetFun">忘记密码</span>
      </div>
      <div class="password" v-if='!flag'>
        <img v-if="imageApi" :src="imageApi+'/password.png'" alt="">
        <input type="text" v-model="password" placeholder="请输入密码" placeholder-style="color:#aaa;font-size:13px;">
        <img v-if="imageApi" :src="imageApi+'/open_eye.png'" alt="" class="eyses" @click="openFun">
        <span class="forget_pass" @click="forgetFun">忘记密码</span>
      </div>

    </div>
    <button class="foot_submit" @click="submit">开启深度用户洞察</button>
  </div>
</template>

<script>
  import { fenxiang } from "../../utils"
  import { loginApi, api } from "../../http/url.js"
  import { mapActions, mapGetters, mapMutations } from "vuex"
  import { imageApi } from "../../http/url"
  import { addUserLog } from "./../../utils/pageBuryingPoint";
  import JsEncrypt from '../../../static/js/jsencrypt.js'

const Encrypt  = require('../../../static/js/jsencrypt.js');//路径看个人的放哪里哈

  export default {
    data() {
      return {
        imageApi,
        phone: "18700000003",
        password: "123456",
        flag: true,
        verCodeUnique: "",
        shopRoleList: ["CODE_STORE_ADMIN", "CODE_SALES_DIRECTOR", "CODE_MARKETING_DIRECTOR"],
        receiveCustomePhone:''
      }
    },
    computed: {
      ...mapGetters({
        "userInfo": "userInfo"
      })
    },
    methods: {
      openFun() {this.flag = !this.flag},
      forgetFun() {mpvue.navigateTo({ url: "../forget/main" })},
      ...mapActions({
        "checkoutPhone": "login/checkoutPhone",
        "login": "login/login",
        "userLogin": "userLogin",
        "getViModel": "getViModel",
        'getTitle':'user/getTitle'
      }),
      ...mapMutations({
        "resetStore": "resetStore",
        'setCustomerPhone':'user/setCustomerPhone',
        'setreception':'user/setreception',
        'setindexTitle':'user/setindexTitle'
      }),
      async submit() {
        if (!this.phone) {
          mpvue.showToast({ title: "请输入手机号", icon: "none", duration: 2000 })
          return
        } else if (!(/^1[3|4|6|5|7|8|9][0-9]\d{4,8}$/.test(this.phone))) {
          mpvue.showToast({ title: "手机号格式不正确", icon: "none", duration: 2000 })
          return
        }
        let res = await this.checkoutPhone({ phone: this.phone })
        if (res.code == 0) {
          if (!this.password) {
            mpvue.showToast({ title: "请输入密码", icon: "none", duration: 2000 })
            return
          }
          this.getLoginInfo()
        }
      },
      async getLoginInfo() {

      //     let cryptFirst = new Encrypt.JSEncrypt();

      //     cryptFirst.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHc7N6mO3hvcqZS4qY2S47rryDVg6EBNWUowrcausCSsykpfzSUmDffnlqOSZ07vb9sE5nI6r90NNvVY7A9pwOVUa/+oL+oeksm6rMN9vOthHYkgJ+/J7ufg698hzmRoTzwATJlv/FQjA7G6tJbeKhnFC4J3C3pLVgTiB87eErLwIDAQAB');

        let params={ loginName: this.phone, loginPassword:  this.password  }
        let loginRes = await this.login({ url: `${loginApi}logon/single/login`, data: params })
        if (!loginRes) return
        let loginStatus = await this.userLogin()
        if (!loginStatus) return
        this.getViInfo(loginStatus.manuId)
        if (this.userInfo.roleCode === "CODE_SALESMAN") {
          // mpvue.redirectTo({ url: "/pages/index/main?params=\"dcgl\"" })
          // mpvue.redirectTo({ url: "/pages/generalSale/index/main" })
          this.getTitles();
          if(this.receiveCustomePhone){
            // !this.receiveCustomePhone&&this.setCustomerPhone(this.userInfo.receiveCustomePhone)
            this.setCustomerPhone(this.receiveCustomePhone)
            mpvue.redirectTo({ url: "/pages/generalSale/receptionCustomer/main" })
          }else{
            mpvue.redirectTo({ url: "/pages/generalSale/index/main" })
          }

        }
         else if(this.userInfo.roleCode==='CODE_SHOWROOM_DIRECTOR'){
          mpvue.redirectTo({ url: "/pages/app/allocationCustomer/customer/main" })
        }
        else {
          mpvue.redirectTo({ url: "/pages/home/main" })
        }
      },
      async getViInfo(manuId) {
        await this.getViModel({ manuId })
      },
      isShopRole() {
        return this.shopRoleList.includes(this.userInfo.roleCode)
      },
      async getTitles(){
        let res=await this.getTitle({

        })
        if(res.code==0){
            this.setreception(res.data[1].firstTitles);
            this.setindexTitle(res.data[0].firstTitles);
        }
      },
    },
    onLoad(op) {
      this.resetStore()
      this.receiveCustomePhone=op.customePhone

    },
    onShareAppMessage: function() {
      return fenxiang
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
    background: #fff;
    padding-top: 14.2428vh;
    box-sizing: border-box;

    .login_logo {
      text-align: center;

      img {
        width: 520rpx;
        height: 160rpx;
      }
    }

    .login_input {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 10.644677661169414vh;

      img {
        width: 5.3333vw;
        height: 5.3333vw;
      }

      input {
        width: 630rpx;
        height: 92rpx;
        background: #F2F2F2;
        padding-left: 10.666666666666668vw;
        box-sizing: border-box;
        font-size: 15px;
        color: #999999;
        border-radius: 8rpx;
      }

      .user_name, .password {
        margin-bottom: 30rpx;
        position: relative;

        img {
          position: absolute;
          top: 26rpx;
          left: 16rpx;
        }

        .eyses {
          left: 90%;
          z-index: 10000
        }
      }

      .forget_pass {
        display: inline-block;
        color: #1A1A1A;
        font-size: 26rpx;
        float: right;
        margin-top: 1.199400299850075vh;
      }
    }

    .foot_submit {
      margin-top: 9.44527736131934vh;
      width: 630rpx;
      height: 94rpx;
      background: #BB0A30;
      border-radius: 25px;
      color: #fff;
      font-size: 36rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
