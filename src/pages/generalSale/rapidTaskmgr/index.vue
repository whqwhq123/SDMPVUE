<template>
  <div class="taskBox">
    <scroll-view scroll-y style="height: 98vh" @scrolltolower="pullData">
      <!-- 头部切换 -->
      <div class="taskBox_hander">
        <div
          :class="[
            { pencomDivav: ispencom },
            'pencomDiv',
            'taskBox_hander_pending',
          ]"
          @click="pencomDivFun(0)"
        >
          待处理{{ Pending }}
        </div>
        <div class="line"></div>
        <div
          :class="[
            { pencomDivav: !ispencom },
            'pencomDiv',
            'taskBox_hander_completed',
          ]"
          @click="pencomDivFun(1)"
        >
          已完成{{ Completed }}
        </div>
      </div>
      <!-- 内容切换 -->
      <!-- <allpendcom-com :proindex="proindex"></allpendcom-com> -->

      <pending-com v-if="proindex===0" :key="1" :dataListArr="dataList" @avtTabsFun="avtTabsFun"></pending-com>
      <completed-com v-else :key="2" :dataListArr="dataList"></completed-com>
    </scroll-view>
  </div>
</template>

<script>
import completedCom from "./components/completedCom.vue";
import pendingCom from "./components/pendingCom.vue";

import { formatDay } from "../../../utils";
import { mapGetters } from "vuex";

export default {
  components: {
    pendingCom,
    completedCom
  },

  data() {
    return {
      Pending: "12",
      Completed: "655",
      ispencom: true,
      proindex: 0,
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    pencomDivFun(n) {
      console.log(n);
      if (n === 0) {
        this.ispencom = true;
        this.proindex = 0;
      } else if (n === 1) {
        this.ispencom = false;
        this.proindex = 1;
      }
      this.AjaxFun();
    },
    // 上拉获取信息

    pullData() {

      if (this.dataList.lenght) {
        this.AjaxFun();
      }
    },
    //子组件传过来的参数
    avtTabsFun(index){
      console.log(index,"子组件传过来的参数");

    },
    // http://10.20.0.210:4090/saasAdmin/task/list
     AjaxFun() {
      let token = wx.getStorageSync("token");
      // console.log(token);
      console.log(this.userInfo);
      let request = wx.request({
        url: "http://localhost:9999/api.rapidTaskmgr",

        data: {},
        header: { "content-type": "application/json" },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          console.log(res, "获取的数据");
          if (res.data.length == 0) {
            wx.showToast({
              title: "暂无更多数据",
              icon: "none",
            });
          }
          this.dataList = this.dataList.concat(res.data);
          console.log(this.dataList, "首次加载");
        },
      });
    },
  },
  onLoad() {
    this.AjaxFun();
  },
};
</script>

<style lang="scss" scoped>
.taskBox {
  height: 100%;
  background: #f7f7fa;
  flex-direction: column;
  display: flex;
  .taskBox_hander {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90rpx;
    background-color: #ffffff;
    .pencomDiv {
      flex: 1;
      text-align: center;
      color: #b3b3b3;
      font-size: 28rpx;
      font-family: "Source Han Sans CN";
      font-weight: 400;
      line-height: 90rpx;
    }
    .pencomDivav {
      color: #bb0a30;
    }
    .taskBox_hander_pending {
      text-indent: 50px;
    }
    .taskBox_hander_completed {
      text-indent: -50px;
    }
    .line {
      height: 40rpx;
      width: 2rpx;
      background: #e8e8ef;
    }
  }
}
</style>