const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
    entry: {
        uploadFileManager: './src/index.js'
    },
    output: {
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: `[name].js`
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }]
            },
            {
                test: /\.styl$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'stylus-loader' }]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            title: 'es7-cli',
            template: 'index.html',
            inject: 'head',
            hash: true,
            minify: true
        })
    ]
}

module.exports = () => {
    return webpackConfig
}
