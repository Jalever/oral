//app.js
const app = getApp()
const CONSTANTS = require('/constants/index.js')
const api = require('./api/index')
const utils = require('./utils/index')

App({
  globalData: {
    statusBarHeight: 0,
    loginCode: null, //wx.login用户登录凭证code
    openId: null, //用户openId
    phoneNumber: null, //用户电话号码
    fieldNumber: 86,
    commonToken: null, //common token
    systemInfo: null, //设备信息
    isLogin: false, //是否已经登录
    userInfo: null, //用户信息
  },
  //绝对路径引入文件
  require(url) {
    return require(url)
  },
  // 异步函数
  api() {
    return api
  },
  // 工具函数
  utils() {
    return utils
  },
  async onLaunch(options) {
    //获取common token
    await this.getAsyncCommonToken()

    const statusBarRes = await this.getStatusBarHeight()

    //获取wx.login得到的登录凭证code
    const { code } = await this.getLoginCode()
    this.globalData.loginCode = code

    this.getMenuButtonStatus()

    //获取当前设备信息：system, os, os model...
    const systemInfo = await this.getSystemInfo()
    this.globalData.systemInfo = systemInfo

    // 若未登录跳转至登录页面
    const isLogin = await this.onCheckLoginStatus()
    if (!isLogin) return this.navigateLoginPage()
  },
  async onShow(options) {},
  onHide() {
    // Do something when hide.
    // console.log('app.js - onHide');
    // console.log(options);
  },
  onError(msg) {
    // console.log('app.js - onError');
    // console.log(msg)
  },
  navigateLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  getStatusBarHeight() {
    let self = this
    return new Promise(async (resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          // that.globalData.statusBarHeight = res.statusBarHeight;

          self.globalData.statusBarHeight = res.statusBarHeight
          resolve(res)
        },
      })
    })
  },
  getLoginCode() {
    let self = this
    return new Promise(async (resolve, reject) => {
      wx.login({
        success: function (res) {
          resolve(res)
        },
        fail: function (e) {
          reject(e)
        },
      })
    })
  },
  getMenuButtonStatus() {
    // console.log(`menuBtn`);
    // const menuBtn = app.getMenuButtonStatus();
    // console.log(menuBtn);
  },
  getSystemInfo() {
    let self = this
    return new Promise(async (resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res)
        },
        fail: function (e) {
          reject(e)
        },
      })
    })
  },

  // 判断用户登录状态
  onCheckLoginStatus() {
    const app = this
    return new Promise((resolve, reject) => {
      const userInfoStorage = wx.getStorageSync(CONSTANTS.VAR_USERINFOKEY)
      const isLogin = !!userInfoStorage
      app.globalData.isLogin = isLogin
      if (isLogin) app.globalData.userInfo = userInfoStorage
      resolve(isLogin)
    })
  },

  //异步获取common-token
  async getAsyncCommonToken() {
    return new Promise(async (resolve, reject) => {
      const token = await api.getAsyncCommonToken()
      this.globalData.commonToken = token
      resolve(token);
    });
  },
  //异步获取网络状态
  isOnlineNetwork () {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success (res) {
          const ntype = res.networkType
          if (ntype === CONSTANTS.VAR_NETWORKTYPE_NONE) return resolve(false);
          resolve(true)
        }
      })
    });
  },
})
