import http from "../http/api";
import { mapGetters, mapActions, mapMutations } from 'vuex'
import store from './../store/index'
import { manuAdminApi } from "../http/url";


// 场景类型
const sceneClass = {
  '1': '潜客分析',
  '2': '购车需求分析',
  '3': '离店场景分析',
  '4': '交易决策',
  '5': '成交战败'
}

// 埋点页面
const pageClass = {
  '11': '见面礼',
  '12': '购车津贴',
  '13': '名片分享',
  '14': '优惠券',
  '15': '到店邀请函',
  '21': '车型推荐',
  '22': '电子报价单',
  '23': '气质选车',
  '24': '数据选车',
  '25': 'AR寻礼',
  '31': '报价对比',
  '32': '查看资讯',
  '41': '权益兑换',
  '51': '成交',
  '52': '战败'
}
//埋点
export const addUserLog = async (type, phone, success, fail, complete) => {
  try {
    if (!type || typeof type != 'string') return
    let sceneIdx = type.split('-')[0] || '0'
    let pageIdx = type.split('-')[1] || '0'
    console.log(store.getters.userInfo)
    let params = {
      userPhone: phone || '',
      foursId: store.getters.userInfo.foursId || '',
      masterNode: sceneClass[sceneIdx] || '',
      slaveNode: pageClass[pageIdx] || '',
    }
    try {
      const res = await http.post(manuAdminApi + 'userLog/addUserLog', params);
      if (res.code === 0) {
        if (success) {
          success(res)
        }
      }
      else {
        if (fail) {
          fail(res)
        }
      }
      return res
    } catch (e) {
      return
    }
  } catch (e) {
    return { code: 1, errMsg: '添加日志失败' }
  }
}
