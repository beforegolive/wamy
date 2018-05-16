#!/usr/bin/env node

let program = require('commander')
let gulp = require('gulp')

require('../gulpfile')

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
    gulp.parallel('config', 'ignore', function(){
      console.log('gulp tasks done.')
    })()
    return gulp.src(['**/*.js',
    '**/*.json',
    '**/*.wxml',
    '**/*.wxss',
    '**/*.png',
    '**/*.jpg',
    '**/*.gif',
    '!node_modules/**',
    '!_dist/**',
    '!project.config.json',
    '!package.json',
    '!package-lock.json'
  ]).pipe(gulp.dest('./_dist/'))
    // return gulp.src('**/*.wxml').pipe(gulp.dest('./_dist/'))
  })

program.parse(process.argv)

if (!program.args.length) program.help()
