const baseConfig = require('./webpack.config');
const merge = require("webpack-merge");
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const devConfig = {
    mode: "development",
    devtool:'source-map',
    devServer:{
        open: true,
        port: 8080,
        hot: true, // 启用模块热替换
        host: "0.0.0.0", // 希望服务器外部可以访问
        // index: 'index.html', //index 文件
        // proxy:{

        // },
        stats:'minimal'
    },
    // performance:{
    //     hints: 'error', // 展示性能提示
    //     maxEntrypointSize: 400000,
    //     maxAssetSize: 100000,
    //     assetFilter: function(assetFilename) {
    //       return assetFilename.endsWith('.js'); // 这样写只能js性能提示
    //     }
    // },
    plugins: [
        new webpack.DefinePlugin({
            // 配置环境变量
            'process.env.NODE_ENV': JSON.stringify('dev'),
        }), 
        new BundleAnalyzerPlugin(), // 用来分析bound大小
        // new VueLoaderPlugin(), // 用来支持vue的HMR(热替换)
        // new NpmInstallPlugin() // 用来自动安装项目中缺少的依赖
    ],
}
module.exports = merge(baseConfig,devConfig);