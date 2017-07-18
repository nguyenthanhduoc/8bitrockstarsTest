const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
	entry: ['./main.jsx'],
	output: {
        path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js'
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ context }) => context &&
            context.indexOf('node_modules') > -1
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
	]
};
