<template>
  <div>
    <!--<div class='car-brand-group'>-->
      <!--<img class='brand-img' mode="aspectFit" :src='carBrand.imgUrl'>-->
      <!--<span class='brand-name'>{{carBrand.makeName}}</span>-->
    <!--</div>-->
    
    <div >
      <scroll-view
        class='cars-scroll'
        scroll-y='true'
        scroll-with-animation='true'
      >
        <div class='cars-content'>
          <div class='cars-firm-group'
                v-for='(firmItem, firm ) in cars'
                :key="firm"
          >
            <!-- <div class='cars-firm'>{{firm}}</div> -->
            <!--  v-for='(modelItem, modelIndex) in firmItem'
                    :key="modelItem" -->
                    <!--  :class="['cars-item', checkedModel && modelItem.carName === checkedModel.carName ? 'active':'' ]" -->
            <ul class='cars-group'>
              <li
                   :class="['cars-item', checkedModel && firmItem.carName === checkedModel.carName ? 'active':'' ]"
                    @click='clickModel(firmItem)'
              >
                <div class="cars-name" >{{firmItem.carName}}</div>
                <div class='cars-range'>{{firmItem.msrp}}万</div>
              </li>
            </ul>
          </div>
        </div>
      </scroll-view>
    </div>
    <div  class="carModel">
      <carModel
        v-if='visitModel'
        id = 'modelComponent'
        :setParent="setParent"
        :pathTo="pathTo"
        :modelId="checkedModel.getCarNameId"
      ></carModel>
    </div>
    
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/2 11:28
   **/
  import carModel from '../carModel/index'
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        checkedModel: null,
        visitModel: false,
        cars: {},
      }
    },
    computed:{
      ...mapGetters({
        'userInfo': 'userInfo'
      })
    },
    components: {
      carModel,
    },
    methods: {
      ...mapActions({
        'getCars': 'selectCar/getCars'
      }),
      ...mapMutations({
        'setCarModel': 'selectCar/setCarModel',
      }),
      async getCarList () {
        let { foursId, manuId } = this.userInfo
        let res = await this.getCars({
          foursId,
          manuId
        });
        if (res.code === 0) {
          this.cars = res.data
        }
      },
      clickModel (model) {
        this.checkedModel = model
        this.visitModel = true
        this.setCarModel(model)
      },
      setParent (e) {
        this.flag=true
        this.setPrevPageData({
          car: e.detail
        });
      },
      pathTo(e) {
         mpvue.navigateBack()
      }
    },
    onShow() {
      this.getCarList()

    },
  };
</script>

<style scoped>
  .cars-scroll{
    height: 100%;
    font-size: 26rpx;
  }
  .cars-firm {
    position: relative;
    background-color: #E1E0E5;
    line-height: 48rpx;
    padding-left: 40rpx;
  }

  .cars-group {
    /* background: #F2F1F6; */
    border-radius: 4px;
  }
  .cars-item{
    display: flex;
    text-align: left;
    line-height: 114rpx;
  }
  .cars-item.active{
    position: relative;
    font-size: 32rpx;
    color: #1A1A1A;
    background-color: #fff;
  }
  .cars-item.active::after{
    display: block;
    position: absolute;
    content: '';
    height: 34rpx;
    width: 8rpx;
    background: #BB0A30;
    top: 40rpx;
    left: 0
  }
  .cars-name, .cars-range{
    display: inline-block;
    box-sizing: border-box;
    padding-left: 40rpx;
    width: 50%;
  }
  .cars-name{
    position: relative;
  }

  .carModel{
    position: fixed;
    right: 0;
    width: 472rpx;
    height: 100%;
    top: 0;
    z-index: 100;
  }
</style>
