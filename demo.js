#!/usr/bin/env node

var program = require('commander')

// program
//   // .version('0.1.0')
//   // .option('-p, --peppers', 'Add peppers')
//   // .option('-P, --pineapple', 'Add pineapple')
//   // .option('-b, --bbq-sauce', 'Add bbq sauce')
//   // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);


	program
	.version('1.0.0')
	.option('-V, --version', 'output the version number')
	.command('init', 'first')
	.command('build', 'second')
	.parse(process.argv)
