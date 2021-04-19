// var LABELS = require("/constants/labels.js");
// var PAGES = require("/constants/pages.js");

const LABELS = require("./labels");
const VARIABLES = require("./variables");
const URLS = require("./url");

module.exports = {
  ...LABELS,
  ...VARIABLES,
  ...URLS,
}