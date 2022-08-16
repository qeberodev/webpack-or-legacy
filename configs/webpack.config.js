const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootDir = path.resolve(__dirname, "..")
const PORT = process.env.PORT || 8080;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(rootDir, "dist"),
  },
  devServer: {
    port: PORT,
    host: "0.0.0.0",
    watchFiles: ["src/**/*", "public/**/*"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public", "index.html"),
      inject: "body",
    }),
  ],
};