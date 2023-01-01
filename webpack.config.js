const path = require('path');
const _ = require('lodash')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('./package.json');
const entryName = _.startCase(_.camelCase(packageJson.name)).replace(/\s/g, '')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	entry: {
		[packageJson.name]: `${__dirname}/src/${entryName}.bootstrap`,
	},
	output: {
		library: {
			type: 'umd'
		},
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'release'),
		publicPath: '/',
		clean: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@src': path.resolve(__dirname, './src'),
			'@services': path.resolve(__dirname, './src/services'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@assets': path.resolve(__dirname, './src/assets')
		}
	},
	module: {
		rules: [
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(jsx|js)?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(tsx|ts)?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.(woff2?|eot|ttf|woff|otf)(\?.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
      			type: 'asset/resource',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CompressionPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public',
					to: '',
					globOptions: {
						ignore: ['**/index.html'],
					},
				},
			],
		}),
	],
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
