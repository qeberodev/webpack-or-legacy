const { defaultConfig: commonConfig } = require("../../../configs/webpack.config");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
module.exports = {
    ...commonConfig,
    output: {
        filename: "mdlib.js",
        path: path.resolve(rootDir, "dist"),
        clean: true,
        libraryTarget: 'umd',
        library: "mdlib",
    },
    optimization: {
        concatenateModules: true,
    },
    plugins: []
}
