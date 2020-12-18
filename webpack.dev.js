const baseConfig = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devConfig = {
    plugins: [
        new webpack.DefinePlugin({
            // 配置环境变量
            'process.env.NODE_ENV': JSON.stringify('dev'),
        }), 
        new BundleAnalyzerPlugin(), // 用来分析bound大小
        new VueLoaderPlugin() // 用来支持vue的HMR(热替换)
    ]
}