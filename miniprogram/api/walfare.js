// const app = getApp()
const request = require("../utils/request.js");
const CONSTANTS = require("../constants/index.js");

module.exports = {
  //获取全部福利产品
  async onGetAllWalfare() {
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/res-fuli/get`,
      header: {
        'content-type': 'application/json' // 有些接口不需要设置
      },
      data: {}
    };
    const res = await request(params)
    return res;
  },
  //获取对应详细的福利产品
  async onGetDetailedProduct(p) {
    const {id} = p;
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/res-fuli-product/detail/${id}`,
      header: {
        'content-type': 'application/json' // 有些接口不需要设置
      },
      data: {}
    };
    const res = await request(params)
    return res;
  },
  //检查产品库存
  async onCheckStock(data) {
    const params = {
      url: `${CONSTANTS.URL_DEVPREFIX}/mengya/res-fuli-product/check-stock`,
      header: {
        'content-type': 'application/json' // 有些接口不需要设置
      },
      method: "POST",
      data
    };
    const res = await request(params)
    return res;
  }
}