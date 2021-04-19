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
    // statusBarHeight: 0,
    CONSTANTS: Object.freeze(CONSTANTS),
    codeBtnText: CONSTANTS.LABEL_GETVERIFIEDCODE,
    isTiming: false, //当前是否有定时器正在运行
    dynamicNum: 60,//定时器-动态更改的数值
    staticNum: 60,//定时器-固定时间值
    timer: null, //定时器
    fieldNumber: app.globalData.fieldNumber,//号码前缀
    // phoneNum: "",
    inputPhoneNumber: "",//input输入的电话号码
    isAgree: false, //是否同意隐私
    system: null,  //设备系统
    model: null, //设备型号
    userInputCode: null, //用户输入的验证码
    verificationCode: null, //获取到的验证码
    mainlandAreaCode: 86,
    isMainland: true, //该号码是否为大陆号码段
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
  onShow: async function () {
    //设置号码前缀地区码 && 当前号码是否为大陆号码段
    const fieldNumber = app.globalData.fieldNumber;
    const isMainland = fieldNumber * 1 === this.data.mainlandAreaCode;
    this.setData({ fieldNumber, isMainland });

    console.log(`isMainland: ${isMainland}`);

    //获取系统system，model等
    const systemInfo = await app.getSystemInfo();    
    const { system, model } = systemInfo;
    this.setData({ system, model });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    this.cancelTimer();
    console.log(`phone-login - onHide()`);
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

    console.log(`phone-login - onUnload()`);
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    console.log(`phone-login - onPullDownRefresh()`);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

    console.log(`phone-login - onReachBottom()`);
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () { },
  //获取验证码
  getVerificationCode() {
    if (this.data.isTiming) return;
    this.setData({ isTiming: true });

    this.startTimer();
    this.getAsyncVerifiedCode();
  },
  startTimer() {
    const timer = setInterval(() => {
      let dynamicNum = this.data.dynamicNum;
      let newNum = dynamicNum - 1;

      // codeBtnText: CONSTANTS.LABEL_GETVERIFIEDCODE,
      this.setData({ codeBtnText: newNum });
      if (newNum < 0) {
        newNum = this.data.staticNum;
        this.cancelTimer();
        this.setData({ dynamicNum: newNum });
        return;
      }
      this.setData({ dynamicNum: newNum });
    }, 1000);
    this.setData({ timer });
  },
  cancelTimer() {
    this.setData({ codeBtnText: CONSTANTS.LABEL_GETVERIFIEDCODE });
    clearInterval(this.data.timer);
    this.setData({
      timer: null,
      isTiming: false
    });
  },
  inputFilter(e) {
    const { value, cursor, keyCode } = e.detail;
    let isNum = `${value}` * 1;
    if (!isNum && value !== "") return this.data.inputPhoneNumber;
    this.setData({ inputPhoneNumber: value });
    return value;
  },
  inputPassword(e) {
    
  },
  onSelectArea() {
    wx.navigateTo({
      url: '/pages/area-selection/area-selection',
    })
  },
  //获取验证码
  async getAsyncVerifiedCode() {
    const { system, model, inputPhoneNumber, isMainland, fieldNumber } = this.data;
    const phone = isMainland ? inputPhoneNumber : `${fieldNumber}${inputPhoneNumber}`;
    const params = { system, model, phone };
    const { getVerificationCode, getI18nVerificationCode } = app.api();
    const fn = isMainland ? getVerificationCode : getI18nVerificationCode;
    const res = await fn(params);
    this.setData({ verificationCode: res });
  },
  //登录
  async login() {
    const { verificationCode, inputPhoneNumber,userInputCode } = this.data;
    const codeText = {title: 'non-code',icon: 'none',};
    const numberText = {title: 'non-number',icon: 'none',};
    const codeNonEqualText = {title: 'non-equal',icon: 'none',};

    if(!userInputCode) return wx.showToast(codeText);
    if(!inputPhoneNumber) return wx.showToast(numberText);
    if(verificationCode*1 !== userInputCode*1) return wx.showToast(codeNonEqualText);

    const params = {code:userInputCode*1, phone: inputPhoneNumber*1};
    const res = await app.api().login(params);
    app.globalData.userInfo = res;
    wx.setStorageSync(CONSTANTS.VAR_USERINFOKEY, res)
    wx.navigateBack({delta: 2})
    // wx.switchTab({url: '/pages/index/index'});
  }
})