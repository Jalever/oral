// pages/userConsole/userConsole.js
Page({

  data: {
    openid: ''
  },

  onLoad: function (options) {
    // this.setData({
    //   openid: getApp().globalData.openid
    // })
  },

  goToPage() {
    wx.navigateTo({
      url: '/pages/third/third',
    })
  },
})
