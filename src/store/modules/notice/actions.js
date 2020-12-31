/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
const actions = {
  async getNoticeListReq ({commit}, params) {
    const res = await http.post( 'trajectory/noticeInfo', params);
      if (res.code === 0) {
        return res;
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
  },
};

export default actions

