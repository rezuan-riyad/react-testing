const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');


// const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
// const webpack = require("webpack")
const HtmlPlugin = require('html-webpack-plugin');

var config = {
    mode: 'production',
    devtool: false,
    plugins: [
        // Extracts CSS into separate files
        // Note: style-loader is for development, MiniCssExtractPlugin is for production
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css",
            chunkFilename: "styles/[id].css",
        }),

        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            algorithm: "gzip",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],


    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            chunks: "all",
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
}

// Configuration for handling api services
var apiServices = Object.assign({}, config, {
    name: 'apiServices',
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public/api'),
        clean: true
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
    ]
})

// configuration for extension sidebar
// TODO: Need to recheck if compatible with existing codes
var sidebarServices = Object.assign({}, config, {
    name: 'sidebarServices',
    entry: './src/extension_sidebar/index.js',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public', 'extension_sidebar'),
        clean: true
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/extension_sidebar/extension-sidebar.html'),
            filename: path.resolve(__dirname, 'public/extension_sidebar/index.html')
        })
    ]
})

// var api = Object.assign({}, config, {
//     name: 'api',
//     entry: './src/api/main.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'public/api'),
//         clean: true
//     }
// })

module.exports = [apiServices, sidebarServices];