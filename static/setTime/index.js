var dateTimePicker = require('./dateTimePicker.js');
Component({
  data: {
    dateTimeArray1: null,
    dateTime1: null,
    startYear: null,
    endYear: null,
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let that = this;
   
      // 获取完整的年月日 时分秒，以及默认显示的数组
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear,"2021-01-22 10:10:10");
      // 精确到分的处理，将数组的秒去掉
      //var lastArray = obj1.dateTimeArray.pop();
      //var lastTime = obj1.dateTime.pop();
  
      this.setData({
        dateTimeArray1: obj1.dateTimeArray,
        dateTime1: obj1.dateTime
      });
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods:{
  // 选择日期时间
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr

    });
  }
  }
})
