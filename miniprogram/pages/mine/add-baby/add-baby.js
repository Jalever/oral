// miniprogram/pages/mine/add-baby/add-baby.js
const app = getApp()
const utils = app.require('utils/index.js');
const request = app.require('utils/request.js');
const CONSTANTS = app.require('constants/index.js');
const api = app.require('api/index.js');

Page({
  /**
   * Page initial data
   */
  data: {
    gender: 0,
    birthday: '',
    name: '',
    birthdayValue: {
      day: 0,
      month: 0,
      year: 0,
      isLeapMonth: false,
      isLunarCalendar: false,
    },
    // calendars: ['公历', '农历'],
    // calendarIndex: 0,

    genderList: [
      {
        img: '/images/console-entrance.png',
        name: '男',
        value: 1,
      },
      {
        img: '/images/code-db-onAdd.png',
        name: '女',
        value: 2,
      },
    ],
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

  inputName () { },
  async confirm () {
    const { gender, name, birthdayValue } = this.data;
    const { year, month, day } = birthdayValue;
    const {
      LABEL_NONGENDER,
      LABEL_NONNICKNAME,
      LABEL_NONBIRTHDAY,
    } = CONSTANTS

    const genderP = { title: LABEL_NONGENDER, icon: 'error' };
    if (!gender) return wx.showToast(genderP);
    const nameP = { title: LABEL_NONNICKNAME, icon: 'error' };
    if (!name) return wx.showToast(nameP);
    const birthdayP = { title: LABEL_NONBIRTHDAY, icon: 'error' };
    if (!year || !month || !day) return wx.showToast(birthdayP);

    const birthday = utils.num2StrBirthday(birthdayValue);
    const params = { name, nickName: name, sex: gender, birthday };
    const { onGetAsyncAddBaby } = app.api()
    await onGetAsyncAddBaby(params)
    wx.navigateBack({ delta: 1 });
    
    
  },
  selectedGender (e) {
    const { item } = e.currentTarget.dataset
    const { value } = item
    this.setData({ gender: value })
  },
  bindDateChange (e) {
    const { birthdayValue } = this.data;
    const { value } = e.detail;
    const { year, month, day } = value;
    const newBirthday = { ...birthdayValue, year, month, day };
    this.setData({ birthday: `${year}-${month}-${day}`, birthdayValue: newBirthday });
  },
})
