<template>
  <div class="statBox">
    <div v-for="(item, index) in starArr" :class="item" :key="index"></div>
  </div>
</template>

<script>
export default {
  props: {
    star: String,
  },
  computed: {
    starArr() {
      //星级评分
      var starClass = [];
      var onstar = Number(this.star);
      // 满星
      for (let i = 0; i < onstar; i++) {
        starClass.push("on_star");
      }
      //灰色星星
      while (starClass.length < 5) {
        starClass.push("off_star");
      }
      return starClass;
    },
  },
  data() {
    return {
      nostart: [1, 2, 3, 4, 5],
    };
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
$urls:'https://saas-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/jzxd';
.statBox{
    display: flex;
}
.on_star {
  width: 40rpx;
  height: 40rpx;
  display: inline-block;
  margin-right: 40rpx;
  background: url($urls+'/stars_icon.png');
  background-size: 100%;
}
.off_star {
  width: 40rpx;
  height: 40rpx;
  display: inline-block;
   margin-right: 40rpx;
  background: url($urls+'/stars_none_icon.png');
  background-size: 100%;
}
</style>