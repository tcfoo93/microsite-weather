const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const { ModuleFederationPlugin } = require('webpack').container;
const portFinderSync = require('portfinder-sync')
const common = require('./webpack.config')
const packageJson = require('./package.json')
const entryName = _.startCase(_.camelCase(packageJson.name)).replace(/\s/g, '')
const helper = require('./scripts/helper')

const params = {
	modFederationAttr: {
		exposes: {
			[`./${entryName}.index`]: `${__dirname}/src/${entryName}.index`
		}
	},
	entry: {
		[packageJson.name]: `${__dirname}/src/${entryName}.bootstrap`
	}
}
const useLocal = process.env.useLocal
const subPath = process.env.subPath || ''
const devPath = `${__dirname}/config/local/vsit/register-config.json`

const devEnv = !_.isUndefined(useLocal) ? require(devPath).subApps[0].props : {}

const environmentVariables = _.assign(_.pickBy(devEnv, _.identity))

if (!_.isUndefined(process.env.publicPath)) {
	environmentVariables.publicPath = process.env.publicPath
}

const port = process.env.port ? process.env.port : portFinderSync.getPort(9005)
const publicPath = '/weather'
const fullPath = `http://localhost:${port}${publicPath}`
const appVersion = packageJson.version
const buildDatetime = new Date()
const packageName = packageJson.name

const deps = packageJson.dependencies
const fedName = _.camelCase(packageJson.name)
const fileName = `${fedName}.remote-entry.js`
const shared = _.mapValues(deps, (value) => {
	return { singleton: true, requiredVersion: value }
})
const federationAttr = {
	library: { type: 'var', name: _.camelCase(packageJson.name) },
	name: fedName,
	filename: fileName,
	remotes: {},
	shared,
	...params.modFederationAttr
}

const ModuleFederation = new ModuleFederationPlugin(federationAttr)
helper.log(`${packageJson.name} module federation attr : ${JSON.stringify(federationAttr, null, 2)} `)
const plugins = [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		chunks: [packageJson.name],
		template: path.resolve(__dirname, './public/index.ejs'),
		templateParameters: {
			publicPath: environmentVariables.publicPath,
			appVersion,
			buildDatetime,
			packageName
		}
		
	}),
	new webpack.DefinePlugin({
		// _: require.resolve('lodash'),
		'process.env': JSON.stringify({
			...environmentVariables
		})
	}),
	new InterpolateHtmlPlugin({
		...environmentVariables
	}),
	ModuleFederation
]

const config = {
	devtool: 'eval-source-map',
	mode: 'development',
	devServer: {
		port,
		historyApiFallback: { index: publicPath }, 
		headers: {
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Origin': '*'
		},
		hot: true,
		open: `${publicPath}${subPath}`
	},
	output: {
		publicPath: fullPath,
		filename: '[name].[contenthash].js', // name of the generated bundle
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'release')
	},
	plugins
}

module.exports = merge(common, config)