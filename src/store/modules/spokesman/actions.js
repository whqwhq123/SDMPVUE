/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
const actions = {
  //验证手机号
  async getSpokesmanInfoReq ({commit}, params) {
    const res = await http.get( 'proxyPerson/customIndex', params);

      if (res.code === 0) {
        return res;
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }

  }
};

export default actions

