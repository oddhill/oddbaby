var gulp = require('gulp')
var sass = require('gulp-sass')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var scsslint = require('gulp-scss-lint')
var svg2png = require('gulp-svg2png')
var browserify = require('browserify')
var babelify = require('babelify')
var cssGlobbing = require('gulp-css-globbing')
var source = require('vinyl-source-stream')
var argv = require('minimist')(process.argv.slice(2))

// babel
gulp.task('babelify', function () {
  var b = browserify({
    entries: './js/main.js',
    transform: [babelify]
  })

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
    .pipe(gulp.dest('./css'))
})

// Lint sass
gulp.task('scss-lint', function () {
  return gulp.src(['./scss/**/*.scss', '!./scss/print.scss', '!scss/normalize.scss'])
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

  if (argv.babel) {
    gulp.watch('./js/**/*.js', ['jshint', 'babelify'])
  } else {
    gulp.watch('./js/**/*.js', ['jshint'])
  }
})

// Set default task
gulp.task('default', ['watch'])
