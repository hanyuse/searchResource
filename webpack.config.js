const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        // index:"./src/index.js"
       edit:"./src/edit.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[
            //js向下兼容
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader" 
            },
            //处理less文件
    /*         {
                test:/\.less/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader',options:{
                        modules:true,
                        exclude: /node_modules/
                    }},
                    {loader:'less-loader'}
                ]
            }, */
            {
                
                test: /\.css$/,
                use: [ {loader:'style-loader'}, {loader:'css-loader',options:{ modules: true}} ]
                  
            },
            //处理图片以及字体文件
            {test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/, use:[{ loader: "url-loader"}]},
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        host: "192.168.31.249",
        hot: true,
        historyApiFallback: true,
        open:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
      /*    new HtmlWebpackPlugin({
            template:"./src/index.html"
           
        }), */
         new HtmlWebpackPlugin({
            template:"./src/edit.html"
           
        }),
        new CleanWebpackPlugin("./dist")
    ],
    mode:"development",
    // mode:"production",   //用于生产环境
    devtool:"source-map"
}