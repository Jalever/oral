// const app = getApp()
const request = require("../utils/request.js");
const utils = require('../utils/index.js')
const CONSTANTS = require("../constants/index.js");

module.exports = {
  //支付
  async onGetPaySign(data) {
    console.log('data - onGetPaySign');
    console.log(data);

    // const dataParams = {
    //   userId: userInfo ? userInfo.userId : "5099157",
    //   ...data,
    // }
    // const {globalData} = getApp();
    // const {openId,userInfo} = globalData;
    // const {userId} = userInfo;
    let queryParams = utils.json2Form(data);
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/weixin/pay/createOrder?${queryParams}`,
      header: {
        'content-type': 'application/json' // 有些接口不需要设置
      },
      method: "POST",
      data
    };
    const res = await request(params)
    console.log('res - onGetPaySign');
    console.log(res);
    return res;
  }
}