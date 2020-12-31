/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {notice} from "../../../utils/notice";
import { labelApi } from "../../../http/url";

const actions = {
  async getRealPrice ({commit}, params) {
    try {
      const res = await http.post(labelApi + 'sdmp1.2.1/getRealPrice', params);
      if (res.code === '0') {
        commit('setRealPrice', res.data.baseCarTypeMessage);
        return res
      }
      else notice({title: res.errMsg})
    } catch (e) {
      console.error(e)
    }
  },
  async getChartsData ({commit}, params) {
    try {
      const res = await http.post(labelApi + 'sdmp1.2.1/selectDealPriceByMonth', params);
      if (res.code === '0') {
        commit('setChartData', res.data);
        return res
      }
      else notice({title: res.errMsg})
    } catch (e) {
      console.error(e)
    }
  }
};

export default actions

