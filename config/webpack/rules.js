const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
    },
    {
        test: /\.(js|jsx|jss)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.eot(\?v=\d\.\d\.\d)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
        test: /\.ttf(\?v=\d\.\d\.\d)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
    },
    {
        test: /\.module\.s(a|c)ss$/,
        loader: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
]
