<template>
    <div class="reception_header">  
        <div class="h_i">
            <img :src="imageApi+'/f_c.png'" alt="" class="header_img" v-if="imageApi">
            <div class="label_s">正在接待</div>
        </div>
        <div class="cu_infon">
            <div class="phone">
                <span class="p_n">{{personInfo.phone}}</span>
                <img v-if="imageApi" :src="imageApi+'/phone.png'" alt="" class="phone" @click="call">
            </div>
            <div class="level_cus">
                <p class="cu_name">{{personInfo.name||'未知'}}</p> 
                <span class="level_icon" :style="colorObj[personInfo.cusLevel]">{{levelval[personInfo.cusLevel]}}</span>
                <div class="v_time" v-if="personInfo.createSource=='邀约到店' && personInfo.appointmentTime">
                    <span>{{personInfo.createSource}} </span>
                    <span>{{ts}} </span>
                    <span>{{td}}</span>
                </div>
                <div class="visite_time liuzi" v-if="personInfo.createSource=='小程序留资'">
                    <span>{{personInfo.createSource}}</span>
                </div>
                
            </div>
        </div>
        
        <img :src="imageApi+'/new_close.png'" alt="" @click="closeFun" class="close_icon" v-if="imageApi">
        <closeModel :flag='flag' :title='title' @close='close'></closeModel>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import {formateTtime} from "../../../utils";
    import {formateSTime} from "../../../utils";
    import closeModel from '../components/closeModel'
    export default {
        components:{
            closeModel
        },
        data(){
            return {
                imageApi,
                colorObj:{
                    '2':'background:#FFA600',
                    '3':'background:#FFE131',
                    '4':'background:#B0C939',
                    '1':'background:#FF5253'
                },
                levelval:{
                    '1':'H',
                    '2':'A',
                    '3':'B',
                    '4':'C'
                },
                phone:'',
                personInfo:{},
                ts:'',
                td:'',
                flag:false,
                title:'是否结束接待？',
                code:'',
                userTrajectoryId:''
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'customerPhone':'user/customerPhone'
            })
        },
        methods: {
            ...mapActions({
                'getPersonlinfo':'user/getPersonlinfo',
                'closeNotice':'user/closeNotice',
                'finishRecced':'user/finishRecced'
            }),
            ...mapMutations({
                'setCustomerInfo':'user/setCustomerInfo'
            }),
            // 获取用户基本信息
            async getPersonInfo(){
                console.log('status');
                let res= await this.getPersonlinfo({salesman:this.userInfo.userId,foursId:this.userInfo.foursId,phone:this.customerPhone})
                if(res.code==0){
                    this.personInfo=res.data;
                    this.ts=formateTtime( this.personInfo.appointmentTime);
                    this.td=formateSTime( this.personInfo.appointmentTime);
                    console.log('--------')
                    this.setCustomerInfo(res.data)
                    console.log('--------')
                }
            },
            //呼叫
            call(){
               wx.makePhoneCall({
                    phoneNumber: this.customerPhone,
                    success: function () {
                    },
                    fail: function () {
                    }
                })
            },
            // 关闭窗口
            closeFun(){
                console.log('zhixingle')
                this.flag=true
                // this.$emit('close');
            },
            close(val){
                if(val=='y'){
                    this.flag=false
                     this.finishRecced({
                        foursId:this.userInfo.foursId,
                        salesman:this.userInfo.userId,
                        phone:this.customerPhone
                    })
                    wx.navigateTo({
                        url:'/pages/user/customerIn/main'
                    })
                }else{
                     this.flag=false
                }
            }
        },
        onShow(){
            this.getPersonInfo();
        },  
        onLoad(option){
            this.getPersonInfo();
            this.code=option.code,
            this.userTrajectoryId=option.userTrajectoryId
        }
    }
</script>

<style lang="scss" scoped>
    .reception_header{
        width: 100%;
        height: 236rpx;
        background-color: #36384E;
        padding: 28rpx 40rpx 0 40rpx;
        box-sizing: border-box;
        position: relative;
        display: flex;
        .h_i{
            position: relative;
            .label_s{
                position: absolute;
                width:100rpx;
                height:28rpx;
                background:rgba(255,82,83,1);
                opacity:1;
                border-radius:16rpx 16rpx 16rpx 0px;
                bottom: 70rpx;
                left: -10rpx;
                color: #fff;
                font-size: 20rpx;
                text-align: center;
                line-height: 28rpx;
            }
        }
        .header_img{
            width: 88rpx;
            height: 88rpx;
            margin-top: 28rpx;
        }
        .close_icon{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            right: 40rpx;
        }
        .cu_infon{
            margin-top: 28rpx;
            margin-left: 30rpx;
            .cu_name{
                color: #FFFFFF;
                font-size: 30rpx;
                margin-right: 8rpx;
            }
            .phone{
                margin:6rpx 0;
                display: flex;
                align-items: center;
                .p_n{
                    color: #FFFFFF;
                    font-size: 48rpx;
                    margin-right: 12rpx;
                }
                .phone{
                    width: 44rpx;
                    height: 44rpx;
                }
            }
            .level_cus{
                display: flex;
                align-items: center;
                .level_icon{
                    display: inline-block;
                    width: 30rpx;
                    height: 30rpx;
                    color: #fff;
                    background:#FF5253;
                    font-size: 24rpx;
                    text-align: center;
                    line-height: 30rpx;
                    font-weight: 500;
                }
                .v_time{
                    display: flex;
                    justify-content: space-around;
                    font-size: 24rpx;
                    width: 240rpx;
                    height: 34rpx;
                    background-color: #6D6E80;
                    margin-left: 24rpx;
                    color: #36384E;
                }
                .visite_time{
                    width: 385rpx;
                    height:34rpx;
                    background:#6D6E80;
                    opacity:1;
                    border-radius:8rpx;
                    color: #767676;
                    font-size: 24rpx;
                    display: flex;
                    color: #36384E;
                    justify-content: space-between;
                    padding: 0 8rpx;
                    margin-left: 12rpx;
                }
                .liuzi{
                    width:120rpx;
                }
            }
            
        }
    }

</style>