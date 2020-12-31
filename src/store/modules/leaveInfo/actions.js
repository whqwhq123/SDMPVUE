/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { boat } from "../../../utils/boat";
import {saasApi} from "../../../http/url";

const actions = {
  async getSmallCode ({commit}, params) {
   try {
     const res = await http.get(saasApi + 'weixin/qr.jpg', params, { responseType: 'arraybuffer' });
     if (res) {
       return 'data:image/png;base64,' +  wx.arrayBufferToBase64(res)
     }
     else return { code: 1, errMsg: res.errMsg }
   } catch (e) {

   }
  }
};

export default actions

