/*
    fly配置文件
    by:David 2018.6.14
*/
//引入 fly
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly;
var verCodeUnique = (new Date()).getTime() + '' + parseInt(Math.random()*10000) + parseInt(Math.random()*10000) + String.fromCharCode(65 + parseInt(Math.random() * 26))
import { api } from './url.js'
import store from '../store'
import{boat} from '../utils/boat'
import {notice} from "../utils/notice";
// let pending = [];
// // 去重复请求方法
// const removePending = (config) => {
//   for (let p in pending) {
//     let item = p;
//     let list = pending[p];
//     // 当前请求在数组中存在时执行函数体
//     if (list.url === config.url + '&request_type=' + config.method) {
//       // 执行取消操作
//       list.cancel();
//       // 从数组中移除记录
//       pending.splice(item, 1)
//     }
//   }
// };
// import config from '../../config'
//配置请求基地址
// //定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
// //设置超时
fly.config.timeout = 10000;
// //设置请求基地址
fly.config.baseURL =  api;
//添加请求拦截器
fly.interceptors.request.use((config) => {
    //给所有请求添加自定义header
    // removePending(config);
    // console.log('request信息', config)
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
    if (!config.url.includes('login') && !config.url.includes('token') && !config.url.includes('checkPhone')) {
      let token = wx.getStorageSync('token')
      config.headers["token"] = wx.getStorageSync('token')
      // config.headers["authorization"] = 'bearer 77b09f19-c8b8-4582-abb7-d315cb4a0972'
    }
    // if(config.url.includes('login')){
    //     config.headers["deviceId"] = verCodeUnique
    //     config.headers["authorization"] = 'Basic ' + boat('saas:saasSecret')
    // }
    // if(config.url.includes('sms')){
    //     config.headers["deviceId"] = verCodeUnique
    //     // config.headers["authorization"] = 'Basic ' + boat('saas:saasSecret')
    // }
    //打印出请求体
    // console.log(config.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=config
    //return Promise.reject(new Error(""))
    // config.cancelToken = new cancelToken((c) => {
    //   pending.push({ url: config.url + '&request_type=' + config.method, cancel: c })
    // });
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return config;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(

    (response) => {
        //只将请求结果的data字段返回
        // console.log('response',response.data)
        return response.data
    },
    (err) => {
      console.error(err)
      if (err.status) {
        // if (err.status === 401) {
        //   mpvue.redirectTo({
        //     url: "/pages/login/main"
        //   });
        //   notice({title: '登录超时'})
        // }
      }
        //发生网络错误后会走到这里
      return Promise.resolve(err)
    }
)
// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly
