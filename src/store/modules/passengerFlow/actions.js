/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from "../../../utils/notice";

const actions = {
  async getGuestChartData ({commit}, params) {
    try {
      const res = await http.post('/passengerFlow/distributed', params);
      if (res.code === 0) {
        // commit('setDetail', res);
        commit('setChartsDataStatus', {type: 1, data: 1 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取人流量分布失败', icon: 'none', duration: 1000});
      console.error(e);
      return
    }
  },

  async getRegionalPassengerFlow ({commit}, params) {
    try {
      const res = await http.post('/passengerFlow/regional', params);
      if (res.code === 0) {
        commit('setChartsDataStatus', {type: 1, data: 2 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取同区，全国集客比失败', icon: 'none', duration: 1000});
      console.error(e);
      return
    }
  }
};

export default actions

