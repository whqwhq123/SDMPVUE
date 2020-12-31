<template>
    <div :class="[isShow?'customer_main':'','customer_msg']">
        <!-- <div class="user_msg">
            <div style="display:flex;align-items: center;">
                <span class="name" v-if="name">{{name}}</span>
                <span class="phone_num">{{phone||''}}</span>
                <span class="badge badge_h" v-if="leve=='0'">H</span>
                <span class="badge badge_b" v-if="leve=='2'">B</span>
                <span class="badge badge_c" v-if="leve=='3'">C</span>
                <span class="badge badge_a" v-if="leve=='1'">A</span>
            </div>
            <img v-if="imageApi" :src="imageApi+'/phone.png'" alt="" class="phone" @click="call">
        </div> -->
        <!-- <div class="visite_time" v-if="createSource=='邀约到店' && appointmentTime">
            <span>{{createSource}} </span>
            <span>预计#{{ts}} </span>
            <span>{{td}}#到店</span>
        </div> -->
        <!-- <div class="visite_time liuzi" v-if="createSource=='小程序留资'">
            <span>{{createSource}}</span>
        </div> -->
        <!-- <div class="menu_tabs">
            <div class="tab_list" @click="customInFn">
                <div class="image_scope" style="padding:6rpx 10rpx 8rpx 10rpx">
                     <img :src="imageApi+'/g_j.png'" alt="" v-if="imageApi">
                </div>
                <span class="tab_name">跟进客户</span>
            </div>
            <div class="tab_list" @click="shareCardFn">
                <div class="image_scope" style="padding:0">
                     <img :src="imageApi+'/m_p.png'" alt="" v-if="imageApi">
                </div>
                <span class="tab_name">分享名片</span>
            </div>
            <div class="tab_list" @click="activeFunc">
                <div class="image_scope" style="padding:0">
                     <img :src="imageApi+'/h_d.png'" alt="" v-if="imageApi">
                </div>
                <span class="tab_name">活动推荐</span>
            </div>
            <div class="tab_list" @click="sendPiceFn">
                <div class="image_scope" style="padding:0">
                     <img :src="imageApi+'/b_price.png'" alt="" v-if="imageApi">
                </div>
                <span class="tab_name">发送报价</span>
            </div>

        </div> -->
        <div class="cus_title">客户档案</div>
        <img :src="imageApi+'/new_close.png'" alt="" class='new_close' @click="closeFunBack" v-if='imageApi'>
        <div class="navbar">
            <block v-for="(item,index) in tabs" :key="index">
                <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
                    <div class="navbar_title">{{item.name}}</div>
                </div>
            </block>
            <div class="navbar_slider" :class="navbarSliderClass"></div>
        </div>
        <div class="dialog" v-if="isShow">
            <div class="modal">
                <img v-if="imageApi" :src="imageApi+'/closde.png'" alt="" class="close" @click="cancleClose">
                <span class="title">检测到档案内容有修改，是否保存后再离开？</span>
                <div class="footer_sub">
                    <div class="cancle" @click="cancleFun">取消</div>
                    <div class="submit cancle" @click="submitFun" :style="{backgroundColor: vi.all.dialogBtn.bgColor, color: vi.all.dialogBtn.color}">保存</div>
                </div>
            </div>
        </div>
            <!-- <swiper class="content" :duration="50" :style="'height:'+contentHeight" @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
                <swiper-item  v-for="(item,index) in tabs" :key="index"> -->
                    <!-- <div v-if='activeIndex==0'>
                        <customer-tick :phone='phone'></customer-tick>
                        <del-wish></del-wish>
                    </div> -->
            <div class="tabs">
                <div :class="[tabIndex==index?'activeTab':'tab']" v-for="(item,index) in tabsList" :key="index" @click="changeIndex(index)">{{item}}</div>
            </div>
            <div v-show="tabIndex==0">
                     <div class="list" >
                        <div class="list_item">
                            <span class="user_name">
                                姓名
                            </span>
                            <input type="text" placeholder="请输入姓名" style="width:100%" placeholder-style="color:#aaa;font-size:15px;text-align:right" class="user_text" v-model="name" @input="updateInfo">
                        </div>
                    </div>
                    <div class="list">
                        <div class="list_item">
                            <picker @change="bindgender" :range-key="'name'" :range="genderOption">
                                <view class="picker">
                                    <span class="user_name">
                                        性别
                                    </span>
                                    <span class="detail_info" v-if="gender!==''">
                                        {{genderOption[gender].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择性别
                                    </span>
                                    <span class="right_icon">
                                        <img v-if="imageApi" :src="imageApi+'/right_icon.png'" alt="" class="right_icon" >
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <span class="user_name">
                                年龄
                            </span>
                            <input type="number" placeholder="请输入年龄" style="width:100%" placeholder-style="color:#aaa;font-size:15px;text-align:right" class="user_text" v-model="age" @input="updateInfo">
                        </div>
                        <div class="list_item">
                            <picker @change="bindMarry" :range-key="'name'" :range="marryOption">
                                <view class="picker">
                                    <span class="user_name">
                                        婚否
                                    </span>
                                    <span class="detail_info" v-if="marry!==''">
                                        {{marryOption[marry].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择婚否
                                    </span>
                                    <span class="right_icon">
                                        <img v-if="imageApi" :src="imageApi+'/right_icon.png'" alt="" class="right_icon">
                                    </span>
                                </view>
                            </picker>
                        </div>
                        
                         <div class="list_item">
                            <picker @change="bindcusLeve" :range-key="'name'" :range="cusLeve">
                                <view class="picker">
                                    <span class="user_name">
                                    客户级别
                                    </span>
                                    <span class="detail_info" v-if="leve!==''">
                                        {{cusLeve[leve].name}}
                                    </span>
                                    <span class="right_icon">
                                        <img v-if="imageApi" :src="imageApi+'/right_icon.png'" alt="" class="right_icon">
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="bindinfoSource" :range-key="'name'" :range="infoSource">
                                <view class="picker">
                                    <span class="user_name">
                                    信息来源
                                    </span>
                                    <span class="detail_info" v-if="info!==''">
                                        {{infoSource[info].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择信息来源
                                    </span>
                                    <span class="right_icon">
                                        <img v-if="imageApi" :src="imageApi+'/right_icon.png'" alt="" class="right_icon">
                                    </span>
                                </view>
                            </picker>
                        </div>
                       <div class="list_item">
                            <picker @change="bindshopNum" :range-key="'name'" :range="shopNum">
                                <view class="picker">
                                    <span class="user_name">
                                        进店次数
                                    </span>
                                    <span class="detail_info" v-if="shop!==''">
                                        {{shopNum[shop].name}}
                                    </span>
                                    <span class="right_icon">
                                        <img v-if="imageApi" :src="imageApi+'/right_icon.png'" alt="" class="right_icon">
                                    </span>
                                </view>
                            </picker>
                        </div>
                        
                    </div>
                </div>
            <div >
            <div v-show="tabIndex==1">
                <div class="list">
                    <div class="list_item">
                            <picker @change="bindPickerChange" :range-key="'modelName'" :range="carList">
                                <view class="picker">
                                    <span class="user_name" >
                                    意向车系
                                    </span>
                                    <span class="detail_info" v-if="toCar||toCar===0">
                                        {{carList[toCar].modelName}}
                                    </span>
                                    <span class="detail_info" v-else>
                                         请选择意向车系
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if="imageApi">
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="changeType" :value='index' :range='carTypeList'>
                                <view class="picker">
                                    <span class="user_name" >
                                    意向车型
                                    </span>
                                    <span class="detail_info" v-if="carModel">
                                        {{carModel}}
                                    </span>
                                    <span class="detail_info" v-else>
                                         请选择意向车型
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <span class="user_name" >
                                颜色偏好
                            </span>
                            <input type="text" placeholder="请选择客户喜欢的颜色" style="width:100%" placeholder-style="color:#aaa;font-size:15px;text-align:right" class="user_text" v-model="color" @input="updateInfo">
                        </div>
                        <div class="list_item"  @click="startFun">
                            <view class="picker">
                                <span class="user_name" >
                                    用途
                                </span>
                                <span class="detail_info" v-if="useStyle">
                                    {{useStyle}}
                                </span>
                                <span class="detail_info" v-else>
                                    请选择用途
                                </span>
                                <span class="right_icon">
                                    <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                </span>
                            </view>
                        </div>
                        <div class="list_item">
                            <!-- <picker @change="changeType" :value='index' :range='carTypeList'> -->
                                <!-- <view class="picker">
                                    <span class="user_name" >
                                    购车时间
                                    </span>
                                    <span class="detail_info" v-if="carModel">
                                        {{carModel}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择购车时间
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon">
                                    </span>
                                </view>
                            </picker> -->
                            <picker mode="date" :value="dateTime"  @change="bindDateChange" class="picker">
                                  <view class="picker">
                                    <span class="user_name" >
                                    购车时间
                                    </span>
                                    <span class="detail_info" v-if="dateTime">
                                        {{dateTime}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择购车时间
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="binduserArea" :range-key="'name'" :range="userArea">
                                <view class="picker">
                                    <span class="user_name">
                                    用车地区
                                    </span>
                                    <span class="detail_info" v-if="useLocation!==''">
                                        {{userArea[useLocation].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                       请选择用车地区
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                </div>
            </div>
            <div v-show="tabIndex==2">
                <div class="list">
                    <div class="list_item">
                            <picker @change="bindsubstitute" :range-key="'name'" :range="substitute">
                                <view class="picker">
                                    <span class="user_name">
                                    是否置换
                                    </span>
                                    <span class="detail_info" v-if="changes!==''">
                                        {{substitute[changes].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择是否置换
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="bindpayMode" :range-key="'name'" :range="payMode">
                                <view class="picker">
                                    <span class="user_name">
                                    支付方式
                                    </span>
                                    <span class="detail_info" v-if="payType!==''">
                                        {{payMode[payType].name}}
                                    </span>
                                    <span class="detail_info" v-else>
                                        请选择支付方式
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="bindisDrive" :range-key="'name'" :range="isDrive">
                                <view class="picker">
                                    <span class="user_name">
                                    是否试驾
                                    </span>
                                    <span class="detail_info" v-if="drive!==''">
                                        {{isDrive[drive].name}}
                                    </span>
                                     <span class="detail_info" v-else>
                                        请选择是否试驾
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi' >
                                    </span>
                                </view>
                            </picker>
                        </div>
                        <div class="list_item">
                            <picker @change="bindisIndex" :range-key="'name'" :range="isDrive">
                                <view class="picker">
                                    <span class="user_name">
                                    是否有指标
                                    </span>
                                    <span class="detail_info" v-if="carIndex!==''">
                                        {{isDrive[carIndex].name}}
                                    </span>
                                     <span class="detail_info" v-else>
                                        请选择是否有指标
                                    </span>
                                    <span class="right_icon">
                                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                                    </span>
                                </view>
                            </picker>
                        </div>
                </div>
                <div class="list_item_"  @click="sendPriceNote">
                     <span class="user_name">
                        发出的报价单
                    </span>
                    <span class="right_icon">
                        <img :src="imageApi+'/right_icon.png'" alt="" class="right_icon" v-if='imageApi'>
                    </span>
                </div>
            </div>
                   <div v-show="checkboxSelect" class="sele_checkb">
                       <div class="header">
                           <span class="cancle_" @click="cancleCheckbox">取消</span>
                           <span class="submit_" @click="submitCheckox">确定</span>
                       </div>
                       <div>
                           <checkbox-group @change="checkboxChange" >
                                <label class="checkbox" v-for="(item,index) in useOption" :key="index" style="display:block;padding-left:300rpx;margin-top:40rpx;padding-bottom:40rpx;border-bottom:1px solid #ccc;">
                                    <checkbox :value="item.name" :checked="item.checked"/>{{item.value}}
                                </label>
                            </checkbox-group>
                       </div>
                   </div>
                    <!-- <div class="but_submit" @click="update" :style="{backgroundColor: vi.all.pageBtn.bgColor, color: vi.all.pageBtn.color}">保存修改</div> -->
                     <div class="but_submit" @click="update" >
                        保存修改
                    </div>
                    </div>
                    <div class="visit_list" v-if='activeIndex==2'>
                        <div class="visit" v-if='visitList.length>0'>
                            <div class="visit_item" v-for="(item,ins) in visitList" :key='ins'>
                                <div>
                                    <span class="visit_title">接待时间</span>
                                    <span class="visit_detail">{{item.receptionTime}}</span>
                                </div>
                                <div>
                                    <span class="visit_title">接待结果</span>
                                    <span class="visit_detail" v-if="item.tradeStatus==3">
                                        
                                        <span class="badge badge_a" v-if='item.cusLevel==2'>A</span>
                                        <span class="badge badge_b" v-if='item.cusLevel==3'>B</span>
                                        <span class="badge badge_c" v-if='item.cusLevel==4'>C</span>
                                        <span class="badge badge_h" v-if='item.cusLevel==1'>H</span>
                                        <span v-if='item.tradeStatus==1'>
                                            成交
                                        </span>
                                        <span v-if='item.tradeStatus==2'>
                                            失败
                                        </span>
                                        <span v-if='item.tradeStatus==3'>
                                            跟进中
                                        </span>
                                        <span v-if="item.isFailActive==1">
                                            (战败激活)
                                        </span>
                                    </span>
                                    <span class="visit_detail" v-if="item.tradeStatus==2">
                                        
                                        <span class="badge badge_l" v-if='item.cusLevel==6'>L</span>
                                        <span v-if='item.tradeStatus==1'>
                                            成交
                                        </span>
                                        <span v-if='item.tradeStatus==2'>
                                            失败
                                        </span>
                                        <span v-if='item.tradeStatus==3'>
                                            跟进中
                                        </span>
                                        <span v-if="item.isFailActive==1">
                                            (战败激活)
                                        </span>
                                    </span>
                                    <span class="visit_detail" v-if="item.tradeStatus==1">
                                       
                                        <span class="badge badge_i" v-if='item.cusLevel==5'>I</span>
                                        <span v-if='item.tradeStatus==1'>
                                            成交
                                        </span>
                                        <span v-if='item.tradeStatus==2'>
                                            失败
                                        </span>
                                        <span v-if='item.tradeStatus==3'>
                                            跟进中
                                        </span>
                                        <span v-if="item.isFailActive==1">
                                            (战败激活)
                                        </span>
                                    </span>
                                </div>
                                <div class="bade_conten">
                                    <span class="visit_title">影响因素</span>
                                    <span class="visit_detail error_result">
                                        {{item.element||'无记录'}}
                                    </span>
                                </div>
                                <div>
                                    <span class="visit_title">销售顾问</span>
                                    <span class="visit_detail">{{item.salesmanName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="img_scope" v-else>
                            <img :src="imageApi+'/user_default.png'" alt="" >
                            <span class="default_size">暂无接待记录</span>
                        </div>
                    </div>
                <!-- </swiper-item>
            </swiper> -->

    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    import {fenxiang} from "../../../utils";
    import {formateTtime} from "../../../utils";
    import {formateSTime} from "../../../utils";
    import {imageApi} from "../../../http/url";
    import customerTick from "../../../components/customerTrick/index"
    import delWish from "../../../components/delWish/index"
    import expenseLevel from "../../../components/expenseLevel/index"
    import portrayal from "../../../components/portrayal/index"
    export default {
        components:{
            customerTick,
            delWish,
            expenseLevel,
            portrayal
        },
        data(){
            return{
                imageApi,
                tabs: [
                    // {
                    //     name: "潜客洞察",
                    //     type: "0",
                    //     checked: true
                    // },
                    {
                        name: "客户档案",
                        type: "1",
                        checked: true
                    },
                    // {
                    //     name: "接待记录",
                    //     type: "2",
                    //     checked: true
                    // },
                ],
                tabsList:['基本信息','需求信息','报价信息'],
                tabIndex:0,
                isShow:false,
                shopNum:[{
                    name:'首次',
                    id:1
                },{
                     name:'二次及以上',
                    id:2
                }],
                infoSource:[{
                     name:'自然进店',
                    id:1
                },{
                     name:'媒体 ',
                    id:2
                },{
                     name:'顾问邀约',
                    id:3
                }],
                cusLeve:[{
                    name:'H',
                    id:1
                },{
                    name:'A',
                    id:2
                },{
                    name:'B',
                    id:3
                },{
                    name:'C',
                    id:4
                }],
                isDrive:[{
                    name:'是',
                    id:'1'
                },{
                    name:'否',
                    id:'2'
                }],
                substitute:[{
                    name:'是',
                    id:'Y'
                },{
                    name:'否',
                    id:'N'
                }],
                userArea:[{
                    name:'本地',
                    id:'1'
                },{
                    name:'外地',
                    id:'2'
                }],
                userType:[{
                     name:'成交',
                    id:'1'
                },{
                    name:'失败',
                    id:'2'
                },{
                    name:'跟进中',
                    id:'3'
                }],
                payMode:[{
                    name:'全款',
                    id:'1'
                },{
                    name:'贷款',
                    id:'2'
                }],
                marryOption:[{
                    name:'已婚',
                    id:1
                },{
                    name:'未婚',
                    id:2
                }],
                genderOption:[{
                    name:'男',
                    id:1
                },{
                    name:'女',
                    id:2
                }],
                useOption:[{
                    name:'家庭用车',
                    value:'家庭用车',
                    checked:false

                },{
                    name:'商用',
                    value:'商用',
                    checked:false
                    
                },{
                    name:'旅游',
                    value:'旅游',
                    checked:false
                }],
                // carList:[],
                carTypeList:[],
                carModel:'',
                name:'',
                age:'',
                shop:'0',
                info:'',
                leve:'0',
                gender:'',
                marry:'',
                color:'',
                dateTime:'',
                drive:'',
                carIndex:'',
                changes:'',
                toCar:'',
                useLocation:'',
                payType:'',
                activeIndex: 1,
                currentTab: 0,
                winWidth: 0,
                winHeight: 0,
                Username:'',
                phone:'',
                uqlId:'',
                inCount:'',
                cusLevel:'',
                visitList:[],
                option:'',
                faultReason:'',
                trend:'',
                brandId:'',
                createSource:'',
                appointmentTime: '',
                ts:'',
                td:'',
                isCounts:'',
                isLeve:false,
                urlStatus:0,
                checkboxSelect:false,
                useStyle:''
            }
        },
        computed: {
            navbarSliderClass() {
            if (this.activeIndex == 0) {
                return "navbar_slider_0";
            }
            if (this.activeIndex == 1) {
                return "navbar_slider_1";
            }
            if (this.activeIndex == 2) {
                return "navbar_slider_2";
            }
            if (this.activeIndex == 3) {
                return "navbar_slider_3";
            }
            },
            contentHeight() {
            return this.winHeight + "px";
            },
            ...mapGetters({
                'userInfo':'userInfo',
                'carList':'user/carList',
                'vi': 'vi',
                'customerPhone':'user/customerPhone'
            }),
            isNum(){
                if(this.shop==1){
                    if(this.isCounts>1){
                        return this.isCounts
                    }else{
                        return 2
                    }
                }else{
                    return 1
                }
            }

        },
        methods: {
             ...mapMutations({
                'getCarList':'user/getCarList',
                'setCustomerPhone':'user/setCustomerPhone'

            }),
            ...mapActions({
                'updateUserInfo':'user/updateUserInfo',
                'visitLog':'user/visitLog',
                'getCarSeries':'user/getCarSeries',
                'customerTick':'user/customerTick',
                'getPersonlinfo':'user/getPersonlinfo',
                'getCarType':'user/getCarType'
            }),
            changeIndex(index){
                this.tabIndex=index
            },
            closeFunBack(){
                wx.navigateBack({

                })
            },
            tabClick(e) {
                this.activeIndex = e.currentTarget.id;
                this.currentTab =this.activeIndex;
                this.visit();
            },
            swiperChange(e) {
                this.currentTab = e.mp.detail.current;
                this.activeIndex = this.currentTab;
                this.visit();
            },
            customInFn(val){
                this.urlStatus=1
                setTimeout(() => {
                    if(this.isLeve){
                    this.isShow=true
                    }else{
                        this.isShow=false
                        this.customIn()
                    }
                }, 300);

            },
            customIn(){
                var that=this;
                if(this.trend==1){
                    wx.showModal({
                        title: '提示',
                        cancelText:'取消',
                        confirmText:'查看',
                        cancelColor:'#899BC1',
                        confirmColor:'#FF443F',
                        content: '当前客户已成交',
                        success(res) {
                            if (res.confirm) {
                               that.activeIndex=2;
                               that.visit();
                            } else if (res.cancel) {
                            }
                        }
                    })
                }else if(this.trend==2){

                    wx.showModal({
                        title: '提示',
                        cancelText:'否',
                        confirmText:'是',
                        cancelColor:'#899BC1',
                        confirmColor:'#FF443F',
                        content: "当前客户'已战败'是否激活交易",
                        success(res) {
                            if (res.confirm) {
                                that.trend=3
                               that.updateUserInfo({
                                    uqlId:that.uqlId,
                                    phone:that.customerPhone,
                                    tradeStatus:that.trend
                                })
                                that.activeIndex=2;
                                that.visit();
                                wx.navigateTo({
                                    url: '../customerIn/main?uqlId='+that.uqlId+'&cl='+that.leve
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                }else{
                    wx.navigateTo({
                        url: '../customerIn/main?uqlId='+this.uqlId+'&cl='+this.leve
                    })
                }
            },
            customLook(){
                wx.navigateTo({
                    url: '../../index/main?option='+this.option+'&activeIndex=dcgl'
                })
            },
            sendPice(){
                var  name=this.name&&this.name!='null'?this.name:''
                wx.navigateTo({
                    url: '../../app/quote/edit/main?phone='+this.customerPhone+'&userName='+name
                })
            },
            sendPriceNote(){
                wx.navigateTo({
                    url: '/pages/user/priceNote/main'
                })
            },
            sendPiceFn(){
                this.urlStatus=4
                if(this.isLeve){
                    this.isShow=true
                }else{
                    this.isShow=false
                    this.sendPice()
                }
            },
            shareCardFn(){
                this.urlStatus=2
                if(this.isLeve){
                    this.isShow=true
                }else{
                    this.isShow=false
                    this.shareCard()
                }
            },
            shareCard(){
                const that=this;
                let params = [that.userInfo.foursId, 2, that.userInfo.userId].join()
                mpvue.navigateToMiniProgram({
                    appId: 'wxb531f813eaa2c2ea',
                    path: '/pages/sell/index?scene='+ params,
                    // envVersion: 'trial',
                    success (res) {
                    console.log('跳转c端销售落地页',res, params)
                    }
                })
            },
            activeFun(){
                wx.navigateTo({
                    url: '/pages/admin/recommendActivity/main'
                })
            },
            activeFunc(){
                this.urlStatus=3
                if(this.isLeve){
                    this.isShow=true
                }else{
                    this.isShow=false
                    this.activeFun()
                }
            },
            async getCar(v){
                console.log('carlist:---------',)
                let res=await this.getCarType({modelName: this.carList[this.toCar].modelName||v});
                if(res.code==0){
                    console.log(res.code,'chexi')
                    this.carTypeList=res.data
                }
                
            },
             async getCarData(){
                let res=await this.getCarSeries({manuId: this.userInfo.manuId,foursId:this.userInfo.foursId,pageNum:1,numPerPage:1000});
                this.getCarList(res.data)
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
            update(){
                console.log('update')
                this.updateUserInfo({
                    uqlId:this.uqlId,
                    name:this.name,
                    phone:this.customerPhone,
                    inCount:this.isNum,
                    sex:this.gender?this.genderOption[this.gender].id:'',
                    age:this.age,
                    channel:this.info?this.infoSource[this.info].id:'',
                    colorPreference:this.color,
                    carUses:this.useStyle,
                    shoppingTime:this.dateTime&&this.dateTime.replace(/'-'/g,'/'),
                    isIndicators:this.carIndex?this.genderOption[this.carIndex].id:'',
                    marriage:this.marry?this.genderOption[this.marry].id:'',
                    cusLevel:Number(this.leve)+1,
                    isDrive:this.drive?this.isDrive[this.drive].id:'',
                    substitute:this.changes?this.substitute[this.changes].id:'',
                    carType:this.toCar?this.carList[this.toCar].modelName:'',
                    carModel:this.carModel,
                    userArea:this.useLocation?this.userArea[this.useLocation].id:'',
                    payMode:this.payType?this.payMode[this.payType].id:'',
                    tradeStatus:this.trend
                })
                this.tabIndex=0
            },
            cancleFun(){
                this.isShow=false;
                this.isLeve=false;
                if(this.urlStatus==1){
                    this.customIn()
                }
                else if(this.urlStatus==2){
                    this.shareCard()
                }
                else if(this.urlStatus==3){
                    this.activeFun()
                }
                else if(this.urlStatus==4){
                    this.sendPice()
                }
            },
            cancleClose(){
                this.isShow=false;
            },
            submitFun(){
                this.updateUserInfo({
                    uqlId:this.uqlId,
                    name:this.name,
                    phone:this.customerPhone,
                    inCount:this.isNum,
                    channel:this.info?this.infoSource[this.info].id:'',
                    sex:this.gender?this.genderOption[this.gender].id:'',
                    age:this.age,
                    colorPreference:this.color,
                    carUses:this.useStyle,
                    shoppingTime:this.dateTime&&this.dateTime.replace(/'-'/g,'/'),
                    isIndicators:this.carIndex?this.genderOption[this.carIndex].id:'',
                    marriage:this.marry?this.genderOption[this.marry].id:'',
                    cusLevel:Number(this.leve)+1,
                    isDrive:this.drive?this.isDrive[this.drive].id:'',
                    substitute:this.changes?this.substitute[this.changes].id:'',
                    carType:this.toCar?this.carList[this.toCar].modelName:'',
                    carModel:this.carModel,
                    userArea:this.useLocation?this.userArea[this.useLocation].id:'',
                    payMode:this.payType?this.payMode[this.payType].id:'',
                    tradeStatus:this.trend
                })
                if(this.urlStatus==1){
                    this.customIn()
                }
                else if(this.urlStatus==2){
                    this.shareCard()
                }else if(this.urlStatus==3){
                    this.activeFun()
                }else if(this.urlStatus==4){
                    this.sendPice()
                }
                this.isShow=false;
                this.isLeve=false;
                this.tabIndex=0
            },
            async visit(){
                let res=await this.visitLog({
                    foursId:this.userInfo.foursId,
                    phone:this.customerPhone
                })
                this.visitList=res.data.recordList;
                var num=this.visitList[0].cusLevel;
                // this.leve=Number(num)-1;
                this.trend=this.visitList[0].tradeStatus;
            },
            startFun(){
                this.checkboxSelect=true
            },
            cancleCheckbox(){
                this.checkboxSelect=false
            },
            submitCheckox(){
                this.checkboxSelect=false
                let val=this.useStyle;
                this.useOption=this.useOption.map((v)=>{
                    return {
                        ...v,
                        checked:val.includes(v.name)
                    }
                })
                if(val.length){
                    this.useStyle=val.join(',')
                }else{
                    this.useStyle=''
                }
            },
            onAnimationfinish() {
            },
            updateInfo(){
                // this.update()
                this.isLeve=true
            },
            bindshopNum(e){
                this.shop=e.mp.detail.value;
                console.log(this.shop)
                this.isLeve=true
                // this.update()
            },
            bindgender(e){
                this.gender=e.mp.detail.value
            },
            bindMarry(e){
                this.marry=e.mp.detail.value
            },
            bindinfoSource(e){
                this.info=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            bindcusLeve(e){
                this.leve=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            bindisDrive(e){
                this.drive=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            bindsubstitute(e){
                this.changes=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            bindPickerChange(e){
                this.toCar=e.mp.detail.value;
                this.isLeve=true
                this.carModel='';
                this.getCar()
                // this.update()
            },
            binduserArea(e){
                this.useLocation=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            bindpayMode(e){
                this.payType=e.mp.detail.value;
                this.isLeve=true
                // this.update()
            },
            checkboxChange(e){
                console.log(e.mp.detail.value)
                let  val=e.mp.detail.value
                this.useOption=this.useOption.map((v)=>{
                    return {
                        ...v,
                        checked:val.includes(v.name)
                    }
                })
                if(val.length){
                    this.useStyle=val.join(',')
                }else{
                    this.useStyle=''
                }
                
            },
            bindDateChange(e){
                this.dateTime=e.mp.detail.value
            },
            bindisIndex(e){
                this.carIndex=e.mp.detail.value
            },
            // 获取单个用户信息
            async getSingleInfo(){
                let res= await this.getPersonlinfo({salesman:this.userInfo.userId,foursId:this.userInfo.foursId,phone:this.customerPhone})
                    console.log('opp',res)
                if(res.code==0){
                    let op=res.data;
                    console.log('op',op)
                    this.createSource=op.createSource;
                    this.appointmentTime = op.appointmentTime;
                    this.ts=formateTtime(op.appointmentTime);
                    this.td=formateSTime(op.appointmentTime)
                    this.Username=op.name;
                    this.name=op.name=='null'?'':op.name;
                    this.uqlId=op.uqlId;
                    this.brandId=op.brandId
                    this.trend=op.tradeStatus
                    this.info=op.channel?Number(op.channel)-1:'';
                    this.shop=Number(op.inCount)===0?1:Number(op.inCount)-1;
                    this.leve=Number(op.cusLevel)-1;
                    this.drive=op.isDrive?Number(op.isDrive)-1:'';
                    this.changes=op.substitute?(op.substitute=='Y'?0:1):'';
                    this.useLocation=op.userArea?Number(op.userArea)-1:'';
                    this.payType=op.payMode?Number(op.payMode)-1:'';
                    this.gender=op.sex?Number(op.sex)-1:'';
                    console.log(this.gender,'this.gender')
                    this.age=op.age;
                    console.log(this.age,'this.age')
                    this.marry=op.marriage?Number(op.marriage)-1:'';
                    console.log(this.marry,'this.marry')
                    this.color=op.colorPreference;
                    console.log(this.color,'this.color')
                    this.useStyle=op.carUses;
                    
                    let val=op.carUses?op.carUses.split(','):[];
                    if(val.length){
                        this.useOption=this.useOption.map((v)=>{
                            return {
                                ...v,
                                checked:val.includes(v.name)
                            }
                        })
                    }
                    
                    console.log(this.useStyle,'this.useStyle')
                    this.dateTime=op.shoppingTime&&op.shoppingTime.replace('/','-');
                    console.log(this.dateTime,'this.dateTime')
                    this.carIndex=op.isIndicators?Number(op.isIndicators)-1:'';
                    console.log(this.carIndex,'this.carIndex')
                    // console.log(op.marriage,'op.marriage')
                    
                    this.carModel=op.carModel
                    console.log(this.carModel,'this.carModel')
                    var index='';
                    this.carList.forEach((v,i)=>{
                        if(v.modelName==op.carType){
                            this.toCar=i;
                        }
                    })
                }
            },
            changeType(e){
                this.carModel=this.carTypeList[e.mp.detail.value]
                console.log(e)
                this.isLeve=true
            }
        },
        onShareAppMessage() {
            fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onShow(){
            this.getCarData()
            this.activeIndex=0;
            let page=getCurrentPages();
            let curee=page[page.length-1];
            if(curee.data.activeIn){
                this.activeIndex=2;
                this.visit();
            }
        },
        onLoad(op) {
            this.getSingleInfo()
            var res = wx.getSystemInfoSync();
            this.winWidth = res.windowWidth;
            this.winHeight = res.windowHeight;
            this.visit();
        },

    }
</script>

<style lang="scss" scoped>
    .customer_main{
        height:0;
        overflow:hidden;
        
    }
    .list_item_{
        height: 10.1494vh;
        width: 100%;
        position: relative;
        padding: 0 40rpx;
       background:rgba(247,247,250,1);
       box-sizing: border-box;
       line-height: 10.1494vh;
        .user_text{
            font-size: 15px;
            color: #333;
            margin-left: 0vw;
            text-align: right;
        }
        .user_name{
            font-size: 13px;
            color: #888;
            margin-right: 14.933333vw;
            display: inline-block;
            width: 22vw;
        }
        .detail_info{
            font-size: 13px;
            display: inline-block;
            width:50vw;
            text-align: right;
        }
        .right_icon{
            position: absolute;
            right: 17rpx;
            bottom: 1.9vh;
            height: 1.9490vh;
            width: 2.13333vw;
        }
    }
    .sele_checkb{
        width: 100%;
        height: 600rpx;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 1000;
        .header{
            height: 80rpx;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cancle_{
                color: #999;
                margin-left:40rpx;
            }
            .submit_{
                color: #999;
                margin-right:40rpx;
            }
            
        }
        .checkbox{
            display: block;
            font-size: 28rpx;
        }
    }
    .animationSelect{
        transition: height 0.5s ease;
        width: 100%;
        height: 600rpx;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 1000;
    
        .header{
            height: 80rpx;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cancle_{
                color: #999;
                margin-left:40rpx;
            }
            .submit_{
                color: #999;
                margin-right:40rpx;
            }
            
        }
    }
    .tabs{
        font-size: 28rpx;
        color:#999;
        display: flex;
        padding-left: 40rpx;
        margin-top: 50rpx;
        .activeTab{
            color: #111;
            border-bottom: 2px solid #111;
            margin-right: 30rpx;
        }
        .tab{
            margin-right: 30rpx;
        }
    }
    .customer_msg{
        .cus_title{
           color: #1A1A1A;
           font-size: 54rpx;
           font-weight: 500;
           margin-left: 40rpx;
           margin-top: 50rpx;
        }
        .new_close{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            top:28rpx;
            right: 40rpx;
        }
        .user_msg{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top:64rpx;
            padding: 0 40rpx;
            .user_icon{
                width: 9.6vw;
                height: 9.6vw;
                border-radius: 50%;
                background: #ccc;
                position: relative;
                .header_img{
                    width: 100%;
                    height: 100%;
                }
            }
                .badge{
                    // position: absolute;
                    display: inline-block;
                    width: 4vw;
                    height: 4vw;
                    border-radius: 4px;
                    // right: 0;
                    // bottom: 0;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                }
                .badge_h{
                    border: 1px solid #FF5253;
                    color: #FF5253;
                }
                .badge_c{
                    border: 1px solid  #B0C939;
                    color:  #B0C939;
                }
                .badge_b{
                    border: 1px solid   #FFE131;
                    color:   #FFE131;
                }
                .badge_a{
                    border: 1px solid   #FFA600;
                    color:   #FFA600;
                }
                .badge_l{
                    background: #AAAAAA;
                }
                .badge_i{
                    background: #FFA678;
                }
        }
        .visite_time{
            width: 385rpx;
            height:34rpx;
            background:rgba(242,242,242,1);
            opacity:1;
            border-radius:8rpx;
            color: #767676;
            font-size: 24rpx;
            display: flex;
            justify-content: space-between;
            margin-left: 40rpx;
            margin-top: 20rpx;
            padding: 0 8rpx;
        }
        .liuzi{
            width:120rpx;
        }
        .menu_tabs{
            width:670rpx;
            height:160rpx;
            background:rgba(242,241,246,1);
            opacity:1;
            border-radius:32rpx;
            margin: 0 auto;
            margin-top: 32rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 48rpx;
            box-sizing: border-box;
            .tab_list{
                display: flex;
                flex-direction: column;
                align-items: center;
                .image_scope{
                    width: 60rpx;
                    height: 60rpx;
                    box-sizing: border-box;
                }
                img{
                    width: 100%;
                    height: 100%;
                    margin-bottom: 20rpx;
                }
                .tab_name{
                    color: #1A1A1A;
                    font-size: 24rpx;
                }
            }
        }
        .img_scope{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .default_size{
                font-size: 15px;
                color: #888;
            }
            img{
                width: 50.66666666666667vw;
                height: 21.58920539730135vh;
                margin-top: 6.746626686656672vh;
            }
        }
        .picker{
            display: flex;
            justify-content: space-between;
        }
        .name{
            color: #333;
            font-size: 40rpx;
            font-family:Source Han Sans CN;
            font-weight:500;
            margin-right: 2vw;
        }
        .phone_num{
            color: #333;
            font-family:Source Han Sans CN;
            font-weight:500;
            font-size: 40rpx;
            margin-right: 16rpx;
        }
        .phone{
            width: 5.3333vw;
            height: 5.3333vw;
        }
        .tabs_forword{
            width:160px;
            height:34px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(255,68,63,1);
            opacity:1;
            border-radius:20px;
            color: rgba(255,68,63,1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
        }
        .customer_tabs{
            padding: 0 5.3333vw;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            margin-top: 2.3988vh;
        }
        .looklike{
            width:160px;
            height:34px;
            background:rgba(255,68,63,1);
            border:1px solid rgba(255,68,63,1);
            opacity:1;
            border-radius:20px;
            color: #fff;
            display: flex;
            align-items: center;
             justify-content: center;
        }
        .img_info{
            width: 4.1vw;
            height: 4.1vw;
            margin-right: 1vw;
        }
        .list{
            margin: 0 3.46666vw;
            .list_item{
                border-bottom: 1px solid #F5F5F5;
                height: 10.1949vh;
                display: flex;
                align-items: center;
                margin-left: 1.866666vw;
                position: relative;
                .user_text{
                    font-size: 15px;
                    color: #333;
                    margin-left: 0vw;
                    text-align: right;
                }
                .user_name{
                    font-size: 13px;
                    color: #888;
                    margin-right: 14.933333vw;
                    display: inline-block;
                    width: 22vw;
                }
                .detail_info{
                    font-size: 13px;
                    display: inline-block;
                    width:50vw;
                    text-align: right;
                }
                .right_icon{
                    position: absolute;
                    right: 0;
                    bottom: 1.9vh;
                    height: 1.9490vh;
                    width: 2.13333vw;
                }
            }
        }
        .but_submit{
            width:670rpx;
            height:84rpx;
            background:rgba(187,10,48,1);
            opacity:1;
            color: #fff;
            font-size: 32rpx;
            text-align: center;
            line-height: 84rpx;
            position: fixed;
            border-radius:40rpx;
            bottom: 40rpx;
            left: 50%;
            transform: translateX(-335rpx)
        }
        .visit{
            .visit_item{
                margin: 0 5.33333vw;
                border-bottom: 1px solid #F5F5F5;
                min-height: 22.3388vh;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 1.5vh 0;
                .visit_title{
                    color: #888888;
                    font-size: 13px;
                    // display: inline-block;
                    // width: 26vw;
                    margin-right: 5.866666vw;
                }
                .visit_detail{
                    color: #333333;
                    font-size: 13px;
                    // margin-left: 5.866666vw;

                }
                .bade_conten{
                     display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
                .bade_style {
                     display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
                .error_result{
                    width: 75%;
                }
                .badge{
                    display: inline-block;
                    width: 4vw;
                    height: 4vw;
                    border-radius: 4px;
                    background: #ccc;
                    // vertical-align: middle;
                    text-align: center;
                    line-height: 4vw;
                    color: #fff;
                }
                .badge_h{
                    background: #FF5253;
                    // color:#FF5253;
                }
                .badge_c{
                    background: #B0C939;
                    // color: #B0C939
                }
                .badge_b{
                    background: #FFE131;
                    // color: #FFE131;
                }
                .badge_a{
                    background: #FFA600;
                    // color: #FFA600;
                }
                .badge_l{
                    background: #AAAAAA;
                }
                .badge_i{
                    background: #FFA678;
                }
            }
        }
        .swiper-item {
            height: 100%;
            text-align: right;
        }

        .navbar {
            display: none;
            width: 100%;
            background-color: #fff;
            color: #aaa;
            border-bottom: 1rpx solid #ccc;
            // justify-content: space-between;
            padding: 0 5.3333vw;
            box-sizing: border-box;
            margin-top:48rpx;
        }

        .navbar_item {
            position: relative;
            display: block;
            font-size: 0;
            margin-right: 10vw;

        }

        .navbar_item  {
            color: #aaa;
            font-size: 15px;
            padding: 5px 5px;
            // border-bottom: 2px solid rgba(85,85,85,1);
        }
        .navbar_item_on{
            color: #333;
            font-size: 15px;
            padding: 5px 5px;
            border-bottom: 2px solid rgba(85,85,85,1);
        }

        .navbar_title {
            // color: #aaa;
            font-weight: 500;
            display: inline-block;
            font-size: 15px;
            max-width: 8em;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }

        .navbar_slider {
            position: absolute;
            // content: " ";
            // left: 0;
            // bottom: 0;
            // width: 6em;
            // height: 3px;
            // background-color: white;
            // -webkit-transition: -webkit-transform 0.1s;
            // transition: -webkit-transform 0.1s;
            // transition: transform 0.1s;
            // transition: transform 0.1s, -webkit-transform 0.1s;
        }

        .navbar_slider_0 {
            // left: 29rpx;
            // transform: translateX(0);
        }

        .navbar_slider_1 {
            left: 29rpx;
            transform: translateX(250rpx);
        }

        .navbar_slider_2 {
            left: 29rpx;
            transform: translateX(500rpx);
        }
        .navbar_slider_3{
            left: 29rpx;
            transform: translateX(725rpx);
        }
        .controls {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            position: fixed;
            z-index: 8888;
            top: 80;
            height: 50px;
            width: 100%;
            background-color: #298de5;
        }
        .dialog{
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            z-index: 100;

            .modal{
                width:410rpx;
                height:250rpx;
                background:rgba(255,255,255,1);
                border:1px solid rgba(112,112,112,1);
                opacity:1;
                border-radius:16rpx;
                padding: 64rpx 50rpx 0rpx 48rpx;
                // box-sizing: border-box;
                margin:  0 auto;
                margin-top: 400rpx;
                position: relative;
                .close{
                    width: 22rpx;
                    height: 22rpx;
                    position: absolute;
                    right: 30rpx;
                    top: 30rpx;
                }
                .title{
                    display: inline-block;
                    color: #767676;
                    font-size: 28rpx;
                    margin-bottom: 48rpx;
                }
                .footer_sub{
                    display: flex;
                    justify-content: space-between;
                }
                .cancle{
                    width:180rpx;
                    height:70rpx;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(26,26,26,1);
                    opacity:1;
                    border-radius:8rpx;
                    color: #1A1A1A;
                    font-size: 28rpx;
                    text-align: center;
                    line-height: 70rpx;
                }
                .submit{
                    background:rgba(26,26,26,1);
                    border:1px solid rgba(26,26,26,1);
                    color: #fff;

                }
            }
        }
    }
</style>
