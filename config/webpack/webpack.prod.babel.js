// eslint-disable-next-line import/no-extraneous-dependencies
import CleanWebpackPlugin from 'clean-webpack-plugin'

import Dotenv from 'dotenv-webpack'
import paths from './paths'

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].[hash].js`,
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: '.env'
        })
    ],
    devtool: 'source-map'
}
