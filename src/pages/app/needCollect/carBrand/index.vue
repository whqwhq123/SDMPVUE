<template>
    <div class='brand_contain'>
       <div class="item_list" v-for="(item,index) in brandList" :key="index">
           <div class="bran_name">{{index}}</div>
           <div class="brand" v-for='(val,ins) in item' :key="ins" @click="getStyle(val)">
               <img :src="val.ossUrl" alt="" class="brand_img">
               <span class="brang_name_label">{{val.makeName}}</span>
               
            </div>
       </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    export default {
        data(){
            return{
                brandList:{}
            }
        },
        methods:{
            ...mapMutations({
                'setCarBrand':'user/setCarBrand'
            }),
            ...mapActions({
                'getCarBrand':'user/getCarBrand'
            }),
            // 获取品牌
            async getBrand(){
                let res=await this.getCarBrand();
                if(res.code==0){
                    this.brandList=res.data;
                }
            },
            getStyle(val){
                this.setCarBrand(val)
                wx.navigateTo({
                    url:'/pages/app/needCollect/carStyle/main'
                })
                
            }
        },
        onShow(){
            this.getBrand();
        }
    }
</script>

<style lang="scss" scoped>
    .brand_contain{
        height: 100%;
        // overflow-y: auto;
        padding: 14rpx 40rpx 0 40rpx;
        .bran_name{
            color: #333;
            font-size: 40rpx;
            margin: 50rpx 0 40rpx 0;
            font-weight:500;
        }
        .brand{
            height: 88rpx;
            border-bottom:1px solid rgba(244,244,244,1);
            // line-height: 88rpx;
            padding-left: 40rpx;
            color: #343434;
            font-size: 28rpx;
            display: flex;
            align-items: center;
            .brang_name_label{
                margin-left: 82rpx;
            }
            .brand_img{
                width:56rpx;
                height: 56rpx;
            }
        }
    }
</style>