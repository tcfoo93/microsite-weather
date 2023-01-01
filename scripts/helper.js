/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash')
const process = require('child_process')

const helper = {}

helper.args = function args(args) {
	args = _.takeRight(args, args.length - 2)
	const results = {}
	_.forEach(args, function (arg) {
		arg = _.split(arg, '=')

		if (arg.length == 1) {
			results[arg[0]] = true
			return results
		}

		const key = arg[0]
		results[key] = arg[1]

		return results
	})

	return results
}

helper.run = function run(cmd) {
	try {
		process.execSync(cmd, {
			stdio: 'inherit'
		})
	} catch (e) {
		console.error(`RUNNING COMMAND: ${cmd} FAILED`)
	}
}
helper.runWithResult = function runWithResult(cmd, quiet) {
	try {
		return process.execSync(cmd)
	} catch (e) {
		if (!quiet) {
			console.error(`RUNNING COMMAND: ${cmd} FAILED`)
		}
	}
}

helper.log = function log(message, c) {
	console.log(message)
}

module.exports = helper
