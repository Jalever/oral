//app.js
const app = getApp();
const CONSTANTS = require("/constants/index.js");

App({
  globalData:{
    statusBarHeight:0,
    loginCode: null,//wx.login用户登录凭证code
    openId: null, //用户openId
    phoneNumber: null,//用户电话号码
    fieldNumber: 86,
    commonToken: null, //common token
  },
  //绝对路径引入文件
  require(url) {
    return require(url);
  },
  async onLaunch (options) {
    // Do something initial when launch.
    // console.log('app.js - onLaunch');
    // console.log(options);

    // wx.login({
    //   success (res) {
    //     console.log('wx.login - res');
    //     console.log(res);
    //   }
    // })
    
    const statusBarRes = await this.getStatusBarHeight();
    console.log(`statusBarRes - res:`);
    console.log(statusBarRes);
    const {code} = await this.getLoginCode();
    this.globalData.loginCode = code;
    console.log(`loginRes - code`);
    console.log(code);
    this.getMenuButtonStatus();
  },
  onShow (options) {
    // Do something when show.
    // console.log('app.js - onShow');
    // console.log(options);
  },
  onHide () {
    // Do something when hide.
    // console.log('app.js - onHide');
    // console.log(options);
  },
  onError (msg) {
    console.log('app.js - onError');
    console.log(msg)
  },
  getStatusBarHeight() {
    let self = this;
    return new Promise(async (resolve,reject) => {
      wx.getSystemInfo({
        success: function (res) {
          // that.globalData.statusBarHeight = res.statusBarHeight;
          
          self.globalData.statusBarHeight = res.statusBarHeight;
          resolve(res);
        }
      })
    });
  },
  getLoginCode() {
    let self = this;
    return new Promise(async (resolve,reject) => {
      wx.login({
        success: function (res) {
          resolve(res);
        },
        fail: function(e) {
          reject(e);
        }
      })
    });
  },
  getMenuButtonStatus() {
    // console.log(`menuBtn`);
    // const menuBtn = app.getMenuButtonStatus();
    
    // console.log(menuBtn);
  },
})
