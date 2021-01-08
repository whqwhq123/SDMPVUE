<template>
  <div class="car-model">
    <scroll-view
      class="car-model-scroll"
      scroll-y="true"
      scroll-with-animation="true"
    >
      <div v-if="!carModel">暂无数据</div>
      <div
        class="car-model-group"
        v-for="(yearItem, index) in carModel"
        :key="index"
      >
        <div class="car-model-years">{{ index }}</div>
        <div
          class="car-model-content"
          v-for="(modelItem, model) in yearItem"
          @click="checkedModel(modelItem)"
          :key="model"
        >
          <!-- <div class="car-model-name">{{ modelItem.styleFullName }}</div> -->
          <div class="car-model-name">{{ modelItem.modelName }}</div>
          <div class="car-model-price">
            指导价:{{ modelItem.msrp }}<span v-if="modelItem.msrp">万</span>
          </div>
        </div>
      </div>
    </scroll-view>
    <dialogSend
      :flag="flag"
      :imageUrl="imageUrl"
      :recommendId="recommendId"
      @changeStatus="changeStatus"
    ></dialogSend>
  </div>
</template>

<script>
/**
 * @author yuhongru
 * @email  yuhongru@atgco.cn
 * @date   2019/7/2 13:35
 **/
import { mapActions, mapMutations, mapGetters } from "vuex";
import dialogSend from "../dialogSend/index.vue";
import { loginApi } from "../../../http/url";
export default {
  name: "index",
  props: {
    modelId: {
      type: Number,
      value: null,
    },
  },
  components: {
    dialogSend,
  },
  watch: {
    modelId(v) {
      console.log("id", v);
      this.getCarModelList();
      this.getAjax();
    },
  },
  data() {
    return {
      carModel: {},
      flag: false,
      imageUrl: "",
      recommendId: "",
      isStatus: false,
    };
  },
  mounted() {
    this.getCarModelList();
    this.getAjax();
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
      vi: "vi",
      modelName: "selectCar/modelName",
      carModel: "selectCar/carModel",
      car: "selectCar/car",
      carStyle: "user/carStyle",
      carBrand: "user/carBrand",
      note: "user/note",
      buyCarTarget: "user/buyCarTarget",
      paramsForm: "user/paramsForm",
    }),
  },
  methods: {
    ...mapActions({
      getCarModel: "selectCar/getCarModel",
      consultPrice: "user/consultPrice", // 咨询底价
      getImageInfo: "recommendActivity/getImageInfo",
    }),
    ...mapMutations({
      setCar: "selectCar/setCar",
    }),
    changeStatus() {
      this.flag = false;
    },
    async checkedModel(car) {
      console.log(car);
      this.setCar(car);
      if (this.isStatus) {
        // 需求搜集过来的
        wx.navigateTo({
          url: "/pages/app/needCollect/main",
        });
      } else {
        mpvue.navigateBack();
      }
    },
    getAjax() {
      let { foursId } = this.userInfo;
      let token = wx.getStorageSync("token");
      let request = wx.request({
        url: loginApi+"saasAdmin/carModel/getCarModels",
        data: {
          foursId,
          seriesId: this.modelId,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          // console.log(res, " 车型数据");
          if (res.data.code == 0) {
            let resData = res.data.data.filter(item => item.saleStatus == '1')
            let resDataObj = {};
            resData.forEach((item, idx) => {
              if (Object.keys(resDataObj).indexOf(item.carYear) != -1) {
                resDataObj[item.carYear].push(item);
              } else {
                resDataObj[item.carYear] = [item];
              }
            });
            this.carModel=resDataObj
            console.log(resDataObj, " 车型数据2");
          }
        },
      });
    },
    async getCarModelList() {
      // let res = await this.getCarModel({
      //   modelId: this.modelId,
      // });
      // if (res.code === 0) {
      //   // this.carModel = res.data;
      //   console.log( res.data,"车型数据1");
      // } else {
      //   console.error("获取车型列表失败", res.errMsg);
      // }
    },
    
  },

  onLoad(op) {
    this.isStatus = op.flag; // 用于判断是否是需求选择来的
  },
  onShow(){
     this.carModel=[]
  }
};
</script>

<style scoped>
/* views/carModel/index.wxss */
.car-model {
  height: 100%;
  background: #fff;
}
.car-model-scroll {
  height: 100%;
}
.car-model-years {
  line-height: 48rpx;
  background: #f2f1f6;
  color: #1a1a1a;
  font-size: 26rpx;
  padding-left: 36rpx;
}
.car-model-content {
  position: relative;
  box-sizing: border-box;
  padding-top: 32rpx;
  padding-left: 36rpx;
}
.car-model-content:hover::after {
  background: #eb0c24;
}
.car-model-name {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 1em;
}
.car-model-price {
  font-size: 14px;
  color: #bb0a30;
  padding-bottom: 34rpx;
  border-bottom: 1px solid #f2f2f2;
}
</style>
