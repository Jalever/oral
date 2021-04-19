// var LABELS = require("/constants/labels.js");
// var PAGES = require("/constants/pages.js");
import calendar, { Calendar } from 'calendar'
import findIndex from 'lodash.findindex'

module.exports = {
  //检测是否为数字类型
  checkNumber: function (nubmer) {
    let re = /^[0-9]+.?[0-9]*/ //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    if (!re.test(nubmer)) return false
    return true
  },
  json2Form (json) {
    var str = []
    for (var p in json) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
    }
    return str.join('&')
  },
  strIsTrue (str) {
    return str === 'true'
  },
  debounce (func, delay = 500) {
    return function (args) {
      let _args = args,
        that = this
      clearTimeout(func.id)

      func.id = setTimeout(() => {
        func.call(that, _args)
      }, delay)
    }
  },
  num2StrBirthday (obj) {
    let { year, month, day } = obj;
    year = `${year}`.padStart(2, "0");
    month = `${month}`.padStart(2, "0");
    day = `${day}`.padStart(2, "0");
    return `${year}年${month}月${day}日`;
  },
  getNumberBirthday (str = "") {
    if (str.length < 1) return;
    let reg = /([\d]+)年([\d]+)月([\d]+)日/;
    let arr = str.match(reg);
    return {
      year: RegExp.$1,
      month: RegExp.$2,
      day: RegExp.$3
    }
  },
  sleep (time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
