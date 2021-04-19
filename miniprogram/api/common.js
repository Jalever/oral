// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");

module.exports = {
  //获取common token
  async getAsyncCommonToken() {
    const appKey = CONSTANTS.VAR_APPKEY;
    const appSecret = CONSTANTS.VAR_APPSECRET;
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/login/get-token`,
      header: {
        'content-type': 'json' // 有些接口不需要设置
      },
      data: {
        appKey,
        appSecret,
      }
    };
    const res = await request(params)
    const {data } = res;
    return data;
  },
  //获取openId
  async getAsyncOpenId(p) {
    // const appKey = CONSTANTS.VAR_APPKEY;
    // const appSecret = CONSTANTS.VAR_APPSECRET;
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/weixin/common/get-user-openid`,
      header: {
        'content-type': 'json' // 有些接口不需要设置
      },
      data:p
    };
    const res = await request(params)
    const {data } = res;
    return data;
  },
}