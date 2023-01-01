/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash');
const helper = require('./helper');

const args = helper.args(process.argv)

const help = function help() {
	const readme = `
    Help:
    arguments:
       
    `
	console.log(readme)
}

const run = function run() {
	if (args.help) {
		return help()
	}
	helper.log('Running... prepare.js', 'green')
	console.log('Args:', args)

	let build = 'cross-env'
	const specific = ['watch', 'serve', 'standalone']
	const keys = Object.keys(args)

	_.forEach(keys, (key) => {
		if (_.includes(specific, key)) {
			return
		}
		build += ` ${key}=${args[key]}`
	})

	if (_.get(args, 'serve')) {
		build += ' webpack serve --config webpack.config.standalone.js'
	}

	if (_.get(args, 'build')) {
		const command = _.get(args, 'devServer') ? 'webpack serve' : 'webpack'
		build += ` ${command} --config webpack.config.js && rm -rf release/index.ejs`
	}

	helper.log(`Running... ${build.trim()}`, 'green')
	helper.run(build.trim())
}

run();
