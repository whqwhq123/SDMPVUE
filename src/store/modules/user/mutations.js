/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
    getUserList(){
        
    },
    getCarList(state,parm){
        console.log('zhixingle')
        state.carList=parm;
    },
    setCarType(state,carType){
        state.carType=carType
    },
    setCarBrand(state,carBrand){
        state.carBrand=carBrand
    },
    setCarStyle(state,CarStyle){
        state.carStyle=CarStyle
    },
    setParamsForm(state,paramsForm){
        console.log(paramsForm)
        // let arr=[];
        // arr.push(paramsForm);
        // // let arrFilter=Array.from(new Set(arr));
        state.buyCarTarget=paramsForm[paramsForm.length-1];
        state.paramsForm=paramsForm.filter((v)=>v).join(',')
        
    },
    setnote(state,note){
        state.note=note;
    },
    set_car_need(state,car_need){
        state.car_need=car_need
    },
    set_car_customer(state,car_customer){
        state.car_customer=car_customer
    },
    set_car_inst(state,car_inst){
        state.car_inst=car_inst
    },
    setShareParams(state,params){
        console.log(params)
        state.shareTitle=params.shareTitle
        state.shareDisc=params.shareDisc
        state.bodyParm=params.bodyParm
        state.shareParams=params.shareParams
        state.shareType=params.shareType
    },
    setCustomerPhone(state,params){
        state.customerPhone=params
    },
    setCustomerInfo(state,params){
        state.customerInfo=params
    },
    setscanStatus(state,val){
        state.scanStatus=val
    },
    setreception(state,val){
        state.reception=val
    },
    setindexTitle(state,val){
        state.indexTitle=val
    }
    
}
export default mutations
