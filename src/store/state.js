/**
 *  @author zhoujianxu
 * */
const state = {
  openId: 1,
  userInfo: null,
  // token: 'token',
  carInfo: null,
  roleInfo: {
    service: []
  },
  dateTime: null,
  areaInfo:{
    labelName:'全部经销商',
    type: 'all'
  },
  count:[],
  currentTab: 'tool',
  vi: {
    modelName: '',
    manuList: '',
    home: {
      insight: {
        masterColor: '#fff',
        viceColor: '#fff',
        masterBgColor: '#bb0a30',
        viceBgColor: '#1A1A1A'
      },
      retention: {
        imgUrl: 'https://saas-prod-pcmatg.oss-cn-beijing.aliyuncs.com/mpimages/car-icon.png'
      },
      carSpokesman: {
        masterBgColor: '#1c283c',
        masterColor: '#fff'
      }
    },
    cards: {
      info: {
        bgColor: '#1a1a1a',
        color: '#fff'
      }
    },
    quote: {
      header: {
        bgColor: '#BB0A30',
        color: '#fff'
      }
    },
    all: {
      dialogBtn: {
        bgColor: '#1A1A1A',
        color: '#fff'
      },
      pageBtn: {
        bgColor: '#1A1A1A',
        color: '#fff',
        tab1: '',
        tab2: '',
        tab3: '',
        tab4: '',
        tab5: '',
        tab1Active: '',
        tab2Active: '',
        tab3Active: '',
        tab4Active: '',
        tab5Active: ''
      }
    }
  }
};

export default state
