const path = require("path");
module.exports = {
  mode: "none",
  entry: "./node_modules/tinymce-a11y-checker/lib/modules/node-checker.js",
  output: {
    path: __dirname + "/browser/tiny-mce-a11y-checker",
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
