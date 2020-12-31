/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
  setServiceList (state, data) {
    state.serviceList = data;
  },
  setUserList (state, data) {
    state.userList = data;
  },
  setPhoneLikeConcatCusList (state, data) {
    state.phoneLikeCusList = state.phoneLikeCusList.concat(data);
  },
  setPhoneLikeCusList (state, data) {
    state.phoneLikeCusList = data;
  },
  setInsightResult (state, data) {
  
    data.xfsp.level = data.xfsp.level.split('，');
    state.xfsp = data.xfsp;
    state.xghx = data.xghx;
    state.cjyy = data.cjyy;
    state.yxcx = data.yxcx;
  },
  setCheckedCusInfo (state, data) {
    state.checkedCusInfo = data;
  },
  setInsightStatus (state, data) {
    state.insightStatus = data
  }
  
}

export default mutations
