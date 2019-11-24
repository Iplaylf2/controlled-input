const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  entry: "./dev/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dev/runtime",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./dev/index.html")
    })
  ]
});
