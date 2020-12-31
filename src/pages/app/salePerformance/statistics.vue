<template>
  <section class="statistic">
    <div class="sale_status_content" v-if="!isMaxNumber">
      <ul>
        <li class="sale_num">{{statistics.total}}</li>
        <li class="sale_text">{{statistics.type[0]}}</li>
      </ul>
      <ul>
        <li class="sale_num">{{statistics.deal}}</li>
        <li class="sale_text">{{statistics.type[1]}}</li>
      </ul>
      <ul>
        <li class="sale_num">{{percents}}<span class="percent">%</span></li>
        <li class="sale_text">{{statistics.type[2]}}</li>
      </ul>
    </div>
    <div class="sale_status_max" v-if="isMaxNumber">
      <ul class="custom">
        <li class="text">{{statistics.type[0]}}</li>
        <li class="custom_num">{{statistics.total}}</li>
      </ul>

      <div class="leave_number">
        <ul class="deal_num_left">
          <li class="text">{{statistics.type[1]}}</li>
          <li class="deal_num">{{statistics.deal}}</li>
        </ul>
        <ul>
          <li class="text">{{statistics.type[2]}}</li>
          <li class="deal_num">{{percents}}<span class="percent">%</span></li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props:['statistics'],
  computed: {
    percents() {
      let { deal, total } = this.statistics
      let res = this.getPercent(deal, total)
      return res
    },
    isMaxNumber() {
      if (JSON.stringify(this.statistics.deal).length > 4 || JSON.stringify(this.statistics.total).length > 4) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {

  },
  data() {
    return {
    }
  },

  mounted() {
    console.log(this.statistics)
  },
  methods: {
    //  求百分比
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "--";
      }
      return total <= 0 ? "0" : (Math.round(num / total * 10000) / 100.00);
    }
  }
}
</script>

<style lang="scss" scoped>
.statistic {
  padding: 0 32rpx;
}
.sale_status_content {
  display: flex;
  justify-content: space-around;
  color: #ffffff;
  background-color: #38394f;
  padding: 36rpx 0 32rpx 0;
  border-radius: 28rpx;
  box-sizing: border-box;
  .sale_num {
    font-size: 70rpx;
    font-weight: bold;
    font-family:Arial;
    text-align: center;
  }
  .sale_text {
    margin-top: 10rpx;
    font-size: 24rpx;
    text-align: center;
  }
  .percent {
    font-size: 40rpx;
    font-family:Arial;
    font-weight:bold;
  }
}

.sale_status_max {
  background-color: #38394f;
  color: #ffffff;
  border-radius: 28rpx;
  padding: 36rpx 46rpx 32rpx 46rpx;

  .leave_number {
    display: flex;
    // justify-content: space-between;
    box-sizing: border-box;
    margin-top: 10rpx;
  }
  .deal_num_left {
    margin-right: 160rpx;
  }
  .text {
    font-size: 24rpx;
  }
  .custom_num {
    font-size: 68rpx;
  }
  .deal_num {
    font-size: 50rpx;
  }
  .custom_num, .deal_num {
    font-weight: bold;
    font-family:Arial;
  }
  .percent {
    font-size: 30rpx;
    font-family:Arial;
    font-weight:bold;
  }
}
</style>
