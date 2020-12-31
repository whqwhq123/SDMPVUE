<template>
    <div class="customer_trick">
        <div class="label_name">
            客户动向追踪
        </div>
        <div class="list_content">
            <div :class="['list',index==0?'list':'last']" v-for=" (item,index) in dataList" :key="index">
                <span :class="colorList[item.code]"></span>
                <span class="text_disc">{{item.message}}</span>
                <div class="text_time">{{item.time}}</div>
            </div>
        </div>
        <div class="load_more" >
            <div class="but_more" @click="checkoutAll">
                查看全部动态
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {formatDay} from "../../utils";
    export default {
        props:{phone:''},
        data(){
            return{
                dataList:[],
                pageNo:1,
                pageSize:2,
                colorList:{
                    '003':'bade_title',
                    '004':'bade_title',
                    '006':'bade_title',
                    '007':'bade_title',
                    '008':'bade_title',
                    '005':'third_color',
                    '009':'third_color',
                    '010':'third_color',
                    '011':'third_color',
                    '001':'second_color',
                    '002':'second_color',
                    '012':'second_color'
                }
            }
        },
        computed:{
            ...mapGetters({
                'userInfo':'userInfo',
            }),
        },
        methods: {
            ...mapActions({
                'customerTick':'user/customerTick'
            }),
            async checklist(phone) {
                let res=await this.customerTick({pageNo:this.pageNo,pageSize:this.pageSize,phone:phone,foursId:this.userInfo.foursId})
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
            checkoutAll() {
                console.log('--');
                wx.navigateTo({
                    url:'../customerTick/main?phone='+this.phone
                })
            }
        },
        onLoad(op){
            var op=JSON.parse(op.option);
            this.dataList=[]
            this.checklist(op.phone)
            
        }
    }
</script>

<style lang="scss" scoped>
    .customer_trick{
        padding:50rpx 40rpx 0 40rpx;
        box-sizing: border-box;
        border-bottom: 1px solid #E5E5E5;
        .label_name{
            color: #1A1A1A;
            font-size: 32rpx;
        }
        .list_content{
            margin-top: 64rpx;

            .list{
                line-height: 0;
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
                    color: #B3B3B3;
                    font-size: 24rpx;
                    margin-top: 24rpx;
                    margin-left: 24rpx;
                    height: 38rpx;
                }
            }
            .list::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: 100%;
                border-left: 1px dashed #ccc;
                position: absolute;
                top: 9rpx;
                left: 0rpx;
            }
            .last::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: 65%;
                border-left: 1px dashed #ccc;
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
    }
</style>