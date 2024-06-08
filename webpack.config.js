const path = require("path");
const { sourceMapsEnabled } = require("process");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
};
