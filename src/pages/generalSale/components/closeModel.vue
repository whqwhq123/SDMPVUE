<template>
    <div class="dialog_model" v-if="flag">
        <div class="maodel">
            <img :src="imageApi + '/close3.png'" alt="" v-if="imageApi" class='close' @click="cancle">
            <div class='title'>{{title}}</div>
            <div class="opreate">
                <div class="cancle" @click="cancle">否</div>
                <div class="submit" @click="submit">是</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    export default {
        props:{
            title:'',
            flag:''
        },
        data(){
            return {
                imageApi
            }
        },
        methods: {
            cancle() {
                this.$emit('close','n')
            },
            submit(){
                this.$emit('close','y')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .dialog_model{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.6);
        z-index:100000;
        display: flex;
        justify-content: center;
        .maodel{
            width:490rpx;
            height:300rpx;
            background:rgba(255,255,255,1);
            border:2rpx solid rgba(112,112,112,1);
            opacity:1;
            border-radius:16rpx;  
            margin-top: 300rpx;
            padding: 16rpx;
            box-sizing:  border-box;
            .close{
               width: 30rpx;
               height: 30rpx; 
               float:right;
            }
            .title{
                color: #262626;
                font-size: 36rpx;
                text-align: center;
                margin-top: 50rpx;
            }
            .opreate{
                display: flex;
                justify-content: center;
                margin-top: 60rpx;
                .cancle{
                    width:180rpx;
                    height:70rpx;
                    background:rgba(255,255,255,1);
                    border:2rpx solid rgba(187,10,48,1);
                    opacity:1;
                    border-radius:8rpx; 
                    margin-right:30rpx;
                    color:  rgba(187,10,48,1);
                    font-size: 28rpx;
                    text-align: center;
                    line-height: 70rpx;
                }
                .submit{
                    width:180rpx;
                    height:70rpx;
                    background:rgba(187,10,48,1);
                    opacity:1;
                    border:2rpx solid rgba(187,10,48,1);
                    border-radius:8rpx;
                    color:  #fff;
                    font-size: 28rpx;
                    text-align: center;
                    line-height: 70rpx;
                }
            }
        }
    }
</style>