const webpack = require('webpack');
const path = require('path');
const base = require('./base');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = webpackMerge(base, {
	entry: {
		KleineGeste: './templates/index.js'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'demo.html',
			title: 'KleineGeste Demo',
			template: path.resolve(process.cwd(), 'src/templates/template.html'),
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin()
	],

	devServer: {
		hot: true,
		contentBase: path.resolve(process.cwd(), 'dist'),
		publicPath: '/'
	}
});