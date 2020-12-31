/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
import {formatDay} from "../../../utils";
const actions = {
  /**
   * 获取车系列表
   * */
  async getCars ({commit}, params) {
    try {
      const res = await http.post('quotation/getCarModel', params)
      let { code, data, errMsg } =  res
      if (code === 0) {

      }
      else {
        notice({ title: errMsg, icon: 'none', duration: 1000})
      }
      return { code, data, errMsg }
    } catch (e) {
      notice({ title: '获取车系列表失败', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  /**
   * 获取车型列表
   * */
  async getCarModel ({commit}, params) {
    try {
      const res = await http.post('quotation/selectCarStyle', params)
      let { code, data, errMsg } =  res
      if (code === 0) {
      }
      else {
        notice({ title: errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '获取车型列表失败', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  }
};

export default actions

