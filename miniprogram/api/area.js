// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");

module.exports = {
  //获取common token
  async getAreaSelection() {
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/res-phone-number-areas/get`,
      header: {
        'content-type': 'json' // 有些接口不需要设置
      },
      data: {
      }
    };
    const res = await request(params)
    const {data } = res;
    return data;
  }
}