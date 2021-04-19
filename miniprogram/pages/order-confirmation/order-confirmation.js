// miniprogram/pages/order-confirmation/order-confirmation.js

const app = getApp();
const request = app.require("utils/request");
const utils = app.require("utils/index");
const api = app.require("api/index.js");
const CONSTANTS = app.require("constants/index.js");

Page({
  /**
   * Page initial data
   */
  data: {
    fromPageItem: null,
    curItem: null,
    properties: [],
    isEmptyProperties: false,
    prodSelection: {},//选择的商品型号及对应的规则参数
    addressList: [], //地址list
    defaultAddress: {},//默认地址
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const isDev = options.isDev && utils.strIsTrue(options.isDev);
    const self = this;
    const items = isDev ? JSON.parse(options.items) : await this.onGetPageParams();
    self.setData({ fromPageItem: items[0] });
    const resData = await this.onGetDetailedProduct();
    self.setData({ curItem: resData });
    const properties = this.onSelectProperties(resData);
    if(!properties.length) this.setData({isEmptyProperties: true}); 
    self.setData({ properties });
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
    const { globalData } = getApp();
    const { userInfo } = globalData;
    //获取用户全部地址 && 设置默认地址
    const params = { id: userInfo.userId }
    const { onGetAllAddress } = app.api();
    const { data } = await onGetAllAddress(params);
    const dAddress = data.find(item => item.isDefault * 1);
    const p = { addressList: data, defaultAddress: dAddress }
    this.setData(p);
    console.log("this.data - onShow");
    console.log(this.data);
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
  //获取页面参数
  onGetPageParams() {
    const self = this;
    return new Promise((resolve, reject) => {
      const ec = self.getOpenerEventChannel();
      ec.on("acceptDataFromOpenerPage", function (res) {
        const { items } = res;
        resolve(items);
      });
    });
  },
  async onGetDetailedProduct() {
    const { productId } = this.data.fromPageItem;
    const params = { id: productId }
    const { onGetDetailedProduct } = app.api();
    const { data } = await onGetDetailedProduct(params);
    return data;
  },
  onSelectProperties(item) {
    const { propertys } = item;
    return Object.keys(propertys).map(k => {
      return {
        name: k,
        val: propertys[k].map(i => ({ ...i, isSelected: false }))
      }
    });
  },
  async onSelect(e) {
    const properties = this.data.properties;
    const { item } = e.currentTarget.dataset;
    const { pCode, id } = item;
    
    // console.log(`this.data`);
    // console.log(this.data);

    // const prev = this.data.prodSelection;
    const data = JSON.parse(JSON.stringify(this.data));
    const {prodSelection} = {...data};
    const prev = prodSelection;
    // console.log(`prev`);
    // console.log(prev);

    // console.log(`prev[pCode]: ${prev[pCode]}`);
    // console.log(`id === prev[pCode] * 1: ${id === prev[pCode] * 1}`);
    // console.log(`pCode: ${pCode}`);

    if (prev[pCode]) id === prev[pCode] * 1 ? delete prev[pCode] : prev[pCode] = id;
    else prev[pCode] = id;

    //检测库存
    const stockRes = await this.onCheckStock(prev);
    const toastP = {title: stockRes.info};
    if(stockRes && !stockRes.success) return wx.showToast(toastP)

    this.setData({ prodSelection: prev });

    //添加isSelected标识符
    const selItems = properties.map(pItem => {
      return {
        ...pItem,
        val: pItem.val.map(i => {
          const iCode = i.pCode;
          const isEqual = prev[iCode] && i['id'] === prev[iCode]
          return { ...i, isSelected: isEqual }
        })
      }
    });

    // console.log("selItems - onSelect");
    // console.log(selItems);

    this.setData({ properties: selItems });


    // console.log("\n");

  },
  async onCheckStock(selItems) {
    const code = this.getSkuCode(selItems);
    const {curItem} = this.data;
    const {id} = curItem;

    return new Promise(async (resolve, reject) => {
      const params = {fuliId: id, code}
      const { onCheckStock } = app.api();
      if(!code) resolve(false);
      const res = await onCheckStock(params);
      resolve(res);
    })
  },
  navigateToAddress() {
    wx.navigateTo({
      url: '/pages/address-creation/address-creation',
    })
  },
  getSkuCode(obj) {
    let ids = Object.keys(obj).map(k => obj[k]);
    if (!ids.length) return "";
    return ids.sort((a, b) => a * 1 - b * 1).join("-")
  },
  async onPay() {
    const paysign = await this.onGetPaySign();
    const toastP = { icon: "error", title: paysign.info }
    if (!paysign.success) wx.showToast(toastP);
    // console.log("paysign - onPay");
    // console.log(paysign);
    const invokeRes = await this.onInvokePayment(paysign);
  },


  onInvokePayment(params) {
    // console.log('params - onInvokePayment');
    // console.log(params);
    const {data} = params;
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        // ...params,
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.packageValue,
        signType: data.signType,
        paySign: data.paySign,
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
  async onGetPaySign() {
    const {globalData} = getApp();
    // console.log('globalData - onGetPaySign');
    // console.log(globalData);

    const {openId, userInfo} = globalData;
    const { userId} = userInfo;
    // const isEmptyProperties = this.data.isEmptyProperties;
    const curItem = this.data.curItem;
    const defaultAddress = this.data.defaultAddress;
    const prodSelection = this.data.prodSelection;
    const { id } = curItem;
    const { name, phone, address } = defaultAddress;
    const skuCode = this.getSkuCode(prodSelection);
    // console.log('skuCode - onGetPaySign');
    // console.log(skuCode);
    const skuCodeP = { icon: 'error', title: CONSTANTS.LABEL_EMPTYPROPERTIES }
    const emptyInfo = { icon: 'error', title: CONSTANTS.LABEL_EMPTYUSERINFO }
    // const skuCodeP = { icon: 'error', title: 'empty property' }
    // const skuCodeP = { icon: 'error', title: 'empty property' }
    // && !isEmptyProperties
    if(!skuCode) return wx.showToast(skuCodeP);
    if(!name || !phone || !address) return wx.showToast(emptyInfo);
    // console.log('!skuCode - onGetPaySign');
    // console.log(!skuCode);
    const params = {
      openid: openId,
      userId,
      id,
      skuCode,
      receiveName: name,
      receivePhone: phone,
      receiveAddress: address,
    }
    const res = await api.onGetPaySign(params);
    // console.log('res - onGetPaySign');
    // console.log(res);
    return res;
  },
})