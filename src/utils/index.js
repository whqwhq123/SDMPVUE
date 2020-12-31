import store from 'vuex'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function formatDay (date) {
  
  const oldDate = new Date(date);
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const day = oldDate.getDate();
  let t1 = '';
  const newDate = new Date();
  const time = newDate.getTime();
  const newYear = newDate.getFullYear();
  if (newYear == year) {
    let timeDVal = time - date;
    if (timeDVal > 172800000) {
      t1 = `${month}月${day}日`
    }
    if (timeDVal <= 172800000 && timeDVal > 86400000) {
      t1 = `昨天`
    }
    if (timeDVal <= 86400000 && timeDVal > 3600000) {
      let H = parseInt(timeDVal/1000/60/60)
      t1 = `${ H }小时前`
    }
    if (timeDVal <= 3600000) {
      t1 = `刚刚`
    }
  } else {
    t1 = `${year}年${month}月${day}日`
  }
  return t1
}
export function formateTtime(time){
  if(time){
    let tm=Number(time.substr(5,2));
    let td=Number(time.substr(8,2));
    let date=new Date();
    let nm=Number(date.getMonth())+1;
    let nd=Number(date.getDate());
    if(tm>nm||tm<nm){
      return time.substr(5,5)
    }else{
      if(td>nd){
        return time.substr(5,5)
      }else{
        return '今天'
      }
    }
  }
}
export function formateSTime(time){
  if(time){
    return time.substr(10,6)
  }
}
export function formateTS(time){
  if(time){
    let tm=Number(time.substr(5,2));
    let td=Number(time.substr(8,2));
    let date=new Date();
    let nm=Number(date.getMonth())+1;
    let nd=Number(date.getDate());
    if(tm>nm||tm<nm){
      return time.substr(5,5)
    }else{
      if(td>nd||td<nd){
        return time.substr(5,5)
      }else{
        return time.substr(10,6)
      }
    }
  }
}
export let fenxiang = {
  title: '寻道SaaS',
  desc: '寻道SaaS',
  imageUrl: '/static/images/fenxiang.png',
  path: '/pages/login/main',
  success: function (res) {
    // 转发成功
    console.log("转发成功:" + JSON.stringify(res));
  },
  fail: function (res) {
    // 转发失败
    console.log("转发失败:" + JSON.stringify(res));
  }
};
export default {
  formatNumber,
  formatTime
}
