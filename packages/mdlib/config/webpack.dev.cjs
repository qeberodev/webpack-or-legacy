const { defaultConfig: commonConfig } = require("../../../configs/webpack.config");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
module.exports = {
    ...commonConfig,
    output: {
        filename: "mdlib.js",
        path: path.resolve(rootDir, "dist"),
        libraryTarget: 'umd',
        library: "mdlib",
        clean: true,
    },
    optimization: {
        concatenateModules: true,
    },
    watch: true,
    plugins: []
}
