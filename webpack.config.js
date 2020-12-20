const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 中文网中写法有错误，参照官网
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用来分离css
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = {
    entry:{
        // chunkName ,一个chunk生成一个bound
        main : ['./src/main.js'],
    },
    output:{
        filename: "js/[name].js",
        path: path.resolve(__dirname,"dist"),//path必须是绝对路径
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,  //js跟jsx bable转换
                include: [
                    path.resolve(__dirname,'src'),
                ],
                exclude: [
                    path.resolve(__dirname,"src/examples")
                ],
                loader: 'babel-loader',
                options:{
                    // presets: ['@babel/preset-env']
                }
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader",
            //             options:{
            //                 /*...*/
            //             }
            //         }],
            // }, 在vue中没有必要配置html-loader，vue-loader可以达到同样效果。
            {   
                test:/\.css$/, // css模块化
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      esModule: false, // 不写会有警告
                    },
                }, 'css-loader'], // 会把生成的css自动插入到html的head标签中，不过需要在index.js中import
            },
            {
                test:/\.(png|svg|jpg|gif)$/, // 处理图片
                use: ['file-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/, // 处理字体
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
        ]
    },
    resolve:{
        extensions: [".js",".vue",'json'], // 在引入模块时可以不带扩展
        alias:{
            "@":path.resolve(__dirname,"src"), // src目录别名
            _:__dirname, // 工程根目录别名
        },
    },
    externals:{
        //不打包模块，而是从环境中去请求(通过cdn)。
    },
    stats:{
        colors: true,
        modules: false,
        performance: true,
        children: false,
    },
    plugins:[
        // 根据html模版生成html，bound会自动引入html，解决手动引入，以及修改bound的问题
        new HtmlWebpackPlugin({
            title: "Output Management",
            filename: 'index.html',
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(), // 清理dist目录（中文网写法有错误，参照官网）
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'common' // 指定公共 bundle 的名称。防止代码重复
        // }), 被optimization中的splitChunk代替
        new webpack.HashedModuleIdsPlugin(), // 修复vendor哈希发生变化
        new CopyWebpackPlugin({
            // 用来直接复制public目录中的文件
            patterns: [
              {
                from: path.resolve(__dirname, "public"), // 将public目录中的所有文件
                to: "./", // 复制到 输出目录 的根目录
              },
            ],
          }),
          new VueLoaderPlugin(),
          new MiniCssExtractPlugin({
            // 打包 css 代码 到文件中
            filename: "css/[name].css",
            chunkFilename: "css/common.[hash:5].css", // 针对公共样式的文件名
          }),
    ],
}
module.exports = baseConfig;