const baseConfig = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const prodConfig = {
    plugins:[
        new webpack.HashedModuleIdsPlugin(), // 修复vendor哈希发生变化
    ]
}