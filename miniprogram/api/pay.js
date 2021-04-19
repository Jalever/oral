// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");

module.exports = {
  //获取common token
  async onGetPaySign() {
    console.log("onGetPaySign - res: ");
    // console.log(invokeRes);
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/weixin/pay/createOrder`,
      header: {
        'content-type': 'application/json' // 有些接口不需要设置
      },
      method: "POST",
      data: {
        body: '软件部测试---腾讯充值中心-QQ会员充值',
        totalFee: 1,
        spbillCreateIp: "123.12.12.123",
        tradeType: "JSAPI",
        openid: "oRcL64lEuQeuyGsWloGb7Qzr6w6c"
      }
    };
    const res = await request.default(params)
    // const {data } = res;
    return res;
  }
}