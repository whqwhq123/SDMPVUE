/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
import http from '../../../http/api'
import { notice } from '../../../utils/notice'
import {formatDay} from "../../../utils";
import { labelApi } from "../../../http/url"
const actions = {
  async createQuoteReq ({commit}, params) {
    let {
      foursId,                                    // 4s店id
      userId,                                     // 销售id（当前登录人id）
      carTypePic,                                 // 车型图
      userTrajectoryId,
      priceVal              : guidePrice,         // 指导价格
      preferentialVal       : favorablePrice,     // 优惠价格
      userName              : customName,         // 客户姓名
      userPhone             : customPhone,        // 客户电话
      displaceIs            : isDisplace,         // 	是否置换:0-否,1-是
      residualVal           : oldCarPrice,        // 	二手车残值
      displaceVal           : displaceAllowance,  // 	置换补贴
      loanIs                : isLoan,             // 	是否贷款:0-否,1-是
      loanStagesVal         : terms,              // 	分期数
      paymentRatio          : downPaymentRatio,   // 首付比列
      grossSpread           : loanRatio,                // 	费率
      financialServicesCost : loanServicePrice,         // 	贷款服务费
      purchaseTaxVal        : purchaseTax,              // 	购置税
      insureVal             : insurance,                // 保险
      serviceVal            : servicePrice,             // 	服务费
      addItemVal            : extensionPrice,           // 	增项价格
      addItemDesc           : extensionLabel,           // 	增项备注
      extensionInsuranceVal : extensionInsurancePrice,  // 	延保价格
      extensionInsuranceDesc: extensionInsuranceLabel,  // 	延保备注
      giveDesc              : giftItems,                // 赠送项目
      activityIds           : associatedActivitity,     // 	关联活动id串
      loanPaymentPrice      : distribution,             // 	首付
      loanInterest          : payment,                  // 利息
      loanMonthly           : mothlyInstalment,         // 	月供

      styleId               : carModelId,               // 车系id
      styleFullName         : carModelName,             // 车系名字
      modelName             : carTypeName,              // 车型名字
      modelId               : carTypeId,                // 车型id

      styleYear             : carStyleYear,             // 车型年款
      styleName             : carStyleName,             // 车型简称
      loanLimit             : loanAmount,                // 贷款额度
      color:color, // 颜色
      validityPeriod: validityPeriod, // 报价单有效期
      isShowSalesmanPhone:isShowSalesmanPhone,//  是否显示销售联系方式（1 不显示  2显示）
      isShowStore :isShowStore //   是否显示店铺信息（1 不显示  2显示）
    } = params
    let totalCountPrice, totalPrice;
    if (params.loanIs) {
      totalCountPrice = params.sumVal;     // 	计算的总价（含贷款利息的）
      totalPrice = 0                       // 总花费金额（单位元）
    } else {
      totalCountPrice = 0;     // 	计算的总价（含贷款利息的）
      totalPrice = params.sumVal // 总花费金额（单位元）
    }
    try {
      let res = await http.post('quotation/createQuotation', {
        foursId,       //	4s店id
        userId,
        userTrajectoryId,
        carTypeName,
        carTypePic,
        carTypeId,
        guidePrice,
        favorablePrice,
        customName,
        customPhone,
        isDisplace,
        oldCarPrice,
        displaceAllowance,
        isLoan,
        terms,
        downPaymentRatio,
        loanRatio,
        loanServicePrice,
        purchaseTax,
        insurance,
        servicePrice,
        extensionPrice,
        extensionLabel,
        extensionInsurancePrice,
        extensionInsuranceLabel,
        giftItems,
        associatedActivitity,
        distribution,
        payment,
        mothlyInstalment,
        carModelId,
        carModelName,
        carStyleYear,
        carStyleName,
        totalCountPrice,
        totalPrice,
        loanAmount,
        color,
        validityPeriod,
        isShowSalesmanPhone,
        isShowStore
      });
      return res
    } catch (e) {
      console.error(e)
    }
  },
  async create({commit}, params) {
    let {carModelId}=params;
    try{
      let res = await http.post('electronicQuotation/getCarModelList ', {
        carModelId,
      });
      return res
    }catch (e) {
      console.error(e)
    }
  },
  async getOffer({commit}, params) {
    let {carModelId}=params;
    try{
      let res = await http.post('quotation/getCarModelPrice ', {
        carModelId,
      });
      return res
    }catch (e) {
      console.error(e)
    }
  }
};

export default actions

