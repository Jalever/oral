// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");
const utils = require("../utils/index.js");
// const {globalData} = getApp();
// const {userInfo} = globalData;

module.exports = {
  //新增用户地址
  async onCreateAddress(data) {
    const {globalData} = getApp();
    const {userInfo} = globalData;
    let queryParams = utils.json2Form(data);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/address/add?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo.token,
      },
      method: "POST",
      data
    };
    const res = await request(params)
    return res;
  },
  //修改用户默认地址
  async onUpdateDefaultAddress(data) {
    const {globalData} = getApp();
    const {userInfo} = globalData;
    let queryParams = utils.json2Form(data);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/address/modifi-default?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo.token,
      },
      method: "POST",
      data
    };
    const res = await request(params)
    return res;
  },
  //获取用户全部地址
  async onGetAllAddress(p) {
    const {id} = p;
    const {globalData} = getApp();
    const {userInfo} = globalData;
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/address/get/${id}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo.token,
      },
      data: {}
    };
    const res = await request(params)
    return res;
  }
}