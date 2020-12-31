/**
 * @author yuhongru
 * @data 2019/5/22 10:25
 **/
import Vue from 'vue'
import App from './index'
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
};


const app = new Vue(App);
app.$mount();
export default {
  config: {

  }
}
