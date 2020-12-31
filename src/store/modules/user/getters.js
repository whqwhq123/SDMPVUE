/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
const getters = {
    token: (state) => {
        if (state.token) {
          return state.token
        }
      },
      carList:(state)=>{
        return state.carList
      },
      carType:(state)=>{
        return state.carType
      },
      carBrand:(state)=>{
        return state.carBrand
      },
      carStyle:(state)=>{
        return state.carStyle
      },
      paramsForm:(state)=>{
        return state.paramsForm
      },
      note:(state)=>{
        return state.note
      },
      buyCarTarget:(state)=>{
        return state.buyCarTarget
      },
      car_need:(state)=>{
        return state.car_need
      },
      car_customer:(state)=>{
        return state.car_customer
      },
      car_inst:(state)=>{
        return state.car_inst
      },
      shareTitle:(state)=>{
        return state.shareTitle
      },
      shareDisc:(state)=>{
        return state.shareDisc
      },
      bodyParm:(state)=>{
        return state.bodyParm
      },
      shareParams:(state)=>{
        return state.shareParams
      },
      shareType:(state)=>{
        return state.shareType
      },
      customerPhone:(state)=>{
        return state.customerPhone
      },
      customerInfo:(state)=>{
        return state.customerInfo
      },
      scanStatus:(state)=>{
        return state.scanStatus
      },
      indexTitle:(state)=>{
        return state.indexTitle
      },
      reception:(state)=>{
        return state.reception
      }
      
};
export default getters;
