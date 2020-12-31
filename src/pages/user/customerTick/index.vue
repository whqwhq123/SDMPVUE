<template>
    <div class="customer_trick">
        <div class="label_name">
            客户动向追踪
        </div>
        <img :src="imageApi+'/new_close.png'" alt="" class='new_close' @click="closeFunBack">
        <div class="list_content" v-if="dataList.length>0">
            <div :class="['list',index==(dataList.length-1)?'last':'list']" v-for=" (it,index) in dataList" :key="index">
                <span :class="colorList[it.code]"></span>
                <span class="text_disc">{{it.message}}</span>
                <div class="text_time">
                    <view>{{it.createTime}}</view>
                    <div class="text_made" @click="tiaozhuan(it.id,it.carModelId,it.carType)" v-if="it.code=='104'&&it.status=='0'" >立即制作</div>
                    <div class="text_made1" v-else>已制作</div>
                </div>
            </div>
            
        </div>
        <div class="img_scope" v-else>
            <img :src="imageApi+'/user_default.png'" alt="" v-if="imageApi">
            <span class="default_size">暂无客户动向</span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {formatDay} from "../../../utils";
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
                dataList:[],
                pageNo:1,
                pageSize:10,
                phone:'',
                colorList:{
                    '007':'bade_title',
                    '009':'bade_title',
                    '022':'bade_title',
                    // '007':'bade_title',
                    // '008':'bade_title',
                    '005':'third_color',
                    '008':'third_color',
                    '010':'third_color',
                    '011':'third_color',
                    '020':'third_color',
                    '021':'third_color',
                    '001':'second_color',
                    '002':'second_color',
                    '003':'second_color',
                    '004':'second_color',
                    '006':'second_color',
                    '012':'second_color',
                    '013':'second_color',
                    '014':'second_color',
                    '015':'second_color',
                    '016':'second_color',
                    '017':'second_color',
                    '018':'second_color',
                    '019':'second_color'
                }
            }
        },
        computed:{
            ...mapGetters({
                'userInfo':'userInfo',
                'customerPhone':'user/customerPhone'
                
            }),
        },
        methods: {
            ...mapActions({
                'customerTick':'user/customerTick'
            }),
            closeFunBack(){
                wx.navigateBack({
                    
                })
            },
            tiaozhuan(id,carModelId,carType) {
                wx.navigateTo({
                 url:"/pages/app/quote/edit/main?id="+id+'&carModelId='+carModelId+'&carType='+carType
                    })
              
            },
            async checkoutAll() {
                let res=await this.customerTick({pageNo:this.pageNo,pageSize:this.pageSize,phone:this.customerPhone,foursId:this.userInfo.foursId})
                console.log(res)
                if(res.code==0){
                    this.dataList=this.dataList.concat(res.data.recordList)
                    this.dataList=this.dataList.map((v)=>{
                        return {
                            ...v,
                            createTime:formatDay(v.time)
                        }
                    })
                    this.pageNo+=1;
                }
            },

        },
        onShow(){
            this.pageNo=1;  
            this.dataList=[]
            this.checkoutAll()
        },
        onReachBottom(){
            this.checkoutAll()
        },
        onLoad(op){
           this.pageNo=1;  
            this.dataList=[]
        }
    }
</script>

<style lang="scss" scoped>
.text_made {
      width:120rpx ;
      height: 40rpx;
      background-color: #BB0A30;
      font-size: 25rpx;
      text-align: center;
      line-height: 40rpx;
      color: white;
      border-radius: 20rpx;
  }
  .text_made1 {
      width:120rpx ;
      height: 40rpx;
      background-color: #E5E5E5;
      font-size: 25rpx;
      text-align: center;
      line-height: 40rpx;
      color: #999999;
      border-radius: 20rpx;
  }
    .customer_trick{
        padding:56rpx 40rpx 0 40rpx;
        box-sizing: border-box;
        .label_name{
            color: #1A1A1A;
            font-size: 54rpx;
            font-weight: 500;
            line-height: 54rpx;
        }
        .new_close{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            top:28rpx;
            right: 40rpx;
        }
        .list_content{
            margin-top: 68rpx;

            .list{
                min-height:140rpx;
                position: relative;
                // border-left: 1px dashed #E5E5E5;
                .bade_title{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                    background:rgba(255,82,83,1);
                    border-radius:50%;
                    opacity:1;
                    position: absolute;
                    top: 8rpx;
                    left:-5rpx;
                }
                .second_color{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                    border-radius:50%;
                    opacity:1;
                    position: absolute;
                    top: 8rpx;
                    left:-5rpx;
                    background:#999999;
                }
                .third_color{
                    display: inline-block;
                    width:16rpx;
                    height:16rpx;
                    border-radius:50%;
                    opacity:1;
                    position: absolute;
                    top: 8rpx;
                    left:-5rpx;
                    background:#FFA600;
                }
                .text_disc{
                    display: inline-block;
                    width: 624rpx;
                    font-size:26rpx;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:34rpx;
                    color:rgba(118,118,118,1);
                    vertical-align: top;
                    margin-left: 24rpx;
                }
                .text_time{
                    // color: #B3B3B3;
                    // font-size: 24rpx;
                    // margin-top: 15rpx;
                    // margin-left: 24rpx;
                    // line-height: 24rxp;
                    // margin-bottom: 20rpx;
                    color: #B3B3B3;
                    font-size: 24rpx;
                    margin-top: 24rpx;
                    margin-left: 24rpx;
                    line-height: 24rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
            .list::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: 100%;
                // border-left: 1px dashed #ccc;
                position: absolute;
                top: 9rpx;
                left: 0rpx;
            }
            .last::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: 65%;
                // border-left: 1px dashed #ccc;
                position: absolute;
                top: 9rpx;
                left: 0rpx;
            }
        }
        .load_more{
            height: 198rpx;
            width: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .but_more{
                width:320rpx;
                height:84rpx;
                border:1px solid rgba(26,26,26,1);
                opacity:1;
                border-radius:44rpx;
                color: #1A1A1A;
                font-size: 32rpx;
                text-align: center;
                line-height: 84rpx
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
    }
</style>