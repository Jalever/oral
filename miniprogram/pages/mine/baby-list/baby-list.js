// miniprogram/pages/mine/baby-list/baby-list.js
const app = getApp()
const utils = app.require('utils/index.js')
const request = app.require('utils/request.js')
const CONSTANTS = app.require('constants/index.js')
const api = app.require('api/index.js')

Page({
  /**
   * Page initial data
   */
  data: {
    list: [], //宝宝list
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
  onShow: function () {
    this.onGetUserBaby()
  },

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

  async onGetUserBaby () {
    const { onGetAsyncUserBaby } = app.api()
    const params = { userId: 5099157 }
    const res = await onGetAsyncUserBaby(params)
    this.setData({ list: res })
  },

  // 更改默认宝宝
  async onUpdateDefaultBaby (e) {
    const { item } = e.currentTarget.dataset;
    const { id } = item;
    const { onUpdateAsyncBaby } = app.api()
    const params = { id }
    const res = await onUpdateAsyncBaby(params)
    this.onGetUserBaby()
  },

  navigateToAddBaby () {
    wx.navigateTo({
      url: '/pages/mine/add-baby/add-baby',
    })
  },
  
  navigateToEditBaby (e) {
    const {item} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/mine/edit-baby/edit-baby',
      success(res) {
        res.eventChannel.emit("acceptDataFromOpenerPage", {item});
      } 
    })
  },
  //删除宝宝
  async deleteBaby (e) {
    const { item } = e.currentTarget.dataset;
    const { id } = item;
    const { onGetAsyncDeleteBaby } = app.api()
    const params = { id }
    const res = await onGetAsyncDeleteBaby(params)
    this.onGetUserBaby()

  }
})
