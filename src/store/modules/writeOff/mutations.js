/**
 * @author yuhongru
 * @data 2019/5/10 10:59
 **/
const mutations = {
  setScanRes: (state, data) => {
    data.holder = data.holder.replace(data.holder.substr(3, 4), '****');
    state.scanRes = data
  }
};
export default mutations
