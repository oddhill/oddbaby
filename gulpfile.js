var gulp = require('gulp')
var sass = require('gulp-sass')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var scsslint = require('gulp-scss-lint')
var svg2png = require('gulp-svg2png')
var browserify = require('browserify')
var shim = require('browserify-shim')
var babelify = require('babelify')
var cssGlobbing = require('gulp-css-globbing')
var source = require('vinyl-source-stream')
var argv = require('minimist')(process.argv.slice(2))

// babel
gulp.task('browserify', function () {
  var b = browserify({
    basedir: './js',
    entries: './main.js'
  })

  b.transform(babelify)
  b.transform(shim, {global: true})

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
})

// svg2png
gulp.task('svg2png', function () {
  gulp.src('./graphics/**/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./graphics'))
})

// Compile sass
gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
})

// Lint sass
gulp.task('scss-lint', function () {
  return gulp.src(['./scss/**/*.scss', '!./scss/print.scss', '!scss/normalize.scss', '!scss/vendor/**/*'])
    .pipe(scsslint())
})

// Jshint
gulp.task('jshint', function () {
  return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

// Watch .scss and .js
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['scss-lint', 'sass'])
  gulp.watch('./js/**/*.js', ['jshint', 'browserify'])
})

// Set default task
gulp.task('default', ['watch'])
