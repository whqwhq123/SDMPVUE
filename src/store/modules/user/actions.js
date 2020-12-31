/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
import { labelApi } from "../../../http/url";
const actions = {
  //获取用户列表
  async getUserList ({commit}, params) {
      const res = await http.post( '/customer/listSaleManCustInfo', params);
      if (res.code === 0) {
        res.data.recordList = res.data.recordList.map((item)=> {
          let beforePhone = item.phone.slice(0,7);
          let afterPhone = item.phone.slice(7, item.phone.length);
          item['showPhone'] = [beforePhone, afterPhone];
          return item
        });
        return res;
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }

  },
    // 获取已分配的客户信息
    async getAlreadyList ({commit}, params) {
        const res = await http.post('/userQuery/getAssignedUserInfo', params);
        if (res.code === 0) {
          res.data.recordList = res.data.recordList.map((item)=> {
            let beforePhone = item.phone.slice(0,7);
            let afterPhone = item.phone.slice(7, item.phone.length);
            item['showPhone'] = [beforePhone, afterPhone];
            return item
          });
          return res;
        }
        else {
          notice({ title: res.errMsg, icon: 'none', duration: 1000})
        }
      
    },

  // 检查用户是否已存在
  async checkoutUser ({commit}, params) {
    try {
      const res = await http.post( '/customer/selectCustomerInfo', params);
      if (res.code === 0) {

        return res;
      }
      else {
        notice({ title: res.errMsg, icon: 'none', duration: 1000})
      }
    } catch (error) {
      if (err.status) {
        if (err.status === 401) {
          notice({title: '店铺已废弃'})
        }
      }
    }

  },
  //创建用户
  async createUser ({commit}, params) {
    const res = await http.post( '/customer/addCustomerInfo', params);
    if (res.code === 0) {
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

  },
  // 更新客户资料
  async updateUserInfo ({commit}, params) {
    const res = await http.post( '/customer/updateCust', params);
    if (res.code === 0) {
      notice({ title: '客户资料更新成功', icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

  },
  // 接待记录
  async visitLog ({commit}, params) {
    const res = await http.post( '/customer/getReceptionRecord', params);
    if (res.code === 0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

  },
  //记录销售每次的接待结果
  async recordREsult ({commit}, params) {
    const res = await http.post( '/customer/addTradeAnalysisInfo', params);
    if (res.code === 0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: '操作失败', icon: 'none', duration: 1000})
    }

  },
  // 检验手机号是否注册过
  async checkoutPhone ({commit}, params) {
    const res = await http.post( params.url, params.data);
    if (res.code === 0) {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else if(res.code==2){
      return res;
    }
    else {
      return res;
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

  },
  // 获取验证码
  async   getCode ({commit}, params) {
    const res = await http.get( params.url, params.data);
    if (res.code === 0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      return res;
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

  },
  //校验验证码
  async checkMsCode ({commit}, params) {
    const res = await http.post( params.url, params.data);
    if (res.code === 0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {

      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },

  // 密码重置
  async resetPassword ({commit}, params) {
    const res = await http.post( params.url, params.data);
    if (res.code === 0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {

      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  //扫码获取信息
  async scanMsg ({commit}, params) {
    const res = await http.get( params.url, params.data);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  //兑换信息
  async conversion ({commit}, params) {
    const res = await http.post( params.url, params.data);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  // 获取车系信息
  async getCarSeries ({commit}, params) {
    const res = await http.post( 'fsi/getCarTypeByManuId', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  //  获取车型
  async getCarType ({commit}, params) {
    const res = await http.post( labelApi+'sdmp1.2.1/selectBymodelName', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  // 客户动向追踪
  async customerTick ({commit}, params) {
    const res = await http.post( '/trajectory/userTrajectoryInfo', params);
    if (res.code ===0) {
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  //活动推荐
  async activeRecommend ({commit}, params) {
    const res = await http.post( '', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  // 获取单个用户信息
  async getPersonlinfo ({commit}, params) {
    const res = await http.post( '/customer/customeInfo', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  //获取已分配列表
  async getSaleOpList ({commit}, params) {
    const res = await http.post( '/userQuery/getWaitUserInfo', params);
    if (res.code === 0) {
      res.data.recordList = res.data.recordList.map((item)=> {
        let beforePhone = item.phone.slice(0,7);
        let afterPhone = item.phone.slice(7, item.phone.length);
        item['showPhone'] = [beforePhone, afterPhone];
        return item
      });
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
    }

},
  // 获取分配销售列表
  async getSaleList({commit}, params) {
    const res = await http.post( '/sales/getFoursSalesmanInfo', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  // 指派销售
  async appointSale({commit}, params) {
    const res = await http.post( '/userQuery/setWaitUserSalesman', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },

  // 需求搜集标签
  async getUserLabel({commit}, params) {
    const res = await http.get( '/brandRecommend/index', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }

  },
  // 需求搜集 咨询底价
  async consultPrice({commit}, params) {
    const res = await http.post( '/brandRecommend/saveBrandRecommend', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 获取品牌
  async getCarBrand({commit}, params) {
    const res = await http.post( '/brandRecommend/selectAllCarMake', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 获取车系
  async getCarStyle({commit}, params) {
    const res = await http.post( '/brandRecommend/getFirmsByMakeId', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 获取关注客户列表
  async getFocusCus({commit}, params) {
    const res = await http.post( '/customer/requireAttentionCustomeInfo', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 行业资讯
  async getIndustry({commit}, params) {
    const res = await http.post( '/news/getSalesmanNewsTop', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 首页消息提醒
  async messNotice({commit}, params) {
    const res = await http.post( '/trajectory/remindInfo', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 点击消息轮播关闭按钮
  async closeNotice({commit}, params) {
    const res = await http.post( '/trajectory/recordUserTrajectoryLog', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 获取在售车系列表
  async getCarModel({commit}, params) {
    const res = await http.post( '/brandRecommend/getCarModel', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 获取推荐车型信息
  async getRecommedCar({commit}, params) {
    const res = await http.post( '/cpc/getCustomerCarByPhone', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 津贴详细信息
  async carAllowance1({commit}, params) {
    const res = await http.get( '/carAllowance/index', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }
  },

  async carAllowance({commit}, params) {
    const res = await http.post( '/carAllowance/checkQrCode', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 海报信息
  async getPosterInfo({commit}, params) {
    const res = await http.post( '/poster/queryPosterByBrand', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      // notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },

  // 津贴核销
  async AllowanceCancellation({commit}, params) {
    const res = await http.get( '/carAllowance/cancellation', params);
    if (res.code ===0) {
      notice({ title: res.errMsg, icon: 'none', duration: 1500})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 获取报价单列表
  async getPriceNotce({commit}, params) {
    const res = await http.get( '/electronicQuotation/list', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 标题
  async getTitle({commit}, params) {
    const res = await http.get( '/common/getConfigTitle', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },
  // 结束接待记录
  async finishRecced({commit}, params) {
    const res = await http.post( '/trajectory/finishReceive', params);
    if (res.code ===0) {
      // notice({ title: res.errMsg, icon: 'none', duration: 1000})
      return res;
    }
    else {
      notice({ title: res.errMsg||'服务异常', icon: 'none', duration: 1000})
      return res;
    }

  },


};

export default actions

