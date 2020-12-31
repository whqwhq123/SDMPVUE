<template>
    <div class="main">
        <!-- <div class="add_data" >
            <span class="create_custom">本次接待结果？</span>
            <span class="cancle"></span>
        </div> -->
        <img :src="imageApi+'/new_close.png'" alt="" class="new_close" @click="backFun">
         <div class="visit_custom time_title">
            <div class="visit_cus_name result_time">本次接待结果</div>
            <div class="levels">
                <div :class="[activeIn==index?'active':'default','tags_cus']" v-for='(item,index) in dataList' :key="index" @click="changeTab(index)" :style="{backgroundColor: activeIn==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: activeIn==index?vi.all.pageBtn.color:'#767676'}">{{item}}</div>
            </div>
        </div>
         <div class="visit_custom" v-if='activeIn==2'>
            <div class="visit_cus_name">本次接待后的客户评级</div>
            <div class="levels">
                <div :class="[labeIndex==index?'active':'default','tags_cus']" v-for='(item,index) in label' :key="index" @click="changeLabe(index)" :style="{backgroundColor: labeIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: labeIndex==index?vi.all.pageBtn.color:'#767676'}">{{item}}</div>
            </div>
        </div>
        <div class="visit_custom " v-if='activeIn==0'>
            <div class="visit_cus_name">您认为本次交易成功的关键因素是？</div>
            <div class="er_reason">
                <div :class="[item.type?'default':'active','tags_cus']" v-for='(item,index) in errREason' :key="index" @click="changeErr(index)" :style="{backgroundColor: !item.type?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: !item.type?vi.all.pageBtn.color:'#767676'}">{{item.name}}</div>
            </div>
            <div class="visit_cus_name">其他原因</div>
            <textarea type="text" class="err_reason_input" v-model="reasonErr" placeholder="输入其他原因" placeholder-style="color:#aaa;font-size:13px;" v-if='isShow'></textarea>
        </div>
        <div class="visit_custom " v-if='activeIn==1'>
            <div class="visit_cus_name">战败因素</div>
            <div class="er_reason">
                <div :class="[item.type?'default':'active','tags_cus']" v-for='(item,index) in changell' :key="index" @click="chanllErr(index)" :style="{backgroundColor: !item.type?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: !item.type?vi.all.pageBtn.color:'#767676'}">{{item.name}}</div>
            </div>
            <div class="visit_cus_name">其他原因</div>
            <textarea type="text" class="err_reason_input" v-model="reasonErr" placeholder="输入其他原因" placeholder-style="color:#aaa;font-size:13px;" v-if='isShow'></textarea>
        </div>
        <div class="visit_custom" v-if='activeIn==1'>
            <div class="visit_cus_name">对客户的性格是什么印象？</div>
            <div class="levels express">
                <div :class="[typeIndex==index?'active':'default','tags_cus']" v-for='(item,index) in typeLabel' :key="index" @click="typeLabe(index)" :style="{backgroundColor: typeIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: typeIndex==index?vi.all.pageBtn.color:'#767676'}">{{item}}</div>
            </div>
        </div>
        <div class="visit_custom" v-if='activeIn==1'>
            <div class="visit_cus_name">客户的经济能力怎么样？</div>
            <div class="levels famliy">
                <div :class="[familIndex==index?'active':'default','tags_cus']" v-for='(item,index) in generalFAmil' :key="index" @click="changeFamil(index)" :style="{backgroundColor: familIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: familIndex==index?vi.all.pageBtn.color:'#767676'}">{{item}}</div>
            </div>
        </div>
        <!-- {{ErrorResult}} -->
        <!-- <button class="footer_sub" @click="submit" :style="{backgroundColor: vi.all.pageBtn.bgColor, color: vi.all.pageBtn.color}">提交</button> -->
        <button class="footer_sub" @click="submit">提交</button>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {fenxiang} from "../../../utils";
import { addUserLog } from "../../../utils/pageBuryingPoint";
    export default {
        data(){
            return{
                dataList:['已成交','已战败','待跟进'],
                activeIn:2,
                label:['H级','A级','B级','C级'],
                labeIndex:3,
                errREason:[{
                    name:'价格因素',
                    type:true
                },{
                    name:'用户购车需求明确',
                    type:true
                },{
                    name:'活动力度大',
                    type:true
                },{
                    name:'车源充足',
                    type:true
                },
                {
                    name:'其他',
                    type:false
                },],
                defaulrREason:[{
                    name:'价格因素',
                    type:true
                },{
                    name:'用户购车需求明确',
                    type:true
                },{
                    name:'活动力度大',
                    type:true
                },{
                    name:'车源充足',
                    type:true
                },
                {
                    name:'其他',
                    type:false
                },],
                default:[{
                    name:'价格因素',
                    type:true
                },{
                    name:'客户购买意愿不强',
                    type:true
                },{
                    name:'选择竞争品牌',
                    type:true
                },{
                    name:'用户购车需求不明确',
                    type:true
                },
                {
                    name:'其他',
                    type:false
                },],
                changell:[{
                    name:'价格因素',
                    type:true
                },{
                    name:'客户购买意愿不强',
                    type:true
                },{
                    name:'选择竞争品牌',
                    type:true
                },{
                    name:'用户购车需求不明确',
                    type:true
                },
                {
                    name:'其他',
                    type:false
                },],
                reasonErr:'',
                typeLabel:['犹豫型','活泼型','力量型'],
                typeIndex:0,
                generalFAmil:['一般家庭','小康家庭','财务自由'],
                familIndex:0,
                checkoutErr:[{
                    name:'其他',
                    type:false
                }],
                uqlId:'',

            }
        },
        watch:{
            activeIn(v){
                if(v==1){
                    this.labeIndex=0
                }else if(v==0){
                    this.labeIndex=3
                }
            }
        },
        computed:{
            isShow(){
                var arr=[];
                var flag;
                arr=this.checkoutErr.map((v)=>{
                    return v.name
                })
                return arr.includes('其他');
            },
            title(){
                if(this.activeIn==2){
                    return '保存成功！离成交又近了一步';
                }
                else if(this.activeIn==0){
                    addUserLog('5-51', this.customerInfo.phone)  //埋点成交
                    return '恭喜您本次交易成功'
                }
                else if(this.activeIn==1){
                    addUserLog('5-52', this.customerInfo.phone)  //埋点战败
                    return '没关系，再接再厉'
                }
            },
            ErrorResult(){
                var arr=[];
                var flag;
                arr=this.checkoutErr.filter((v)=>{
                    return v.name!='其他'
                })
                return arr.map((v)=>{
                    return v.name;
                })
            },
            // result(){
            //     if(this.reasonErr){
            //         return this.ErrorResult.push(this.reasonErr);
            //     }
            // },
            ...mapGetters({
                'userInfo':'userInfo',
                'vi': 'vi',
                'customerInfo':'user/customerInfo'
            })

        },
        methods: {
            ...mapActions({
                'recordREsult':'user/recordREsult'
            }),
            backFun(){
                wx.navigateBack({

                })
            },
            changeTab(v) {
                this.activeIn=v;
                this.reasonErr='';
                this.typeIndex=0;
                this.familIndex=0
                this.errREason=this.defaulrREason.map((v)=>{
                    return {
                        name:v.name,
                        type:v.type
                    }
                })
                this.changell=this.default.map((v)=>{
                    return {
                        name:v.name,
                        type:v.type
                    }
                });
                this.checkoutErr=[{
                    name:'其他',
                    type:false
                }];
            },
            changeLabe(v){
                this.labeIndex=v;
            },
            typeLabe(v){
                this.typeIndex=v;
            },
            changeErr(v){
                this.errREason[v].type=!this.errREason[v].type;
                this.checkoutErr=this.errREason.filter((v)=>{
                    return !v.type;
                })
            },
            chanllErr(v){
                this.changell[v].type=!this.changell[v].type;
                this.checkoutErr=this.changell.filter((v)=>{
                    return !v.type;
                })
            },
            changeFamil(v){
                this.familIndex=v;
            },
            async submit(){
                var str=this.ErrorResult.length>0?',其他:':'其他:'
                var obj=this.ErrorResult.join(',')+str+this.reasonErr
                var obgAc=''
                console.log('uqlId',this.uqlId)
                let res=await this.recordREsult({
                    uqlId: this.uqlId,
                    cusLevel: Number(this.labeIndex)+1,
                    element: this.activeIn == 2?obgAc:obj,
                    impression: this.activeIn == 2?obgAc:this.typeLabel[this.typeIndex],
                    economicCapability: this.activeIn == 2?obgAc:this.generalFAmil[this.familIndex],
                    tradeStatus: this.activeIn+1
                })
                var that=this;
                if(res.code==0){
                    wx.showModal({
                        title: '提示',
                        confirmText:'确定',
                        showCancel:false,
                        confirmColor:'#FF443F',
                        content: this.title,
                        success(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/generalSale/index/main'

                                });
                            } else if (res.cancel) {
                            }
                        }
                    })
                }
            }
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        getCurrentPages(){
        },
        onShow(){
            this.activeIn=2;
            this.typeIndex=0;
            this.familIndex=0
            this.errREason=this.defaulrREason.map((v)=>{
                    return {
                        name:v.name,
                        type:v.type
                    }
                })
                this.changell=this.default.map((v)=>{
                    return {
                        name:v.name,
                        type:v.type
                    }
                })
        },
        onHide(){
          this.activeIn=2;
        },
        onLoad(op) {
            this.activeIn=2;
            this.uqlId=this.customerInfo.uqlId;
            this.labeIndex=this.customerInfo.cusLevel-1;
            // console.log('cl:',op);
            // let page=getCurrentPages();
            // let previe=page[page.length-2]
            // previe.setData({
            //     activeIn:1,
            //     trent:this.activeIn,
            //     levl:this.labeIndex||3
            // })
        }
    }
</script>

<style lang="scss" scoped>
.main{
    height: 100%;
    overflow-y: auto;
    padding-bottom: 170rpx;
    .new_close{
        width: 56rpx;
        height: 56rpx;
        position: absolute;
        right: 40rpx;
        top: 28rpx;
    }
}
.add_data{
        height:8.09595vh;
        background: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5.33333vw 1.49925vh 5.33333vw;
        box-sizing: border-box;
        .create_custom{
            font-size: 24px;
            color: #fff;
        }
        .cancle{
            color: #aaa;
            font-size: 15px;
        }
    }
    .default{
            background: #F5F5F5;
            color: #555;
        }
        .active{
            background: #484848;
            color: #fff
        }
    .customer_info{
        padding-top: 8.995502248875562vh;
        // padding-left: 10.133333333333333vw;
        // padding-right: 10.133333333333333vw;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .tags_cus{
            width: 150rpx;
            height:56rpx;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }
    .visit_custom{
        margin-top: 60rpx;
        position: relative;
        .visit_cus_name{
            color: #1A1A1A;
            font-size: 32rpx;
            margin-left: 5.3333vw;
        }
        .result_time{
            color: #1A1A1A;
            font-size: 54rpx;
            line-height: 54rpx;
            margin-bottom: 56rpx;
        }
    }
    .time_title{
        margin-top:56rpx;
    }
    .visit_custom::before{
        // content: '';
        // display: inline-block;
        // width: 3px;
        // height: 14px;
        // background: #222222;
        // position: absolute;
        // top: 0.5vh;
    }
    .levels{
        display: flex;
        // padding: 0 5.333vw;
        // justify-content: space-between;
        margin-left: 40rpx;

        // flex-wrap: wrap;
        .tags_cus{
            width: 150rpx;
            height:56rpx;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2.0989505247376314vh;
            margin-right: 22rpx;
        }
    }
    .famliy{
        .tags_cus{
            width: 150rpx;
            height:56rpx;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2.0989505247376314vh;
        }
    }
    .express{
        display: flex;
        // padding: 0 5.333vw;
        justify-content: flex-start;
        .tags_cus{
            width: 150rpx;
            height:56rpx;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2.0989505247376314vh;
            margin-right: 22rpx;
        }
    }
    .er_reason{
         padding: 0 0 0 5.333vw;
         display: flex;
         flex-wrap: wrap;
         margin-bottom: 60rpx;
         .tags_cus{
            min-width: 20vw;
            padding: 0 2vw;
            box-sizing: border-box;
            height:56rpx;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2.0989505247376314vh;
            margin-right: 22rpx;
        }
    }
    .err_reason_input{
        height: 180rpx;
        background:rgba(250,250,250,1);
        margin: 0 5.3333vw;
        margin-top: 28rpx;
        padding: 24rpx;
        box-sizing: border-box;
    }
    .footer_sub{
        width:670rpx;
        height:84rpx;
        background:rgba(187,10,48,1);
        opacity:1;
        border-radius:40rpx;
        opacity:1;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 40rpx;
        left:40rpx ;
        // border-radius: 0;
    }
</style>
