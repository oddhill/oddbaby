var gulp = require('gulp')
var sass = require('gulp-sass')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var scsslint = require('gulp-scss-lint')
var svg2png = require('gulp-svg2png')
var babel = require('gulp-babel')
var argv = require('minimist')(process.argv.slice(2))

// babel
gulp.task('babel', function () {
  return gulp.src('./js/src/main.js')
    .pipe(babel())
    .pipe(gulp.dest('./js'))
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
    gulp.watch('./js/src/**/*.js', ['jshint', 'babel'])
  } else {
    gulp.watch('./js/**/*.js', ['jshint'])
  }
})

// Set default task
gulp.task('default', ['watch'])
