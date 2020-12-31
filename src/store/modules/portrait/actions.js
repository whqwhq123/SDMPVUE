/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from "../../../utils/notice";

const actions = {
  // 获取购买力数据
  async getUserPurchasingPower ({commit}, params) {
    try {
      const res = await http.post('cust/getUserPurchasingPowerStatistics', params);
      if (res.code === 0) {
        // commit('setServiceList', res.data);
        commit('setChartsDataStatus', {type: 1, data: 1 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取购买力数据失败', icon: 'none', duration: 1000});
      console.error(e);
    }
  },
  // 获取购车意愿
  async getUserTradeIntention ({commit}, params) {
    try {
      const res = await http.post('cust/getUserTradeIntentionStatistics', params);
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
      notice({ title: '获取购车意愿数据失败', icon: 'none', duration: 1000});
      console.error(e);
    }
  },
  // 性格分布
  async getUserCharacter ({commit}, params) {
    try {
      const res = await http.post('cust/getUserCharacterStatistics', params);
      if (res.code === 0) {
        commit('setChartsDataStatus', {type: 1, data: 3 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取性格分布数据失败', icon: 'none', duration: 1000});
      console.error(e);
    }
  },
  // 意向车型
  async getUserCarType ({commit}, params) {
    try {
      const res = await http.post('cust/getUserCarTypeStatistics', params);
      if (res.code === 0) {
        commit('setChartsDataStatus', {type: 1, data: 4 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取意向车型数据失败', icon: 'none', duration: 1000});
      console.error(e);
    }
  },
  // 客群特征
  async getUserCharacteristic ({commit}, params) {
    try {
      const res = await http.post('cust/getUserCharacteristicStatistics', params);
      if (res.code === 0) {
        commit('setChartsDataStatus', {type: 1, data: 5 });
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      commit('setComponentLoaded', true);
      return res
    } catch (e) {
      commit('setComponentLoaded', true);
      notice({ title: '获取客群特征数据失败', icon: 'none', duration: 1000});
      console.error(e);
    }
  },
};

export default actions

