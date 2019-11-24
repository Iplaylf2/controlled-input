module.exports = {
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
