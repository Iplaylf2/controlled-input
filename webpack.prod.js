const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  entry: "./src/index.ts",
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "controlled-input.js",
    library: "controlledInput",
    libraryExport: "default"
  }
});
