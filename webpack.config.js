const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './js/index.js',

    output: {
        filename: 'pc-bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        contentBase: './dist',
        proxy: {
            "/api/*": {
                target: "https://recruit.topviewclub.cn",
                ws: true,
                changeOrigin: true,
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.join(__dirname, 'index.html'), 
            filename: 'index.html',
            favicon: './img/bitbug_favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, // 5kb
                            esModule: false,
                            outputPath: 'assets'
                        }
                    }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },     
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader','postcss-loader']
            },

            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader"
                },{
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]

    }
};