const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './src/index.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
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
                            limit: 1024,
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
                            limit: 1024,
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
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader'
                }
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
