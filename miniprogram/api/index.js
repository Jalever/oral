const app = getApp()
const request = app.require("utils/request.js");
const CONSTANTS = app.require("constants/index.js");
const TOKEN = require("./token");
const LOGIN = require("./login");

module.exports = {
  ...TOKEN,
  ...LOGIN,
}