const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './src/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: "source-map",
    performance: { //性能监控
        hints: 'warning', //报警告，如果是false则关闭
        maxEntrypointSize: 400000, 
        maxAssetSize: 500000,   //500kb就会出警告
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');  //只是提示js，超过大小会提示
        }
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, use: {
                    loader: "awesome-typescript-loader"
                }
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader?cacheDirectory=true",
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
                include: path.join(__dirname, './src'),
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'less-loader'
                    },
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'images/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webp|ogg|mp3|wav)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'images/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: require('./plugins.config'),
    devServer: {
        hot: true,
        open: true,
        compress: true,
        port: 8888,
        contentBase: path.join(__dirname, 'dist')
    }

};
