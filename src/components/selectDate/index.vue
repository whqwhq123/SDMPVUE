<template>
    <div class="date-page">
      <div class="date-header">
        <div class="date-close">取消</div>
        <div class="date-tit">选择时间</div>
        <div class="date-confirm">完成</div>
      </div>
      <div class="date-container">
        <div class="broad-scope">

        </div>
        <div class="specific-scope">

        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index"
  };
</script>

<style scoped lang="sass">
  .date-page
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    background-color: #fff
</style>
