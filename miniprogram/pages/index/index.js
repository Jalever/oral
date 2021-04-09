//index.js
const app = getApp()
const request = app.require("utils/request.js");
const api = app.require("api/index.js");

Page({
  data: {
  },

  onLoad: async function (q) {
    this.getAsyncCommonToken();
    
    wx.navigateTo({
      // url: '/pages/warrant/warrant',
      // url: '/pages/phone-login/phone-login',
      // url: '/pages/area-selection/area-selection',
    })
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("wx.getUserProfile - res");
        console.log(res);
      }
    })
  },

  getPhoneNumber(e) {
  },

  navigatePhoneLoginPage() {
    wx.navigateTo({
      url: '/pages/phone-login/phone-login',
    })
  },

  navigateLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  async onRequestPay() {
    const paysign = await this.onGetPaySign();
    const invokeRes = await this.onInvokePayment(paysign);
    console.log("paysign - res: ");
    console.log(paysign);
    console.log("invokeRes - res: ");
    console.log(invokeRes);
  },
  onGetPaySign() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://192.168.6.24:8081/mengya/weixin/pay/createOrder',
        data: {
          body: '软件部测试---腾讯充值中心-QQ会员充值',
          totalFee: 1,
          spbillCreateIp: "123.12.12.123",
          tradeType: "JSAPI",
          openid: "oRcL64lEuQeuyGsWloGb7Qzr6w6c"
        },
        method: 'post',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          resolve(res.data);
        },
        fail: function (res) {
          reject(res);
        }
      })
    });
  },

  onInvokePayment(params) {
    console.log('params');
    console.log(params);
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        // ...params,
        timeStamp: params.timeStamp,
        nonceStr: params.nonceStr,
        package: params.packageValue,
        signType: params.signType,
        paySign: params.paySign,
        success: function (res) {
          console.log('onInvokePayment - success');
          console.log(res);
          resolve(res);
        },
        fail: function (res) {
          console.log('onInvokePayment - fail');
          console.log(res);
          reject(res);
        }
      })
    });
  },
  //异步获取common-token
  async getAsyncCommonToken() {
    const token = await api.getAsyncCommonToken();
    app.globalData.commonToken = token;
  }

})
