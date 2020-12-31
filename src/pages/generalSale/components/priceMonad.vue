<template>
    <div class="price_note">
        <!-- <div class="title_dis">{{indexTitle[3].secondTitles[1].description}}</div> -->
        <div class="label_name">
            {{indexTitle[3].secondTitles[1].name}}
        </div>
        <div class="line"></div>
        <div class="img_price">
             <img :src="imageApi+'/price_img.png'" alt="" v-if="imageApi">
        </div>
        <div class="openShare" @click="makePrice">制作报价单</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'indexTitle':'user/indexTitle'
            }),
        },
        methods: {
            makePrice() {
                wx.navigateTo({
                    url:'/pages/app/quote/edit/main'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .price_note{
        padding: 30rpx;
        box-sizing: border-box;
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
        .img_price{
           display: flex;
           justify-content: center;
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