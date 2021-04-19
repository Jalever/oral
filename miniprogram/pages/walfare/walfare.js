// miniprogram/pages/walfare/walfare.js
const app = getApp();
const CONSTANTS = app.require("constants/index.js");
const request = app.require("utils/request.js");

Page({

  /**
   * Page initial data
   */
  data: {
    videoSrc: "",
    walfareList: [],//福利list
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
  onShow: async function () {
    const data = await this.onGetAsyncAllWalfare();
    const { records, head } = data;
    this.setData({
      videoSrc: head,
      walfareList: records,
    });
    // this.videoSrc = head;
    // this.walfareList = records;
    console.log("onGetAllWalfare - data: ");
    console.log(data);
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

  onSelect(e) { 
    const {item} = e.currentTarget.dataset;
    console.log("onSelect - walfare: ");
    console.log(item);
    wx.navigateTo({
      url: '/pages/order-confirmation/order-confirmation',
      success(res) {
        res.eventChannel.emit("acceptDataFromOpenerPage", {
          items: [item]
        });
      } 
    })
  },

  async onGetAsyncAllWalfare() {
    const { onGetAllWalfare } = app.api();
    const { data } = await onGetAllWalfare();
    return data;

  },

  // video 
  videoErrorCallback() { },
  bindVideoEnterPictureInPicture() { },
  bindVideoLeavePictureInPicture() { },

  // official-account
  onBindLoadOA(e) {
    console.log("onBindLoadOA");
    console.log(e);
  },
  onBindErrorOA(e) {
    console.log("onBindErrorOA");
    console.log(e);
  },
})