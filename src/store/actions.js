/**
 *  @author zhoujianxu
 * */
import * as types from './mutations_type'
import http from "../http/api";
// if use elementUi
import { notice } from "../utils/notice";
import { labelApi, saasApi } from "../http/url";

const actions = {
  async userLogin ({ commit }, data) {
    try {
      const res = await http.post('saas/personInfo', data);
      if (res.code == 0) {
        commit(types.SET_USERINFO, res.data);
        return res.data
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },
  async getViModel ({ commit }, data) {
    try {
      const res = await http.post('vi/queryVITemplateBymanuId', data);
      if (res.code === 0) {
        if (res.data) {
          commit('setViModel', JSON.parse(res.data.preview));
        }
        return true
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },
  async getRoleInfo({ commit }, data) {
    try {
      const res = await http.post(saasApi + 'appServer/myInfo', data);
      if (res.code === 0) {
        commit(types.SET_ROLEINFO, res.data);
        return true
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },
  async getNewNoticeNumReq ({ commit }, data) {
    try {
      const res = await http.post('trajectory/noticeInfoCount', data)
      if (res.code === 0) {
        return res
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },
  // 核销礼品和优惠券code码
  async verification({ commit },data) {
    try {
      const res = await http.post(saasApi +'checkOut/checkOut', data)
      if (res.code === 0) {
        return res
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },
  // 获取券码详情
  async getquanDetal({ commit },data) {
    try {
      const res = await http.post(saasApi +'checkOut/getInfo', data)
      if (res.code === 0) {
        return res
      }
      else notice({ title: res.errMsg })
    } catch (e) {
      console.error(e)
    }
  },

  // 获取优惠券
  async Coupons({commit}, params) {
    const res = await http.get(saasApi +'checkOut/getMyCouponOrGift', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
}

export default actions
