const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootDir = path.resolve(__dirname, "..");
const PORT = process.env.PORT || 8080;

const defaultPlugins = [];

const defaultOptions = {
    entry: "./src/index.js",
    rootDir: path.resolve(__dirname, ".."),
    plugins: defaultPlugins,
    rules: []
};
exports.defaultOptions = defaultOptions;

const makeConfig = (
    { rootDir, plugins, entry, rules, mode }
) => {
    const _rootDir = rootDir || defaultOptions.rootDir;

    return {
        entry: entry || defaultOptions.entry,
        mode: mode || "development",
        output: {
            filename: "main.js",
            path: path.resolve(_rootDir, "dist"),
            clean: true,
        },
        resolve: {
            alias: {
                public: "/public",
            }
        },
        devServer: {
            port: PORT,
            host: "0.0.0.0",
            watchFiles: ["src/**/*", "public/**/*"],
        },
        module: {
            rules: rules || defaultOptions.rules,
        },
        plugins: plugins || defaultOptions.plugins,
        optimization: {
            concatenateModules: true,
        }
    };
}
module.exports.makeConfig = makeConfig;

module.exports.defaultConfig = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(rootDir, "dist"),
        clean: true,
    },
    resolve: {
        alias: {
            public: "/public",
        }
    },
    devServer: {
        port: PORT,
        host: "0.0.0.0",
        watchFiles: ["src/**/*", "public/**/*"],
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, "public", "index.html"),
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
    ],
};
