const path = require("path");
module.exports = {
  mode: "none",
  entry: __dirname + "/browser/src/checker.js",
  output: {
    path: __dirname + "/browser/dist/checker.js",
    filename: "node-checker.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/auto',
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
