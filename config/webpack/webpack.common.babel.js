import webpack from 'webpack'
// eslint-disable-next-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from 'html-webpack-plugin'

import paths from './paths'
import rules from './rules'

const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
const { CheckerPlugin } = require('awesome-typescript-loader')

const isDevelopment = process.env.NODE_ENV === 'development'
module.exports = {
    entry: ['@babel/polyfill', paths.entryPath],
    module: {
        rules
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css', '.jsx', '.jss', '.tsx']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CheckerPlugin(),
        new MiniCSSExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true
            }
        })
    ]
}
