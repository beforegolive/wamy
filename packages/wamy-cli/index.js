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
  })

program
  .command('build')
  .alias('b')
  // .description('编译当前项目')
  .option('-w, --watch', 'watch mode')
  .action(function(options) {
    console.log('============ 123 notjs',)
    return gulp.series(
      'js',
      'notjs',
      function(done){
      done()

      if(options.watch){
        gulp.watch([
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
        ], gulp.series('notjs'), function(done){
          console.log('==== notjs updated',)
          done()
        })
      }


      // gulp.watch([
      //   '**/*.js',
      //   '!bin/**',
      //   '!node_modules/**',
      //   '!_dist/**',
      //   '!gulpfile.js',
      //   '!webpack.config.js'
      // ], gulp.series('js'), function(done){
      //   console.log('========= js updated',)
      //   done()
      // })
    })()
  })

program.parse(process.argv)

if (!program.args.length) program.help()
