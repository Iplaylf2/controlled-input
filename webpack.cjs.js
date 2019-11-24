const merge = require("webpack-merge");
const prod = require("./webpack.prod.js");
const path = require("path");

module.exports = merge(prod, {
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "cjs")
  }
});
