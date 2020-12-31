<template>
  <div class="advise">
    <div class="advise-title">意见与建议</div>
    <div class="advise-area" v-if="hideTextarea">
      <textarea name="" id="" v-model="adviseTxt" maxlength="200" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></textarea>
      <span class="advise-area-num">{{adviseNum}}/200</span>
    </div>
    <div class="advise-title">
      <div class="advise-title-main">相关截图&nbsp;<span class="advise-title-sub">(选填)</span></div>
      <div class="advise-title-sub">{{imageNum}}/4</div>
    </div>
    <div class="advise-img" @click="addImage">
      <div v-for="(item, index) in imgLists" :key="index" class="advise-img-add">
        <img :src="item" alt="">
      </div>
      <div class="advise-img-add" v-if="imgLists.length < 4">
        <img :src="imageApi+'/advise-icon.png'" alt="" v-if="imageApi">
      </div>
    </div>
    <div class="advise-line"></div>
    <div class="advise-submit" @click="submit" :style="{backgroundColor: vi.all.pageBtn.bgColor, color:  vi.all.pageBtn.color}">提交</div>
    <successInfo @cancel = 'cancel' :infoParam="infoParam" v-if="isShwoInfo"></successInfo>
  </div>
</template>
<script>
import {imageApi, saasApi} from '../../../http/url'
import {mapActions, mapGetters} from 'vuex'
import successInfo from '../successInfo/index'
export default {
  components: {
    successInfo
  },
  data () {
    return {
      imageApi,
      hideTextarea:true,
      infoParam: '反馈提交成功，{{{time}}}S后返回[我的]页面',
      adviseTxt: '',
      isShwoInfo: false,
      imgToken: '',
      imgLists: []
    }
  },
  computed: {
    ...mapGetters({
      'vi': 'vi',
      'token': 'login/token',
      'userInfo':'userInfo'
    }),
    adviseNum () {
      return this.adviseTxt.length;
    },
    imageNum () {
      return this.imgLists.length;
    }
  },
  mounted() {
    this.adviseTxt=''
    this.hideTextarea=true
    this.imgLists=[]
    this.imgToken = this.token
  },
  methods: {
    ...mapActions({
      getAdviseInfo: 'adminModule/getAdviseInfo'
    }),
    addImage () {
      let that = this
      let len = 4 - this.imgLists.length
      wx.chooseImage({
        count: len,
        success (res) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          const tempFilePaths = res.tempFilePaths
          let lists = []
          for (let i = 0; i < tempFilePaths.length; i++) {
            wx.uploadFile({
              url: saasApi+ 'file/fileUpload',
              filePath: tempFilePaths[i],
              name: 'file',
              header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json',
                'Authorization': that.imgToken
              },
              formData: {
                'user': 'test'
              },
              success (res){
                const data = res.data
                let newData = JSON.parse(data)
                if (newData.code == 0 && that.imgLists.length < 4) {
                  that.imgLists.push(newData.data)
                }
                if (tempFilePaths.length === i+1) {
                  wx.hideToast()
                }
              }
            })
            console.log(that.imgLists)
          }
        }
      })
    },
    async submit () {
      if (this.adviseTxt.length == 0) {
        wx.showToast({
          title: '请填写意见与建议',
          icon: 'none',
          duration: 1000
        })
        return
      }
      let params = {
        content: this.adviseTxt,
        pic: this.imgLists.join(),
        feedbackUser:this.userInfo.phone,
        type:'意见与建议',
        version:"V1.3.0"
      }
      let res = await this.getAdviseInfo(params)
      if (res.code == 0) {
        this.adviseTxt=''
        this.hideTextarea=false
        this.isShwoInfo = true
      } else {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 1000
        })
      }
    },
    cancel () {
      this.isShwoInfo = false
      mpvue.navigateBack()
    }
  },
}
</script>
<style scoped>
.advise {
  font-family:Source Han Sans CN;
  font-weight:500;
  color:rgba(26,26,26,1);
  overflow: hidden;
}

.advise-title {
  margin: 24rpx 80rpx 0 60rpx;
  font-size: 40rpx;
  display: flex;
  justify-content: space-between;
}
.advise-title-main {
  display: flex;
  align-items: center;
}
.advise-title-sub {
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(179,179,179,1);
}
.advise-submit {
  position: fixed;
  left: 50%;
  bottom: 196rpx;
  transform: translateX(-50%);
  width:630rpx;
  height:84rpx;
  line-height: 84rpx;
  text-align: center;
  background:rgba(26,26,26,1);
  border-radius:40rpx;
  font-size:36rpx;
  color:rgba(255,255,255,1);
}

.advise-line {
  margin: 108rpx 44rpx 0 50rpx;
  height: 2rpx;
  background: #F2F2F2;
}

.advise-area {
  margin: 46rpx 60rpx 100rpx 60rpx;
  height: 222rpx;
  border: 2rpx dashed #888888;
  display: flex;
  flex-direction: column;
}
.advise-area textarea {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  padding: 24rpx 36rpx;
  font-size:24rpx;
  font-weight:400;
  color:rgba(179,179,179,1);
  line-height: 48rpx;
}
.advise-area .advise-area-num {
  display: block;
  padding: 0 20rpx 12rpx 0;
  text-align: right;
  font-size:24rpx;
  font-family:Source Han Sans CN;
  font-weight:400;
  color:rgba(179,179,179,1);
}

.advise-img {
  display: flex;
  margin-top: 76rpx;
  margin-left: 86rpx;
  width: 92rpx;
  height: 92rpx;
}
.advise-img .advise-img-add {
  margin-right: 16rpx;
}
.advise-img .advise-img-add img {
  width: 92rpx;
  height: 92rpx;
  object-fit: cover;
}
</style>
