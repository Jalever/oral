// const app = getApp()
// const request = app.require("utils/request.js");
// const CONSTANTS = app.require("constants/index.js");
const COMMON = require("./common");
const LOGIN = require("./login");
const PAY = require("./pay");
const AREA = require("./area");
const WALFARE = require("./walfare");
const ADDRESS = require("./address");
const BABY = require("./baby");
const ORDER = require("./order");
// const URL = require("./url");

module.exports = {
  ...COMMON,
  ...LOGIN,
  ...PAY,
  ...AREA,
  ...WALFARE,
  ...ADDRESS,
  ...BABY,
  ...ORDER,
  // ...URL,
}