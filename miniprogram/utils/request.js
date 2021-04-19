const URLPREFIX = `http://192.168.6.24:8081`;
const USER_URLPREFIX = `http://api-h5.cloud.alilo.com.cn/api/v4`;

function request(options) {
  return new Promise((resolve, reject) => {
    // 逻辑：发送请求到服务器
    wx.request({
      url: `${options.url}`,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      success: res => {
        // console.log('wx.request - success');
        // console.log(res);
        resolve(res.data);
      },
      fail: err => {
        // console.log('wx.request - fail');
        // console.log(err);
        reject(err);
      }
    });
  });
}

// export default request;
module.exports = request;