<template>
  <div class="secret">
    <h1 class="secret-title">设置新密码</h1>
    <span class="secret-phone">+86 {{formatPhone}}</span>
    <div class="secret-code">
      <div class="secret-code-left">
        <div class="left-line"></div>
        <div class="left-input">
          <input class="input_text" type="number"  placeholder="输入验证码" placeholder-style="color:#aaa;font-size:13px;" v-model="messageCode">
        </div>
      </div>
      <div class="secret-code-right">
        <div class="right-line"></div>
        <div class="right-txt" @click="getMessage">{{messageTxt}}</div>
      </div>
    </div>
    <div class="secret-line"></div>
    <div class="secret-new">
      <div class="secret-new-line"></div>
      <div class="secret-new-input">
        <input class="input_text"  placeholder="设置新密码(6-12位数字或字母组合)" placeholder-style="color:#aaa;font-size:13px;" v-model="newPass">
      </div>
    </div>
    <div class="secret-line"></div>
    <div class="secret-submit" @click="submit" :style="{backgroundColor: vi.all.pageBtn.bgColor, color:  vi.all.pageBtn.color}">提交</div>
    <successInfo @cancel = 'cancel' :infoParam="infoParam" v-if="isShwoInfo"></successInfo>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import {saasApi,api,resetPassApi,getCodeApi} from '../../../http/url.js';
import successInfo from '../successInfo/index'
export default {
  components: {
    successInfo
  },
  data () {
    return {
      infoParam: '密码修改成功{{{time}}}s后返回登录界面',
      adviseTxt: '',
      isShwoInfo: false,
      newPass: '',
      messageCode: '',
      timer: null,
      num: -1
    }
  },
  computed: {
    ...mapGetters({
      'vi': 'vi',
      'userInfo': 'userInfo'
    }),
    formatPhone(){
      let phone=this.userInfo.phone
      return phone.slice(0,3)+'****'+phone.slice(-4)
    },
    messageTxt () {
      if (this.num > 0) {
        return `${this.num}s后重新获取`
      } else {
         return '获取验证码'
      }
    }
  },
  mounted(){
    this.messageCode=''
    this.newPass=''
    this.num=-1
  },
  methods: {
    ...mapActions({
        'checkoutPhone': 'login/checkoutPhone',
        'getCode': 'user/getCode',
        'checkMsCode':'user/checkMsCode',
        'resetPassword':'user/resetPassword',
    }),
    ...mapMutations({
        'resetStore': 'resetStore'
    }),

    async getMessage () {
      if (this.num > 0) {
        return false
      }
      // (1)判定是不是系统用户
      let res= await this.checkoutPhone({phone:this.userInfo.phone});
      // （2）如果是则进行验证码的发送
      if(res.code==0){
          let code= await this.getCode({url:getCodeApi+'code/sms',data:{mobile:this.userInfo.phone}})
          this.timeOut()
      }
    },
    async submit () {
      let password=this.newPass
      // (1)验证验证码的长度
      if(this.messageCode.length != 6){
        wx.showToast({
          title: '请核实验证码长度',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // (2)验证新密码的长度
      if(password.length<6 || password.length > 12){
        wx.showToast({
          title: '请输入6-12位新密码',
          icon: 'none',
          duration: 1000
        })
        return
      }

      let reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if(!reg.test(password)){
        wx.showToast({
          title: '输入格式必须由字母、数字组成',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // (3)验证验证码的时效性
      let chceckCode= await this.checkMsCode({url:saasApi+'atg/phoneSMSCheck',data:{phone:this.userInfo.phone,message:this.messageCode}})
      if (chceckCode.code == 1) {
        return
      }
      // (4)如果成功，则进行密码的修改
      let res= await this.resetPassword({url:saasApi+'manu/resetPasswordByJob',data:{
          loginPassword:password,
          userPhone:this.userInfo.phone
      }})
      if (res.code == 0) {
        this.timeOut();
      }
      this.isShwoInfo = true
    },
    cancel () {
      this.isShwoInfo = false
      this.resetStore();
      wx.redirectTo({
          url: '/pages/login/main'
      })
    },
    timeOut(){
      this.num=60;
      clearInterval(this.timer);
      this.timer=setInterval(()=>{
          this.num--;
          if(this.num==0){
              this.num = -1
              clearInterval(this.timer)
          }
      },1000)
    },
  }
}
</script>
<style lang="scss" scoped>
.secret {
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
  overflow: hidden;
}

.secret-title {
  margin-left: 60rpx;
  margin-top: 24rpx;
  font-size: 40rpx;
}

.secret-phone {
  display: block;
  margin-left: 60rpx;
  margin-top: 60rpx;
  font-size:32rpx;
  font-weight:400;
  color:rgba(179,179,179,1);
}

.secret-code {
  margin: 170rpx 44rpx 0 50rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.secret-code .secret-code-left {
  display: flex;
}
.secret-code .secret-code-left .left-line {
  margin-right: 50rpx;
  height: 60rpx;
  width: 4rpx;
  background: #BB0A30;
}
.input_text {
  font-size: 24rpx;
  color:#b3b3b3;
  font-weight: 400;
}
.secret-code .secret-code-right {
  display: flex;
}
.secret-code .secret-code-right .right-line {
  height: 40rpx;
  width: 2rpx;
  background: #707070;
}

.secret-code .secret-code-right .right-txt {
  margin-left: 20rpx;
  font-size:28rpx;
  font-weight:400;
  color:rgba(26,26,26,1);
}

.secret-new {
  display: flex;
  align-items: center;
  margin: 78rpx 44rpx 0 50rpx;
}
.secret-new .secret-new-line {
  margin-right: 50rpx;
  height: 60rpx;
  width: 4rpx;
  background: #BB0A30;
}
.secret-new .secret-new-input {
  flex: 1;
}
.secret-submit {
  position: fixed;
  left: 50%;
  bottom: 196rpx;
  transform: translateX(-50%);
  width:630rpx;
  height:84rpx;
  line-height: 84rpx;
  text-align: center;
  background:rgba(26,26,26,1);
  border-radius:40rpx;
  font-size:36rpx;
  color:rgba(255,255,255,1);
}

.secret-line {
  margin: 6rpx 44rpx 0 50rpx;
  height: 2rpx;
  background: #F2F2F2;
}
</style>
