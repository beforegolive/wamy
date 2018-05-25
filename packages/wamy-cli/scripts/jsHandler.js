require('./gulpfile')
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const through2 = require('through2')
const rename = require('gulp-rename')
const umd = require('gulp-umd')
const webpackStream = require('webpack-stream')
const uglify = require('gulp-uglify')
const glob = require('glob')
const rimraf = require('rimraf')
const strip = require('gulp-strip-comments')
const plumber = require('gulp-plumber')
const webpack = require('webpack')


let relativeToNpm = ''

function moveForwardOfRelativePath(relativePath) {
  // posix格式下移除前3个字符:  ../../
  // 如果是window则要移除4个: ..\\..\\
  return relativePath.substr(3)
}

const targetFolder = path.resolve(process.cwd() + '/_dist')

const npmFolder = path.resolve(process.cwd() + '/_dist/npm')
// const webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js')
const webpackConfigPath = path.resolve('webpack.config.js')
// const configObj = require('../../../webpack.config.js')
// console.log('====== configObj:', configObj)

const rootPath = process.cwd()

let dependencies = []

const extractAllDeps = through2.obj(function(chunk, env, cb) {
  console.log('====== chunk.path:', chunk.path)

  let contents = chunk.contents.toString()
  // named capturing group is not supported in js regex.
  const requireRegex = /(require\()(['"])([^.\\][^'"]+)(\2\))/gm

  let result
  let i = 0
  do {
    result = requireRegex.exec(contents)
    if (!!result) {
      // get dep name in groups, refer to the regex above
      let depName = result[3]
      dependencies.push(depName)
    }
  } while (result)

  let relativePath = path.relative(chunk.path, rootPath)
  relativePath = moveForwardOfRelativePath(relativePath)
  relativeToNpm = relativePath + '/npm/'

  // contents = contents.replace(requireRegex, `$1$2${relativeToNpm}$3$4`)
  contents = contents.replace(requireRegex, function(...args) {
    // handle module name with slash, like: lodash/map, babel-core/register
    const moduleName = args[3].replace(/\//g, '_')
    return `${args[1]}${args[2]}${relativeToNpm}${moduleName}${args[4]}`
  })

  chunk.contents = Buffer.from(contents)

  this.push(chunk)
  cb()
})

const createPage = (className, path) => {
  console.log('====== className:', className)
  var instance = new className()
  instance.path = path
  return instance
}

const compileSubClassOfMyPage = through2.obj(function(chunk, env, cb) {
  let contents = chunk.contents.toString()
  // code.replace(/exports\.default\s*=\s*(\w+);/ig, function (m, defaultExport) {}
  // \nPage(require('wepy').default.$createPage(${defaultExport} , '${pagePath}'));\n

  contents = contents.replace(/exports\.default\s*=\s*(\w+);/ig, function (m, defaultExport) {
    // 针对加入transform-decorators-legacy以后出现的 exports.default = undefined;
    if(defaultExport === 'undefined'){
      return m
    }
    // 此处如何把所有继承myPage的类都拿出来？
    if(chunk.path.indexOf('myPage')<=-1){
      return m
    }
    // console.log('============ relativeToNpm:', `require('${relativeToNpm}wamy')`)
    return `Page(require('${relativeToNpm}wamy').default._createPage(${defaultExport}))`
  })

  chunk.contents = Buffer.from(contents)

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
      '!webpack.config.js',
    ])
    // .pipe(strip())
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['es2015', "stage-0"],
        plugins: [
          'transform-runtime',
          'transform-decorators-legacy',
          // 'transform-class-properties',
          // 'syntax-async-functions',
          // 'transform-regenerator',
          // 'transform-async-to-generator'
        ]
      })
    )
    .pipe(extractAllDeps)
    .pipe(compileSubClassOfMyPage)

    .pipe(gulp.dest(targetFolder))
})

gulp.task('write_deps_to_files', function(done){
  // 此处用try-catch把gulp以外的处理逻辑异常显示出来。
  try{
    dependencies.forEach(item => {
        console.log('======== dependency name:', item)
        // let dep = require(item)
        let content = `module.exports = require('${item}')`

        // 将模块中的斜线换成下划线
        let moduleName = item.replace(/\//g, '_')
        // console.log('====== dependency path:', `${npmFolder}/${moduleName}.js`)
        fs.writeFileSync(`${npmFolder}/${moduleName}.js`, content)
    })
  }catch(e){
    console.error(e)
  }

  done()
})

gulp.task('extract_require', function(done) {
  let webpackConfig
  // 此处用try-catch把gulp以外的处理逻辑异常显示出来。
  try{
  var npmPath = path.resolve(process.cwd() + '/_dist/npm/*.js')
  var files = glob.sync(npmPath);
  var entry = {};
  for (var i in files) {
    var obj = path.parse(files[i]);
    entry[obj.name] = files[i];
  }
   webpackConfig = {
    entry,
    output: {
      path: path.resolve(process.cwd(), '_dist/npm/'),
      filename: '[name].js',
      libraryTarget: 'umd'
    }
  	// plugins: [
    //   new webpack.optimize.UglifyJsPlugin({
    //     comments: false, //去除注释
    //     compress: {
    //       warnings: false //忽略警告
    //     }
    //   })
    // ]
  }

} catch(e){
  console.log('==== e:',e)
  throw e
}
  done() // done调用后，异常才能被正常显示。
  return gulp
    .src(`${npmFolder}/*.js`)
    .pipe(plumber())
    // .pipe(webpack(require(webpackConfigPath)))
    .pipe(webpackStream(webpackConfig))
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
  gulp.series('init', 'handle_js', 'write_deps_to_files', 'extract_require', function(done) {
    done()
  })
)

gulp.task(
  'notjs',
  gulp.series('notjs', 'config', 'ignore', function(done) {
    done()
  })
)

gulp.task(
  'all',
  gulp.series('js', 'notjs', function(done) {
    done()
  })
)
