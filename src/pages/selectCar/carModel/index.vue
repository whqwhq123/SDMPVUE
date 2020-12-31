<template>
  <div class='car-model'>
    <scroll-view
      class='car-model-scroll'
      scroll-y='true'
      scroll-with-animation='true'>
      <div v-if="!carModel">
        暂无数据
      </div>
      <div class='car-model-group'
            v-for="(yearItem, index) in carModel"
            :key="index"
      >
        <div class='car-model-years'>{{index}}</div>
        <div class='car-model-content'
              v-for="(modelItem, model) in yearItem"
              @click="checkedModel(modelItem)"
              :key="model" >
          <div class='car-model-name'>{{modelItem.styleFullName}}</div>
          <div class='car-model-price'>指导价:{{modelItem.msrp}}<span v-if="modelItem.msrp">万</span></div>
        </div>
      </div>
    </scroll-view>
    <dialogSend :flag='flag' :imageUrl='imageUrl' :recommendId='recommendId' @changeStatus='changeStatus'></dialogSend>
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/2 13:35
   **/
  import { mapActions, mapMutations,mapGetters } from 'vuex'
  import dialogSend from '../dialogSend/index.vue'
  export default {
    name: "index",
    props: {
      modelId: {
        type: Number,
        value: null
      }
    },
    components: {
      dialogSend
    },
    watch: {
      modelId (v) {
        console.log('id',v);
        this.getCarModelList()
      }
    },
    data () {
      return {
        carModel: {},
        flag:false,
        imageUrl:'',
        recommendId:'',
        isStatus:false
      }
    },
    mounted () {
      this.getCarModelList()
    },
    computed:{
      ...mapGetters({
          'userInfo':'userInfo',
          'vi': 'vi',
          'modelName': 'selectCar/modelName',
          'carModel': 'selectCar/carModel',
          'car': 'selectCar/car',
          'carStyle':'user/carStyle',
          'carBrand':'user/carBrand',
          'note':'user/note',
          'buyCarTarget':'user/buyCarTarget',
          'paramsForm':'user/paramsForm'
      }),
    },
    methods: {
      ...mapActions({
        'getCarModel': 'selectCar/getCarModel',
        'consultPrice':'user/consultPrice',// 咨询底价
        'getImageInfo':'recommendActivity/getImageInfo'
      }),
      ...mapMutations({
        'setCar': 'selectCar/setCar',
        
      }),
      changeStatus(){
        this.flag=false
      },
      async checkedModel (car) {
        console.log(car)
        this.setCar(car)
        if(this.isStatus){
           // 需求搜集过来的
           wx.navigateTo({
                url:'/pages/app/needCollect/main'
            })
        }else{
          mpvue.navigateBack()
        }
       
      },
      async getCarModelList() {
        let res = await this.getCarModel({
          modelId: this.modelId
        })
        if (res.code === 0) {
            this.carModel= res.data
        } else {
          console.error("获取车型列表失败", res.errMsg)
        }
      }
    },

    onLoad(op){
      this.isStatus=op.flag // 用于判断是否是需求选择来的
    },
  };
</script>

<style scoped>
  /* views/carModel/index.wxss */
  .car-model{
    height: 100%;
    background: #fff;
  }
  .car-model-scroll{
    height: 100%;
  }
  .car-model-years{
    line-height: 48rpx;
    background: #F2F1F6;
    color: #1A1A1A;
    font-size: 26rpx;
    padding-left: 36rpx;
  }
  .car-model-content{
    position:relative;
    box-sizing: border-box;
    padding-top: 32rpx;
    padding-left: 36rpx;
  }
  .car-model-content:hover::after{
    background: #EB0C24
  }
  .car-model-name{
    font-size: 14px;
    color: #1A1A1A;
    line-height: 1;
    margin-bottom: 1em;
  }
  .car-model-price{
    font-size: 14px;
    color: #BB0A30;
    padding-bottom: 34rpx;
    border-bottom: 1px solid #F2F2F2;
  }
</style>
