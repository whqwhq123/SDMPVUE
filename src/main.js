import Vue from 'vue'
import App from './App'
import store from './store/index'
import https from './http/api'
// import { $get, $post} from './request/request'

Vue.prototype.$store = store;
Vue.prototype.$post = https.post;
Vue.prototype.$get = https.get;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
