<template>
    <div>
        <div class="modal" v-if="showModal"></div>
        <div class="dialog_modal" v-if="showModal">
            <div class="modal_content">
                <div class="title">
                    为您推荐  {{modelName}}
                </div>
                <div class="title_disc">扫码了解情况</div>
                <div class="card_disc">
                    <!-- 618购车节，尊享店内购车大礼，618购车节，尊享店内购车大礼。 -->
                    {{activityDesc || ''}}
                </div>
                <div class="quard_scope">
                  <img :src="imageUrl" alt="" @tap="checkCode">
                </div>
                <div class="trans_friend" @click="linkLeveRes(item)">
                    <div class="trans_friend_box" v-if="imageApi">
                        <img :src="imageApi+'/weChart.png'" alt="" class="close_img">
                        <p class="t_f">发给朋友</p>
                    </div>
                </div>
            </div>
            <div class="close" v-if="imageApi">
                <img :src="imageApi+'/close2.png'" alt="" class="close_img" @click="closeModal">
            </div>
        </div>
    </div>
</template>

<script>
    import {imageApi} from "../../../http/url";
    import { mapActions, mapMutations,mapGetters } from 'vuex'
    export default {
        props:{
            flag:Boolean,
            imageUrl:'',
            recommendId:''
        },
        data(){
            return{
                imageApi,
                showModal:false,
            }
        },
        watch:{
            flag(v){
                this.showModal=v;
            }
        },
        computed:{
            ...mapGetters({
                'userInfo':'userInfo',
                'car': 'selectCar/car',
                'modelName': 'selectCar/modelName',
            })
        },
        methods: {
            closeModal(){
                this.showModal=false;
                this.$emit('changeStatus')
            },
            checkCode (e) {
              let that = this;
              wx.previewImage({
                current: that.imageUrl,
                urls: [that.imageUrl]
              })
            },
            //跳到留资端
            linkLeveRes() {
                let params =[this.userInfo.foursId,5,this.userInfo.phone,this.recommendId,this.car.modelId].join()
                mpvue.navigateToMiniProgram({
                    appId:'wxb531f813eaa2c2ea',
                    path:'/pages/sell/index?scene='+ params,
                    // envVersion:'trial',
                    success(res){
                      console.log('跳转c端销售落地页',res, params)
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .modal{
            background:rgba(0,0,0,1);
            opacity:0.75;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100
        }
        .dialog_modal{
            position: fixed;
            top: 200rpx;
            left: 50%;
            margin-left: -290rpx;
            z-index: 200;
            .modal_content{
                width:584rpx;
                // height:768rpx;
                background:rgba(255,255,255,1);
                opacity:1;
                border-radius:16rpx;
                padding:48rpx 30rpx 0 30rpx;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                .title{
                   color: #1A1A1A;
                   font-size: 36rpx;
                   font-weight: 500;
                   text-align: left;
                }
                .title_disc{
                   font-size: 28rpx;
                   font-weight: 500;
                   text-align: left;
                   color: #767676
                }
                .card_disc{
                    color: #767676;
                    font-size: 30rpx;
                    text-align: left;
                    margin-top: 23rpx;
                }
                .quard_scope{
                    width: 306rpx;
                    height: 306rpx;
                    background-color: #ccc;
                    margin: 0 auto;
                    margin-top: 45rpx;
                    img{
                      width: 306rpx;
                      height: 306rpx;
                    }
                }
                .trans_friend{
                    margin-top: 62rpx;
                    margin-left: -30rpx;
                    width: 584rpx;
                    height: 160rpx;
                    background:rgba(242,242,242,1);
                    opacity:1;
                    border-radius:0px 0px 8rpx 8rpx;
                    .trans_friend_box {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      height: 160rpx;
                      width: 584rpx;
                      .close_img{
                          width: 64rpx;
                          height: 64rpx;
                          margin-bottom: 10rpx;
                      }
                      .t_f{
                          color: #767676;
                          font-size: 26rpx;
                      }
                    }
                }

            }
            .close{
                width: 100%;
                margin-top: 48rpx;
                text-align: center;
                .close_img{
                    width: 64rpx;
                    height: 64rpx;
                }
            }}
</style>