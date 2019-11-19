const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    plugins: [
        new htmlWebpackPlugin({
            template: 'src/example/index.pug'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true
    }
}