const baseConfig = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require("webpack-merge");
const webpack = require('webpack');
const prodConfig = {
    mode: "production",
    plugins:[
        new webpack.DefinePlugin({
            // 配置环境变量
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new UglifyJsPlugin(),// 配合tree shaking(tree shaking 必须在生产环境下使用)
    ],
    optimization: {
        // 优化
        splitChunks: {
          //分包配置
          chunks: "all",
          cacheGroups: {
            styles: {
              minSize: 0,
              test: /\.css$/,
              minChunks: 2,
            },
          },
        },
      },
}
module.exports = merge(baseConfig,prodConfig);