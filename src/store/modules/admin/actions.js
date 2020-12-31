/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
const actions = {
  async getAdviseInfo ({commit}, params) {
    try {
      const res = await http.post('/feedback/createfeedback', params);
      if (res.code === 0) {
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '暂无数据', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  async getWeixinName ({commit}, params) {
    try {
      const res = await http.post('/saas/updatePersonInfo', params);
      if (res.code === 0) {
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '暂无数据', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  }
};

export default actions
