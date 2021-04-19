// pages/mine/mine-index/mine-index.js
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
    navList: [ 
      {
        name: "我的消息",
        path: "/pages/second/second",
        isBadge: false,
      },
      {
        name: "宝宝列表",
        path:"/pages/mine/baby-list/baby-list",
        isBadge: false,
      },
      {
        name: "我的订单",
        path:"/pages/mine/my-order/my-order",
        isBadge: false,
      },
      {
        name: "我的地址",
        path:"/pages/second/second",
        isBadge: false,
      },
      {
        name: "设置",
        path:"/pages/second/second",
        isBadge: false,
      }
    ],
    userInfo: null,//用户信息
    app: null,
    globalData:null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { globalData } = getApp();
    const { userInfo } = globalData;
    // console.log('userInfo');
    // console.log(userInfo);
    this.setData({ userInfo });
    // console.log('globalData');
    // console.log(globalData);
    // console.log('\n');
    
    
    
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
    const app = getApp();
    const { globalData } = app

    // const userInfo = getApp().globalData.userInfo;
    this.setData({ app,globalData });
    // console.log('getApp().globalData.userInfo');
    // console.log(getApp().globalData.userInfo);
    // console.log('\n');
    
    console.log('this.data');
    console.log(this.data);
    // console.log('globalData');
    // console.log(globalData);
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
})