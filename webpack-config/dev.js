const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

let pathToClean = [
	'dist'
];

let cleanOption = {
	verbose: false
};

module.exports = {
	context: path.resolve(process.cwd(), 'src'),

	entry: {
		KleineGeste: './index.js'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(pathToClean, cleanOption),
		new HtmlWebpackPlugin({
			filename: 'demo.html',
			title: 'KleineGeste Demo',
			template: path.resolve(process.cwd(), 'src/template.html'),
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin()
	],

	devServer: {
		hot: true,
		contentBase: path.resolve(process.cwd(), 'dist'),
		publicPath: '/'
	}
};