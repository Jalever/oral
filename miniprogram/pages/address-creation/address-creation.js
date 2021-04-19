// miniprogram/pages/address-creation/address-creation.js
const app = getApp()
const utils = app.require("utils/index.js");
const request = app.require("utils/request.js");
const CONSTANTS = app.require("constants/index.js");
const api = app.require("api/index.js");

Page({
  /**
   * Page initial data
   */
  data: {
    recipient: '',//收货人
    phoneNumber: '',//手机号码
    area: '',//所在地区
    address: '',//详细地址
    isDefault: false,//是否设为默认地址
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    console.log('app.globalData');
    console.log(app.globalData);
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
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  // bindSwitchChg(e) {
  //   const {value} = e.detail;
  //   this.setData({isDefault:value});
  // },
  bindRecipient (e) {},
  bindPhoneNumber(e) {
    const {value} = e.detail;
    // this.setData({phoneNumber: value});
  },
  bindArea(e) {
    const {value} = e.detail;
    // this.setData({area: value});
  },
  bindAddress(e) {
    const {value} = e.detail;
    // this.setData({address: value});
  },
  //新建地址 - 保存
  async onSave() {
    const {recipient, phoneNumber, area, address} = this.data;
    const {globalData} = getApp();
    const {userInfo} = globalData;
    const params = {
      userId: userInfo.userId,
      phone: phoneNumber,
      address: `${area}${address}`,
      name: recipient
    }
    
    const {onCreateAddress} = app.api();
    const res = await onCreateAddress(params);
    const isDefault = this.data.isDefault;
    if(isDefault) this.onUpdateDefaultAddress(res.data);
    const toastP = {title: res.info};
    const navP = {delta: 1}
    wx.showToast(toastP)
    if (res.success) wx.navigateBack(navP)    
  },
  //更改用户默认地址
  async onUpdateDefaultAddress(addressId) {
    const {globalData} = getApp();
    const {userInfo} = globalData;
    const {userId} = userInfo;
    const p = {userId,addressId}
    const {onUpdateDefaultAddress} = app.api();
    await onUpdateDefaultAddress(p);
  }
})