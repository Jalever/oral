// var LABELS = require("/constants/labels.js");
// var PAGES = require("/constants/pages.js");

module.exports = {
  //检测是否为数字类型
  checkNumber: function (nubmer) {
    let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    if (!re.test(nubmer)) return false;
    return true;
  },
  json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}
}