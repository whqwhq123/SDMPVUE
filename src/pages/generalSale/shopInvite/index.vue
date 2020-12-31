<template>
    <div class="page">
        <div class="page-header">
            <span class="page-tit">预约客户</span>
            <!-- <div class="selectDate"></div> -->
            <div class="selectDate">
                <div class="select-date-title">选择日期</div>
                <picker class="select-date-value" mode="date" :value="params.startTime"  @change="startTimeChange">
                    {{params.startTime}}<span class="select-icon">▼</span>
                </picker>
                <div class="date-division">至</div>
                <picker class="select-date-value" mode="date" :value="params.endTime"  @change="endTimeChange">
                    {{params.endTime}}<span class="select-icon">▼</span>
                </picker>
            </div>
        </div>
        <div>
            <ul class="list-group">
                <li class="list-items" v-for="(item, index) in list" :key="index">
                    <div class="user-header" 
                        :style="{backgroundImage: item.headImg ? 'url(' + item.headImg + ')' : 'url(https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd/shop-invite-user-def-header.png)'}"
                    ></div>
                    <div class="list-info">
                        <div class="user-info">
                            <span>{{item.nickname}}</span>
                        </div>
                        <div class="time"><span>姓名  </span><span>{{item.customerName}}</span></div>
                        <div class="time"><span>预约时间  </span><span>{{item.appointmentTime}}</span></div>
                        <div class="time"><span>手机号  </span><span>{{item.customerPhone}}</span></div>
                        <div class="time"><span>预约活动  </span><span>{{item.inviteTitle}}</span></div>
                        <div class="time"><span>意向车型  </span><span>{{item.seriesName}}</span></div>
                    </div>
                    <div>
                        <button class="to-user-tag-btn" @click="toPortrait(item)">查看画像</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            params: {
                startTime: '',
                endTime: ''
            },
            list: [],
            pageNo: 1,
            total: 0
        }
    },
    computed: {
      ...mapGetters({
        'vi': 'vi',
        'loginInfo': 'userInfo',
      })
    },
    onLoad () {
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()
        this.params.startTime = `${year}-${month > 10 ? month: '0' + month }-${day > 10 ? day: '0' + day }`
     
        let endTime = date.getTime() + 24 * 60 * 60 * 1000 * 8;
        this.params.endTime = this.timeFormat(endTime, 'yyyy-MM-dd')

        this.pageNo = 1
        this.list = []
        this.getAppointmentInfoListReq()

    },
    onShow () {
    },
    onReachBottom () {
        if (this.list.length < this.total) {
            this.pageNo++
            this.getAppointmentInfoListReq()
        }
    },
    methods: {
        ...mapActions({
            getAppointmentInfoList: 'shopInvite/getAppointmentInfoList'
        }),
        ...mapMutations({
            'setCustomerPhone':'user/setCustomerPhone'
        }),
        startTimeChange (e) {
            console.log(e)
            this.pageNo = 1
            this.list = []
            this.params.startTime = e.mp.detail.value
            this.getAppointmentInfoListReq()
        },
        endTimeChange(e) {
            console.log(e)
            this.pageNo = 1
            this.list = []
            this.params.endTime = e.mp.detail.value
            this.getAppointmentInfoListReq()
        },
        timeFormat (time, format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'T':
                        return 'T';
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        },
        
        async getAppointmentInfoListReq () {
            let res = await this.getAppointmentInfoList({
                salesman: this.loginInfo.userId,
                foursId: this.loginInfo.foursId,
                startTime: this.params.startTime,
                endTime: this.params.endTime,
                pageNo: this.pageNo,
                pageSize: 10
            })
            console.log(res)
            if (res.code === 0) {
                this.list = this.list.concat(res.data.recordList)
                this.total =  res.data.totalCount
            }
        },
        toPortrait (item) {
            // wx.navigateTo({
            //     url: '/pages/generalSale/shopInviteUserPortrait/main'
            // })
            this.setCustomerPhone(item.customerPhone)
            wx.navigateTo({
                url:'/pages/generalSale/receptionCustomer/main?current=2'
            })
        }
    }
}
</script>

<style scoped>
.page-header{
    line-height: 54rpx;
    padding: 56rpx 40rpx 32rpx 40rpx;
    border-bottom: 2rpx solid #f7f7fa;
}
.page-tit{
    font-size: 54rpx;
    font-weight: bold;
    color: #1a1a1a;
}
.selectDate {
    display: flex;
    font-size: 24rpx;
    color: #333;
}
.select-date-title{
    font-size: 28rpx;
    color: #767676;
    margin-right: 48rpx;
}
.select-date-value{
    font-size: 24rpx;
    color: #333;
}
.date-division{
    margin: 0 28rpx;
}

.list-group {
    padding: 48rpx 40rpx;
}
.list-items {
    display: flex;
}
.list-info {
    padding-left: 40rpx;
    flex: auto;
    padding-bottom: 48rpx;
    border-bottom: 2rpx solid #f5f5f5;
    margin-bottom: 48rpx;
}
.user-header {
    width: 80rpx;
    height: 80rpx;
    flex: none;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.user-info {
    font-size: 30rpx;
    color: #1a1a1a;
    line-height: 1;
    margin-bottom: 16rpx;
}
.time {
    font-size: 24rpx;
    color: #444;
    line-height: 1;
    margin-bottom: 12rpx;
}
.atv-name {
    font-size: 24rpx;
    color: #444;
    line-height: 1;
}
.to-user-tag-btn {
    width: 140rpx;
    height: 48rpx;
    line-height: 48rpx;
    color: #fff;
    font-size: 24rpx;
    border-radius: 48rpx;
    padding: 0;
    text-align: center;
    background-color: #bb0a30;
}
</style>
