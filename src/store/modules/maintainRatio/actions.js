/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {notice} from "../../../utils/notice";
import { labelApi } from "../../../http/url";

const actions = {
  async getKeepValue ({commit}, params) {
    try {
      const res = await http.post(labelApi + 'sdmp1.2.1/keepValue', params);
      if (res.code === '0') {
        // commit('setKeepValue', res.data);
        return res
      }
      else notice({title: res.errMsg})
    } catch (e) {
      console.error(e)
    }
  }
};

export default actions

