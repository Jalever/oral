// miniprogram/pages/login/login.js
// const computedBehavior = require('miniprogram-computed')
const app = getApp();
const CONSTANTS = app.require("constants/index.js");
const request = app.require("utils/request.js");

Page({
  /**
   * Page initial data
   */
  data: {
    statusBarHeight: 0,
    CONSTANTS: Object.freeze(CONSTANTS),
    codeBtnText: CONSTANTS.LABEL_GETVERIFIEDCODE,
    isTiming: false,
    dynamicNum: 10,
    staticNum: 10,
    timer: null, //定时器
    fieldNumber: app.globalData.fieldNumber,
    // s: app.system.statusBarHeight,
    // n: (app.menu.top - app.system.statusBarHeight)*2 - app.menu.height,
    // h: app.menu.height,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    // const appInstance = getApp();
    // const gData = appInstance.globalData;
    // const { statusBarHeight } = gData;
    // // this.statusBarHeight = statusBarHeight;
    // this.setData({
    //   statusBarHeight
    // });
    // console.log(`appInstance.globalData`);
    // console.log(appInstance.globalData);

    // wx.getMenuButtonBoundingClientRect()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    const fieldNumber = app.globalData.fieldNumber;
    this.setData({fieldNumber});
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

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
  startTimer() {
    if (this.data.isTiming) return;
    this.setData({ isTiming: true });

    const timer = setInterval(() => {
      let dynamicNum = this.data.dynamicNum;
      console.log('dynamicNum');
      console.log(dynamicNum);
      let newNum = dynamicNum - 1;

      // codeBtnText: CONSTANTS.LABEL_GETVERIFIEDCODE,
      this.setData({ codeBtnText: newNum });
      if (newNum < 0) {
        newNum = this.data.staticNum;
        this.setData({ codeBtnText: newNum });
        this.cancelTimer();
        this.setData({ dynamicNum: CONSTANTS.LABEL_GETVERIFIEDCODE });
        return;
      }
      this.setData({ dynamicNum: newNum });
    }, 1000);
    this.setData({ timer });
  },
  cancelTimer() {
    clearInterval(this.data.timer);
    this.data.timer = null;
    this.data.isTiming = false;
  },
  onSelectArea() {
    wx.navigateTo({
      url: '/pages/area-selection/area-selection',
    })
  }
})