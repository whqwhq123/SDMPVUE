/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import {saasApi} from '../../../http/url'
import { notice } from '../../../utils/notice'
const actions = {
  /**
   * 预约人数计算
   * 
   * @param {string} salesman 
   */
  async getAppointmentCount ({commit}, params) {
    try {
      const res = await http.post('invite/getAppointmentCount', params);
      if (res.code === 0) {
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      console.log(res)
      return res
    } catch (e) {
      notice({ title: '没有更多数据了', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  /**
   * 获取邀请函活动列表
   * 
   * @param {string} foursId 
   */
  async getInviteActivityList ({commit}, params) {
    try {
      const res = await http.post('invite/getActivityInfoByFoursId', params);
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
   * 获取预约客户列表
   * 
   * url invite/getAppointmentInfoList
   * @param {string} salesman // 销售顾问ID
   * @param {string} foursId  // 店ID
   * @param {string} startTime // 开始时间
   * @param {string} endTime   // 结束时间
   * @param {string} pageNo 
   * @param {string} pageSize 
   */
  async getAppointmentInfoList ({commit}, params) {
    try {
      const res = await http.post('invite/getAppointmentInfoList', params);
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
