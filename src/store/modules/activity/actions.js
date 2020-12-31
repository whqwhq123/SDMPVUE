/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {saasApi} from '../../../http/url'
import { notice } from '../../../utils/notice'
const actions = {
  /**
   * 获取活动列表
   * */
  async getActivityLists ({commit}, params) {
    try {
      const res = await http.post(saasApi + '/activity/queryActivity', params);
      if (res.code === 0) {
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
  /**
   * 获取二维码
   * */
  async getImageInfo ({commit}, params) {
    console.log(saasApi)
    try {
      const res = await http.get(saasApi + 'weixin/qr.jpg', params, { responseType: 'arraybuffer' });
      if (res) {
        return 'data:image/png;base64,' +  wx.arrayBufferToBase64(res)
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '暂无数据', icon: 'none', duration: 1000});
      return
    }
  },
    /**
   * 获取电子报价单活动列表
   * */
  async getAcrivityListsOfPrice ({commit}, params) {
    try {
      const res = await http.get('/quotation/getActivityByCarId', params);
      if (res.code === 0) {
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
