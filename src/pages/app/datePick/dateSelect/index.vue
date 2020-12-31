<template>
    <div class="date_pick" >
        <div class="pick_scope_content common_pick">
            <div class="top_mneu">
                <span class="cancle" @click="cancle">取消</span>
                <span class="placehold">选择时间</span>
                <span class="cancle" @click="finish">完成</span>
            </div>
            <div class="date_select_pick">
                <span class="label_name">{{active?dateLabel[1]:dateLabel[0]}}</span>
                <img v-if="imageApi" :src="imageApi + '/trans.png'" alt="" class="trans" @click="transFun">
            </div>
            <div class="date_input">
                    <input type="text" readonly='readonly' :class="[showLine?'date_text':'default_text']" v-model="startTime" placeholder="开始时间" @focus="changeStart" v-if="active">
                    <span class="rang" v-if="active">至</span>
                    <input type="text" readonly='readonly' :class="[!showLine?'date_text':'default_text']" v-model="endTime" placeholder="结束时间" @focus="changeEnd" v-if="active">
                <input type="text" readonly='readonly' class="days_years" v-model="dateTime" v-if="!active">

            </div>
            <picker-view
            v-if='!active'
            class="common"
            indicator-style="height: 50px;"
            style="width: 100%;"
            :value=dateVal
            @change="bindChangeVal">
                <picker-view-column>
                    <view v-for="(item,index) in dayAndyear" :key="index" style="line-height: 50px;text-align:center">{{item}}</view>
                </picker-view-column>
             </picker-view>
            <picker-view
            v-if="active"
            class="common"
            indicator-style="height: 50px;"
            style="width: 100%;"
            :value=value
            @change="bindChange">
                <picker-view-column>
                    <view v-for="(item,index) in years" :key="index" style="line-height: 50px;margin-left:40px">{{item}}年</view>
                </picker-view-column>
                <picker-view-column>
                    <view v-for="(item,index) in months" :key="index" style="line-height: 50px;margin-left:50px">{{item}}月</view>
                </picker-view-column>
                <picker-view-column>
                    <view v-for="(item,index) in days" :key="index" v-if="index<num" style="line-height: 50px;margin-left:40px" >{{item}}日</view>
                </picker-view-column>
             </picker-view>
        </div>

    </div>
</template>

<script>
    const date = new Date()
    const years = []
    const months = []
    const days = []
    var month=(Number(date.getMonth())+1)>10?(Number(date.getMonth())+1):'0'+(Number(date.getMonth())+1)
    var day=date.getDate()>10?date.getDate():'0'+date.getDate()
    for (let i = 1820; i <= date.getFullYear(); i++) {
        years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
        days.push(i)
    }
    import { mapMutations, mapGetters } from 'vuex'
    import {imageApi} from "../../../../http/url";

    export default {
        data(){
            return{
                imageApi,
                years:years,
                months:months,
                days:days,
                year:date.getFullYear(),
                mounth:date.getMonth()+1,
                day:date.getDate(),
                value:[9999,date.getMonth(),Number(date.getDate())-1],
                flag:true,
                dateLabel:['按区间选择','按日选择'],
                active:false,
                startTime:date.getFullYear()+'-'+month+'-'+day,
                endTime:'',
                showLine:true,
                dayAndyear:['本月','本年'],
                dateVal: [0],
                dateTime:'本月',
                num:31
            }
        },
        computed:{
            transVal(){
                if(!this.active){
                    if(this.dateVal==0){
                        return {
                            start:date.getFullYear()+'-'+month+'-'+'01',
                            end:date.getFullYear()+'-'+month+'-'+day,
                            showText: '本月'
                        }
                    }else{
                        return {
                          start:date.getFullYear()+'-'+'01'+'-'+'01',
                          end:date.getFullYear()+'-'+month+'-'+day,
                          showText: '本年',
                          type: 1
                        }
                    }
                }else{

                    var startNum=Number(new Date(this.startTime).getTime())
                    var endSNum=Number(new Date(this.endTime).getTime())
                    if(startNum>endSNum){

                        return{
                            start:this.endTime,
                            end: this.startTime,
                            showText: this.endTime + '至' + this.startTime,
                            type: 2
                        }
                    }else{
                        return{
                            start:this.startTime,
                            end: this.endTime ? this.endTime : this.startTime,
                            showText: this.startTime + '至' + (this.endTime ? this.endTime : this.startTime),
                            type: 2
                        }
                    }
                    
                }

            },
          ...mapGetters({
            'dateTimeObj': 'dateTime'
          }),
        },
        methods: {
            ...mapMutations({
                changeTime:'changeTime'
            }),
            bindChange(e) {
                const val = e.mp.detail.value;
                this.value=val;
                this.year=this.years[val[0]];
                this.mounth=Number(this.months[val[1]])>9?this.months[val[1]]:'0'+this.months[val[1]];
                var isRun=(Number(this.year)%400 == 0)||((Number(this.year)%4 == 0) && (Number(this.year)%100 !== 0)) //判断闰年
                if([1,3,5,7,8,10,12].includes(Number(this.mounth))){
                    this.num=31
                }else if([2].includes(Number(this.mounth))){
                    if(isRun){
                        this.num=29
                    }else{
                        this.num=28
                    }
                }else{
                    this.num=30
                }
                console.log(this.num);
                this.day=Number(this.days[val[2]])>9?this.days[val[2]]:'0'+this.days[val[2]];
                if(this.showLine&&this.startTime){
                    this.startTime=this.year+'-'+this.mounth+'-'+this.day
                }
                else if(!this.showLine&&this.endTime){
                    this.endTime=this.year+'-'+this.mounth+'-'+this.day
                }

            },
            bindChangeVal(e){
                const val = e.mp.detail.value;
                this.dateVal=val;
                this.dateTime=this.dayAndyear[val[0]]
            },
            cancle(){
                wx.navigateBack()
            },
            finish(){
                this.changeTime(this.transVal);
                this.cancle()
            },
            transFun(){
                this.active=!this.active;
            },
          changeStart(){
            this.showLine=true;
            this.handlerFun(this.dateTimeObj,'start')

          },
          changeEnd(){
            this.showLine=false;
            this.handlerFun(this.dateTimeObj,'end');
            if(!this.showLine&&!this.endTime){
              this.endTime=this.startTime;
              console.log('start');
            }
          },
            handlerFun(obj,key){
              var str=obj[key];
              var arr=str.split('-');
              this.year=Number(arr[0])-1820;
              this.mounth=Number(arr[1])-1;
              this.day=Number(arr[2])-1;
              console.log(this.year)
              console.log(this.mounth);
              console.log(this.day);
              this.value=[this.year,this.mounth,this.day]
            },
        },
        onLoad(){
          this.startTime=this.dateTimeObj.start;
          this.endTime=this.dateTimeObj.end;
          this.handlerFun(this.dateTimeObj,'start');
          if (this.dateTimeObj.type === 1 ) {
             this.active = false;
             console.log(this.dateTimeObj)
             if (this.dateTimeObj.showText === '本月') {
               this.dateVal = [0];
               this.dateTime ='本月';
               console.log('benyue:',this.dateVal);
             } else {
               this.dateVal = [1];
               this.dateTime ='本年';
             }
          }
          if (this.dateTimeObj.type === 2 ) {
            this.active = true;
          }
        },
        onShow(){

            this.showLine = true;
            // this.dateVal = 0
        }

    }
</script>

<style lang="scss" scoped>
    .date_pick{
        width: 100%;
        padding: 0 34rpx;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .section{
            width: 100%;
            height: 100%;
        }
        .header{
            height: 88rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .picker{
                color: #222;
                font-size: 36rpx;
            }
            .left_data,.right_data{
                color:#aaa;
                font-size: 36rpx;
            }
        }
        .common_pick{
            width: 100%;
            height:100vh;
        }
        .common{
            width: 100%;
            height: 40%;
            background: #fff;
        }
        .top_mneu{
            width: 100%;
            box-sizing: border-box;
            color: #222;
            margin-top:38rpx;
            display: flex;
            justify-content: space-between;
            .cancle{
                color: #ff443e;
                font-size: 15px;
            }
            .placehold{
                color: #6E7275;
                font-size: 32rpx;
            }

        }
        .date_select_pick{
            width:282rpx;
            height:64rpx;
            background:rgba(245,245,245,1);
            opacity:1;
            border-radius:32rpx;
            margin-top: 42rpx;
            display: flex;
            align-items: center;
            .label_name{
                color: #444;
                font-size: 28rpx;
                display: inline-block;
                width: 140rpx;
                margin-right: 32rpx;
                margin-left: 30rpx;
            }
            .trans{
                width: 36rpx;
                height: 30rpx;
            }
        }
        .date_input{
            display: flex;
            justify-content: space-between;
            margin-top: 120rpx;
            margin-bottom: 108rpx;
            .rang{
                color: #6E7275;
                font-size: 32rpx;
            }
            .date_text{
                width:294rpx;
                border-bottom: 1px solid #ff443e;
                padding-bottom: 18rpx;
                text-align: center;
            }
            .default_text{
                width:294rpx;
                border-bottom: 1px solid #707070;
                padding-bottom: 18rpx;
                text-align: center;
            }
            .days_years{
                width: 100%;
                border-bottom: 1px solid #FF443F;
                text-align: center;
                padding-bottom: 10rpx;
            }
        }
        .triangle-facing-right{
            display: inline-block;
            border-right: 2px solid #aaa; border-bottom: 2px solid #aaa;
            width: 24rpx;
            height: 24rpx;
            transform: rotate(-45deg);
        }
        .triangle-facing-left{
            display: inline-block;
            border-left: 2px solid #aaa; border-bottom: 2px solid #aaa;
            width:24rpx; height: 24rpx;
            transform: rotate(45deg);

        }
    }
</style>
