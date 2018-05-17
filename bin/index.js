#!/usr/bin/env node

let program = require('commander')
let gulp = require('gulp')

require('./scripts/gulpfile')
require('./scripts/jsHandler')

program
  .command('init')
  .alias('i')
  // .description('初始化当前项目')
  .option('-r, --red', 'is red')
  .action(function() {
    console.log('init start')
    // console.log('dir: ',dir)
    // console.log('cmd: ',cmd)
  })

program
  .command('build')
  .alias('b')
  // .description('编译当前项目')
  .option('-b, --blue', 'is blue')
  .action(function(options) {
    gulp.series('js', 'notjs', function(done){
      done()
    })()
  })

program.parse(process.argv)

if (!program.args.length) program.help()
