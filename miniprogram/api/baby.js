// const app = getApp()
const request = require('../utils/request.js')
const CONSTANTS = require('../constants/index.js')
const utils = require('../utils/index.js')
// const {globalData} = getApp();
// const {userInfo} = globalData;


async function onGetAsyncUserBaby (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/query`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      data: {
        userId: userInfo ? userInfo.userId : "5099157"
      },
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    const { data } = res;
    return data
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p);
    console.log('error')
    console.log(error)
  }
}

//异步更换默认宝宝
async function onUpdateAsyncBaby (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const dataParams = {
      userId: userInfo ? userInfo.userId : "5099157",
      ...p,
      isAuto: 1,
    };
    let queryParams = utils.json2Form(dataParams);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/modify?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      method: 'PUT',
      data,
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    const { data } = res;
    return data
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p)
  }
}

//删除宝宝
async function onGetAsyncDeleteBaby (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const { id } = p;
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/delete/${id}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      method: 'DELETE',
      data: p,
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    const { data } = res;
    return data
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p);
    console.log('error')
    console.log(error)
  }
}

//新增宝宝
async function onGetAsyncAddBaby (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const dataParams = {
      userId: userInfo ? userInfo.userId : "5099157",
      ...p
    };
    let queryParams = utils.json2Form(dataParams);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/add?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      method: 'POST',
      data: dataParams,
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    const { data } = res;
    return data
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p);
    console.log('error')
    console.log(error)
  }
}

//上传宝宝头像
async function onPutAsyncAvatar (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/modify/head`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      method: 'PUT',
      data: {
        id: userInfo ? userInfo.userId : "5099157",
        ...p,
      },
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    const { data } = res;
    return data
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p);
    console.log('error')
    console.log(error)
  }
}


//编辑宝宝
async function onPutAsyncEditBaby (p) {
  try {
    const { globalData } = getApp()
    const { userInfo } = globalData
    const dataParams = {
      userId: userInfo ? userInfo.userId : "5099157",
      ...p,
    }
    let queryParams = utils.json2Form(dataParams);
    const params = {
      url: `${CONSTANTS.URL_PRODPREFIX}/api/v4/user/baby/modify?${queryParams}`,
      header: {
        'content-type': 'application/json', // 有些接口不需要设置
        token: userInfo ? userInfo.token : "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJVU0VSX1RZUEUiOiJ3ZWl4aW5fbWluaXByb2dyYW1fb3JhbCIsIlVTRVJfSUQiOjUwOTkxNTcsImV4cCI6MTYyMjE1OTg2NCwibmJmIjoxNjE4NTU5ODY0fQ.tOue1OZ83SfsKXhzCaHCN4fK9CoP8TLqwneqmKGzZro",
      },
      method: 'PUT',
      data: dataParams,
    }
    const res = await request(params)
    if (!res.success) throw new Error(res.info)
    return res
  } catch (error) {
    const p = { title: error.message, icon: 'error' }
    wx.showToast(p);
    console.log('error')
    console.log(error)
  }
}

module.exports = {
  //获取用户所有的宝宝list
  onGetAsyncUserBaby,
  //异步更换默认宝宝
  onUpdateAsyncBaby,
  //删除宝宝
  onGetAsyncDeleteBaby,
  //新增宝宝
  onGetAsyncAddBaby,
  //编辑宝宝
  onPutAsyncEditBaby,
  //上传宝宝头像
  onPutAsyncAvatar,
}
