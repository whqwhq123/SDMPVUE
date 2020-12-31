/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
import {formatDay} from "../../../utils";
const actions = {
  /**
   * 获取洞察服务列表
   * */
  async getServiceList ({commit}, params) {
    console.log(params)
    try {
      const res = await http.post('saas/getServiceInfo', params);
      if (res.code === 0) {
        let list = res.data.filter((item) => {
          let status = item.displayPlatform.includes('icon-service-smallPro')
          if (status) {
            return item
          }
        });
        commit('setServiceList', list);
      }
      else {
        notice({ title: res.data.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      notice({ title: '获取服务列表失败', icon: 'none', duration: 1000});
      console.error(e)
      return
    }
  },
  /**
   * 获取最近查询客户列表
   * */
  async getSearchCusLog ({commit}, params) {
    try {
      const res = await http.post('customer/recentCust', params);
      if (res.code === 0) {
        res.data = res.data.map((user) => {
          user.time = formatDay(user.updateTime)
          return user
        })
        commit('setUserList', res.data);
      }
      else notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res
    } catch (e) {
      notice({ title: '获取最近查询客户列表失败', icon: 'none', duration: 1000});
      console.error(e)
    }
  },
  /**
   * 根据手机号获取相似客户列表
   * */
  async getPhoneLikeCusList ({commit}, params) {
    try {
      const res = await http.post('customer/listSaleManCustInfo', params.params);
      if (res.code === 0) {
        res.data.recordList = res.data.recordList.map((item)=> {
          let beforePhone = item.phone.slice(0,7);
          let afterPhone = item.phone.slice(7, item.phone.length);
          item['showPhone'] = [beforePhone, afterPhone];
          return item
        });
        if (params.status === 0 || res.data.recordList.length > params.status) {
          if (params.params.pageNo > 1)  {
              commit('setPhoneLikeConcatCusList', res.data.recordList);
          } else {
            commit('setPhoneLikeCusList', res.data.recordList);
            return res.data.recordList.length
          }
          if (res.data.recordList.length < params.params.pageSize) {
            if (params.params.pageNo > 1) {
              notice({title: '没有更多数据了！'});
            }
            return res.data.recordList.length
          } else {
            return 0
          }
        } else {
          if (params.params.pageNo > 1) {
            notice({title: '没有更多数据了！'})
          } else {
            commit('setPhoneLikeCusList', res.data.recordList);
          }
          return res.data.recordList.length
        }
      }
      else notice({ title: res.errMsg, icon: 'none', duration: 1000});
      return res
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 洞察客户
   * */
  async insightCustomer ({commit}, params) {
    try {
      const res = await http.post('sales/insightCustomer', params);
      if (res.code === 0) {
        return res
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
      return res
    } catch (e) {
      console.error(e)
    }
  },
  /**
   * 洞察客户轮询结果
   * */
  async getInsightInfo ({commit}, params) {
    try {
      const res = await http.post('insight/allDetail', params);
      if (res.code === 0) {
        commit('setInsightResult', res.data)
      }
      return res
    } catch (e) {
      console.error(e)
    }
  }
};

export default actions

