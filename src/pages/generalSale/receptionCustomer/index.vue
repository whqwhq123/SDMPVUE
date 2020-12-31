<template>
    <div class='reception_mian' v-if="reception">
        <reception-header :flag='flag' @close='close'></reception-header>
        <knowYouCus></knowYouCus>
        <Intercar-style></Intercar-style>
        <!-- <help-cus></help-cus> -->
        <del-wish></del-wish>
    </div>
</template>

<script>
    import receptionHeader from '../components/receptionHeader';
    import knowYouCus from '../components/knowYouCus';
    import IntercarStyle from '../components/IntercarStyle';
    // import helpCus from '../components/helpCus';
    import delWish from '../components/delWish';
    import { mapActions, mapGetters,mapMutations } from 'vuex'; 
    export default {
        components: {
            receptionHeader,
            knowYouCus,
            IntercarStyle,
            // helpCus,
            delWish
        },
        data(){
            return {
                flag:true
            }
        },
        computed: {
            ...mapGetters({
                'userInfo':'userInfo',
                'reception':'user/reception'
            }),
        },
        methods: {
            close() {
               this.flag=false; 
            }
        },
        onLoad(op){
           
        }
    }
</script>

<style lang="scss" scoped>
    .reception_mian{
       

    }
</style>