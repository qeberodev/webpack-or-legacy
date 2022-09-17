const path = require("path");
const config = require("../../../configs/webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootDir = path.resolve(__dirname, "..");
const entry = path.resolve(rootDir, "src");

module.exports = {
    ...config.makeConfig({
        rootDir, entry, plugins:
            [
                new HtmlWebpackPlugin({
                    template: path.resolve(rootDir, "public", "index.html"),
                    inject: "body",
                }),
                new MiniCssExtractPlugin({
                    filename: "style.css"
                }),
            ],
        rules: [
            {
                test: /\.(sass|scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    })
};
