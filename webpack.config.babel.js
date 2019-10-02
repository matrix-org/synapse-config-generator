import 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';

export default {
    entry: [
        './webui/js/index.jsx',
        './webui/scss/main.scss',
        './webui/scss/bootstrap.min.css',
    ],
    watch: false,
    output: {
        path: path.resolve(__dirname, 'synapseconfiggenerator/static'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].css',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: __dirname + '/synapseconfiggenerator/static/index.html',
            title: 'The synapse configuration generator',
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['css/bootstrap.min.css'],
        }),
    ],
};

