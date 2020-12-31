/**
 *  @author zhoujianxu
 * */
const setDefaultTime = function () {
  const date = new Date();
  var month=(Number(date.getMonth())+1)>10?(Number(date.getMonth())+1):'0'+(Number(date.getMonth())+1);
  var day=date.getDate()>10?date.getDate():'0'+date.getDate();
  return {
    showText: '本月',
    start: date.getFullYear()+'-'+month+'-'+'01',
    end: date.getFullYear()+'-'+month+'-'+day,
    type:1
  }
}
const getters = {
  openId: (state) => state.openId,
  userInfo: (state) => state.userInfo,
  token: (state) => state.token,
  carInfo: (state) => state.carInfo,
  roleInfo: (state) => state.roleInfo,
  count:(state)=>state.count,
  dateTime:(state)=>{
    if (state.dateTime) {
      return state.dateTime
    } else {
      let d = setDefaultTime();
      console.log(d);
      return d
    }
  },
  areaInfo:(state)=>{
    if(state.areaInfo){
      return state.areaInfo
    }
  },
  currentTab: (state)=> {
    return state.currentTab
  },
  vi: (state)=> {
    return state.vi
  }
};
export default getters
