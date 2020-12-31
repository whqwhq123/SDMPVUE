<template>
    <div class="select_main">
       <div class="select_but">
           <span class="select_text" @click="select">{{areaInfo.labelName}}</span>
       </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        data(){
            return{
                data:'全部'
            }
        },
        computed:{
            ...mapGetters({
                 'areaInfo':'areaInfo',
                 'userInfo':'userInfo'
            })
        },
        methods:{
          ...mapMutations({
            'changeSelect':'changeSelect'
          }),
          select(){
              wx.navigateTo({
                  url:'../shopSelect/slectArea/main'
              })
          },
          async getAllRedis(){
            const res = await http.post(api + 'fsi/getAllFoursInfo',{
              manuId:this.userInfo.manuId,
              areaId:this.province,
              provinceCode:this.city,
              cityCode:this.detail,
              type:1
            });
            console.log(this.activeIndex);
            this.changeSelect({
              redis:res.data,
              item:null,
              foursId:null,
              type:'all',
              labelName:this.userInfo.areaName,

            })
          },
        },
        onLoad(){
          if(this.userInfo.targetType==='A'){
            this.getAllRedis()
          }
        }
    }
</script>

<style lang="scss" scoped>
    .select_main{
        width: 100%;
        .select_but{
            width: 100%;
            height:92rpx;
            background:rgba(245,245,245,1);
            opacity:1;
            display: flex;
            align-items: center;
            justify-content: center;
            .select_text{
                color: #444;
                font-size: 32rpx;
                font-weight: 400;
            }
            .select_text::after{
                content: '';
                display: inline-block;
                width: 22rpx;
                height: 22rpx;
                border-right: 2px solid #444;
                border-top: 2px solid #444;
                transform: rotate(135deg);
                margin-left: 16rpx;
                margin-bottom: 8rpx;
            }
        }
    }
</style>
