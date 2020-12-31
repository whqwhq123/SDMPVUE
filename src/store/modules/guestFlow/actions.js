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
  async getDetail ({commit}, params) {
    try {
      const res = await http.post('/passengerFlow/home', params);
      if (res.code === 0) {
        commit('setDetail', res);
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '没有更多数据了', icon: 'none', duration: 1000});
      console.error(e);
      return
    }
  },
  /**
   * 获取首页客流统计信息
   * */
  async getGuestInfo ({commit}, params) {
    try {
      const res = await http.post('/passengerFlow/home', params);
      if (res.code === 0) {
        // commit('setDetail', res);
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '获取客流统计数据失败', icon: 'none', duration: 1000});
      console.error(e);
      return
    }
  },
};

export default actions

