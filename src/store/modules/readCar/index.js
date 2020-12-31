/**
 * @author yuhongru
 * @data 2019/5/10 11:00
 **/
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const readCar = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
export default readCar
