<template>
    <div class="dialog_scan">
        <div class="scan" v-if="isStatus">
            <img :src="imageApi + '/close3.png'" alt="" v-if="imageApi" class='close_3' @click="close">
            <div class="title_scan">提示</div>
            <div class="scan_scope_title">请扫描客户购车津贴兑换码</div>
            <div class="scan_but" @click="scanFun">扫码核销</div>
        </div>
        <div class="scan" v-if="!isStatus">
            <img :src="imageApi + '/close3.png'" alt="" v-if="imageApi" class='close_3' @click="close">
            <div class="title_scan">核销确认</div>
            <div class="heixoa_scope_title">
                <span>是否核销</span><span style="font-weight:bold;">{{customerPhone}}</span>
                <div>
                    <span>兑换的</span><span style="font-weight:bold;color:#BB0A30">{{carAllowances.value}}元</span><span>购车津贴</span>
                </div>
                <div class="disc">核销后请以车款或现金形式向客户兑现</div>
                <div class="b_t">
                    <div class="cancle" @click="close">取消</div>
                    <div class="cancle submit" @click="Cancellation">确认核销</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import { addUserLog } from "./../../../utils/pageBuryingPoint";
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        props:{
            // carAllowances:null
        },
        data(){
            return {
                imageApi,
                isStatus:true,
                carAllowances:{}
            }
        },
        computed: {
            ...mapGetters({
                'customerPhone':'user/customerPhone',
                'userInfo':'userInfo'
            }),
        },
        methods: {
            ...mapMutations({
                'setscanStatus':'user/setscanStatus'
            }),
            ...mapActions({
                'AllowanceCancellation':'user/AllowanceCancellation',
                'carAllowance':'user/carAllowance'
            }),
            close() {
               this.setscanStatus(false) 
            },
            scanFun(){
                console.log('scan')
                wx.scanCode({
                    success: (res) => {
                        var result = res.result;
                        console.log('scanCode', result)
                        this.carAllowance({
                            qrCode:result+"",
                            phone:this.customerPhone
                        }).then(res1=>{
                           if(res1.code==0){
                               this.isStatus=false
                            this.carAllowances=res1.data
                            console.log(res1.data)
                            // if(res.data){
                            //     this.status=false
                            // }else{
                            //     this.status=true
                            // }
                           
                        }else {
                           this.isStatus=true
                        }
                        })

                    },
                    fail: (e) => {
                        console.error('scanCode',e)
                    }
                })
            },
            // async getcarAllowance(){
            //     console.log('status------');
            //     let res=await this.carAllowance({
            //         foursId:this.userInfo.foursId,
            //         phone:this.customerPhone
            //     })
            //     if(res.code==0){
            //         this.carAllowances=res.data
            //         if(res.data){
            //              this.status=false
            //         }else{
            //              this.status=true
            //         }
                   
            //     }else if(res.code==2){
            //         this.status=true 
            //     }

            // },
            Cancellation(){
                addUserLog('4-41', this.customerPhone)  //埋点权益兑换
                this.AllowanceCancellation({
                    foursId:this.userInfo.foursId,
                    phone:this.customerPhone ,
                    salesmanPhone:this.userInfo.phone,
                    id:this.carAllowances.id
                }).then((res)=>{
                    if(res.code==0){
                        this.close()
                        this.$emit('changeStatus')
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .dialog_scan{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.6);
        z-index:100000;
        display: flex;
        align-items: flex-end;
        .scan{
            width:100%;
            height:520rpx;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:16rpx 16rpx 0px 0px;
            position: relative;
            .title_scan{
                color: #444444;
                font-size: 48rpx;
                font-weight:500;
                height: 132rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #E5E5E5;
            }
            .close_3{
                width: 22rpx;
                height: 22rpx;
                position: absolute;
                right: 26rpx;
                top:26rpx;
            }
            .scan_scope_title{
                color:#262626;
                font-size: 36rpx;
                margin-top: 88rpx;
                text-align: center;
            }
            .heixoa_scope_title{
                color:#262626;
                font-size: 36rpx;
                text-align: center;
                margin-top: 56rpx;
            }
            .disc{
                text-align: center;
                color: #999999;
                font-size: 28rpx;
                margin-top:36rpx;
            }
            .b_t{
                display: flex;
                justify-content: center;
                margin-top: 24rpx;
            }
            .cancle{
                width:240rpx;
                height:84rpx;
                background:rgba(229,229,229,1);
                opacity:1;
                border-radius:8rpx;
                color: #727272;
                font-size: 36rpx;
                line-height: 84rpx;
                text-align: center;
            }
            .submit{
                color: #FFFFFF;
                background-color: #BB0A30;
                margin-left: 46rpx;
            }
            .scan_but{
                width:280rpx;
                height:84rpx;
                background:rgba(187,10,48,1);
                opacity:1;
                border-radius:8rpx;
                margin: 0 auto;
                margin-top: 112rpx;
                color: #fff;
                font-size: 36rpx;
                line-height: 84rpx;
                text-align: center;
            }
        }
        
    }
</style>