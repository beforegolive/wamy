#!/usr/bin/env node

let program = require('commander')
let gulp = require('gulp')

program.version('1.0.0')

const editOrCreateJsonFile = path => {
  var fs = require('fs')

  var result = JSON.parse(fs.readFileSync(path))
  result.miniprogramRoot = './_dist'
  // "miniprogramRoot": "./dist",
  console.log('====== result:', result)
  fs.writeFile(path, JSON.stringify(result), 'utf8', ()=>{
    console.log('====== write success')
  });
}

editOrCreateJsonFile('./project.config.json')

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
    // console.log('build start:', options)
    // console.log('dir: ', dir)
    // console.log('cmd: ',cmd)
    let appConfig = require('./../app.json')
    let fs = require('fs')
    fs.readFile('./.gitignore', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });
    // console.log('====== appConfig:', appConfig)
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
