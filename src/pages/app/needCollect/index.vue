<template>
    <div class="need_select"> 
        <img :src="imageApi+'/new_close.png'" alt="" class='new_close' @click="backFun">
        <div class="header_title">
            需求收集
        </div>
        <div class="usr_car_need">
            <div class="title">用车需求</div>
            <div class="list">
                <div :class="[item.flag?'list_item':'list_default']" v-for="(item,index) in carNeed" @click="handlerClickCarNeed(item)" :key="index" :style="{backgroundColor: item.flag?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: item.flag?vi.all.pageBtn.color:'#767676'}">{{item.labelName}}</div>
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">客户关注</div>
            <div class="list">
                <div :class="[item.flag?'list_item':'list_default']"  v-for="(item,index) in customerFocus" @click="handlerClickFocus(item)" :key="index" :style="{backgroundColor: item.flag?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: item.flag?vi.all.pageBtn.color:'#767676'}">{{item.labelName}}</div>
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">购车周期</div>
            <div class="list">
                <div :class="[buyCarIndex==index?'list_item':'list_default']" v-for="(item,index) in labelOptions['5']" @click="buyCarDate(index,item)" :key="index" :style="{backgroundColor: buyCarIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: buyCarIndex==index?vi.all.pageBtn.color:'#767676'}">{{item.labelName}}</div>
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">兴趣爱好</div>
            <div class="list">
                <div :class="[item.flag?'list_item':'list_default']"  v-for="(item,index) in buyCarDateOp" @click="handlerClickCarIndex(item)" :key="index" :style="{backgroundColor: item.flag?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: item.flag?vi.all.pageBtn.color:'#767676'}">{{item.labelName}}</div>
                
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">购车指标</div>
            <div class="list">
                <div :class="[funIndex==index?'list_item':'list_default']" v-for="(item,index) in labelOptions['6']" @click="handlerFuny(index,item)" :key="index" :style="{backgroundColor: funIndex==index?vi.all.pageBtn.bgColor:'rgb(242, 241, 246)', color: funIndex==index?vi.all.pageBtn.color:'#767676'}">{{item.labelName}}</div>
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">关注竞品</div>
            <div class="carTyle">
                <div class='car_name'>{{carStyle.carName}}</div>
                <div class='car_select car_name' @click="selectCar">选择竞品车型 <span class="row_right"></span></div>
            </div>
        </div>
        <div class="usr_car_need">
            <div class="title">备注</div>
            <div class="list">
                <textarea class="text_area" v-model="note"  maxlength=300 placeholder="请输入备注内容" />
            </div>
        </div>
       
        <!-- <cover-view class='zixun_but' @click="consultPrice" :style="{backgroundColor: vi.all.pageBtn.bgColor, color: vi.all.pageBtn.color,lineHeight:'108rpx',textAlign:'center'}">推荐车型</cover-view> -->
        <cover-view class='zixun_but' @click="consultPriceFun" >推荐车型</cover-view>
       
        
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return {
                imageApi,
                buyCarIndex:null,
                funIndex:null,
                note:'',
                showModal:false,
                carNeed:[],
                customerFocus:[],
                buyCarDateOp:[],
                buyCarDateVal:'',
                funy:'',
                // buyCarIndex:'',
                labelOptions:{},
                uarNeedForm:[],
                customerForm:[],
                funnyForm:[],
                buyCarForm:'',
                buyCarIndexForm:''
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'vi': 'vi',
                'modelName': 'selectCar/modelName',
                'carModel': 'selectCar/carModel',
                'car': 'selectCar/car',
                'carBrand':'user/carBrand',
                'carStyle':'user/carStyle',
                'car_need':'user/car_need',
                'car_customer':'user/car_customer',
                'car_inst':'user/car_inst'
            }),
        },
        methods: {
            ...mapActions({
                'getUserLabel':'user/getUserLabel' ,// 获取标签
                'consultPrice':'user/consultPrice'// 咨询底价,
                
                
            }),
            ...mapMutations({
                'setParamsForm':'user/setParamsForm',
                'setnote':'user/setnote',
                'set_car_need':'user/set_car_need',
                'set_car_customer':'user/set_car_customer',
                'set_car_inst':'user/set_car_inst'  ,
                'setCarStyle':'user/setCarStyle',
                'setCar': 'selectCar/setCar',
                'setCarModel': 'selectCar/setCarModel',
                'setShareParams':'user/setShareParams'
            }),
            backFun(){
                wx.navigateBack({
                    
                })
            },
            handlerClickCarIndex(val) {
                this.buyCarDateOp=this.buyCarDateOp.map((item)=>{
                   return {
                       ...item,
                       flag:item.labelBrandId==val.labelBrandId?!val.flag:item.flag
                   }
               })
               
               let res=this.buyCarDateOp.map((v)=>{
                   if(v.flag){
                       return v.labelBrandId
                   }
               })
               this.funnyForm=res.filter((v)=>{
                   return v
               })
            //    this.setParamsForm(this.funnyForm.join(','))
            },
            handlerClickCarNeed(val){
               this.carNeed=this.carNeed.map((item)=>{
                   return {
                       ...item,
                       flag:item.labelBrandId==val.labelBrandId?!val.flag:item.flag
                   }
               })
               
               let res=this.carNeed.map((v)=>{
                   if(v.flag){
                       return v.labelBrandId
                   }
               })
            //    console.log(res);
               this.uarNeedForm=res.filter((v)=>{
                   return v
               })
                // console.log(this.uarNeedForm);
                // this.setParamsForm(this.uarNeedForm.join(','))
            },
            handlerClickFocus(val){
                this.customerFocus=this.customerFocus.map((item)=>{
                   return {
                       ...item,
                       flag:item.labelBrandId==val.labelBrandId?!val.flag:item.flag
                   }
               })
              
               let res=this.customerFocus.map((v)=>{
                   if(v.flag){
                       return v.labelBrandId
                   }
               })
                this.customerForm=res.filter((v)=>{
                    return v
                })
                // this.setParamsForm(this.customerForm.join(','))
            },

            buyCarDate(index,item){
                this.buyCarIndex=index;
                this.buyCarForm=item.labelBrandId
                // this.setParamsForm(this.buyCarForm)
            },
            handlerFuny(index,item){
                this.funIndex=index;
                this.buyCarIndexForm=item.labelBrandId
                // this.setParamsForm(this.buyCarIndexForm)
            },
            selectCar(){
                this.set_car_need(this.carNeed)
                this.set_car_customer(this.customerFocus)
                this.set_car_inst(this.buyCarDateOp)
                mpvue.navigateTo({
                    url: '/pages/app/needCollect/carBrand/main'
                })
                
            },
            async consultPriceFun(){
                if(this.uarNeedForm.length>0){
                    var arr=[...this.uarNeedForm,...this.customerForm,...this.funnyForm,this.buyCarForm,this.buyCarIndexForm].filter(Boolean).join(',')
                    // this.setParamsForm(arr)
                    // this.setnote(this.note)
                    let res= await this.consultPrice({
                        labelIds:arr,
                        salesmanId:this.userInfo.userId,
                        foursId:this.userInfo.foursId,
                        buyCarTarget:this.buyCarIndexForm,
                        competitionBrand:this.carBrand.makeId||'',
                        competitionCarTypeName:this.carStyle.getCarNameId||'',
                        competitionCarType:this.carStyle.carName||'',
                        remark:this.note,
                        recommendBrand:this.userInfo.manuId,
                        recommendCarType:this.car.modelId,
                        recommendCarTypeName:this.modelName,
                        recommendCarModel:this.car.styleId,
                        recommendCarModelName:this.car.styleName
                    })
                    if(res.code==0){
                        // this.flag=true
                        this.recommendId=res.data;
                        let bodyParm =[this.userInfo.foursId,5,this.userInfo.phone,this.recommendId,this.car.modelId,8].join()
                        let shareParams =[this.userInfo.foursId,5,this.userInfo.phone,this.recommendId,this.car.modelId].join()
                        this.setShareParams({
                            shareTitle:'为您推荐'+this.modelName,
                            shareDisc:'扫描了解详情',
                            bodyParm:bodyParm,
                            shareParams:'/pages/sell/index?scene='+shareParams,
                            shareType:'salesman_4'
                        })
                        wx.navigateTo({
                            url:'/pages/generalSale/shareToB/main'
                        })
                        this.setCar({})
                        this.setCarModel({})
                        
                    }
                }else{
                    wx.showToast({
                        title: '请选择用车场景',
                        icon: 'none',
                        mask: true,
                        duration: 2000
                    })
                }
                 
            },
            // 获取标签
            async getBarndLabel(){
                let res=await this.getUserLabel({})
                if(res.code===0){
                    this.labelOptions=res.data;
                    this.carNeed=res.data['1'].map((v)=>{return {...v,flag:false}})
                    this.customerFocus=res.data['4'].map((v)=>{return {...v,flag:false}})
                    this.buyCarDateOp=res.data['2'].map((v)=>{return {...v,flag:false}})
                }
            },
        },
        onLoad(op){
            this.getBarndLabel();
            this.setParamsForm([])
        },
        onHide(){
            
        }
    }
</script>

<style lang="scss" scoped>
    .need_select{
        padding: 0 40rpx;
        padding-bottom: 160rpx;
        padding-right: 0;
        box-sizing: border-box;
        .new_close{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            top:28rpx;
            right:40rpx; 
        }
        .header_title{
            font-size: 54rpx;
            color: #333;
            font-weight: 500;
            margin-top: 56rpx;
        }
        .usr_car_need{
            margin-top: 64rpx;
            .title{
                color: #1A1A1A;
                font-size: 32rpx;
            }
            .list{
                display: flex;
                // justify-content: space-between;
                flex-wrap: wrap;
                .list_default{
                    width:150rpx;
                    height:56rpx;
                    background:#F2F1F6;
                    opacity:1;
                    border-radius:4rpx;
                    margin-top: 32rpx;
                    color: #767676;
                    font-size: 24rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 24rpx;
                }
                .list_item{
                    width:150rpx;
                    height:56rpx;
                    background:rgba(26,26,26,1);
                    opacity:1;
                    border-radius:4rpx;
                    margin-top: 32rpx;
                    color: #fff;
                    font-size: 24rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 24rpx;
                }

            }
            .text_area{
                width:100%;
                min-height: 200rpx;
                background:rgba(250,250,250,1);
                margin-top: 32rpx;
                color: #1A1A1A;
                font-size: 28rpx;
                padding:24rpx;
                box-sizing: border-box;
                text-align: left;
                margin-right: 40rpx;
            }
            .carTyle{
                display: flex;
                justify-content: space-between;
                margin-top: 32rpx;
                margin-right: 40rpx;
            }
            .car_name{
                color: #1A1A1A;
                font-size: 28rpx;
                font-weight: 500;
            }
            .row_right::after{
                content: '';
                display: inline-block;
                width: 14rpx;
                height: 14rpx;
                border-top: 4rpx solid #1a1a1a;
                border-right: 4rpx solid #1a1a1a;
                transform: rotate(45deg);
            }
        }
        .zixun_but{
            position: fixed;
            bottom: 40rpx;
            left: 40rpx;
            width:670rpx;
            height:84rpx;
            background:rgba(187,10,48,1);
            opacity:1;
            border-radius:40rpx;
            color: #fff;
            font-size: 32rpx;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            line-height: 84rpx;
            text-align: center;
            z-index: 10;
        }
        .modal{
            background:rgba(0,0,0,1);
            opacity:0.75;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100
        }
        .dialog_modal{
            position: fixed;
            top: 200rpx;
            left: 50%;
            margin-left: -290rpx;
            z-index: 200;
            .modal_content{
                width:584rpx;
                // height:768rpx;
                background:rgba(255,255,255,1);
                opacity:1;
                border-radius:16rpx;
                padding:48rpx 30rpx 0 30rpx;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                .title{
                   color: #1A1A1A;
                   font-size: 36rpx;
                   font-weight: 500;
                   text-align: left;
                }
                .title_disc{
                   font-size: 28rpx;
                   font-weight: 500;
                   text-align: left;
                   color: #767676;
                }
                .card_disc{
                    color: #767676;
                    font-size: 30rpx;
                    text-align: left;
                    margin-top: 23rpx;
                }
                .quard_scope{
                    width: 306rpx;
                    height: 306rpx;
                    background-color: #ccc;
                    margin: 0 auto;
                    margin-top: 45rpx;
                    img{
                      width: 306rpx;
                      height: 306rpx;
                    }
                }
                .trans_friend{
                    margin-top: 62rpx;
                    margin-left: -30rpx;
                    width: 584rpx;
                    height: 160rpx;
                    background:rgba(242,242,242,1);
                    opacity:1;
                    border-radius:0px 0px 8rpx 8rpx;
                    .trans_friend_box {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      height: 160rpx;
                      width: 584rpx;
                      .close_img{
                          width: 64rpx;
                          height: 64rpx;
                          margin-bottom: 10rpx;
                      }
                      .t_f{
                          color: #767676;
                          font-size: 26rpx;
                      }
                    }
                }

            }
            .close{
                width: 100%;
                margin-top: 48rpx;
                text-align: center;
                .close_img{
                    width: 64rpx;
                    height: 64rpx;
                }
            }
        }
    }
</style>