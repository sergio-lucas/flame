'use strict';
const gulp = require('gulp'),
      zip = require('gulp-zip'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      comments = require('gulp-strip-css-comments'),
      cssmin = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      imagemin = require('gulp-imagemin'),
      build_path = 'build';

gulp.task('browserSync', () => {
  browserSync({
    server:{baseDir: '/'}
    })
});

gulp.task('build', () => {
    return gulp.src(build_path+'/*')
        .pipe(zip('production.zip'))
        .pipe(gulp.dest('production'));
});

gulp.task('sass', () => {
    return gulp.src('./assets/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(build_path+'/styles'))
        .pipe(browserSync.stream())
});

gulp.task('comments', () => {
    return gulp.src(build_path+'/styles/*.css')
        .pipe(comments())
        .pipe(gulp.dest(build_path+'/styles'))
});

gulp.task('cssmin', () => {
    return gulp.src(build_path+'/styles/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(build_path+'/styles'))
});

gulp.task('scripts', () => {
    return gulp.src('scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(build_path+'/scripts'))
});

gulp.task('image', () => {
    return gulp.src('images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(build_path+'/images'))
});

gulp.task('dev', ['sass'], function () {

  browserSync({
    server:{baseDir: './'}
  })
  gulp.watch('assets/**/*.scss', ['sass']);
  });