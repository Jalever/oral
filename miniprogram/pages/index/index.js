// const { getAsyncOpenId } = require("../../api");

//index.js
const app = getApp()
const request = app.require("utils/request.js");
const api = app.require("api/index.js");

Page({
  data: {
    openId: null,
  },

  onLoad: async function (q) {
    this.getAsyncCommonToken();

    // wx.setNavigationBarTitle({
    //   title: "福利"
    // });



    // wx.navigateTo({
    // url: '/pages/warrant/warrant',
    // url: '/pages/phone-login/phone-login',
    // url: '/pages/area-selection/area-selection',
    // })
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
    // console.log("paysign - res: ");
    // console.log(paysign);
    // console.log("invokeRes - res: ");
    // console.log(invokeRes);
  },
  async onGetPaySign() {
    const res = await api.onGetPaySign();
    return res;
  },

  onInvokePayment(params) {
    // console.log('params');
    // console.log(params);
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
  },
  async getAsyncOpenId() {
    // console.log('app - globalData: ');
    // console.log(app);
    // console.log('app.api() - globalData: ');
    // console.log(app.api());
    const loginCode = getApp().globalData.loginCode;
    const params = { jsCode: loginCode }
    const openId = await app.api().getAsyncOpenId(params);
    // this.openId = openId;
    this.setData({ openId });
  },

  async onCopyOpenId() {
    const self = this;
    // console.log('this.openId -  wx.setClipboardData: ');
    const openId = self.data.openId;
    wx.setClipboardData({
      data: `${openId}`,
      success(res) {
        wx.getClipboardData({
          success(res) {
          },
          fail(res) {
          },
          complete(res) {
          }
        })
      }
    })
  },
  async onSubscribeOrder() {
    const orderSuc = "NXR-l8P2TSTLFfW9Ne-5g5sNxPbyL4Ast820CYrcrLg";
    // const unreadMsg = "zjw8TeQqOCil1rXgYCWOKcMi0If_Dk4mnAjIS269wA4";
    // const orderDelivery = "GBel-G6XLR9SQgUSD3sIrnb1cW7_hBPqfoZEdyyn9Wo";

    const tmplIds = [orderSuc];
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        console.log('res - onSubscribeOrder - success ');
        console.log(res);
      },
      fail(res) {
        console.log('res - onSubscribeOrder - fail ');
        console.log(res);
      },
      complete(res) {
        console.log('res - onSubscribeOrder - complete ');
        console.log(res);
      }
    })
  },
  async onSubscribeUnread() {
    // const orderSuc = "NXR-l8P2TSTLFfW9Ne-5g5sNxPbyL4Ast820CYrcrLg";
    const unreadMsg = "zjw8TeQqOCil1rXgYCWOKcMi0If_Dk4mnAjIS269wA4";
    // const orderDelivery = "GBel-G6XLR9SQgUSD3sIrnb1cW7_hBPqfoZEdyyn9Wo";

    const tmplIds = [unreadMsg];
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        console.log('res - onSubscribeUnread - success ');
        console.log(res);
      },
      fail(res) {
        console.log('res - onSubscribeUnread - fail ');
        console.log(res);
      },
      complete(res) {
        console.log('res - onSubscribeUnread - complete ');
        console.log(res);
      }
    })
  },
  async onSubscribeDelivery() {
    // const orderSuc = "NXR-l8P2TSTLFfW9Ne-5g5sNxPbyL4Ast820CYrcrLg";
    // const unreadMsg = "zjw8TeQqOCil1rXgYCWOKcMi0If_Dk4mnAjIS269wA4";
    const orderDelivery = "GBel-G6XLR9SQgUSD3sIrnb1cW7_hBPqfoZEdyyn9Wo";

    const tmplIds = [orderDelivery];
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        console.log('res - onSubscribeOrder - success ');
        console.log(res);
      },
      fail(res) {
        console.log('res - onSubscribeOrder - fail ');
        console.log(res);
      },
      complete(res) {
        console.log('res - onSubscribeOrder - complete ');
        console.log(res);
      }
    })
  },
  async onSubscribeMsg() {
    const orderSuc = "NXR-l8P2TSTLFfW9Ne-5g5sNxPbyL4Ast820CYrcrLg";
    const unreadMsg = "zjw8TeQqOCil1rXgYCWOKcMi0If_Dk4mnAjIS269wA4";
    const orderDelivery = "GBel-G6XLR9SQgUSD3sIrnb1cW7_hBPqfoZEdyyn9Wo";

    const tmplIds = [orderSuc, unreadMsg, orderDelivery];
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        console.log('res - onSubscribeMsg - success ');
        console.log(res);
      },
      fail(res) {
        console.log('res - onSubscribeMsg - fail ');
        console.log(res);
      },
      complete(res) {
        console.log('res - onSubscribeMsg - complete ');
        console.log(res);
      }
    })
  },
  invokeSetting() {
    wx.openSetting({
      success (res) {
        console.log('invokeSetting - res')
        console.log(res)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  getSetting() {
    wx.getSetting({
      withSubscriptions:true,
      success (res) {
        console.log('getSetting - res')
        console.log(res)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  }

})
