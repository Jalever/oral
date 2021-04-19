// const app = getApp()
// const request = app.require("utils/request.js");
// const CONSTANTS = app.require("constants/index.js");
const COMMON = require("./common");
const LOGIN = require("./login");
const PAY = require("./pay");
const AREA = require("./area");
const WALFARE = require("./walfare");
// const URL = require("./url");

module.exports = {
  ...COMMON,
  ...LOGIN,
  ...PAY,
  ...AREA,
  ...WALFARE,
  // ...URL,
}