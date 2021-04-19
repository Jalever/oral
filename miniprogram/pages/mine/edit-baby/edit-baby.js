// miniprogram/pages/mine/edit-baby/edit-baby.js
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
    item: null,
    gender: 0, //性别
    imgSrc: null, //头像图片
    birthdayValue: {
      day: 0,
      month: 0,
      year: 0,
      isLeapMonth: false,
      isLunarCalendar: false,
    },
    genderList: [
      {
        name: '男',
        value: 1,
      },
      {
        name: '女',
        value: 2,
      },
    ],
    files: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const { birthdayValue } = this.data
    const isDev = options.isDev && utils.strIsTrue(options.isDev)
    const self = this
    const item = isDev ? JSON.parse(options.item) : await this.onGetPageParams()
    const { birthday, sex } = item
    const birthdayObj = utils.getNumberBirthday(birthday)
    const newBirthdayValue = { birthdayValue, ...birthdayObj }
    this.setData({ item, birthdayValue: newBirthdayValue, gender: sex * 1 })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () { },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () { },

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


  uploadImg (filePath) {
    const self = this
    return new Promise((resolve, reject) => {
      const { globalData } = getApp()
      const { userInfo } = globalData
      wx.uploadFile({
        url: "http://api-h5.cloud.alilo.com.cn/api/v4/user/baby/modify/head",
        filePath: filePath,
        name: "upload_file",
        formData: {
          id: "5099157",
          "files": filePath,
        },
        method:'PUT',
        header: {
          'Content-Type': "multipart/form-data",
          token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
        },
        success: function (res) {
          console.log('res - success');
          console.log(res);
          console.log('\n');
        },
        fail: function (res) {
          console.log('res - fail');
          console.log(res);
          console.log('\n');
        }

      })
    })
  },
  //选择图片获取本地路径
  getBinaryFile (localPath) {
    const self = this
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile(
        {
          filePath: localPath,
          encoding: 'base64',
          success: res => {
            //返回临时文件路径
            console.log('getBinaryFile - success - res');
            console.log(res);
            console.log('\n');

            resolve(res);
          },
          fail: err => {

            console.log('getBinaryFile - fail - err');
            console.log(err);
            console.log('\n');
            reject(res);
          }
        })
    })
  },
  //选择图片获取本地路径
  chooseImg () {
    const self = this
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const imgSrc = res.tempFilePaths[0]
          self.setData({ imgSrc })
          resolve(imgSrc);
        },
        fail: res => reject(res),
      })
    })
  },
  async updateAvatar () {
    const { item } = this.data;
    const { id } = item;
    const { onPutAsyncAvatar,onPutAsyncEditBaby } = app.api()
    const imgPath = await this.chooseImg();
    const binaryFile = await this.getBinaryFile(imgPath);
    
    let head = `data:image/png;base64,${binaryFile.data}`;
    console.log('head');
    console.log(head);
    const params = {
      head,
      id,
    }
    console.log('imgPath');
    console.log(imgPath);
    await onPutAsyncAvatar(params);
    // await onPutAsyncEditBaby(params);
    console.log('\n');
  },
  
  async confirm () {
    const { item } = this.data;
    const { birthday, nickName, sex, head, id } = item;
    const params = {birthday,nickName,sex,head,id}
    const { onPutAsyncEditBaby } = app.api()
    const res = await onPutAsyncEditBaby(params);
    const navP = {delta: 1}
    const p = { title: res.info, icon: 'success' }
    wx.showToast(p);
    await utils.sleep(500);
    if (res.success) wx.navigateBack(navP)  
  },

  onInput (e) {
    const { value } = e.detail
    const { item } = this.data
    this.setData({ item: { ...item, nickName: value } })
  },

  radioChange (e) {
    const { value } = e.detail
    const { item } = this.data
    const sex = value;
    this.setData({ item: {...item, sex}});
  },

  //获取页面参数
  onGetPageParams () {
    const self = this
    return new Promise((resolve, reject) => {
      const ec = self.getOpenerEventChannel()
      ec.on('acceptDataFromOpenerPage', function (res) {
        const { item } = res
        resolve(item)
      })
    })
  },
  bindDateChange (e) {
    const { birthdayValue, item } = this.data
    const { value } = e.detail
    const { year, month, day } = value
    const birthdayStr = utils.num2StrBirthday(value)
    const newBirthday = { ...birthdayValue, year, month, day }
    const newItem = { ...item, birthday: birthdayStr }
    this.setData({ item: newItem, birthdayValue: newBirthday })
  },

  selectFile (files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile (files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
  },
  uploadError (e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess (e) {
    console.log('upload success', e.detail)
  },
})
