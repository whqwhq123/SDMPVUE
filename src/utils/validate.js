/**
 * @author yuhongru
 * @data 2018/10/19 10:13
 **/
export const isNumber = function (rule, value, callback) {
  if (String(value).length > 7 && String(value).length < 1) {
    return callback(new Error('请输入1-7位之间的值'))
  }
}
// 判断长度是否1-3
export const isMaxLengthThree = function (rule, value, callback) {
  if (!/^\d{1,3}$/.test(value)) {
    return callback(new Error('请输入1-3位之间的值'))
  }
}
// 判断长度是否1-7
export const isMaxLengthSeven = function (rule, value, callback) {
  if (String(value).length > 7 && String(value).length < 1) {
    return callback(new Error('请输入1-7位之间的值'))
  }
}
// 判断是否是正整数
export const isInteger = function (rule, value, callback) {
  if (!/^[1-9]\d*$/.test(value)) {
    return callback(new Error('请输入非 0 开头的正整数'))
  } else {
    callback()
  }
}
// 判断是否是A-Z 英文字母
export const isAToZ = function (rule, value, callback) {
  if (!/^[0-9]|[A-Z]|[+]+$/.test(value)) {
    return callback(new Error('请输入0-9,A-Z,+'))
  } else {
    callback()
  }
}
// 验证手机号
export const isPhone = function (rule, phone, callback) {
  if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone)) {
    return callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}
// 验证密码
export const isPasswd = function (rule, str, callback) {
  if (!/^\w+$/.test(str)) {
    return callback(new Error('输入格式必须由字母、数字或下划线组成'))
  } else {
    callback()
  }
}
// 检查是否是Email
export const isEmail = function (rule, email, callback) {
  if (!/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/.exec(email)) {
    return callback(new Error('请输入正确的邮箱号'))
  } else {
    callback()
  }
}
// 检查是否是正数
export const isZhengshu = function (rule, s, callback) {
  if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.exec(s)) {
    return callback(new Error('请输入非 0 开头的正数'))
  } else {
    callback()
  }
}
// 检查是否是中文字符
export const isChinese = function (rule, s, callback) {
  if (!/^[\u4E00-\u9FA5]{1,5}$/.exec(s)) {
    return callback(new Error('请输入汉字'))
  } else {
    callback()
  }
}
// 检查是否是小写英文字符
export const islowerCaseEnglish = function (rule, s, callback) {
  if (!/^[a-z]+$/.exec(s)) {
    return callback(new Error('仅限小写英文单词'))
  } else {
    callback()
  }
}
