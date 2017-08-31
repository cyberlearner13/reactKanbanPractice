const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-plugin');
const webpack = require('webpack');

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry : {
      app: './src/index.js',
      bootstrap:bootstrapConfig
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: "[name].bundle.js"
    }
},
module:{
  rules:[
    {test: /\.s?css$/,use:ExtractTextPlugin.extract({fallback:"style-loader",use:['css-loader','sass-loader']})},
    {test: /\.js$/,exclude:/node_modules/,use: 'babel-loader'},
    {test: /\.(jpe?g|png|gif)$/i,  use:['file-loader?name=[name].[ext]&outputPath=/images/','image-webpack-loader']},
    {test: /\.(woff2?|svg)$/,use:'url-loader?limit=10000&name=[name].[ext]&outputPath=font/'},
    {test: /\.(ttf|eot)$/,use:'file-loader?name=[name].[ext]&outputPath=font/'},
    {test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery'}
  ]
},
devServer: {
   contentBase: path.join(__dirname, 'dist');
   compress: true,
   port:9000,
   stats:"errors-only",// "verbose", "minimal"
   hot: true,
   open: !isProd
},
plugins:[
   new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      title: 'Pro React Playground',
      template: './src/index.html',
      hash: false,
      minify:{
        collapseWhitespace: isProd
      }
   }),
   new ExtractTextPlugin({
     filename:"/css[name].css",
     allChunks: true
   }),
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NamedModulesPlugin()
]
