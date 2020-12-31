<template>
    <div class="no_effect">
         <div class="scan_title">核销码</div>
         <div class="scan_no_effect">
             <div class="title_err">
                 sorry~ 兑换码无效
             </div>
             <div class="sure_info">
                 请确认兑换码是否过期
             </div>
             <div class="img_err">
                 <img :src="imageApi+'/noEffect.png'" alt="">
             </div>
             <div>
                 <button class="go_back" @click="backFun">返回</button>
             </div>

         </div>
    </div>
</template>

<script>
    import {fenxiang} from "../../../utils";
    import {mapGetters} from 'vuex'
    import {imageApi} from "../../../http/url";
    export default {
        data(){
            return{
                imageApi
            }
        },
      computed: {
        ...mapGetters({
          'userInfo': 'userInfo'
        })
      },
        methods: {
            backFun() {
              wx.redirectTo({
                    url: '../scanInfo/main'
                })
            }
        },
        onShareAppMessage() {
          fenxiang.title = this.userInfo.foursName;
            return fenxiang
        },
        onLoad(res){
            this.lists=res.option;
        }
    }
</script>

<style lang="scss" scoped>
    .no_effect{
        height: 100vh;
        width: 100%;
        background: #F7F9FB;
        overflow: hidden;
        .scan_title{
            width: 100%;
            height: 5.397301349325337vh;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #2D2C31;
        }
        .scan_no_effect{
            height: 100%;
            background: #fff;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: center;
            margin-top: 3.1484257871064467vh;
            padding-top: 5.247376311844078vh;
            .title_err{
                font-size: 20px;
                color: #3E4A6D;
                font-weight: 700;
                text-align: center
            }
            .sure_info{
                color: #9097A7;
                font-size: 14px;
                text-align: center;
                margin-top: 4.0479760119940025vh;
            }
        }
        .img_err{
            text-align: center;
            margin-top: 2.6986506746626686vh;
            img{
                width: 29.86666666666667vw;
                height: 16.292353823088456vh;
            }
        }
        .go_back{
            width:26.666666666666668vw;
            height:4.197901049475263vh;
            border:1px solid rgba(62,74,109,1);
            opacity:1;
            border-radius:4.533333333333333vw;
            color: #3E4A6D;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 4.197901049475263vh;
        }
    }

</style>
