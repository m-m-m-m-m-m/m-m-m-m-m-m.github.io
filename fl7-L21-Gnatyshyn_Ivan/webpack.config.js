'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require ('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/app/src',
    entry: './app',
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
        library: "App",
        publicPath: '/build'
    },
    resolve: {
        extensions: ['.js', '.ts', '.scss','.html']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                options: {
                    emitErrors: true,
                    failOnHint: true,
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!resolve-url-loader!sass-loader"
                })
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            dry: false
        }),
        new StyleLintPlugin({
                configFile: "./stylelint.config.json",
                failOnError : false
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ]
};
