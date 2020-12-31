<template>
    <div class="active_main" :class="{'fixedStyle': showModal}">
        <div class="active_title">
            店内活动推荐
        </div>
        <img :src="imageApi+'/new_close.png'" alt="" class="new_close" @click="backFun">
        <div class="active_list" v-for="(item,index) in activeList" :key="index" @click="showModalFun(item)">
            <div class="img_disc">
              <img :src="item.thumbnail" alt="">
            </div>
            <div class="text_disc">
                <p class="disc_title">{{item.activityName}}</p>
                <p class="disc_small">{{item.activityDesc || ''}}</p>
            </div>
        </div>

        <div class="modal" v-if="showModal"></div>
        <div class="dialog_modal" v-if="showModal">
            <div class="modal_content">
                <div class="title">
                    发送给客户
                </div>
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
    import {mapActions, mapGetters,mapMutations} from 'vuex'
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi,
                activeList:[],
                showModal:false,
                pageNo: 1,
                imageUrl: '',
                activityDesc: '',
                currentItem: {}
            }
        },
        computed: {
        ...mapGetters({
          'userInfo': 'userInfo'
          })
        },
        mounted() {

          let that=this
          mpvue.setNavigationBarTitle({
            title: that.userInfo.foursName
          })
          console.log(this.userInfo)
          console.log(this.userInfo.foursId + ',' + this.userInfo.userId)
        },
        methods: {
            ...mapMutations({
                'setShareParams':'user/setShareParams'
            }),
             ...mapActions({
                'getActivityLists':'recommendActivity/getActivityLists',
                'getImageInfo':'recommendActivity/getImageInfo'
            }),
            backFun(){
                wx.navigateBack({
                    
                })
            },
            checkCode (e) {
              let that = this;
              wx.previewImage({
                current: that.imageUrl,
                urls: [that.imageUrl]
              })
            },
            async getLists () {
              let params = {
                foursId:this.userInfo.foursId,
                pageNo: this.pageNo,
                pageSize: 10,
                activityStatus: 1
              }
              let res = await this.getActivityLists(params)
              if (res.code == 0 && res.data.recordList.length > 0) {
                this.activeList = this.activeList.concat(res.data.recordList)
                this.pageNo++;
              } else {
                wx.showToast({
                  title: '没有更多数据',
                  icon: 'none',
                  duration: 1000
                })
                return
              }
            },
            showModalFun(item){

                this.currentItem = item
                this.activityDesc = item.activityDesc
                console.log(item)
                let bodyParm = [this.userInfo.foursId, 4,this.userInfo.userId, item.activityId, item.activityType,3].join()
                let shareParams = [this.userInfo.foursId, 4, this.userInfo.userId, this.currentItem.activityId, this.currentItem.activityType].join()

                wx.navigateTo({
                    url:'/pages/generalSale/shareToB/main'
                })
                this.setShareParams({
                    shareTitle:'将活动信息发给您客户',
                    shareDisc:'',
                    bodyParm:bodyParm,
                    shareParams:'/pages/sell/index?scene='+shareParams,
                    shareType:'salesman_4'
                })
                // let res = await this.getImageInfo(params)
                // this.imageUrl = res
                // this.showModal=true;
            },
            closeModal(){
                this.showModal=false;
            },
            //跳到留资端
            linkLeveRes() {
                
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
        onShow () {
          this.pageNo = 1;
          this.activeList=[];
          this.getLists()
        },
        onReachBottom(){
          this.getLists()
        }
    }
</script>

<style lang="scss" scoped>
    .active_main{
        height: 100%;
        width: 100%;
        padding: 56rpx 62rpx 0 50rpx;
        box-sizing: border-box;
        .active_title{
            color: #1A1A1A;
            font-size: 54rpx;
            font-weight: 500;
            margin-bottom: 16rpx;
        }
        .new_close{
            width: 56rpx;
            height: 56rpx;
            position: absolute;
            right: 40rpx;
            top: 28rpx;
        }
        .active_list{
            padding: 32rpx 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F2F2F2;

            .img_disc{
                width: 168rpx;
                height: 126rpx;
                background: #ccc;
                img {
                  width: 168rpx;
                  height: 126rpx;
                  object-fit: cover;
                  border-radius: 8rpx;
                }
            }
            .text_disc{
                margin-left: 32rpx;
                .disc_title{
                    color: #1A1A1A;
                    font-size: 32rpx;
                    font-weight: 500;
                    margin-bottom: 18rpx;
                }
                .disc_small{
                    color: #767676;
                    font-size: 28rpx;
                }
            }
        }
        .active_list:nth-last-child(1){
            border-bottom:none;

        }
        .modal{
            background:rgba(0,0,0,1);
            opacity:0.75;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .dialog_modal{
            position: fixed;
            top: 200rpx;
            left: 50%;
            margin-left: -290rpx;
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
            }
        }
    }
    /* 禁止弹层穿透问题 */
    .fixedStyle {
      overflow: hidden;
    }
</style>
