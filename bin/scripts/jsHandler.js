require('./gulpfile')
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const through2 = require('through2')
const rename = require('gulp-rename')
const umd = require('gulp-umd')
const webpack = require('webpack-stream')
const uglify = require('gulp-uglify')
const glob = require('glob')
const rimraf = require('rimraf')
const strip = require('gulp-strip-comments')

const targetFolder = path.resolve(process.cwd() + '/_dist')

const npmFolder = path.resolve(process.cwd() + '/_dist/npm')
const webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js')

let dependencies = []

const extractAllDeps = through2.obj(function(chunk, env, cb) {
  let contents = chunk.contents.toString()
  // named capturing group is not supported in js regex.
  const requireRegex = /require\((['"])([^.\\][^'"]+)\1\)/gm

  let result
  let i = 0
  do {
    result = requireRegex.exec(contents)
    if (!!result) {
      // get dep name in groups
      let depName = result[2]
      dependencies.push(depName)
    }
  } while (result)

  this.push(chunk)
  cb()
})

gulp.task('handle_js', function() {
  return gulp
    .src([
      '**/*.js',
      '!bin/**',
      '!node_modules/**',
      '!_dist/**',
      '!gulpfile.js',
      '!webpack.config.js'
    ])
    .pipe(strip())
    .pipe(extractAllDeps)
    .pipe(
      babel({
        presets: ['@babel/env'],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          'transform-class-properties'
        ]
      })
    )
    .pipe(gulp.dest(targetFolder))
})

gulp.task('extract_require', function(done) {
  var fs = require('fs')

  dependencies.forEach(item => {
    try {
      let dep = require(item)
      let content = `module.exports = require('${item}')`
      fs.writeFileSync(`${npmFolder}/${item}.js`, content)
    } catch (e) {}
  })

  return gulp
    .src(`${npmFolder}/*.js`)
    .pipe(webpack(require(webpackConfigPath)))
    .pipe(gulp.dest(npmFolder))
})

gulp.task('init', function(done) {
  // initialize array
  dependencies = []

  // remove all file in npm folder
  rimraf(`_dist`, {}, function() {
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }

    if (!fs.existsSync(npmFolder)) {
      fs.mkdirSync(npmFolder)
    }

    done()
  })
})

gulp.task('notjs', function() {
  return gulp
    .src([
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
    ])
    .pipe(gulp.dest(targetFolder)) // 此处路径用targetFolder无效
})

gulp.task(
  'js',
  gulp.series('init', 'handle_js', 'extract_require', function(done) {
    done()
  })
)

gulp.task(
  'notjs',
  gulp.series('notjs', 'config', 'ignore', function(done){
    done()
  })
)
