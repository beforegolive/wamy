var fs = require('fs')
var gulp = require('gulp')
var prettify = require('gulp-jsbeautifier')
var through = require('through')
var through2 = require('through2')
var map = require('vinyl-map')

gulp.task('config', function() {
	const updateConfig = through2.obj(function(chunk, env, callback){
		console.log('===== chunk:', chunk)
		console.log('===== env:', env)
		console.log('===== callback:', callback)
	})
  return gulp
    .src('./project.config.json')
		.pipe(updateConfig)
    .pipe(prettify({ indent_size: 2 }))
    .pipe(gulp.dest('./'))
})

gulp.task('file', function() {
  const sourceFilePath = '.gitignore'
  if (!fs.existsSync(sourceFilePath)) {
    fs.appendFileSync(sourceFilePath, '')
  }

  return gulp.src(sourceFilePath).pipe(gulp.dest('./'))
})
