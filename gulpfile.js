var fs = require('fs')
var gulp = require('gulp')
var prettify = require('gulp-jsbeautifier')
var through = require('through')

const editConfig = through()

gulp.task('config', function() {
  return gulp
    .src('./project.config.json')
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
