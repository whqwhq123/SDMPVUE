<template>
  <div v-if="loadingStatus" class='request_loading'>
    <img  class='request_image' v-if="loadingStatus && imageApi" :src="imageApi + '/loading.gif'">
    <div>正在加载，请稍后...</div>
  </div>
</template>

<script>
  /**
   * @author yuhongru
   * @data 2019/5/11 18:05
   **/
  import {imageApi} from "../../http/url";

  export default {
    name: "loading",
    props: {
      loadingStatus: {
        type: Boolean,
        value: true
      }
    },
    data () {
      return {
        imageApi
      }
    }
  };
</script>

<style scoped>
  .request_loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 99999999;
    background-color: #fff;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #888
  }
  .request_image{
    width: 200rpx;
    height: 126rpx;
    margin: 0 auto;
    margin-bottom: 40rpx
  }
</style>
