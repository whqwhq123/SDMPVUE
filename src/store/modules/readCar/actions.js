/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {labelApi} from "../../../http/url";
import {notice} from "../../../utils/notice";

const actions = {
  async getCarSeries ({commit}, params) {
    try {
      const res = await http.post(labelApi + 'sdmpController/getCarModelForSdmp', params);
      if (res.code === '0') {
        commit('setCarSeries', res.data)
      }
      else notice({title: res.errMsg})
    } catch (e) {
      console.error(e)
    }
  },
  // 卖点
  async getCarInfo ({commit}, params) {
    try {
      const res = await http.post(labelApi + 'sdmp1.2.1/salePoint', params);
      if (res.code === '0') {
        commit('setCarAllInfo', res.data);
        // commit('SET_CARINFO', res.data.carModel);
        return res
      }
      else notice({title: res.errMsg})
    } catch (e) {
      console.error(e)
    }
  }
};

export default actions

