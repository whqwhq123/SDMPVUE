/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
  setCarModel (state, data) {
    state.modelName = data.carName||''
    state.carModel = data;
  },
  setCar (state, data) {
    state.styleFullName = data.styleFullName||''
    state.car = data;
  },

}
export default mutations
