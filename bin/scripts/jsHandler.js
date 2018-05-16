const gulp = require('gulp')
const babel = require('gulp-babel')

const compiledFolder = '_dist/'

gulp.task('js', function(done) {
  return gulp
    .src(['**/*.js', '!bin/**', '!node_modules/**', '!_dist/**'])
    .pipe(babel({
			presets: ['@babel/env'],
			plugins: ["@babel/plugin-proposal-object-rest-spread",'transform-class-properties']
		}))
    .pipe(gulp.dest(compiledFolder))
		.on('end', done)
})
