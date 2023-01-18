
const _ = require('lodash')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const packageJson = require("./package.json")
const deps = packageJson.dependencies;
const shared = _.mapValues(deps, (value) => {
	return { singleton: true, requiredVersion: value }
})
const entryName = _.startCase(_.camelCase(packageJson.name)).replace(/\s/g, '')
// const publicPath = '/weather';

// const appVersion = packageJson.version
// const buildDatetime = new Date()
// const packageName = packageJson.name

module.exports = {
	entry: {
		[packageJson.name]: `${__dirname}/src/${entryName}.bootstrap`,
	},
	mode: 'development',
	devServer: {
		port: 9099,
		open: true,
		headers: {
		"Access-Control-Allow-Origin": "*",
		},
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@src': path.resolve(__dirname, './src'),
			'@services': path.resolve(__dirname, './src/services'),
			'@modules': path.resolve(__dirname, './src/modules'),
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
				use: [ 'style-loader',  
					{
						loader: "css-loader",
						options: {
						sourceMap: true,
						},
					} 
				]
			},
			{
				test: /\.less$/,
				use: ['style-loader', {
					loader: "css-loader",
					options: {
					sourceMap: true,
					},
				}, 'less-loader']
			},
			{
				test: /\.(sass|scss)$/,
				use: ['style-loader', {
					loader: "css-loader",
					options: {
					sourceMap: true,
					},
				}, 'sass-loader']
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
		new ModuleFederationPlugin({
			name: "micrositeWeather",
			filename: "micrositeWeather.remote-entry.js",
			exposes: {
				[`./MicrositeWeatherIndex`]: `./src/MicrositeWeather.index`,
				[`./CurrentWeatherPanel`]: `./src/app/components/WeatherPanel/CurrentWeatherPanel`,
			},
			shared,
		}),
    new HtmlWebpackPlugin({
		template: "./public/index.html",
		// filename: 'index.html',
		// template: path.resolve(__dirname, './public/index.ejs'),
		// templateParameters: {
		// 	appVersion,
		// 	buildDatetime,
		// 	packageName
		// }
    }),
  ],
};
