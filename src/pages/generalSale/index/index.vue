<template>
  <div class="general_sale" v-if="indexTitle">
    <!-- <div class="general_sale"> -->
    <notic-tab></notic-tab>
    <reception-customer></reception-customer>
    <write-off></write-off>
    <focus-cus></focus-cus>
    <!-- <become-sale></become-sale> -->
    <!-- <car-style-and-price></car-style-and-price> -->
     <rec-models></rec-models>
    <car-inccend></car-inccend>
    <effective-cus></effective-cus>
    <task-mgr></task-mgr>
   
    <shop-invite></shop-invite>

    <!-- <tools></tools> -->
  </div>
</template>

<script>
import noticTab from "../components/noticTab.vue";
import receptionCustomer from "../components/receptionCus.vue";
import writeOff from "../components/WriteOff.vue";
import focusCus from "../components/focusCus.vue";
import becomeSale from "../components/becomeSale.vue";
import carStyleAndPrice from "../components/carStyleAndPrice.vue";
import effectiveCus from "../components/effectiveCus.vue";
import carInccend from "../components/carInccend.vue";
import shopInvite from "../components/shopInvite.vue";
import taskMgr from "../components/taskMgr.vue";
import recModels from "../components/recModels.vue";
import tools from "../components/tools.vue";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    noticTab,
    receptionCustomer,
    writeOff,
    focusCus,
    becomeSale,
    carInccend,
    tools,
    shopInvite,
    // carStyleAndPrice,
    effectiveCus,
    recModels,
    taskMgr,
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
      indexTitle: "user/indexTitle",
    }),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.general_sale {
  padding-bottom: 30rpx;
  font-family: Source Han Sans CN;
  height: 100%;
  width: 100%;
}
</style>
