<template>
    <div class="customer_trick">
        <div class="title_dis">{{reception[0].secondTitles[0].description}}</div>
        <div class="label_name">
            {{reception[0].secondTitles[0].name}}
        </div>
        <div class="line"></div>
        <div class="list_content" v-if="dataList.length>0">
            <div :class="['list',index==0?'list':'last']" v-for=" (item,index) in dataList" :key="index">
                <span :class="colorList[item.code]"></span>
                <span class="text_disc">{{item.message}}</span>
                <div class="text_time">
                    <view>{{item.time}}</view>
                    <div class="text_made" @click="tiaozhuan(item.id,item.carModelId,item.carType)" v-if="item.code=='104'&&item.status=='0'" >立即制作</div>
                    <div class="text_made1" v-else>已制作</div>
                </div>
            </div>
        </div>
        <div class="img_scope" v-else>
            <img :src="imageApi+'/user_default.png'" alt="" v-if="imageApi">
            <span class="default_size">暂无客户动向</span>
        </div>
        <div class="but_more cus_but" @click="checkoutAll" v-if="dataList.length>0">
            查看全部动态
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters,mapMutations } from 'vuex';
    import {formatDay} from "../../../utils";
    import {imageApi} from "../../../http/url";
    export default {
        props:{phone:''},
        data(){
            return{
                imageApi,
                dataList:[],
                pageNo:1,
                pageSize:3,
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
                'customerPhone':'user/customerPhone',
                'reception':'user/reception'
            }),
        },
        methods: {
            ...mapActions({
                'customerTick':'user/customerTick',
            }),
            async checklist(phone) {
                let res=await this.customerTick({pageNo:this.pageNo,pageSize:this.pageSize,phone:this.customerPhone,foursId:this.userInfo.foursId})
                if(res.code==0){
                    this.dataList=this.dataList=res.data.recordList
                    this.dataList=this.dataList.map((v)=>{
                        return {
                            ...v,
                            time:formatDay(v.time)
                        }
                    })
                    // this.pageNo+=1;
                }
            },
            tiaozhuan(id,carModelId,carType) {
                wx.navigateTo({
                 url:"/pages/app/quote/edit/main?id="+id+'&carModelId='+carModelId+'&carType='+carType
                    })
              
            },
            checkoutAll() {
                console.log('--');
                wx.navigateTo({
                    url:'/pages/user/customerTick/main?phone='+this.customerPhone
                })
            }
        },
        onShow(){
            this.checklist()
        },
        onLoad(op){
            console.log('status');
            this.checklist()
            
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
        width: 670rpx;
        padding:30rpx;
        height: 900rpx;
        box-sizing: border-box;
        // border-bottom: 1px solid #E5E5E5;
        position: relative;
        .label_name{
            color: #1A1A1A;
            font-size: 50rpx;
            font-weight: 500;
            line-height: 50rpx;
        }
        .title_dis{
            color:#444;
            font-size: 28rpx;
            margin-bottom: 18rpx;
            line-height: 35rpx;
        }
        .line{
            width: 100%;
            height:4rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            margin-top: 30rpx;
        }
        .list_content{
            margin-top: 42rpx;
            min-height:430rpx ;
            .list{
                line-height: 0;
                min-height:140rpx;
                position: relative;
                // border-left: 1px dashed #E5E5E5;
                margin-bottom: 20rpx;
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
                    // width: 624rpx;
                    font-size:26rpx;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:34rpx;
                    color:rgba(118,118,118,1);
                    vertical-align: top;
                    margin-left: 24rpx;
                }
                .text_time{
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
        .but_more{
            position: absolute;
            width:320rpx;
            height:80rpx;
            border:1px solid rgba(187,10,48,1);
            opacity:1;
            border-radius:44rpx;
            color:  rgba(187,10,48,1);
            font-size: 30rpx;
            text-align: center;
            line-height: 84rpx;
            left: 50%;
            margin-left: -160rpx;
            bottom: 20rpx;
            // margin-top: 80rpx;
        }
    }
</style>