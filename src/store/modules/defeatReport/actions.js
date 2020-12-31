/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
import {formatDay} from "../../../utils";
const actions = {
  /**
   * 获取洞察服务列表
   * */
  async getFactor ({commit}, params) {
    try {
      const res = await http.post('/cust/getFailReportForms', params);
      if (res.code === 0) {
        // commit('setFactor', res);
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '没有更多数据了', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  async getFactorEchart ({commit}, params) {
    try {
      const res = await http.post('/cust/getFailElement', params);
      if (res.code === 0) {
        // commit('setFactor', res);
      }
      else {
        notice({title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '没有更多数据了', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  async getFactorFeature ({commit}, params) {
    try {
      const res = await http.post('/cust/getUserCharacteristicStatistics', params);
      if (res.code === 0) {
        // commit('setFactorFeature', res);
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '没有更多数据了', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  }
};

export default actions

