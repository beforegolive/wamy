var fs = require('fs')
var gulp = require('gulp')
var prettify = require('gulp-jsbeautifier')
var through2 = require('through2')

const compiledFolder = '_dist/'

gulp.task('config', function() {
  const updateConfig = through2.obj(function(chunk, env, callback) {
		let contents
		let json
		try{
			contents = chunk.contents.toString()
			json = JSON.parse(contents)
		} catch(e){
			console.error('Error: an error occurs when converting file content to json object')
			throw e
		}

    json.miniprogramRoot = '_dist/'

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
      const os = require('os')

      const updatedContents = contents + os.EOL + compiledFolder
      chunk.contents = Buffer.from(updatedContents)
      this.push(chunk)
    }

    cb()
  })

  return gulp
    .src(sourceFilePath)
    .pipe(addCompiledDirToGitIgnore)
    .pipe(gulp.dest('./'))
})
