<template>
    <div class="main" >
        <!--<div class="add_data" >-->
            <!--&lt;!&ndash; <span class="create_custom">创建客户</span>-->
            <!--<span class="cancle" @click="cancle">取消</span> &ndash;&gt;-->
        <!--</div>-->
        <!-- <div class="add_data_scope">
            <img :src="imageApi+'/close3.png'" alt="" class="close_icon" @click="colseFun">
            <input type="number" v-model="phone" placeholder="请输入客户手机号" class="input_text" placeholder-style="color:#aaa;font-size:36rpx;" :focus='true' maxlength="11">
            <button class="submit" @click="submit">洞察</button>
        </div> -->
        <div class="conten_main">
            <div class="create_title">
            创建用户
            </div>
            <img :src="imageApi+'/new_close.png'" alt="" class='new_close' @click="closeFunBack">
            <input type="number" class="create_input" placeholder="请输入客户手机号" focus="true" v-model="phone" maxlength="11">
            <div class="radio_title">是否首次到店</div>
            <div :class="[activeINdex==index?'active':'radio_list','common_style']" v-for="(item,index) in visitContent" :key="index" @click="change(index,item)" :style="{backgroundColor: activeINdex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: activeINdex==index?vi.all.pageBtn.color:'#767676'}">
                {{item}}
            </div>
            <div class="radio_title">默认客户评级</div>
            <div :class="[levesIndex==index?'active':'radio_list','common_style']" v-for="(item,index) in leves" :key="index" @click="changeLeve(index,item)" :style="{backgroundColor: levesIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: levesIndex==index?vi.all.pageBtn.color:'#767676'}">
                {{item}}
            </div>

        </div>
        <!-- <div class="submit" @click="submit" :style="{backgroundColor: vi.all.pageBtn.bgColor, color: vi.all.pageBtn.color}">确定</div> -->
        <div class="submit" @click="submit">确定</div>
    </div>


</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import {fenxiang} from "../../../utils";
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
                phone:'',
                activeINdex:0,
                levesIndex:3,
                visitContent:['首次到店','二次以上'],
                visit:'',
                leves:['H级','A级','B级','C级'],
                leve:'',
                num:1333333333,
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'vi': 'vi',
            }),
        },
        methods: {
            ...mapActions({
                'createUser':'user/createUser',
                'checkoutUser':'user/checkoutUser'
            }),
            ...mapMutations({
                'setCheckedCusInfo': 'insight/setCheckedCusInfo',
            }),
            closeFunBack(){
                wx.navigateBack({
                    
                })
            },
            colseFun(){
                this.$emit('close');
            },
            change(v,val) {
                this.activeINdex=v;
                this.visit=val;
            },
            changeLeve(v,val){
                this.levesIndex=v;
                this.leve=val;
            },
            cancle(){
                wx.navigateTo({
                    url:'../../user/main'
                })
            },
            async submit(){
                if(!this.phone){
                    wx.showToast({
                        title: '请输入手机号',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                else if(this.phone.length<11){
                  wx.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none',
                    duration: 2000
                  })
                  return
                }
                else if(!(/^1[3456789]\d{9}$/.test(this.phone))){
                    wx.showToast({
                        title: '手机号格式不正确',
                        icon: 'none',
                        duration: 2000
                    })
                    return ;
                }
                let check= await this.checkoutUser({
                    foursId:this.userInfo.foursId,
                    customerPhone:this.phone
                })
                if(check.data==null){
                    let res = await this.createUser({
                        phone:this.phone,
                        brandId:this.userInfo.manuId,
                        foursId:this.userInfo.foursId,
                        name:'',
                        cusLevel:this.levesIndex+1,
                        inCount:this.activeINdex+1
                    });
                    if(res.code === 0){
                        // wx.showToast({
                        //     title: '客户创建成功',
                        //     icon: 'none',
                        //     duration: 2000
                        // });
                        // 跳转洞察
                        this.setCheckedCusInfo({
                          phone:this.phone,
                          brandId:this.userInfo.manuId,
                          foursId:this.userInfo.foursId,
                          name:'',
                          cusLevel:this.levesIndex+1,
                          inCount:this.activeINdex+1
                        });
                        // wx.redirectTo({
                        //   url: '../../index/main?page=dcgl'
                            // url:'../main'
                        // })
                        mpvue.navigateBack()
                    }
                }else{
                    // 跳转洞察
                    this.setCheckedCusInfo({
                        phone:this.phone,
                        brandId:this.userInfo.manuId,
                        foursId:this.userInfo.foursId,
                        name:'',
                        cusLevel:this.levesIndex+1,
                        inCount:this.activeINdex+1
                    });
                    // wx.redirectTo({
                        // url: '../../index/main?page=dcgl'
                        //  url:'../main'
                    // })
                    mpvue.navigateBack()
                    // wx.showModal({
                    //     title: '提示',
                    //     cancelText:'取消',
                    //     confirmText:'查看',
                    //     confirmColor:'#FF443F',
                    //     content: `${this.phone}客户已存在，是否查看客户资料？`,
                    //     success(res) {
                    //         if (res.confirm) {
                    //             wx.navigateTo({
                    //                 url: '../user/customerMsg/main?option='+JSON.stringify(check.data)
                    //             });
                    //         } else if (res.cancel) {
                    //         }
                    //     }
                    // })
                }
            }
        },
        onLoad(){
            this.phone='';
            this.activeINdex=0;
            this.levesIndex=3;
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
    }
</script>

<style lang="scss" scoped>
    .main{

        .conten_main{
            margin-top: 56rpx;
            padding: 0 0 0 40rpx ;
            box-sizing: border-box;
        }
        .create_title{
            color: #333;
            font-weight:500;
            font-size: 54rpx;
        }
        .new_close{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            top:28rpx;
            right: 40rpx;
        }
        .create_input{
            padding-bottom: 44rpx;
            font-size: 32rpx;
            border-bottom: 1px solid #E5E5E5;
            margin-top: 70rpx;
            text-indent: 44rpx;
            padding-left: 20rpx;
            margin-right: 40rpx;
        }
        .radio_title{
            color: #1A1A1A;
            font-size: 32rpx;
            font-weight: 500;
            margin-top: 64rpx;
            margin-bottom: 32rpx;
        }
        .radio_list{
            display: inline-block;
            width:150rpx;
            height:56rpx;
            background:rgb(242, 241, 246);
            opacity:1;
            border-radius:4rpx;
            color: #767676;
            line-height: 56rpx;
            text-align: center;
            font-size: 24rpx;
            margin-right: 24rpx;
        }
        .common_style{
            display: inline-block;
            width:150rpx;
            height:56rpx;
            
            opacity:1;
            border-radius:4rpx;
           
            line-height: 56rpx;
            text-align: center;
            font-size: 24rpx;
            margin-right: 24rpx;
        }
        .active{
            display: inline-block;
            width:150rpx;
            height:56rpx;
            background:rgba(26,26,26,1);
            opacity:1;
            border-radius:4rpx;
            color: #fff;
            line-height: 56rpx;
            text-align: center;
            font-size: 24rpx;
            margin-right: 24rpx;
        }
        .submit{
            position: fixed;
            width:670rpx;
            height:84rpx;
            background:rgba(187,10,48,1);
            opacity:1;
            bottom: 40rpx;
            left: 40rpx;
            color: #fff;
            border-radius:40rpx;
            text-align: center;
            line-height: 84rpx;

        }
    }
</style>

<style lang="scss" scoped>
    .main{
        // width: 100vw;
        // height: 100vh;
        // overflow-x: hidden;
        // position: fixed;
        // top:0;
        // left: 0;
        // background:rgba(0,0,0,.5);
        // display: flex;
        // // justify-content: center;
        // align-items: center;
        // flex-direction: column;
        // z-index: 10;
    }
    //  .submit{
    //         width:320rpx;
    //         height:68rpx;
    //         background:rgba(255,68,63,1);
    //         opacity:1;
    //         border-radius:50rpx;
    //         margin-top: 56rpx;
    //         color: #fff;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //     }
    .add_data_scope{
        width:610rpx;
        height: 414rpx;
        border-radius:8rpx;
        margin-top: 280rpx;
        padding: 0 5.3333vw;
        background: #fff;
        position: relative;
        .close_icon{
            width: 35rpx;
            height: 35rpx;
            position: absolute;
            right: 40rpx;
            top: 40rpx;
        }
        .input_text{
            border-bottom:1px solid rgba(170,170,170,1);
            text-align: center;
            margin-top: 150rpx;
            padding-bottom:40rpx;
            font-size: 36rpx;
        }
    }
    .add_data{
        width: 100%;
        height:8.09595vh;
        background: #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5.33333vw 1.49925vh 5.33333vw;
        box-sizing: border-box;
        overflow: hidden;
        .create_custom{
            font-size: 24px;
            color: #fff;
        }
        .cancle{
            color: #aaa;
            font-size: 15px;
        }
    }
    // .input_scope{
    //     margin-top:7.49625vh;
    //     padding:0 12.5922vh;
    //     padding-bottom: 1vh;
    //     border-bottom: 1px solid rgba(238,238,238,1);

    //     .input_text{
    //         // border-left: 2px solid #FF443F;
    //         height: 6.746626vh;
    //         padding-left: 2vw;
    //         color: #aaa;
    //         font-size: 26px;
    //     }
    // }
    // .visits_shop_time{
    //     width: 100%;
    //     padding: 0 5.33333vw;
    //     margin-top: 8.99550vh;
    //     .visit_title{
    //         font-size: 14px;
    //         color: #555;
    //     }
    //     .visit_tag{
    //         display: flex;
    //         margin-top: 2.1vh;
    //         span{
    //             display: inline-block;
    //             width: 20vw;
    //             height: 4.19790vh;

    //             display: flex;
    //             justify-content: center;
    //             align-items: center;

    //             font-size: 12px;
    //             margin-right:2.9333vw;
    //         }
    //         .default{
    //             background: #484848;
    //             color: #fff;
    //         }
    //         .active{
    //             background: #F5F5F5;
    //             color: #555;
    //         }
    //     }
    // }

</style>
