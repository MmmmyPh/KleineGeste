const webpack = require('webpack');
const base = require('./base');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathToClean = [
	'dist/*.*'
];

let cleanOption = {
	root: process.cwd(),
	verbose: false
};

module.exports = webpackMerge(base, {
	entry: {
		KleineGeste: './main.js'
	},

	plugins: [
		new CleanWebpackPlugin(pathToClean, cleanOption)
	]
});