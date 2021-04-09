const app = getApp()
const request = app.require("utils/request.js");
const CONSTANTS = app.require("constants/index.js");

module.exports = {
  //获取common token
  async getVerificationCode() {
    const appKey = CONSTANTS.VAR_APPKEY;
    const appSecret = CONSTANTS.VAR_APPSECRET;
    const params = {
      url: `http://api-h5.cloud.alilo.com.cn/api/v4/login/get-token`,
      header: {
        'content-type': 'json' // 有些接口不需要设置
      },
      data: {
        appKey,
        appSecret,
      }
    };
    const res = await request.default(params)
    const {data } = res;
    return data;
  }
}