
const app = getApp();
const request = app.require("utils/request");

// miniprogram/pages/area-selection/area-selection.js
Page({

  /**
   * Page initial data
   */
  data: {
    pureList: {},
    list: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    await this.getAsyncArea();
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
  async getAsyncArea() {
    const params = {
      url: '/mengya/res-phone-number-areas/get',
      header: {
        'content-type': 'json' // 有些接口不需要设置
      },
      data: {}
    };
    const res = await request.default(params)
    const {data } = res;
    console.log("data");
    console.log(data);
    this.setData({ pureList: data });
    this.onFormatList(data);
    // app.globalData.phoneNumber = data.purePhoneNumber;
  },
  //转换成遍历格式list
  onFormatList(list) {
    let arr = Object.keys(list).map(name => ({name,value: list[name]}));
    this.setData({list:arr});
  },
  onSelect(e) {
    const {item} = e.target.dataset;
    console.log("item");
    console.log(item);
    app.globalData.fieldNumber = item.number*1;
    wx.navigateBack({delta: 1})
    
    console.log("app.globalData");
    console.log(app.globalData);
  }
})