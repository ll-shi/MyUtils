const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const baseConfig = {
    entry:{
        // chunkName ,一个chunk生成一个bound
        main : ['.src/main.js'],
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname,"dist"),//path必须是绝对路径
        publicPath: "/assets/"
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
                    presets: ["es2015"]
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options:{
                            /*...*/
                        }
                    }],
            },
            {   
                test:/\.css$/, // css模块化
                use:['style-loader','css-loader'] // 会把生成的css自动插入到html的head标签中，不过需要在index.js中import
            },
            {
                test:/\.(png|svg|jpg|gif)$/, // 处理图片
                use: ['file-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/, // 处理字体
                use: ['file-loader']
            }
        ]
    },
    resolve:{
        extensions: [".js",".vue"],
        alias:{

        },
    },
    devtool:'source-map',
    context:__dirname,
    externals:{
        //不打包模块，而是从环境中去请求。
    },
    stats:{
        color: true,
    },
    devServer:{
        hot: true, // 启用模块热替换
        host: "0.0.0.0", // 希望服务器外部可以访问
        index: 'index.html' //index 文件
    },
    plugins:[
        // 根据html模版生成html，bound会自动引入html，解决手动引入，以及修改bound的问题
        new HtmlWebpackPlugin({
            title: "Output Management",
            filename: '',
            template: ''
        }),
        new CleanWebpackPlugin(['dist']), // 清理dist目录
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common' // 指定公共 bundle 的名称。防止代码重复
        })
    ],
    watch: true,
}
module.exports = baseConfig;