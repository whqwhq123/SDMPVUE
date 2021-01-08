<template>
  <div>
                  <div
                    class="viewallItem_but_feedback"
                    @click="isfankuiFun"
                  >
                    <div class="viewallItem_but_feedback_p">查看试驾反馈</div>
                    <!-- iconTop.png -->
                    <div class="viewallItem_but_feedback_img">
                      <img
                        style="width: 100%; height: 100%"
                        v-if="imageApi"
                        :src="isfankui? imageApi + '/iconBut.png': imageApi + '/iconTop.png'"
                      />
                    </div>
                  </div>
                  <div class="viewallItem_but_con" v-if="isfankui">
                    <div class="viewallItem_but_con_img" v-if="feedbackData.satisfaction">
                      <!-- {{feedbackData.satisfaction}}satisfied_none_icon -->
                      <img
                        style="width: 100%; height: 100%"
                        v-if="imageApi"
                        :src="imageApi +(feedbackData.satisfaction == 1? '/jzxd/commonly_icon.png': feedbackData.satisfaction == 2? '/jzxd/satisfied_icon.png': '/jzxd/veryNice_icon.png')"
                        alt=""
                      />
                    </div>
                    <div class="viewallItem_but_con_p">满意</div>
                    <div class="viewallItem_but_con_start">
                      <div class="viewallItem_but_con_startXing">
                        <div class="startXing_p">外观:</div>
                        <div class="startXing_xing">
                          <statr-xing
                            :star="feedbackData.exterior"
                          ></statr-xing>
                        </div>
                      </div>
                      <div class="viewallItem_but_con_startXing">
                        <div class="startXing_p">内饰 :</div>
                        <div class="startXing_xing">
                          <statr-xing
                            :star="feedbackData.interior"
                          ></statr-xing>
                        </div>
                      </div>
                      <div class="viewallItem_but_con_startXing">
                        <div class="startXing_p">性能 :</div>
                        <div class="startXing_xing">
                          <statr-xing
                            :star="feedbackData.performance"
                          ></statr-xing>
                        </div>
                      </div>
                      <div class="viewallItem_but_con_startXing">
                        <div class="startXing_p">舒适度 :</div>
                        <div class="startXing_xing">
                          <statr-xing
                            :star="feedbackData.comfort"
                          ></statr-xing>
                        </div>
                      </div>
                      <div class="viewallItem_but_con_startXing">
                        <div class="startXing_p">实用性 :</div>
                        <div class="startXing_xing">
                          <statr-xing
                            :star="feedbackData.practicability"
                          ></statr-xing>
                        </div>
                      </div>
                    </div>
                    <div class="viewallItem_but_con_tit" v-if="comment!=''">
                      试驾反馈:{{comment}}
                    </div>
                  </div>
  </div>
</template>

<script>
import statrXing from "./statrXing.vue";
  export default {
    props: {
      feedbackData: {
        type: Object,
        
      },
      comment:{
        type:String
      }
    },
    data() {
      return {
        isfankui: false,
      }
    },
    components: { statrXing },
    methods: {
      
    //反馈的隐藏显示
    isfankuiFun(){
      this.isfankui=!this.isfankui
    },
    },
  }
</script>

<style lang="scss" scoped>
        .viewallItem_but_feedback {
          min-height: 68rpx;
          border-top: 2rpx solid #f7f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bb0a30;
          font-size: 22rpx;
          .viewallItem_but_feedback_img {
            width: 26rpx;
            height: 16rpx;
            margin-left: 16rpx;
            margin-top: -11rpx;
          }
        }
        .viewallItem_but_con {
          height: 600rpx;
          padding: 20rpx 40rpx 40rpx 40rpx;
          flex-direction: column;
          .viewallItem_but_con_img {
            width: 66rpx;
            height: 66rpx;
            margin: 0 auto;
          }
          .viewallItem_but_con_p {
            margin-top: 8rpx;
            text-align: center;
            font-size: 24rpx;
            color: #ff5e16;
          }
          .viewallItem_but_con_start {
            .viewallItem_but_con_startXing {
              display: flex;
              font-size: 24rpx;
              height: 80rpx;
              line-height: 80rpx;
              color: #767676;
              .startXing_p {
                flex: 1;
                text-align: center;
                line-height: 80rpx;
              }
              .startXing_xing {
                flex: 4;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .viewallItem_but_con_tit {
            height: 80rpx;
            font-size: 24rpx;
            color: #b3b3b3;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 30rpx;
          }
        }
        .viewallItem_but_nofee {
          height: 70rpx;
          border-top: 2rpx solid #f7f7fa;
          font-size: 22rpx;
          line-height: 70rpx;
          padding-left: 26rpx;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          .viewallItem_but_nofee_span {
            color: #1a1a1a;
          }
        }
</style>