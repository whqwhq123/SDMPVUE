<template>
<div class="main">
    <div class="date_pick_but">
        <div class="time_pick" @click="datePick">
            <div class="time_select">
                <span class="date_time" v-if="dateTime">{{dateTime.showText}}</span>
            </div>
        </div>
    </div>
</div>

</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        data(){
            return {
                date:'本年'
            }
        },
        computed: {
          ...mapGetters({
            'dateTime': 'dateTime'
          })
        },
        methods: {
            datePick() {
                wx.navigateTo({
                    url:'../datePick/dateSelect/main'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .main{
        width: 100%;
        overflow: hidden;
    }
    .date_pick_but{
        width:100%;
        height:92rpx;
        background:rgba(245,245,245,1);
        opacity:1;
        display: flex;
        align-items: center;
        .time_pick{
            min-width:206rpx;
            padding:  0 56rpx;
            height:64rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:32rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 40rpx;
            .time_select{
                .date_time{
                    color: #444;
                    font-size: 32rpx;
                }
                .date_time::after{
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 0;
                    border-width: 10rpx;
                    border-style: solid;
                    border-color:#444 transparent transparent transparent;
                    margin-left: 10rpx;
                }
            }
        }
    }
</style>
