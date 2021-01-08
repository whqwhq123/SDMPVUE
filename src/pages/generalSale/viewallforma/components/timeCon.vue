
<template>
  <div class="viewallItem_top_l_b_time" v-if="dataTime">
    {{ dataTime.day||"0" }}天
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.hour || "0" }}</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.min || "00" }}</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.second || "00"}}</span>
  </div>
</template>
<script>
import countTimeFun from "../js/showTime";
export default {
  props: {
    itemTime: {
      type: String,
    },
  },
  watch: {
    itemTime(ne){
      console.log(ne);
      this.itemTime=ne
    }
  },
  data() {
    return {
      dataTime: {},
    };
  },

  mounted() {
    countTimeFun(this.TimeNum, this.itemTime);

   console.log( this.dataTime,"timeCon组件");
  },
  methods: {
    //时间计算
    TimeNum(val) {
      this.dataTime = val;
      // console.log(val,"倒计时组件时间计算");
      return val;
    },
  },
};
</script>


<style lang="scss" scoped>
.viewallItem_top_l_b_time {
  color: #bb0a30;
  font-size: 22rpx;
}
.viewallItem_top_l_b_timesty {
  width: 30rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  background: #bb0a30;
  border-radius: 4rpx;
  color: #ffffff;
  display: inline-block;
}
</style>