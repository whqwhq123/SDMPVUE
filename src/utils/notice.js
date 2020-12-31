/**
 * @author yuhongru
 * @data 2019/5/10 13:31
 * @desc 为方便切换平台替换弹框，统一弹框调用函数
 * @method notice
 **/
export const notice = function({ title = '', icon = 'none', duration = 2000} = {}) {
  // 微信
  wx.showToast({ title: title, icon: icon, duration: duration})
  // 其他
}
