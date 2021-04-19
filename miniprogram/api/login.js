// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");
const utils = require("../utils/index.js");

module.exports = {
  //获取验证码
  async getVerificationCode(p) {
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/getCode`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: getApp().globalData.commonToken
      },
      data: {
        ...p,
        type: CONSTANTS.VAR_GETVERIFICATIOINCODE,
        channel: CONSTANTS.VAR_CHANNELID
      }
    };
    const res = await request(params)
    const { data } = res;
    return data;
  },
  //获取国际验证码
  async getI18nVerificationCode(p) {
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/international/getCode`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: getApp().globalData.commonToken
      },
      data: {
        ...p,
        type: CONSTANTS.VAR_GETVERIFICATIOINCODE,
        channel: CONSTANTS.VAR_CHANNELID
      }
    };
    const res = await request(params)
    const { data } = res;
    return data;
  },
  //登录
  async login(p) {
    let dataParams = {...p,channel: CONSTANTS.VAR_CHANNELID};
    let queryParams = utils.json2Form(dataParams);
    console.log("dataParams");
    console.log(dataParams);

    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/login/vcode?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: getApp().globalData.commonToken,
        
      },
      method: 'POST',
      data:dataParams
    };
    const res = await request(params)
    const { data } = res;
    return data;
  },
  //异步获取用户电话号码
  async getAsyncPhoneNum(p) {
    const { jsCode, encryptedData, iv } = p;
    // const gData = app.globalData;
    // const jsCode = gData.loginCode;
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/weixin/common/get-user-phone`,
      header: {
        'content-type': 'json',
      },
      data: {
        jsCode,
        encryptedData,
        iv,
      }
    };
    const res = await request(params)
    const { data } = res;
    // app.globalData.phoneNumber = data.purePhoneNumber;
    return data;
  }
}