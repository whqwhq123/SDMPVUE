/**
 *  @author yuhongru
 * */
/**
 * v1.2.0
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getters'
import actions from './actions'
import state from './state'
import createLogger from 'vuex/dist/logger'
import leaveInfo from './modules/leaveInfo'
import login from './modules/login'
import insight from "./modules/insight";
import readCar from "./modules/readCar";
import user from './modules/user';
import writeOff from './modules/writeOff';
import maintainRatio from './modules/maintainRatio'
import pastCar from './modules/pastCar'
import successPrice from './modules/successPrice'
import portrait from './modules/portrait'
import indexModule from './modules/home'
import salesGroupModule from './modules/salesGroup'
import defeatReportModule from './modules/defeatReport'
import defeatDetailModule from './modules/defeatDetail'
import guestFlowModule from './modules/guestFlow'
import passengerFlow from './modules/passengerFlow'
import recommendActivity from './modules/activity'
import adminModule from './modules/admin'



/**
 * v1.3.0
 * */
import selectCar from './modules/selectCar'
import quote from './modules/quote'

/**
 * v1.3.1
 * */
import notice from './modules/notice'
import spokesman from './modules/spokesman'
/**
 * v1.3.2 
 * */
import shopInvite from './modules/shopInvite'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    indexModule,
    leaveInfo,
    login,
    insight,
    readCar,
    user,
    writeOff,
    maintainRatio,
    pastCar,
    successPrice,
    portrait,
    salesGroupModule,
    defeatReportModule,
    defeatDetailModule,
    guestFlowModule,
    passengerFlow,
    /*v1.3.0*/
    selectCar,
    quote,
    recommendActivity,
    adminModule,
    /*v1.3.1*/
    notice,
    spokesman,
    /*v1.3.2 */
    shopInvite

  },
  state,
  actions,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
