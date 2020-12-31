/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {
  notice
} from '../../../utils/notice'
const actions = {
  //验证手机号
  async checkoutPhone({
    commit
  }, params) {
    // const res = await http.post( 'saas/checkSalesmanPhone', params);
    const res = await http.post('saas/checkPhone', params);

    if (res.code === 0) {
      return res;
    } else {
      notice({
        title: res.errMsg,
        icon: 'none',
        duration: 1000
      })
    }

  },
  //登录
  async login({
    commit
  }, params) {
    try {
      return new Promise((resolve, reject) => {
        wx.request({
          url: params.url,
          method: 'post',
          data: params.data,
          headers: {
            'content-type': 'application/json'
          },
          success (res) {
            if (res.data.code === 0) {
              wx.setStorageSync("token",res.data.data)
              commit('setToken', res.data.data);
              resolve(res.data.data)
            } else {
              notice({ title: res.data.errMsg.substr(0,10), icon: 'none', duration: 2000})
              resolve(null)
            }
          }
        })
      })
    } catch (error) {

    }

  }
};

export default actions
