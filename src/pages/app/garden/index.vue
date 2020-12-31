<template>
   <div>
		  <web-view :src="src"></web-view>
      <!-- <web-view src="https://phone.atgco.cn/#/analysisResults?phone=15622782483"></web-view> -->
   </div>

</template>

<script>
  import { portraitUrl } from "./../../../http/url";
  export default {
    name: "mobilePhonePortrait",
    data() {
      return {
        src: '',
        userPhone: '',
      }
    },
    components: {
      
    },
    computed: {
      
    },
    onLoad (options) {
      this.userPhone = options.userPhone || ''
      this.src =  portraitUrl +'/#/analysisResults?phone='+ options.userPhone +'&t='+ new Date().getTime()
      console.log(this.src)
		},
    methods: {
      
    },
    mounted () {
      // this.getNoticeList()
    },
    onShow () {
     
    }
  }
</script>

<style scoped lang="scss">
 
</style>
