const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 // [name].[contenthash.css]
// chunkFilename: "[id].[contenthash.css]"
const plugins =  [
    new MiniCssExtractPlugin({
        filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
        filename:'index.html',
        template: path.resolve(__dirname, 'index.html')
    }),
    new CleanWebpackPlugin()
];
module.exports = plugins;