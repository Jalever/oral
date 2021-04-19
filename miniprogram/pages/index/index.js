//index.js
const app = getApp()
const request = app.require("utils/request.js");
const CONSTANTS = app.require("constants/index.js");
const api = app.require("api/index.js");

Page({
  data: {
    openId: null,
    statusBarHeight: 0,
    menuBarHeight: 0,
    distance: 0,
  },

  onLoad: async function (q) {
    // wx.setNavigationBarTitle({
    //   title: "福利"
    // });

    // wx.navigateTo({
    // url: '/pages/warrant/warrant',
    // url: '/pages/phone-login/phone-login',
    // url: '/pages/area-selection/area-selection',
    // })
    const statusBarHeight = await this.getStatusBarHeight();
    this.setData({statusBarHeight})

    const menuInfo = wx.getMenuButtonBoundingClientRect();
    const { top, bottom } = menuInfo;
    const menuBarHeight = bottom - top;
    const distance = top - statusBarHeight;
    this.setData({menuBarHeight,distance});
    // console.log('statusBarHeight');
    // console.log(statusBarHeight);
    // console.log('menuInfo');
    // console.log(menuInfo);
    // console.log('menuBarHeight');
    // console.log(menuBarHeight);
    // console.log('\n');

  },
  async onShow() {
    //获取common token
    // this.getAsyncCommonToken();

    //检查用户登录状态 && 若无登录，跳转至登录页面
    // const isLogin = await this.onCheckLoginStatus();
    // if (!isLogin) return this.navigateLoginPage();

    this.getOpenId();
  },

  
  getStatusBarHeight() {
    return new Promise(async (resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res.statusBarHeight)
        },
      })
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
  navigatePermissionPage() {
    wx.navigateTo({
      url: '/pages/permission/permission',
    })
  },
  navigateWarrantPage() {
    wx.navigateTo({
      url: '/pages/warrant/warrant',
    })
  },
  
  // 判断用户登录状态
  onCheckLoginStatus() {
    return new Promise((resolve, reject) => {
      const userInfoStorage = wx.getStorageSync(CONSTANTS.VAR_USERINFOKEY)
      const isLogin = !!userInfoStorage;
      if (isLogin) app.globalData.userInfo = userInfoStorage
      resolve(isLogin);
    });
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
  async onCheckNetwork () {
    const network = await app.isOnlineNetwork();
    console.log('app.checkNetwork - network');
    console.log(network);
    console.log('\n');
  },
  //异步获取common-token
  // async getAsyncCommonToken() {
  //   const token = await api.getAsyncCommonToken();
  //   app.globalData.commonToken = token;
  // },
  //异步获取openId
  async getOpenId() {
    // console.log('getApp().globalData - success');
    // console.log(getApp().globalData);

    const code = await getApp().getLoginCode();
    const loginCode = code.code;
    if(!loginCode) return console.error('lack of index.js/getOpenId/loginCode');
    const params = { jsCode: loginCode }
    const openId = await app.api().getAsyncOpenId(params);
    app.globalData.openId = openId;
    // this.openId = openId;
    this.setData({ openId });
    console.log('app.globalData - globalData: ');
    console.log(app.globalData);
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
      success(res) {
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
      withSubscriptions: true,
      success(res) {
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
