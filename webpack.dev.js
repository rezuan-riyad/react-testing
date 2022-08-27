const path = require("path");
const webpack = require('webpack');
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlPlugin = require('html-webpack-plugin');

var config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        // static: path.resolve(__dirname, 'public'), // where to serve content from
        open: true, //open the browser after server had been started
        compress: true,
        hot: true,
        port: 8080
    },
    plugins: [
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),
    ]
})

var apiServices = Object.assign({}, config, {
    name: 'apiServices',
    entry: './src/index.js',
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            // filename: path.resolve(__dirname, 'public/api.html'),
        })
    ],
})


module.exports = apiServices;