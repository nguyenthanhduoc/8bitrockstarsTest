const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['./main.jsx'],
	output: {
        path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: 'index.js'
	},
    devServer: {
		inline: true
	},
	module: {
		loaders: [
            {test: /\.(css|scss)$/, loader: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: 'file?name=[name].[ext]'},
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
	},
    resolve: {
        extensions: ['.js', '.jsx']
    },
	plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
	]
};
