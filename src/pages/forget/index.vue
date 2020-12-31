<template>
    <div class="forget_pass">
        <div v-if='flag'>
            <span class="label">请输入手机号</span>
            <div class="pass_put">
                <span class="phone_num">手机号</span>
                <input type="number" v-model="phoneNum" maxlength="11"/>
            </div>
            <button class="foot_submit" @click="submit">下一步</button>
        </div>
        <div v-if='!flag&&!status'>
            <span class="label">请输入验证码</span>
            <div class="user_phone_info">验证码已发送至手机：{{phoneNum}}</div>
            <div class="check_num">
                <input type="number" :focus='true'  v-model="first" maxlength="1"/>
                <input type="number" :focus='first' v-model="second" maxlength="1"/>
                <input type="number" :focus='second' v-model="third" maxlength="1"/>
                <input type="number" :focus='third' v-model="fouth" maxlength="1"/>
                <input type="number" :focus='fouth' v-model="five" maxlength="1"/>
                <input type="number" :focus='five' v-model="six" maxlength="1"/>
            </div>
            <span class="check_num_ifon" @click="sendMsg" >{{num}}<span v-if='isSecond'>秒</span></span>
        </div>
        <div v-if="status">
            <span class="label">重置密码</span>
            <div class="pass_scope">
                <div class="oldPass" v-if="openOld">
                    <span class="phone_num">密码</span>
                    <input type="password" v-model="oldPass" maxlength="18"/>
                    <img v-if="imageApi" :src="imageApi+'/eyes.png'" alt="" @click="changeStatus">
                </div>
                <div class="oldPass" v-else>
                     <span class="phone_num">密码</span>
                    <input type="text" v-model="oldPass" maxlength="18"/>
                    <img v-if="imageApi" :src="imageApi+'/open_eye.png'" alt="" @click="changeStatus">
                </div>

            </div>
            <div class="">
                <div class="oldPass" v-if="openNew">
                    <span class="phone_num">确认密码</span>
                    <input type="password" v-model="newPass" maxlength="18"/>
                    <img v-if="imageApi" :src="imageApi+'/eyes.png'" alt="" @click="changeNew">
                </div>
                <div class="oldPass" v-else>
                     <span class="phone_num">确认密码</span>
                    <input type="text" v-model="newPass" maxlength="18"/>
                    <img v-if="imageApi" :src="imageApi+'/open_eye.png'" alt="" @click="changeNew">
                </div>
            </div>
            <button class="foot_submit" @click="editPass">确认</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {saasApi,api,resetPassApi,getCodeApi} from '../../http/url.js';
import {fenxiang} from "../../utils";
import {imageApi} from "../../http/url";
    export default {
        data(){
            return{
                imageApi,
                phoneNum:'',
                flag:true,
                first:'',
                second:'',
                third:'',
                fouth:'',
                five:'',
                six:'',
                timer:null,
                num:60,
                oldPass:'',
                newPass:'',
                openOld:true,
                openNew:true,
                status:false
            }
        },
        computed:{
            isSecond(){
                return /\d/.test(this.num)
            },
            fullNum(){
                return this.first&&this.second&&this.third&&this.fouth&&this.five&&this.six
            },
            code(){
                return String(this.first)+String(this.second)+String(this.third)+String(this.fouth)+String(this.five)+String(this.six)
            },
          ...mapGetters({
            'userInfo': 'userInfo'
          })
        },
        watch:{
            fullNum(v){
                if(v){
                    this.checkCodePass()
                }
            }

        },
        methods: {
            ...mapActions({
                'checkoutPhone': 'login/checkoutPhone',
                'resetPassword':'user/resetPassword',
                'getCode': 'user/getCode',
                'checkMsCode':'user/checkMsCode'
            }),
            async submit() {
                if(!this.phoneNum){
                    wx.showToast({
                        title: '请输入手机号',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                else if(!(/^1[3|6|5|7|8|9][0-9]\d{4,8}$/.test(this.phoneNum))){
                     wx.showToast({
                        title: '手机号格式不正确',
                        icon: 'none',
                        duration: 1000
                    })
                    return ;
                }
                let res= await this.checkoutPhone({phone:this.phoneNum});
                if(res.code==0){
                    this.flag=false;
                    this.timeOut();
                    let code= await this.getCode({url:getCodeApi+'code/sms',data:{mobile:this.phoneNum}})
                }


            },
            timeOut(){
                this.num=60;
                    clearInterval(this.timer);
                    this.timer=setInterval(()=>{
                        this.num--;
                        if(this.num==0){
                            this.num='重新发送'
                            clearInterval(this.timer)
                        }
                    },1000)
            },
            async sendMsg(){
                if(!this.isSecond){
                    this.timeOut()
                    let res= await this.checkoutPhone({phone:this.phoneNum,job:'CODE_SALESMAN'});
                    if(res.code==0){
                        this.flag=false;
                        this.timeOut();
                        let code= await this.getCode({url:getCodeApi+'code/sms',data:{mobile:this.phoneNum}})
                    }
                }

            },

            changeStatus(){
                this.openOld=!this.openOld;
            },
            changeNew(){
                this.openNew=!this.openNew;
            },
            async checkCodePass(){
                let chceckCode= await this.checkMsCode({url:saasApi+'atg/phoneSMSCheck',data:{phone:this.phoneNum,message:this.code}})
                if(chceckCode.code==0){
                    setTimeout(()=>{
                        this.status=true;
                    },3000)
                }
            },
            async editPass(){

                if(!this.oldPass){
                    wx.showToast({
                        title: '请输入6-18位新密码',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }else if(this.oldPass.length<6){
                     wx.showToast({
                        title: '请输入6-18位新密码',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                else if(this.newPass!=this.oldPass){
                    wx.showToast({
                        title: '请输入相同的密码',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                    let res= await this.resetPassword({url:saasApi+'manu/resetPasswordByJob',data:{
                        loginPassword:this.newPass,
                        userPhone:this.phoneNum
                    }})
                    if(res.code==0){
                        wx.redirectTo({
                            url: '../login/main'
                        })
                    }
            }
        },
        onShareAppMessage: function () {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onLoad(){
            this.flag=true;
            this.openOld=true;
            this.openNew=true;
            this.first='';
            this.second='';
            this.third='';
            this.fouth='';
            this.five='';
            this.six='';
            this.phoneNum='';
            this.newPass='';
            this.oldPass='';
            this.status=false;
        },
        onHide:function(){

        },


    }
</script>

<style lang="scss" scoped>
    .forget_pass{
        height: 100%;
        background: #F5F5F5;
        padding: 7.496251874062969vh 8vw 0 8vw;
        box-sizing: border-box;
        .label{
            font-size:24px;
            font-family:SourceHanSansCN-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
        .pass_put{
            display: flex;
            align-items: center;
            width: 84vw;
            height: 6.8965vh;
            background: #fff;
            padding-left: 2.666666666666668vw;
            box-sizing: border-box;
            font-size: 15px;
            color: #888;
            margin-top: 8vw;


        }
        .phone_num{
            margin-right: 2vw;
        }
        .check_num{
            display: flex;
            justify-content:space-between;
            margin-top:10vh;
            input{
                border-bottom: 1px solid #CCCCCC;
                width: 15%;
                text-align: center;
                margin-bottom: 7.496251874062969vh;
            }
        }
        .pass_scope{
            margin-top: 7.496251874062969vh;
        }
        .oldPass{
            position: relative;
            margin-bottom: 2.2488755622188905vh;
            display: flex;
            align-items: center;
            width: 84vw;
            height: 6.8965vh;
            background: #fff;
            padding-left: 2.666666666666668vw;
            box-sizing: border-box;
            font-size: 15px;
            color: #888;
            // margin-top: 8vw;
            input{
                //  width: 84vw;
                // height: 6.8965vh;
                background: #fff;
            }
            img{
                width: 5.3333vw;
                height: 5.3333vw;
                position: absolute;
                left: 90%;
                top: 2.2vh;
            }
        }
        .check_num_ifon{
            color: #555;
            font-size: 13px;
        }
        .user_phone_info{
            color: #888;
            font-size: 13px;
        }
        .foot_submit{
            margin-top: 14.09295352323838vh;
            width:84vw;
            height:7.496251874062969vh;
            background:rgba(255,68,63,1);
            border-radius:25px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
