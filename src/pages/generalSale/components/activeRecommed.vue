<template>
    <div class="active_recommed">
        <div class="s_post">精美报价快速生成</div>
        <div class="active_name">活动推荐</div>
        <div class="line"></div>
        <div class="active_image">
            <img :src="activeInfo.thumbnail" alt="" class="active_img">
        </div>
        <div class="active_slogn">{{activeInfo.activityName}}</div>
        <div class="active_make" v-if='activeInfo.activityDesc'>{{activeInfo.activityDesc}}</div>
        <div class="openShare" @click='activeFun'>全部店内活动</div>
    </div>
</template>

<script>
    import {mapActions, mapGetters,mapMutations} from 'vuex'
    export default {
        data(){
            return {
                activeInfo:{}
            }
        },
         computed: {
            ...mapGetters({
            'userInfo': 'userInfo'
            })
        },
        methods: {
            ...mapActions({
                'getActivityLists':'recommendActivity/getActivityLists',
            }),
            // 获取活动
            async getActiveS(){
                let params = {
                    foursId:this.userInfo.foursId,
                    pageNo: 1,
                    pageSize: 1,
                    activityStatus: 1
                }
                let res =await this.getActivityLists(params);
                if(res.code==0){
                    this.activeInfo=res.data.recordList[0]
                }
            },
            activeFun() {
                mpvue.navigateTo({
                    url: '/pages/admin/recommendActivity/main'
                })
            }
        },
        onLoad(){
            this.getActiveS()
        },
        onShow(){
            this.getActiveS()
        }
    }
</script>

<style lang="scss" scoped>
    .active_recommed{
        box-sizing: border-box;
        .s_post{
            color:#444444;
            font-size: 28rpx;
            line-height: 28rpx;
            margin-bottom: 20rpx;
        }
        .active_name{
            color: #1A1A1A;
            font-size: 50rpx;
            line-height: 50rpx;
        }
        .line{
            width:100%;
            height:2rpx;
            background:rgba(247,247,250,1);
            opacity:1;
            margin-top: 30rpx;
        }
        .active_image{
             margin:0 auto;
            margin-top: 48rpx;
            .active_img{
                width: 100%;
                height:260rpx;
            }
           
        }
        .active_slogn{
            color:#262626;
            font-size: 36rpx;
            font-weight: bold;
            line-height: 36rpx;
            margin-top: 36rpx;
        }
        .active_make{
            font-size: 28rpx;
            color: #727272;
            margin-top: 12rpx;
        }
        .openShare{
            width:320rpx;
            height:80rpx;
            border:2rpx solid rgba(187,10,48,1);
            opacity:1;
            border-radius:48rpx;
            color: rgba(187,10,48,1);
            font-size: 30rpx;
            line-height: 80rpx;
            text-align: center;
            margin: 0 auto;
            margin-top: 60rpx;
        }
    }
</style>