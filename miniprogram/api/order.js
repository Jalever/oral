// const app = getApp()
// const request = require("../utils/request.js");
// const app = getApp()
const utils = require('../utils/index.js')
const request = require('../utils/request.js')
const CONSTANTS = require('../constants/index.js')
// const api = app.require('api/index.js');
// const CONSTANTS = require("../constants/index.js");

module.exports = {
  //获取用户所有的订单
  async onPostAsyncOrder(data) {
    try {
      const { globalData } = getApp()
      const { userInfo } = globalData
      const dataParams = {
        userId: userInfo ? userInfo.userId : '5099157',
        ...data,
      }
      let queryParams = utils.json2Form(dataParams)
      const params = {
        url: `${CONSTANTS.URL_DEVPREFIX}/mengya/ops-order/get?${queryParams}`,
        header: {
          'content-type': 'application/json', // 有些接口不需要设置
        },
        // method: "POST",
        data: dataParams,
      }
      const res = await request(params)
      if (!res.success) throw new Error(res.info)
      return res
    } catch (error) {
      const p = { title: error.message, icon: 'error' }
      wx.showToast(p)
      console.log('error')
      console.log(error)
    }
  },
  
  //删除用户某一个订单
  async onDeleteAsyncOrder(data) {
    try {
      const { globalData } = getApp()
      const { userInfo } = globalData
      const userId = userInfo ? userInfo.userId : '5099157';
      const orderId = data.orderId;
      const dataParams = {
        userId: userInfo ? userInfo.userId : '5099157',
        ...data,
      }
      let queryParams = utils.json2Form(dataParams)
      const params = {
        url: `${CONSTANTS.URL_DEVPREFIX}/mengya/ops-order/delete/${userId}/${orderId}`,
        header: {
          'content-type': 'application/json', // 有些接口不需要设置
        },
        method: "DELETE",
        data: dataParams,
      }
      const res = await request(params)
      if (!res.success) throw new Error(res.info)
      return res
    } catch (error) {
      const p = { title: error.message, icon: 'error' }
      wx.showToast(p)
      console.log('error')
      console.log(error)
    }
  },
}
