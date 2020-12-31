/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
  setList (state, data) {
    state.list = data;
  },
  setImageInfo (state, data) {
    state.imageInfo = data;
  },
  setlistOfPriceActivity (state, data) {
    state.listOfPriceActivity = data;
  },
  setSelectedActivityList (state, data) {
    state.selectedActivityList = data;
  }
}
export default mutations
