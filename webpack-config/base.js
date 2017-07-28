const path = require('path');

module.exports = {
	context: path.resolve(process.cwd(), 'src'),
    
	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'dist')
	},
    
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /mode_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
};