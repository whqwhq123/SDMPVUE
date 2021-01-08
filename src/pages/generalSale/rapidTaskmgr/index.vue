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
          @click="pencomDivFun(1)"
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
          @click="pencomDivFun(2)"
        >
          已完成{{ Completed }}
        </div>
      </div>
      <!-- 内容切换 -->
      <!-- <allpendcom-com :proindex="proindex"></allpendcom-com> -->

      <pending-com
        v-if="proindex === 1"
        :key="1"
        :dataListArr="dataList"
        @avtTabsFun="avtTabsFun"
      ></pending-com>
      <completed-com v-else :key="2" :dataListArr="dataList"></completed-com>
    </scroll-view>
  </div>
</template>

<script>
import completedCom from "./components/completedCom.vue";
import pendingCom from "./components/pendingCom.vue";

import { formate,formatenyr } from "../../../utils/formate";
import { mapGetters } from "vuex";

export default {
  components: {
    pendingCom,
    completedCom,
  },

  data() {
    return {
      Pending: "",
      Completed: "",
      ispencom: true,
      pageNum:1,
      proindex: 1,
      avtTabsIndex:"",
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    pencomDivFun(n) {
      console.log(n);
      if (n === 1) {
        this.ispencom = true;
        this.proindex = 1;
        this.Pending=this.total
      } else if (n === 2) {
        this.ispencom = false;
        this.proindex = 2;
        this.Completed=this.total
      }
      this.AjaxFun(n);
    },
    // 上拉获取信息

    pullData() {
      console.log("到达底部触发");
      this.pageNum=this.pageNum+1
      // if (this.dataList.lenght) {
      //   this.AjaxFun("","",this.pageNum);
      // }
      this.AjaxFun("",this.avtTabsIndex,this.pageNum);
    },
    //子组件传过来的参数
    avtTabsFun(index) {
      this.dataList = [];
       this.pageNum=1
      if(index==0) index=""
      this.avtTabsIndex=index
      //  this.AjaxFun(this.proindex,index);
       this.AjaxFun("",index);
      // console.log(index, "子组件传过来的参数");
    },
    //  请求数据
    AjaxFun(
      visitStatus = "",
      taskType = "",
      taskStatus = 1,
      pageNum = 1,
      pageSize = ""
    ) {
      // console.log(this.userInfo,this.userInfo.foursId);
      // console.log(visitStatus);
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url: "http://10.20.0.210:4090/saasAdmin/task/list",
        data: {
          pageNum,
          pageSize,
          foursId: 3,
          visitStatus,
          taskType,
          taskStatus,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          if (!res.code) {
            if (res.data.data.list.length == 0) {
              wx.showToast({
                title: "暂无更多数据",
                icon: "none",
              });
               this.pageNum=pageNum-this.pageNum
              return;
            }
            console.log(res);
            this.total=res.data.data.total
            // if(this.proindex=="1") {
            //   this.Pending=res.data.data.total
            // }
            console.log(res.data.data.total, "获取的数据总条数");
            if (pageNum >= 2) {
               this.pageNum=pageNum
              this.dataList = this.dataList.concat(this.dataListFun(res.data.data.list));
            }
            this.dataList = this.dataListFun(res.data.data.list);
          }
          // this.dataList = this.dataList.concat(res.data);
        },
      });
    },
    dataListFun(data) {
      return data.map((v, i) => {
        
        if (v.taskType == 1) {
          v.taskTitle = "到店回访";
        } else if (v.taskType == 2) {
          console.log(v);
          v.taskTitle = "试驾回访";
        } else if (v.taskType == 3) {
          v.taskTitle = "优惠通知";
        }
        // v.lastCallTime = formate(v.lastCallTime);
        v.lastTime = formate(v.lastTime);
        v.taskCreateTime = formate(v.taskCreateTime);
        v.callTime = formate(v.callTime);
        v.discountStartTime = formatenyr(v.discountStartTime);
        v.discountEndTime = formatenyr(v.discountEndTime);
        v.discount = v.taskType == 3 ? 1 : 0;
        return v;
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