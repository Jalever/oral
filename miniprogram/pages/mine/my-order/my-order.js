// miniprogram/pages/mine/my-order/my-order.js
const app = getApp()
const utils = app.require('utils/index.js')
const request = app.require('utils/request.js')
const CONSTANTS = app.require('constants/index.js')
const api = app.require('api/index.js')

const STATUS = {
  all: 0,
  unpay: 10,
  paid: 20,
  deliveried: 30,
  finished: 40,
  overtime: 50,
}

Page({
  /**
   * Page initial data
   */
  data: {
    activeTab: STATUS.all,
    list: [],
    tabs: [
      {
        id: STATUS.all,
        title: '全部',
      },
      {
        id: STATUS.unpay,
        title: '待支付',
      },
      {
        id: STATUS.deliveried,
        title: '已发货',
      },
      {
        id: STATUS.finished,
        title: '已完成',
      },
    ],
    size: 10,
    current: 1,
    total: 1,
    isLoadedData: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    await this.getOrder()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {},

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    // console.log('onReachBottom')
    // console.log('onReachBottom')
    // console.log('\n')
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {},
  async getOrder() {
    // const toastP = {title:'加载完成'}
    const { activeTab, current, size, list } = this.data
    const { onPostAsyncOrder } = app.api()
    const params = {
      size,
      current,
    }
    if (activeTab) params['status'] = activeTab
    const res = await onPostAsyncOrder(params)
    const { data } = res
    if (this.data.total !== 1 && list.length >= this.data.total)
      return console.log('oversize')
    const { records, total } = data
    const newList = current * 1 === 1 ? records : [...list, ...records]
    this.setData({ list: newList, total })
    return records
  },
  async onTouchmove() {
    const { isRequesting, current, total, size, list } = this.data
    if (isRequesting) return console.log(new Date())
    const loadedP = { isLoadedData: true }
    if (total !== 1 && list.length >= total) return this.setData(loadedP)
    this.setData({ isRequesting: true })
    if (current * 1 < total) this.setData({ current: current * 1 + 1 })
    const res = await this.getOrder()
    this.setData({ isRequesting: false })
  },

  async onTabClick(e) {
    wx.showLoading({ title: '加载中', mask: true })
    const { item } = e.currentTarget.dataset
    const { id } = item

    this.setData({
      activeTab: id,
      total: 1,
      current: 1,
      isLoadedData: false,
    })
    await utils.sleep(500)
    await this.getOrder()
    wx.hideLoading()
  },

  onCopy(e) {
    const { item } = e.currentTarget.dataset
    wx.setClipboardData({
      data: `${item}`,
      success(res) {
        wx.getClipboardData({
          success(res) {},
          fail(res) {},
          complete(res) {},
        })
      },
    })
  },

  async onDel(e) {
    const { list } = this.data

    const { item } = e.currentTarget.dataset
    const params = { orderId: item.id }
    const { onDeleteAsyncOrder } = app.api()
    const res = await onDeleteAsyncOrder(params)

    const newList = list.filter((i) => i.id !== item.id)
    this.setData({ list: newList })
    await utils.sleep(500)

    const toastP = { title: '删除成功' }
    wx.showToast(toastP)
  },

  async onRepay(e) {
    const { list } = this.data
    const { item } = e.currentTarget.dataset
    const { globalData } = getApp()
    const { openId } = globalData
    const {
      userId,
      productId,
      skuCode,
      receiveName,
      receivePhone,
      receiveAddress,

      appId,
      timeStamp,
      nonceStr,
      packageValue,
      signType,
      paySign,
    } = item
    const params = {
      // openid: openId,
      // userId,
      // id: productId,
      // skuCode,
      // receiveName,
      // receivePhone,
      // receiveAddress,

      
      appId,
      timeStamp,
      nonceStr,
      packageValue,
      signType,
      paySign,
    }

    console.log('item');
    console.log(item);
    console.log('\n');
    
    // const res = await api.onGetPaySign(params)
    const res = await this.onInvokePayment(params);
    console.log('res - onRepay');
    console.log(res);
    return res
  },

  
  onInvokePayment(params) {
    // console.log('params - onInvokePayment');
    // console.log(params);
    // const {data} = params;
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

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  },
})
