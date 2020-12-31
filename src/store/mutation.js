/**
 *  @author zhoujianxu
 * */
import * as types from './mutations_type'
import { type } from 'os';
const mutations = {
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_CARINFO] (state, carInfo) {
    state.carInfo = carInfo
  },
  [types.SET_ROLEINFO] (state, roleInfo) {
    state.roleInfo = roleInfo
  },
  changeTime(state,dateTime){
    state.dateTime=dateTime;
    // console.log(dateTime);
  },
  changeSelect(state,areaInfo){
    state.areaInfo=areaInfo;
    console.log(areaInfo);
  },
  changeCount(state){
    state.count.push(1);
    console.log('count:',state.count)
  },
  resetStore(state) {
    // 清除洞察数据
    state.insight = {
      serviceList: [],
      userList:  [],
      phoneLikeCusList: [],
      xfsp: null,
      xghx: null,
      cjyy: null,
      yxcx: null,
      checkedCusInfo: null,
      insightStatus: false
    };
    state.roleInfo = null
  },
  setViModel (state, viModel) {
    state.vi = viModel
  },
  setCurrentTab(state, tab) {
    state.currentTab = tab
  }
}
export default mutations
