// miniprogram/pages/login/login.js
// const computedBehavior = require('miniprogram-computed')
const app = getApp();
const CONSTANTS = require("../../constants/index.js");
const request = require("../../utils/request.js");


Page({
  /**
   * Page initial data
   */
  data: {
    statusBarHeight: 0,
    CONSTANTS: Object.freeze(CONSTANTS),
    src: 'https://muzhibao.oss-cn-shenzhen.aliyuncs.com/images/2020_TtgkWWBh4916_1577368217.jpg',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) { },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () { },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () { },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () { },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () { },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () { },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () { },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () { },
  navigateToPhoneLogin() {
    wx.navigateTo({
      url: '/pages/phone-login/phone-login',
    })
  },
  //异步获取用户电话号码
  async getAsyncPhoneNum(e) {
    const { encryptedData, iv } = e.detail;
    const gData = app.globalData;
    const jsCode = gData.loginCode;
    const params = {
      encryptedData, iv, jsCode
    };
    const data = await app.api().getAsyncPhoneNum(params);
    if(!data) return;
    app.globalData.phoneNumber = data.purePhoneNumber;
  }
})