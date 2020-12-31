<template>
    <span>{{showText}}</span>
</template>

<script>
  /**
   * @author yuhongru
   * @email  yuhongru@atgco.cn
   * @date   2019/7/3 17:39
   **/
  export default {
    name: "commaMoney",
    props: {
      num: Number
    },
    computed: {
      showText () {
        return this.num ? this.formatNumber(this.num) : 0
      }
    },
    methods: {
      formatNumber(nStr ){
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
      }
    }
  }
</script>

<style scoped>

</style>
