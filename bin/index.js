#!/usr/bin/env node

var program = require('commander')

program
.version('1.0.0');

program
.command('init')
.alias('i')
// .description('初始化当前项目')
.option('-r, --red','is red')
.action(function(){
  console.log('init start',)
  // console.log('dir: ',dir)
  // console.log('cmd: ',cmd)
})

program
.command('build')
.alias('b')
// .description('编译当前项目')
.option('-b, --blue', 'is blue')
.action(function(options){
  console.log('build start:', options)
  console.log('dir: ',dir)
  // console.log('cmd: ',cmd)
})


program.parse(process.argv)

if (!program.args.length) program.help();
