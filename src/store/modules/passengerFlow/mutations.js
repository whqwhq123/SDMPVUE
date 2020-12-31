/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
  setChartsDataStatus (state, data) {
    if (data.type === 1) {
      state.chartsDataStatus.push(data);
    } else {
      state.chartsDataStatus = [];
    }
  },
  setComponentLoaded (state, data) {
    state.componentLoaded.push(true);
  },
  clearComponentLoaded (state, data) {
    state.componentLoaded = []
  }
};
export default mutations
