<template>
  <div class="activity">
    <div class="activity-title">关联店铺活动，更容易促单哦~</div>
    <ul class="activity-box">
      <li class="activity-box-item" v-for="(item, index) in activityLists" :key="index" @click="changeStatus(item)">
        <span class="select-item" :class="{'item-seleted': item.isActive}">
          <img v-if = "item.isActive" :src="imageApi+'/select-icon.png'" alt="">
        </span>
        <span class="img-wrap">
          <img :src="item.thumbnail" alt="">
        </span>
        <p>{{item.activityName}}</p>
      </li>
    </ul>
    <div class="activity-submit" @click="submit" :style="{backgroundColor: vi.all.pageBtn.bgColor, color: vi.all.pageBtn.color}">确定</div>
  </div>
</template>
<script>
import {imageApi} from '../../../http/url'
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      imageApi,
      carId: '',
      activityLists: []
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo',
      'selectedActivityList': 'recommendActivity/selectedActivityList',
      'vi': 'vi',
    })
  },
  mounted() {
    this.getLists()
  },
  onLoad: function (options){
    this.carId = options.carId
  },
  methods: {
    ...mapActions({
        'getAcrivityListsOfPrice':'recommendActivity/getAcrivityListsOfPrice'
    }),
    ...mapMutations({
      'setSelectedActivityList': 'recommendActivity/setSelectedActivityList'
    }),
    async getLists () {
      let params = {
        foursId: this.userInfo.foursId,
        carId: this.carId
      }
      let arrObj = {}
      this.selectedActivityList.forEach((at) => {
        return arrObj[at.activityId] = at
      })
      let res = await this.getAcrivityListsOfPrice(params)
      if (res.code == 0) {
        this.activityLists = res.data
        for (let i = 0; i < this.activityLists.length; i++) {
          if (arrObj[this.activityLists[i].activityId]) {
            this.activityLists[i].isActive = true
          } else {
            this.activityLists[i].isActive = false
          }
        }
      }
      this.activityLists = JSON.parse(JSON.stringify(this.activityLists))
    },
    changeStatus (item) {
      item.isActive = !item.isActive;
    },
    submit () {
      let newList = this.activityLists.filter((item) => {
        if (item.isActive) {
          return item
        }
      })
      // if (newList.length === 0) {
      //   mpvue.showToast({
      //     title: '请选择活动！',
      //     icon: 'none',
      //     duration: 1000
      //   })
      //   return
      // }
      this.setSelectedActivityList(JSON.parse(JSON.stringify(newList)))
      mpvue.navigateBack()
    }
  }
}
</script>
<style scoped>
.activity {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.activity-title {
  height:100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size:30rpx;
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(255,255,255,1);
  background: #1A1A1A;
}

.activity-box {
  flex: 1;
  padding: 48rpx 48rpx 0 48rpx;
  overflow-y: scroll;
}
.activity-box::-webkit-scrollbar {
  display: none;
}
.activity-box li {
  height: 144rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
  background: #F2F1F6;
  margin-bottom: 32rpx;
  border-radius: 32rpx;
}
.activity-box li .select-item {
  width: 36rpx;
  height: 36rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2rpx solid rgba(179,179,179,1);
}
.activity-box li .item-seleted {
  background: #BB0A30;
  border: 2rpx solid #BB0A30;
}
.activity-box li .select-item img {
  width: 20rpx;
  height: 20rpx;
  font-size: 0;
}
.activity-box li .img-wrap img {
  width: 192rpx;
  height: 144rpx;
  object-fit: cover;
}
.activity-box li p {
  width: 320rpx;
  height: 100rpx;
  font-size:28rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  line-height:48rpx;
  color:rgba(26,26,26,1);
  overflow : hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  align-self: flex-start;
}
.activity-submit {
  height:94rpx;
  line-height: 94rpx;
  text-align: center;
  background:rgba(26,26,26,1);
  font-size:28rpx;
  font-family:Source Han Sans CN;
  color:rgba(255,255,255,1);
}
</style>
