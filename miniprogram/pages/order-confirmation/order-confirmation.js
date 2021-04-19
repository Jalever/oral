// miniprogram/pages/order-confirmation/order-confirmation.js

const app = getApp();
const request = app.require("utils/request");
const api = app.require("api/index.js");

Page({
  /**
   * Page initial data
   */
  data: {
    fromPageItem: null,
    curItem: null,
    properties: [],
    prodSelection: {},//选择的商品型号及对应的规则参数
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const self = this;
    const items = await this.onGetPageParams();
    self.setData({ fromPageItem: items[0] });
    const resData = await this.onGetDetailedProduct();
    console.log("onLoad - onGetPageParams");
    console.log(items[0]);
    console.log("resData - onGetDetailedProduct");
    console.log(resData);
    self.setData({ curItem: resData });
    const properties = this.onSelectProperties(resData);
    self.setData({ properties });
    console.log("this.data.properties - onGetDetailedProduct");
    console.log(this.data.properties);

    // self.setData({ curItem: item });

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
        val: propertys[k].map(i => ({...i, isSelected:false}))
      }
    });
  },
  onSelect(e) {
    const properties = this.data.properties;
    const { item } = e.currentTarget.dataset;
    const { pCode, id } = item;
    const prev = this.data.prodSelection;

    console.log(`prev[pCode]: ${prev[pCode]}`);
    console.log(`id === prev[pCode] * 1: ${id === prev[pCode] * 1}`);
    console.log(`pCode: ${pCode}`);

    if (prev[pCode]) id === prev[pCode] * 1 ? delete prev[pCode] : prev[pCode] = id;
    else prev[pCode] = id;
    this.setData({ prodSelection: prev });

    
    console.log("properties - onSelect");
    console.log(properties);
    console.log("prev - onSelect");
    console.log(prev);

    //添加isSelected标识符
    const selItems = properties.map(pItem => {
      return {
        ...pItem,
        val: pItem.val.map(i => {
          const iCode = i.pCode;
          const isEqual = prev[iCode] && i['id'] === prev[iCode]
          return {...i,isSelected:isEqual}
        })
      }
    });
    
    console.log("selItems - onSelect");
    console.log(selItems);

    this.setData({ properties: selItems });

    
    console.log("\n");

  }
})