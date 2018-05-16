var fs = require('fs')
var gulp = require('gulp')
var prettify = require('gulp-jsbeautifier')
var through = require('through')
var through2 = require('through2')
var map = require('vinyl-map')

const compiledFolder = '_dist/'

gulp.task('config', function() {
  const updateConfig = through2.obj(function(chunk, env, callback) {
    let content = chunk.contents.toString()
    let json = JSON.parse(content)
    json.miniprogramRoot = compiledFolder

    chunk.contents = Buffer.from(JSON.stringify(json))

    this.push(chunk)
    callback()
  })

  return gulp
    .src('./project.config.json')
    .pipe(updateConfig)
    .pipe(prettify({ indent_size: 2 }))
    .pipe(gulp.dest('./'))
})

gulp.task('ignore', function() {
  const sourceFilePath = './.gitignore'
  if (!fs.existsSync(sourceFilePath)) {
    fs.appendFileSync(sourceFilePath, compiledFolder)
  }

  const addCompiledDirToGitIgnore = through2.obj(function(chunk, env, cb) {
    let contents = chunk.contents.toString()
    if (contents.indexOf(compiledFolder) <= -1) {
      var os = require('os')
      fs.appendFileSync(sourceFilePath, os.EOL)
      fs.appendFileSync(sourceFilePath, compiledFolder)
    }
  })

  return gulp
    .src(sourceFilePath)
    .pipe(addCompiledDirToGitIgnore)
    .pipe(gulp.dest('./'))
})
