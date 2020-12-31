/**
 * @author yuhongru
 * @data 2019/5/10 10:58
 **/
const getters = {
    token: (state) => {
        if (state.token) {
          return state.token
        }
      }
};
export default getters;
