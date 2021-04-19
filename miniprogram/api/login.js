const app = getApp()
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
    const errorParams = {icon:'error',title:res.info}
    if(!res.success) return wx.showToast(errorParams)
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
    let dataParams = { ...p, channel: CONSTANTS.VAR_CHANNELID };
    let queryParams = utils.json2Form(dataParams);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/login/vcode?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: getApp().globalData.commonToken,

      },
      method: 'POST',
      data: dataParams
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
  },
  //异步微信一键登录
  async getAsyncWechatLogin(p) {
    const { purePhoneNumber, avatarUrl, nickName, gender } = p;
    const dataParams = {
      userName: purePhoneNumber,
      channel: CONSTANTS.VAR_LOGINCHANNEL,
      from: CONSTANTS.VAR_LOGINFROM,
      nickName: nickName,
      sex: gender,
      phone: purePhoneNumber,
      head: avatarUrl,
    };
    let queryParams = utils.json2Form(dataParams);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/login/weixin?${queryParams}`,
      header: {'content-type': 'json'},
      method:'POST',
      data:dataParams
    };
    const res = await request(params)
    const { data } = res;
    getApp().globalData.userInfo = data;
    wx.setStorageSync(CONSTANTS.VAR_USERINFOKEY, data)
    wx.navigateBack({delta: 1})
  }
}